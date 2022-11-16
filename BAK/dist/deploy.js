import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import * as _config from './config';
// const fs = require('node:fs')
// const path = require('node:path')
import { SlashCommandBuilder } from '@discordjs/builders';
const config = _config.default;
const commands = [];
// Grab all the command files from the commands directory you created earlier
// const commandFiles = fs.readdirSync(path.resolve('/home/runner/ShadowBotAlpha/dist/commands')).filter((file: any) => file.endsWith('.js'));
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
// Create a slash command builder
const pingCommand = new SlashCommandBuilder().setName('ping').setDescription('Check if this interaction is responsive');
// Get the raw data that can be sent to Discord
commands.push(pingCommand.toJSON());
// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(config?.token ?? '');
// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(Routes.applicationGuildCommands(config.clientId.toString(), config.guildId.toString()), { body: commands });
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
//# sourceMappingURL=deploy.js.map