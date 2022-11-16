import { MessageContextMenuCommandInteraction, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter'
import { EventData } from '../../models/internal-models.js';
import { InteractionUtils, Coder } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

export class Decode implements Command {
  public names = ["ShadowDecode"];
  public cooldown = new RateLimiter(1, 5000);
  public deferType = CommandDeferType.PUBLIC;
  public requireClientPerms: PermissionsString[] = [];

  public async execute(
    intr: MessageContextMenuCommandInteraction,
    data: EventData
  ): Promise<void> {
    let msg = intr.targetMessage.content;
    console.log(msg)
    if (msg.length === 0) {
      await intr.channel.send(`${intr.user.username}, there's no message to decode.`)
    } else {
      const msgPermute = Coder.decodeBeta(msg);
      console.log(msgPermute)
      if (msgPermute === undefined || (msgPermute?.length ?? 0) === 0) {
        await intr.targetMessage.channel.send(`Sorry ${intr.user.username}, the message could not be decoded. Check the logs for details.`)
      } else {
        let output = `${intr.user.username}, the message was decoded successfully`
        await InteractionUtils.send(intr, output)
        await InteractionUtils.editReply(intr, output + '\n```' + (msgPermute ?? "error") + '```')
      }
    }
  }
}

