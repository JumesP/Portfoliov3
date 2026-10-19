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

export type { ChessRating, ChessStats, ChessGame, ChessPlayer, ChessGamesResponse, ChessArchivesResponse, LichessStats, LichessPerformance, LichessCount, RapidHistoryEntry };
