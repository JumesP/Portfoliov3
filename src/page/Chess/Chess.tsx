"use client"
import react, {useState, useEffect } from 'react';

interface ChessRating {
    rating: number;
    rd?: number;
    prog?: number;
}

interface ChessStats {
    chess_daily?: {
        last?: ChessRating;
        best?: ChessRating;
    };
    chess_rapid?: {
        last?: ChessRating;
        best?: ChessRating;
    };
    tactics?: {
        highest?: ChessRating;
    };
}

interface ChessPlayer {
    username: string;
    rating: number;
    result: string;
}

interface ChessGame {
    end_time: number;
    url: string;
    time_class: string;
    white: ChessPlayer;
    black: ChessPlayer;
}

interface ChessGamesResponse {
    games: ChessGame[];
}

interface ChessArchivesResponse {
    archives: string[];
}

interface LichessPerformance {
    games: number;
    rating: number;
    rd?: number;
    prog?: number;
}

interface LichessCount {
    all?: number;
    win?: number;
    loss?: number;
    draw?: number;
}

interface LichessStats {
    username: string;
    count?: LichessCount;
    perfs: {
        bullet: LichessPerformance;
        blitz: LichessPerformance;
        rapid: LichessPerformance;
        classical: LichessPerformance;
        puzzle: LichessPerformance;
    };
}

interface RapidHistoryEntry {
    date: string;
    rating: number;
    year: number;
    month: number;
}

