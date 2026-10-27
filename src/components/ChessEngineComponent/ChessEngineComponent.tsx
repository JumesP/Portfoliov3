"use client";
import { useState, useEffect, type CSSProperties } from "react";
import { Chessboard, SquareHandlerArgs } from "react-chessboard";
import { Chess as ChessGame, Move, Square } from "chess.js";

type LeaderboardEntry = {
  username: string;
  gameHistory: [];
  checkmatingPiece: string;
  palyerColor: string;
  leaderboard: "global";
  playersMoves: number;
  totalMoves: number;
  finalFen: string;
  startingFen: string;
  chessGameId: string;
};


const pieceSymbols: Record<
  Move["color"],
  Record<NonNullable<Move["captured"]>, string>
> = {
  w: {
    p: "♟",
    n: "♞",
    b: "♝",
    r: "♜",
    q: "♛",
    k: "♚",
  },
  b: {
    p: "♙",
    n: "♘",
    b: "♗",
    r: "♖",
    q: "♕",
    k: "♔",
  },
};

const capturedPieceOrder: Record<NonNullable<Move["captured"]>, number> = {
  p: 0,
  n: 1,
  b: 2,
  r: 3,
  q: 4,
  k: 5,
};

const ChessEngineComponent = () => {
  // Keep one mutable game instance while state updates redraw the board and history.
  const [chessGame] = useState(() => new ChessGame());
  const [fen, setFen] = useState(() => chessGame.fen())

  // track the current position of the chess game in state to trigger a re-render of the chessboard
  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const [playersColor, setPlayersColor] = useState("w")
  const [moveFrom, setMoveFrom] = useState("");
  const [optionSquares, setOptionSquares] = useState<
    Record<string, CSSProperties>
  >({});
  const [scoreStoredSuccess, setScoreStoredSuccess] = useState(false)
  const [scoreStoredLoading, setScoreStoredLoading] = useState(false)
  const [username, setUsername] = useState("Guest")
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/chessEngine/fetchLeaderboard", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }

        const data: LeaderboardEntry[] = await response.json();
        setLeaderboard(data);
      } catch (error) {
        if ((error as Error).name === "AbortError") return; // component unmounted
        console.error("Error fetching leaderboard:", error);
        setLeaderboardError("Couldn't load the leaderboard. Please try again.");
      } finally {
        if (!controller.signal.aborted) setLeaderboardLoading(false);
      }
    };

    fetchLeaderboard();

    return () => controller.abort(); // cleanup
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // stop the page reload
    handleSaveGame();
  };

  const handleSaveGame = async () => {
    if (chessGame.isCheckmate() && chessGame.turn() === playersColor) {
      console.log("you lost... not worth storing that...")
      return;
    }

    // get username
    // const username = "john";
    if (username == "") {
      console.error("please user valid username: ", username);
      return;
    }
    console.log("username: ", username);

    setScoreStoredLoading(true)
    const data = {
      username,
      finalFen: fen,
      gameHistory: chessGame.history({ verbose: true })
    }

    try {
    const response = await fetch("/api/chessEngine/storeGame", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to send message");
    }

    setScoreStoredSuccess(true);

  } catch {
      console.error("Something went wrong. Please try again.");
  } finally {
      setScoreStoredLoading(false)
  }
  }

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

      return { data };
    } catch (error) {
      console.error("Error checking with AI:", error);
      return { data: null, error };
    }
  };

  async function getCPUMove() {
    // get the fen
    const fen = chessGame.fen();

    // exit if the game is over
    if (chessGame.isGameOver()) {
      return;
    }

    // get all possible moves
    const possibleMoves = chessGame.moves();

    const { data } = await getBestMove(fen);
    if (!data || !data.move) {
      console.error("No best move returned from AI");
      return;
    }

    // normalise the move
    const { toFile, toRank, isCastle, isPromotion, promotionType } = data.move;
    const PieceType = data.move.piece.type;
    const PieceIsWhite = data.move.piece.isWhite;

    const file = ["a", "b", "c", "d", "e", "f", "g", "h"][toFile];
    const rank = ["1", "2", "3", "4", "5", "6", "7", "8"][toRank];
    const piece = PieceIsWhite
      ? ["", "n", "b", "r", "q", "k"][PieceType]
      : ["", "N", "B", "R", "Q", "K"][PieceType];
    const promotionPiece = PieceIsWhite
      ? ["", "n", "b", "r", "q", "k"][promotionType]
      : ["", "N", "B", "R", "Q", "K"][promotionType];

    let move = `${piece}${file}${rank}`;

    // THIS WHOLE BLOCK CAN BE REMOVED WHEN IT RETURNS A LEGAL MOVE STRUCTURED CORRECTLY
    if (!possibleMoves.includes(move)) {
      // if any of the possible moves include part of the move, use that move instead
      // if it contains all 3 of the characters, use that move instead
      let matchingMove = possibleMoves.find(
        (m) => m.includes(file) && m.includes(rank) && m.includes(piece),
      );

      // allow for castling moves
      const castlingMoves = ["e1g1", "e1c1", "e8g8", "e8c8"];
      const isKing = piece.toLowerCase() === "k";
      if (isKing && isCastle) {
        const matchingCastlingMove = castlingMoves.find(
          (m) => m.includes(file) && m.includes(rank),
        );
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
        matchingMove = possibleMoves.find(
          (m) =>
            m.includes(file) && m.includes(rank) && m.includes(promotionPiece),
        );
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
    setFen(chessGame.fen())
    setChessPosition(chessGame.fen());
  }

  function getMoveOptions(square: Square) {
    // get the moves for the square
    const moves = chessGame.moves({
      square,
      verbose: true,
    });

    // if no moves, clear the option squares
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    // create a new object to store the option squares
    const newSquares: Record<string, CSSProperties> = {};

    // loop through the moves and set the option squares
    for (const move of moves) {
      newSquares[move.to] = {
        background:
          chessGame.get(move.to) &&
          chessGame.get(move.to)?.color !== chessGame.get(square)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)" // larger circle for capturing
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        // smaller circle for moving
        borderRadius: "50%",
      };
    }

    // set the square clicked to move from to yellow
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };

    // set the option squares
    setOptionSquares(newSquares);

    // return true to indicate that there are move options
    return true;
  }

  function onSquareClick({ square, piece }: SquareHandlerArgs) {
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
      verbose: true,
    });
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    // not a valid move
    if (!foundMove) {
      // check if clicked on new piece
      const hasMoveOptions = getMoveOptions(square as Square);

      // if new piece, setMoveFrom, otherwise clear moveFrom
      setMoveFrom(hasMoveOptions ? square : "");

      // return early
      return;
    }

    // is normal move
    try {
      chessGame.move({
        from: moveFrom,
        to: square,
        promotion: "q",
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
    setFen(chessGame.fen());
    setChessPosition(chessGame.fen());

    // make random cpu move after a short delay
    setTimeout(getCPUMove, 300);

    // clear moveFrom and optionSquares
    setMoveFrom("");
    setOptionSquares({});
  }

  // set the chessboard options
  const chessboardOptions = {
    allowDragging: false,
    onSquareClick,
    position: chessPosition,
    squareStyles: optionSquares,
    id: "click-to-move",
  };

  const moveHistory = chessGame.history({ verbose: true });
  const getCapturedPieces = (color: Move["color"]) =>
    moveHistory
      .filter((move) => move.color === color && move.captured)
      .sort(
        (a, b) =>
          capturedPieceOrder[a.captured!] - capturedPieceOrder[b.captured!],
      )
      .map((move) => pieceSymbols[color][move.captured!]);
  const capturedPieces = {
    w: getCapturedPieces("w"),
    b: getCapturedPieces("b"),
  };
  const moveRows = Array.from(
    { length: Math.ceil(moveHistory.length / 2) },
    (_, index) => ({
      number: index + 1,
      white: moveHistory[index * 2]?.san,
      black: moveHistory[index * 2 + 1]?.san,
    }),
  );

  return (
    <div className="chess flex w-full max-w-250 flex-col items-center gap-6">
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
        <div className="relative w-full max-w-200">
          <Chessboard options={chessboardOptions} />
          {chessGame.isGameOver() && (
            <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-800/70 text-center text-white">
              <h2 className="text-2xl font-bold">Game Over!</h2>
              <p className="text-xl font-medium">
                {chessGame.isCheckmate()
                  ? "Checkmate!"
                  : chessGame.isStalemate()
                    ? "Stalemate!"
                    : chessGame.isDraw()
                      ? "Draw!"
                      : ""}
              </p>
              <p className="text-lg font-semibold">
                {chessGame.isCheckmate()
                  ? chessGame.turn() === "w"
                    ? "Black wins!"
                    : "White wins!"
                  : ""}
              </p>
              {chessGame.isCheckmate() && chessGame.turn() !== "w" && (
                <div className="flex flex-row gap-3 border border-black rounded-xl bg-gray-600">
                  {scoreStoredSuccess ? (
                    <p className="p-4">Score saved! Thanks, {username}.</p>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-2">
                      <label htmlFor="usernameEntry">
                        enter a username for the leaderboard:
                      </label>
                      <input
                        id="usernameEntry"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-white mx-4"
                      />
                      <button type="submit" className="border py-1 px-2 rounded-2xl w-fit mx-auto cursor-pointer">Store Game</button>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="w-full max-w-80 rounded-lg p-4 lg:mt-0">
          <div className="flex flex-col gap-3">
            {(["w", "b"] as const).map((color) => (
              <div key={color}>
                <div
                  className="min-h-8 text-2xl tracking-wide"
                  aria-label={`${color === "w" ? "White" : "Black"} captured pieces`}
                >
                  {capturedPieces[color].length > 0 ? (
                    capturedPieces[color].join(" ")
                  ) : (
                    <span className="text-sm text-black"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>


      </div>

      <section className="w-full max-w-200 rounded-lg bg-white/70 p-4 shadow-md">
        <h2 className="mb-3 text-lg font-bold">Move history</h2>
        {moveRows.length > 0 ? (
          <ol
            className="grid grid-cols-[2rem_1fr_1fr] gap-x-3 gap-y-1 text-sm"
            aria-label="Previous moves"
          >
            <li className="contents font-semibold text-gray-600">
              <span />
              <span>White</span>
              <span>Black</span>
            </li>
            {moveRows.map((move) => (
              <li className="contents" key={move.number}>
                <span className="text-gray-500">{move.number}.</span>
                <span>{move.white}</span>
                <span>{move.black ?? "..."}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-gray-600">No moves yet.</p>
        )}
      </section>

      <section className="flex flex-col justify-center items-center border-2 border-black rounded-xl p-4">
        <h1>Leaderboard</h1>
        <div className="flex flex-col gap-2">
          {leaderboard.map((leaderboardItem) => (
            <div  className="flex flex-row gap-10 border border-black px-4 py-2">
              <p>{leaderboardItem.username}</p>
              <p>{leaderboardItem.playersMoves}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChessEngineComponent;
