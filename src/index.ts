import discord, { ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from 'discord.js';
import Logger from './classes/Logger';
import { ClientCommandHandler, IClientOptions } from './typings/ClientOptions';
import glob from 'glob';
import { promisify } from 'util';
import utils from './utils';
import { Command as c } from './typings/Command';

const globsify = promisify(glob);

let logger = new Logger("[DJS]");

class ExtendedClient extends discord.Client {
  private clientOptions: IClientOptions;
  private commands: Collection<String, c> = new Collection();
  constructor(options: IClientOptions) {
    super({intents: options.intents});
    this.clientOptions = options;
    
  }

  connect = async () => {
    if(this.clientOptions?.eventsPath) this.loadEvents(this.clientOptions.eventsPath);
    if(this.clientOptions?.commandPath) {
      const commands: ApplicationCommandDataResolvable[] = [];
      const url = this.clientOptions.commandPath.endsWith("/") ? this.clientOptions.commandPath + "*/*{.ts,.js}" : this.clientOptions.commandPath + "/*/*{.ts,.js}";
      (await globsify(url)).forEach(async file => {
        const command: c = await utils.importFile(file);
        if(!command.name) return logger.error("Missed name argument in command: " + file);
        this.commands.set(command.name, command);
        commands.push(command);
      })


      this.on("ready", () => {
        if(this.clientOptions?.guildIds && this.clientOptions.guildIds.length > 0){
          this.clientOptions?.guildIds.forEach(guildId => {
            this.loadApplicationCommands({
              commands,
              guildId
            })
          })
        } else {
          this.loadApplicationCommands({commands});
        }
      })
    }
    this.login(this.clientOptions.token).catch(() => {
      logger.error("Invalid Token!");
    });
  }

  private loadApplicationCommands = ({commands, guildId}: ClientCommandHandler) => {

    if(!guildId){
      this.application?.commands.set(commands);
    } else {
      this.guilds.cache.get(guildId)?.commands.set(commands);
    }
  }

  private loadEvents = async (eventPath: string) => {
    const url = eventPath.endsWith("/") ? eventPath + "*{.ts,.js}" : eventPath + "/*{.ts,.js}";
    (await globsify(url)).forEach(async file => {
      const event: Event <keyof ClientEvents> = await utils.importFile(file);
      if(!event.name) logger.error("Invalid Event: " + file);
      else {
        logger.success("Loaded event: " + event.name);
        this.on(event.name, event.callback);
      }
    })
  }

}

class Event <Key extends keyof ClientEvents> {
    constructor(public name: Key, public callback: (...args: ClientEvents[Key]) => any){}
}

class Command {
  constructor(options: c) {
    Object.assign(this, options);
  }
}

export { ExtendedClient, Event, Command };