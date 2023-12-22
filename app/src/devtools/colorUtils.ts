import { EEventCategories } from "../models/EEventCategories"

export const getColor = (category : EEventCategories) => {
    switch (category) {
        case EEventCategories.psychology: return "#FFD4A8"
        case EEventCategories.finance: return "#FF6A6A"
        case EEventCategories.health: return "#9DE3F9"
        case EEventCategories.feed: return "#88FFBF"
        case EEventCategories.meditation: return "#BA9DF9"
        default: return "#1E1E1E"
    }
}

export const evaluatePerformance = (value: number) => {
    if (value >= 0 && value < 60) {
        return "#FF6A6A";
    } else if (value >= 60 && value < 80) {
        return "#F9E07C";
    } else if (value >= 80 && value <= 100) {
        return "#7CF981";
    }
}
