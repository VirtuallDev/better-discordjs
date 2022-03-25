import discord, { ClientEvents } from 'discord.js';
import { IClientOptions } from './typings/ClientOptions';
import { Command as c } from './typings/Command';
declare class ExtendedClient extends discord.Client {
    private clientOptions;
    private commands;
    constructor(options: IClientOptions);
    connect: () => Promise<void>;
    private loadApplicationCommands;
    private loadEvents;
}
declare class Event<Key extends keyof ClientEvents> {
    name: Key;
    callback: (...args: ClientEvents[Key]) => any;
    constructor(name: Key, callback: (...args: ClientEvents[Key]) => any);
}
declare class Command {
    constructor(options: c);
}
export { ExtendedClient, Event, Command };
