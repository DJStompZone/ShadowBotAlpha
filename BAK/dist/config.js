import { Intents } from 'discord.js';
import * as cfg from './config.json';
export default {
    guildId: cfg.guildId,
    clientId: cfg.clientId,
    prefix: '!',
    token: process.env.DISCORD_TOKEN,
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
};
//# sourceMappingURL=config.js.map