const Chess = () => {
    const [currentPage, setCurrentPage] = useState<"chesscom" | "lichess">("chesscom");
    const [loading, setLoading] = useState<boolean>(true);
    const [chessComStats, setChessComStats] = useState<ChessStats | null>(null);
    const [lichessStats, setLichessStats] = useState<LichessStats | null>(null);
    const [chessComGames, setChessComGames] = useState<ChessGame[]>([]);

    useEffect(() => {
        const fetchChessComData = async () => {
            try {
                const username = "proce1";
                const statsUrl = `https://api.chess.com/pub/player/${username}/stats`;
                const res = await fetch(statsUrl);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data: ChessStats = await res.json();
                setChessComStats(data);
            } catch (err) {
                console.error("Failed to fetch Chess.com data:", err);
                setChessComStats(null);
            }
        };

        const fetchLichessData = async () => {
            try {
                const username = "JumesP";
                const res = await fetch(`https://lichess.org/api/user/${username}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data: LichessStats = await res.json();
                setLichessStats(data);
            } catch (err) {
                console.error("Failed to fetch Lichess data:", err);
                setLichessStats(null);
            }
        };

        let mounted = true;
        (async () => {
            setLoading(true);
            await Promise.all([fetchChessComData(), fetchLichessData()]);
            if (mounted) setLoading(false);
        })();

        return () => {
            mounted = false;
        };
    }, []);

    // useEffect(() => {
    //     const fetchRapidHistory = async () => {
    //         if (!chessComStats) return;
    //
    //         try {
    //             const username = "proce1";
    //             const rapidUrl = `https://api.chess.com/pub/player/${username}/rating/history/rapid`;
    //             const rapidRes = await fetch(rapidUrl);
    //             if (!rapidRes.ok) throw new Error(`HTTP ${rapidRes.status}`);
    //             const rapidData = await rapidRes.json();
    //
    //             // Transform the data for the chart
    //             const chartData = rapidData.map((entry) => ({
    //                 date: `${entry.month}/${entry.year}`,
    //                 rating: entry.rating,
    //                 year: entry.year,
    //                 month: entry.month,
    //             }));
    //             setRapidHistory(chartData);
    //         } catch (err) {
    //             console.error("Failed to fetch rapid history:", err);
    //         }
    //     };
    //
    //     fetchRapidHistory();
    // }, [chessComStats]);

    useEffect(() => {
        const fetchChessComGames = async () => {
            try {
                const username = "proce1";
                const archiveUrl = `https://api.chess.com/pub/player/${username}/games/archives`;

                // Fetch archives list
                const archiveRes = await fetch(archiveUrl);
                if (!archiveRes.ok) throw new Error(`HTTP ${archiveRes.status}`);
                const archiveData: ChessArchivesResponse = await archiveRes.json();

                if (archiveData.archives.length > 0) {
                    const latestArchive =
                        archiveData.archives[archiveData.archives.length - 1];

                    const gamesRes = await fetch(latestArchive);

                    if (!gamesRes.ok) {
                        throw new Error(`HTTP ${gamesRes.status}`);
                    }

                    const gamesData: ChessGamesResponse = await gamesRes.json();

                    const sortedGames = [...gamesData.games]
                        .sort((a, b) => b.end_time - a.end_time)
                        .slice(0, 10);

                    setChessComGames(sortedGames);
                }
            } catch (err) {
                console.error("Failed to fetch Chess.com games:", err);
            }
        };

        fetchChessComGames();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="MainContent">
            <div className="Content">
                <div className="pl-72">
                    <h1 className="text-2xl font-semibold">Chess!</h1>
                    <p>In my free time, I love learning how to play Chess!</p>
                    <p>I like how every move is 100% skill and 0% luck based</p>
                    <p>so if im doing bad, its because im bad</p>
                </div>

                <div className="w-full max-w-6xl mx-auto px-4 py-8">
                    {/* Page navigation */}
                    <div className="flex justify-center gap-2 mb-8">
                        <button
                            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                                currentPage === "chesscom"
                                    ? "bg-white text-black shadow-lg"
                                    : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                            onClick={() => setCurrentPage("chesscom")}
                        >
                            ♟️ Chess.com
                        </button>

                        <button
                            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                                currentPage === "lichess"
                                    ? "bg-white text-black shadow-lg"
                                    : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                            onClick={() => setCurrentPage("lichess")}
                        >
                            ☁️ Lichess
                        </button>
                    </div>

                    {/* Chess.com */}
                    {currentPage === "chesscom" && (
                        <div className="space-y-10">
                            <h2 className="text-3xl font-semibold text-white">
                                Chess.com Stats
                            </h2>

                            {chessComStats ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Daily */}
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-semibold text-white">
                                                Daily
                                            </h3>
                                            <span className="text-2xl">📅</span>
                                        </div>

                                        <div className="space-y-5">
                                            <div>
                                                <h4 className="text-sm text-white/60">
                                                    Last Rating
                                                </h4>
                                                <p className="mt-1 text-3xl font-bold text-white">
                                                    {chessComStats.chess_daily?.last?.rating ?? "N/A"}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-sm text-white/60">
                                                    Best Rating
                                                </h4>
                                                <p className="mt-1 text-2xl font-semibold text-white/80">
                                                    {chessComStats.chess_daily?.best?.rating ?? "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rapid */}
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-semibold text-white">
                                                Rapid
                                            </h3>
                                            <span className="text-2xl">⚡</span>
                                        </div>

                                        <div className="space-y-5">
                                            <div>
                                                <h4 className="text-sm text-white/60">
                                                    Last Rating
                                                </h4>
                                                <p className="mt-1 text-3xl font-bold text-white">
                                                    {chessComStats.chess_rapid?.last?.rating ?? "N/A"}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-sm text-white/60">
                                                    Best Rating
                                                </h4>
                                                <p className="mt-1 text-2xl font-semibold text-white/80">
                                                    {chessComStats.chess_rapid?.best?.rating ?? "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Puzzle */}
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-semibold text-white">
                                                Puzzle
                                            </h3>
                                            <span className="text-2xl">🧩</span>
                                        </div>

                                        <div>
                                            <h4 className="text-sm text-white/60">
                                                Highest Rating
                                            </h4>
                                            <p className="mt-1 text-3xl font-bold text-white">
                                                {chessComStats.tactics?.highest?.rating ?? "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-white/60">
                                    Failed to load Chess.com stats
                                </p>
                            )}

                            {/* Recent games */}
                            <div className="space-y-5">
                                <h2 className="text-3xl font-semibold text-white">
                                    Recent Games
                                </h2>

                                {chessComGames.length > 0 ? (
                                    <div className="space-y-3">
                                        {chessComGames.map((game: ChessGame, index: number) => {
                                            const playerColor =
                                                game.white.username.toLowerCase() === "proce1"
                                                    ? "white"
                                                    : "black";

                                            const opponent =
                                                playerColor === "white"
                                                    ? game.black
                                                    : game.white;

                                            const result =
                                                game.white.result === "win" &&
                                                playerColor === "white"
                                                    ? "win"
                                                    : game.black.result === "win" &&
                                                    playerColor === "black"
                                                        ? "win"
                                                        : game.white.result === "timeout" ||
                                                        game.black.result === "timeout"
                                                            ? game.white.result === "timeout" &&
                                                            playerColor === "white"
                                                                ? "loss"
                                                                : game.black.result === "timeout" &&
                                                                playerColor === "black"
                                                                    ? "loss"
                                                                    : "draw"
                                                            : "draw";

                                            const resultEmoji =
                                                result === "win"
                                                    ? "✅"
                                                    : result === "loss"
                                                        ? "❌"
                                                        : "🤝";

                                            const gameDate = new Date(
                                                game.end_time * 1000
                                            ).toLocaleDateString();

                                            return (
                                                <a
                                                    key={index}
                                                    href={game.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`
                                        flex items-center gap-4
                                        rounded-xl
                                        border border-white/10
                                        bg-white/5
                                        p-4
                                        transition-all duration-300
                                        hover:-translate-y-0.5
                                        hover:bg-white/10
                                        hover:border-white/20
                                        ${result === "win" ? "hover:border-green-400/40" : ""}
                                        ${result === "loss" ? "hover:border-red-400/40" : ""}
                                    `}
                                                >
                                                    {/* Result */}
                                                    <div className="flex flex-col items-center min-w-[70px]">
                                        <span className="text-xl">
                                            {resultEmoji}
                                        </span>

                                                        <span className="text-xs font-bold tracking-wide text-white/70">
                                            {result.toUpperCase()}
                                        </span>
                                                    </div>

                                                    {/* Game information */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                            <span className="truncate font-medium text-white">
                                                vs {opponent.username}
                                            </span>

                                                            <span className="text-sm text-white/50">
                                                ({opponent.rating})
                                            </span>
                                                        </div>

                                                        <div className="mt-1 flex gap-3 text-sm text-white/50">
                                            <span>
                                                {game.time_class}
                                            </span>

                                                            <span>
                                                {gameDate}
                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Arrow */}
                                                    <div className="text-2xl text-white/40 transition-transform duration-300 group-hover:translate-x-1">
                                                        →
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-white/60">
                                        Loading recent games...
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Lichess */}
                    {currentPage === "lichess" && (
                        <div className="space-y-10">
                            <h2 className="text-3xl font-semibold text-white">
                                Lichess Stats
                            </h2>

                            {lichessStats ? (
                                <div className="space-y-8">
                                    {/* Overview */}
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                        <h3 className="mb-6 text-xl font-semibold text-white">
                                            Profile: {lichessStats.username}
                                        </h3>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="rounded-xl bg-white/5 p-4">
                                <span className="block text-sm text-white/50">
                                    Total Games
                                </span>

                                                <span className="mt-1 block text-2xl font-bold text-white">
                                    {lichessStats.count?.all ?? 0}
                                </span>
                                            </div>

                                            <div className="rounded-xl bg-white/5 p-4">
                                <span className="block text-sm text-white/50">
                                    Wins
                                </span>

                                                <span className="mt-1 block text-2xl font-bold text-green-400">
                                    {lichessStats.count?.win ?? 0}
                                </span>
                                            </div>

                                            <div className="rounded-xl bg-white/5 p-4">
                                <span className="block text-sm text-white/50">
                                    Losses
                                </span>

                                                <span className="mt-1 block text-2xl font-bold text-red-400">
                                    {lichessStats.count?.loss ?? 0}
                                </span>
                                            </div>

                                            <div className="rounded-xl bg-white/5 p-4">
                                <span className="block text-sm text-white/50">
                                    Draws
                                </span>

                                                <span className="mt-1 block text-2xl font-bold text-yellow-400">
                                    {lichessStats.count?.draw ?? 0}
                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Lichess rating cards */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {lichessStats.perfs?.bullet?.games > 0 && (
                                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                                <div className="flex items-center justify-between mb-6">
                                                    <h3 className="text-xl font-semibold text-white">
                                                        Bullet
                                                    </h3>
                                                    <span className="text-2xl">🚀</span>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="text-sm text-white/60">
                                                            Rating
                                                        </h4>
                                                        <p className="mt-1 text-3xl font-bold text-white">
                                                            {lichessStats.perfs.bullet.rating}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm text-white/60">
                                                            Games
                                                        </h4>
                                                        <p className="mt-1 text-2xl font-semibold text-white/80">
                                                            {lichessStats.perfs.bullet.games}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {lichessStats.perfs?.blitz?.games > 0 && (
                                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                                <div className="flex items-center justify-between mb-6">
                                                    <h3 className="text-xl font-semibold text-white">
                                                        Blitz
                                                    </h3>
                                                    <span className="text-2xl">⚡</span>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="text-sm text-white/60">
                                                            Rating
                                                        </h4>
                                                        <p className="mt-1 text-3xl font-bold text-white">
                                                            {lichessStats.perfs.blitz.rating}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm text-white/60">
                                                            Games
                                                        </h4>
                                                        <p className="mt-1 text-2xl font-semibold text-white/80">
                                                            {lichessStats.perfs.blitz.games}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Rapid */}
                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-xl font-semibold text-white">
                                                    Rapid
                                                </h3>
                                                <span className="text-2xl">🏃</span>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-sm text-white/60">
                                                        Rating
                                                    </h4>
                                                    <p className="mt-1 text-3xl font-bold text-white">
                                                        {lichessStats.perfs?.rapid?.rating ?? "N/A"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h4 className="text-sm text-white/60">
                                                        Games
                                                    </h4>
                                                    <p className="mt-1 text-2xl font-semibold text-white/80">
                                                        {lichessStats.perfs?.rapid?.games ?? 0}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Classical */}
                                        {lichessStats.perfs?.classical?.games > 0 && (
                                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                                <div className="flex items-center justify-between mb-6">
                                                    <h3 className="text-xl font-semibold text-white">
                                                        Classical
                                                    </h3>
                                                    <span className="text-2xl">🎓</span>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="text-sm text-white/60">
                                                            Rating
                                                        </h4>
                                                        <p className="mt-1 text-3xl font-bold text-white">
                                                            {lichessStats.perfs.classical.rating}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm text-white/60">
                                                            Games
                                                        </h4>
                                                        <p className="mt-1 text-2xl font-semibold text-white/80">
                                                            {lichessStats.perfs.classical.games}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Puzzle */}
                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-xl font-semibold text-white">
                                                    Puzzle
                                                </h3>
                                                <span className="text-2xl">🧩</span>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-sm text-white/60">
                                                        Rating
                                                    </h4>
                                                    <p className="mt-1 text-3xl font-bold text-white">
                                                        {lichessStats.perfs?.puzzle?.rating ?? "N/A"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h4 className="text-sm text-white/60">
                                                        Games
                                                    </h4>
                                                    <p className="mt-1 text-2xl font-semibold text-white">
                                                        {lichessStats.perfs?.puzzle?.games ?? 0}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-white/60">
                                    Failed to load Lichess stats
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Chess;