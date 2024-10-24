import { InteractionEnum } from "../types/enums";

export function generateWsServerResponce(type: InteractionEnum, data: string) {
    return JSON.stringify({type, data, id: 0})
}
