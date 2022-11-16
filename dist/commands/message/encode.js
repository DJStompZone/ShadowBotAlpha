import { RateLimiter } from 'discord.js-rate-limiter';
import { InteractionUtils, Coder } from '../../utils/index.js';
import { CommandDeferType } from '../index.js';
export class Encode {
    constructor() {
        this.names = ["ShadowEncode"];
        this.cooldown = new RateLimiter(1, 5000);
        this.deferType = CommandDeferType.PUBLIC;
        this.requireClientPerms = [];
    }
    async execute(intr, data) {
        let msg = intr.targetMessage.content;
        console.log(msg);
        if (msg.length === 0) {
            await intr.channel.send(`${intr.user.username}, there's no message to encode.`);
        }
        else {
            const msgPermute = Coder.encodeBeta(msg);
            console.log(msgPermute);
            if (msgPermute === undefined || (msgPermute?.length ?? 0) === 0) {
                await intr.targetMessage.channel.send(`Sorry ${intr.user.username}, the message could not be encoded. Check the logs for details.`);
            }
            else {
                let output = `${intr.user.username}, the message was encoded successfully`;
                await InteractionUtils.send(intr, output);
                await InteractionUtils.editReply(intr, output + '\n```' + (msgPermute ?? "error") + '```');
            }
        }
    }
}
//# sourceMappingURL=encode.js.map