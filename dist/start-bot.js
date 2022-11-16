import { REST } from '@discordjs/rest';
import { Options, Partials } from 'discord.js';
import { createRequire } from 'node:module';
import { HelpCommand, InfoCommand, TestCommand } from './commands/chat/index.js';
import { ChatCommandMetadata, MessageCommandMetadata, UserCommandMetadata, } from './commands/index.js';
import { ViewDateSent, Encode, Decode } from './commands/message/index.js';
import { ViewDateJoined } from './commands/user/index.js';
import { ButtonHandler, CommandHandler, GuildJoinHandler, GuildLeaveHandler, MessageHandler, ReactionHandler, TriggerHandler, } from './events/index.js';
import { CustomClient } from './extensions/index.js';
import { Bot } from './models/bot.js';
import { CommandRegistrationService, EventDataService, JobService, Logger, } from './services/index.js';
const require = createRequire(import.meta.url);
let Config = require('../config/config.json');
let Logs = require('../lang/logs.json');
Config.client.token = process.env['DISCORD_TOKEN'];
const discordtoken = process.env['DISCORD_TOKEN'];
async function start() {
    // Services
    let eventDataService = new EventDataService();
    // Client
    let client = new CustomClient({
        intents: Config.client.intents,
        partials: Config.client.partials.map(partial => Partials[partial]),
        makeCache: Options.cacheWithLimits({
            // Keep default caching behavior
            ...Options.DefaultMakeCacheSettings,
            // Override specific options from config
            ...Config.client.caches,
        }),
    });
    // Commands
    let commands = [
        // Chat Commands
        new HelpCommand(),
        new InfoCommand(),
        new TestCommand(),
        // Message Context Commands
        new ViewDateSent(),
        new Encode(),
        new Decode(),
        // User Context Commands
        new ViewDateJoined(),
        // TODO: Add new commands here
    ];
    // Buttons
    let buttons = [
    // TODO: Add new buttons here
    ];
    // Reactions
    let reactions = [
    // TODO: Add new reactions here
    ];
    // Triggers
    let triggers = [
    // TODO: Add new triggers here
    ];
    // Event handlers
    let guildJoinHandler = new GuildJoinHandler(eventDataService);
    let guildLeaveHandler = new GuildLeaveHandler();
    let commandHandler = new CommandHandler(commands, eventDataService);
    let buttonHandler = new ButtonHandler(buttons, eventDataService);
    let triggerHandler = new TriggerHandler(triggers, eventDataService);
    let messageHandler = new MessageHandler(triggerHandler);
    let reactionHandler = new ReactionHandler(reactions, eventDataService);
    // Jobs
    let jobs = [
    // TODO: Add new jobs here
    ];
    // Bot
    let bot = new Bot(discordtoken, client, guildJoinHandler, guildLeaveHandler, messageHandler, commandHandler, buttonHandler, reactionHandler, new JobService(jobs));
    let rest = new REST({ version: '10' }).setToken(discordtoken);
    console.log('discordtoken', typeof discordtoken, `${discordtoken}`.slice(0, 8));
    // Register
    if (process.argv[2] == 'commands') {
        try {
            let commandRegistrationService = new CommandRegistrationService(rest);
            let localCmds = [
                ...Object.values(ChatCommandMetadata).sort((a, b) => (a.name > b.name ? 1 : -1)),
                ...Object.values(MessageCommandMetadata).sort((a, b) => (a.name > b.name ? 1 : -1)),
                ...Object.values(UserCommandMetadata).sort((a, b) => (a.name > b.name ? 1 : -1)),
            ];
            await commandRegistrationService.process(localCmds, process.argv);
        }
        catch (error) {
            Logger.error(Logs.error.commandAction, error);
        }
        process.exit();
    }
    await bot.start();
}
process.on('unhandledRejection', (reason, _promise) => {
    Logger.error(Logs.error.unhandledRejection, reason);
});
start().catch(error => {
    Logger.error(Logs.error.unspecified, error);
});
//# sourceMappingURL=start-bot.js.map