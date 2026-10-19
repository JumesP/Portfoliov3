"use client"
import react, { useState, useEffect, useRef } from 'react';
import { Chessboard, SquareHandlerArgs } from 'react-chessboard';
import { Chess as ChessGame, Square } from 'chess.js';

const ChessEngineComponent = () => {
    // create a chess game using a ref to always have access to the latest game state within closures and maintain the game state across renders
    const chessGameRef = useRef(new ChessGame());
    const chessGame = chessGameRef.current;

    // track the current position of the chess game in state to trigger a re-render of the chessboard
    const [chessPosition, setChessPosition] = useState(chessGame.fen());
    const [moveFrom, setMoveFrom] = useState('');
	const [optionSquares, setOptionSquares] = useState({});

	const getBestMove = async (fen: string) => {
        try {
            const response = await fetch("/api/getBestMove", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fen }),
            });

            if (!response.ok) {
                throw new Error(`Error checking with AI: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("response:", data);

            return { data };
        } catch (error) {
            console.error("Error checking with AI:", error);
            return { data: null, error };
        }
    };

	async function getCPUMove() {
		// get the fen
		const fen = chessGame.fen();
		console.log("Current FEN:", fen);

		// exit if the game is over
		if (chessGame.isGameOver()) {
			return;
		}

		// get all possible moves
		const possibleMoves = chessGame.moves();
		console.log("Possible moves:", possibleMoves);

		const { data } = await getBestMove(fen);
		if (!data || !data.move) {
			console.error("No best move returned from AI");
			return;
		}

		// normalise the move
		const { toFile, toRank, isCastle, isPromotion, promotionType } = data.move;
		const PieceType = data.move.piece.type;
		const PieceIsWhite = data.move.piece.isWhite;

		console.log(toFile, toRank, PieceType);

		const file = ["a", "b", "c", "d", "e", "f", "g", "h"][toFile];
		const rank = ["1", "2", "3", "4", "5", "6", "7", "8"][toRank];
        const piece = PieceIsWhite ? ["", "n", "b", "r", "q", "k"][PieceType] : ["", "N", "B", "R", "Q", "K"][PieceType];
        const promotionPiece = PieceIsWhite ? ["", "n", "b", "r", "q", "k"][promotionType] : ["", "N", "B", "R", "Q", "K"][promotionType];

		console.log("piece", piece);

		let move = `${piece}${file}${rank}`;
		console.log("Best move from AI:", move);

        // THIS WHOLE BLOCK CAN BE REMOVED WHEN IT RETURNS A LEGAL MOVE STRUCTURED CORRECTLY
		if (!possibleMoves.includes(move)) {
			// if any of the possible moves include part of the move, use that move instead
			// if it contains all 3 of the characters, use that move instead
			let matchingMove = possibleMoves.find(m => m.includes(file) && m.includes(rank) && m.includes(piece));

			// allow for castling moves
			const castlingMoves = ["e1g1", "e1c1", "e8g8", "e8c8"];
			const isKing = piece.toLowerCase() === "k";
			if (isKing && isCastle) {
				const matchingCastlingMove = castlingMoves.find(m => m.includes(file) && m.includes(rank));
				// chess.js formats castling as O-O or O-O-O
				switch (matchingCastlingMove) {
					case "e1g1":
					case "e8g8":
						matchingMove = "O-O";
						break;
					case "e1c1":
					case "e8c8":
						matchingMove = "O-O-O";
						break;
				}
            }

            // allow for promotion
            if (PieceType === 0 && (rank === "1" || rank === "8") && isPromotion) {
                console.log("Promotion detected, looking for matching move with promotion piece:", promotionPiece);
                matchingMove = possibleMoves.find(m => m.includes(file) && m.includes(rank) && m.includes(promotionPiece));
            }

			if (matchingMove) {
				console.log("Matching move found:", matchingMove);
				move = matchingMove;
			} else {
				console.error("AI suggested an invalid move:", move);
				return;
			}
		}

		// make the move
		chessGame.move(move);
		setChessPosition(chessGame.fen());
    }

    function getMoveOptions(square: Square) {
      // get the moves for the square
      const moves = chessGame.moves({
        square,
        verbose: true
      });

      // if no moves, clear the option squares
      if (moves.length === 0) {
        setOptionSquares({});
        return false;
      }

      // create a new object to store the option squares
      const newSquares: Record<string, React.CSSProperties> = {};

      // loop through the moves and set the option squares
      for (const move of moves) {
        newSquares[move.to] = {
          background: chessGame.get(move.to) && chessGame.get(move.to)?.color !== chessGame.get(square)?.color ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)' // larger circle for capturing
          : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
          // smaller circle for moving
          borderRadius: '50%'
        };
      }

      // set the square clicked to move from to yellow
      newSquares[square] = {
        background: 'rgba(255, 255, 0, 0.4)'
      };

      // set the option squares
      setOptionSquares(newSquares);

      // return true to indicate that there are move options
      return true;
	}

    function onSquareClick({
      square,
      piece
    }: SquareHandlerArgs) {
      // piece clicked to move
      if (!moveFrom && piece) {
        // get the move options for the square
        const hasMoveOptions = getMoveOptions(square as Square);

        // if move options, set the moveFrom to the square
        if (hasMoveOptions) {
          setMoveFrom(square);
        }

        // return early
        return;
      }

      // square clicked to move to, check if valid move
      const moves = chessGame.moves({
        square: moveFrom as Square,
        verbose: true
      });
      const foundMove = moves.find(m => m.from === moveFrom && m.to === square);

      // not a valid move
      if (!foundMove) {
        // check if clicked on new piece
        const hasMoveOptions = getMoveOptions(square as Square);

        // if new piece, setMoveFrom, otherwise clear moveFrom
        setMoveFrom(hasMoveOptions ? square : '');

        // return early
        return;
      }

      // is normal move
      try {
        chessGame.move({
          from: moveFrom,
          to: square,
          promotion: 'q'
        });
      } catch {
        // if invalid, setMoveFrom and getMoveOptions
        const hasMoveOptions = getMoveOptions(square as Square);

        // if new piece, setMoveFrom, otherwise clear moveFrom
        if (hasMoveOptions) {
          setMoveFrom(square);
        }

        // return early
        return;
      }

      // update the position state
      setChessPosition(chessGame.fen());

      // make random cpu move after a short delay
      setTimeout(getCPUMove, 300);

      // clear moveFrom and optionSquares
      setMoveFrom('');
      setOptionSquares({});
    }

    // set the chessboard options
    const chessboardOptions = {
        allowDragging: false,
        onSquareClick,
        position: chessPosition,
        squareStyles: optionSquares,
        id: 'click-to-move'
    };

    return (
        <div className="chess">
			<div className="h-200 w-200">
				<Chessboard options={chessboardOptions} />
			</div>
			{chessGame.isGameOver() && (
				<div className="game-over">
					<h2>Game Over!</h2>
					<p>{chessGame.isCheckmate() ? 'Checkmate!' : chessGame.isStalemate() ? 'Stalemate!' : chessGame.isDraw() ? 'Draw!' : ''}</p>
				</div>
			)}
        </div>
    )

}

export default ChessEngineComponent;
