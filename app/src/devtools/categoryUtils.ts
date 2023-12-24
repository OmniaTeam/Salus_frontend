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
        case EEventCategories.psychology: return 1
        case EEventCategories.finance: return 2
        case EEventCategories.health: return 3
        case EEventCategories.feed: return 4
        case EEventCategories.meditation: return 5
        case EEventCategories.all: return 6
        default: return 0
    }
}

export const getCategoryById = (id: number) => {
    switch (id) {
        case 1: return EEventCategories.psychology
        case 2: return EEventCategories.finance
        case 3: return EEventCategories.health
        case 4: return EEventCategories.feed
        case 5: return EEventCategories.meditation
        case 6: return EEventCategories.all
        default: EEventCategories.all
    }
}

export const getSpec = (category: EEventCategories) => {
    switch (category) {
        case EEventCategories.psychology: return "Психолог"
        case EEventCategories.finance: return "Финансист"
        case EEventCategories.health: return "Фитнес коуч"
        case EEventCategories.feed: return "Диетолог"
        case EEventCategories.meditation: return "Спец по медитациям"
        case EEventCategories.all: return "..."
        default: return 0
    }
}

