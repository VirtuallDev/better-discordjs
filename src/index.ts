import discord, { Client, ClientEvents } from 'discord.js';
import Logger from './classes/Logger';
import { IClientOptions } from './typings/ClientOptions';
import glob from 'glob';
import { promisify } from 'util';
import utils from './utils';

const globsify = promisify(glob);

let logger = new Logger("[DJS]");

class ExtendedClient extends discord.Client {
  private clientOptions: IClientOptions;

  constructor(options: IClientOptions) {
    super({intents: options.intents});
    this.clientOptions = options;
    
  }

  connect = () => {
  
    this.login(this.clientOptions.token).catch(() => {
      logger.error("Invalid Token!");
    }).then(() => {
      if(this.clientOptions?.eventsPath) this.loadEvents(this.clientOptions.eventsPath);
    })
  }

  private loadApplicationCommands = (guildId?: string) => {

  }

  private loadEvents = async (eventPath: string) => {
    (await globsify(eventPath)).forEach(async file => {
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



export { ExtendedClient };