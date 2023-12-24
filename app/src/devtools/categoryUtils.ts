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

export const getCategoryId = (category: EEventCategories) => {
    switch (category) {
        case EEventCategories.psychology: return 0
        case EEventCategories.finance: return 1
        case EEventCategories.health: return 2
        case EEventCategories.feed: return 3
        case EEventCategories.meditation: return 4
        case EEventCategories.all: return 5
        default: return 0
    }
}

export const getCategoryById = (id: number) => {
    switch (id) {
        case 0: return EEventCategories.psychology
        case 1: return EEventCategories.finance
        case 2: return EEventCategories.health
        case 3: return EEventCategories.feed
        case 4: return EEventCategories.meditation
        case 5: return EEventCategories.all
        default: EEventCategories.all
    }
}