import { Intents } from "discord.js";



type filePath  = string;

export interface IClientOptions {
  token: string;
  commandPath?: filePath;
  eventsPath?: filePath;
  intents: Intents | number;
  guildId?: string;
}