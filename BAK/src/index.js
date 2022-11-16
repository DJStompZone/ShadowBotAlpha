import { Client } from 'discord.js';
import config from './config';
import helpCommand from './commands';
import './commands/ping';
// const wait = require('node:timers/promises').setTimeout;
const { intents, prefix, token } = config;
const client = new Client({
    intents,
    presence: {
        status: 'online',
        activities: [{
                name: `${prefix}help`,
                type: 'LISTENING',
            }]
    }
});
client.on('ready', () => {
    console.log(`Logged in as: ${client.user?.tag}`);
});
client.on('messageCreate', async (message) => {
    if (message.author.bot)
        return;
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(' ');
        const command = args.shift();
        switch (command) {
            case 'ping':
                const msg = await message.reply('Pinging...');
                await msg.edit(`Pong! The round trip took ${Date.now() - msg.createdTimestamp}ms.`);
                break;
            case 'say':
            case 'repeat':
                if (args.length > 0)
                    await message.channel.send(args.join(' '));
                else
                    await message.reply('You did not send a message to repeat, cancelling command.');
                break;
            case 'encode':
            case 'decode':
                if (args.length === 0) {
                    await message.channel.send("Can't encode/decode an empty message!");
                    break;
                }
                else {
                    const msg = await message.reply('Shad-Coding...');
                    await msg.edit(`Placeholder: This function is not yet implemented, check back later!`);
                    break;
                }
            case 'help':
                const embed = helpCommand(message);
                embed.setThumbnail(client.user.displayAvatarURL());
                await message.channel.send({ embeds: [embed] });
                break;
        }
    }
});
client.login(token);
//# sourceMappingURL=index.js.map