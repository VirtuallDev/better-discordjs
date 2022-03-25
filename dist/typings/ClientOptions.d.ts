import { ApplicationCommandDataResolvable, Intents } from "discord.js";
declare type filePath = string;
export interface IClientOptions {
    token: string;
    commandPath?: filePath;
    eventsPath?: filePath;
    intents: Intents | number;
    guildIds?: string[];
}
export declare type ClientCommandHandler = {
    guildId?: string;
    commands: ApplicationCommandDataResolvable[];
};
export {};
