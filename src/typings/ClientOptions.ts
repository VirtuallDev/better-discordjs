import { ApplicationCommandDataResolvable, Intents } from "discord.js";



type filePath  = string;

export interface IClientOptions {
  token: string;
  commandPath?: filePath;
  eventsPath?: filePath;
  intents: Intents | number;
  guildIds?: string[];
}

export type ClientCommandHandler = {
  guildId?: string;
  commands: ApplicationCommandDataResolvable[];
}