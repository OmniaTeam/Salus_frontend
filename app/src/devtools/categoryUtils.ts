import { EEventCategories } from "../models/EEventCategories";

export const getCategoryName = (category: EEventCategories) => {
    switch (category) {
        case EEventCategories.psychology: return "Психология"
        case EEventCategories.finance: return "Финансы"
        case EEventCategories.health: return "Здоровье"
        case EEventCategories.feed: return "Питание"
        case EEventCategories.meditation: return "Медитации"
        case EEventCategories.all: return "Все категории"
        default: return "Все категории"
    }
}