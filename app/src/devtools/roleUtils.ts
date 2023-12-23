import { EUserRole } from "../models/EUserRole";

export const getRoleName = (role : EUserRole) => {
    switch (role) {
        case EUserRole.moderator: return "Модератор"
        case EUserRole.speaker: return "Лектор"
        case EUserRole.worker: return "Сотрудник"
        default: return ""
    }
}

export const getRole = (role: string) => {
    switch (role) {
        case "Модератор": return EUserRole.moderator
        case "Лектор": return EUserRole.speaker
        case "Сотрудник": return EUserRole.worker
        default: return EUserRole.none
    }
}