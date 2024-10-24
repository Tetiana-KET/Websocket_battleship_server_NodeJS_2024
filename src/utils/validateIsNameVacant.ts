import { UserInterface } from "../types/interfaces";

export function validateIsNameVacant(users: UserInterface[], name: string): boolean {
    return users.findIndex((user) => user.name === name) < 0;
}