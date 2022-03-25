import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember, PermissionResolvable } from "discord.js";
import { ExtendedClient } from "..";
export interface NewInteraction extends CommandInteraction {
    member: GuildMember;
}
interface RunArgs {
    client: ExtendedClient;
    interface: NewInteraction;
    args: CommandInteractionOptionResolver;
}
declare type Run = (args: RunArgs) => any;
export declare type Command = {
    userPermissions?: PermissionResolvable[];
    callback: Run;
} & ChatInputApplicationCommandData;
export {};
