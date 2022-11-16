import { Duration } from 'luxon'; // TODO: Missing types
export class FormatUtils {
    static roleMention(guild, discordId) {
        if (discordId === '@here') {
            return discordId;
        }
        if (discordId === guild.id) {
            return '@everyone';
        }
        return `<@&${discordId}>`;
    }
    static channelMention(discordId) {
        return `<#${discordId}>`;
    }
    static userMention(discordId) {
        return `<@!${discordId}>`;
    }
    // TODO: Replace with ApplicationCommand#toString() once discord.js #8818 is merged
    // https://github.com/discordjs/discord.js/pull/8818
    static commandMention(command, subParts = []) {
        let name = [command.name, ...subParts].join(' ');
        return `</${name}:${command.id}>`;
    }
    static duration(milliseconds, langCode) {
        return Duration.fromObject(Object.fromEntries(Object.entries(Duration.fromMillis(milliseconds, { locale: langCode })
            .shiftTo('year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second')
            .toObject()).filter(([_, value]) => !!value) // Remove units that are 0
        )).toHuman({ maximumFractionDigits: 0 });
    }
}
//# sourceMappingURL=format-utils.js.map