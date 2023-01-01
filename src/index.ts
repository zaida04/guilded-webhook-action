import { debug, setFailed, getInput } from '@actions/core'
import { WebhookClient } from '@guildedjs/webhook-client';
import { Embed } from '@guildedjs/webhook-client/types/Embed';
import { getEnv } from './env';

async function main(): Promise<void> {
  const webhookUrl = getEnv("WEBHOOK_URL");
  const username = getEnv("WEBHOOK_USERNAME");
  const avatarURL = getEnv("WEBHOOK_AVATAR");

  if (!webhookUrl) {
    debug(`Webhook URL ${webhookUrl}`);
    return setFailed("Missing webhook URL environment variable.");
  }

  const webhook = new WebhookClient(webhookUrl, username && avatarURL ? { avatarURL, username } : undefined);
  const content = getInput("content");
  const title = getInput("title");
  const description = getInput("description");
  const color = getInput("color");
  const footer = getInput("footer");
  const author_name = getInput("author_name");
  const author_icon = getInput("author_icon");

  try {
    debug("Sending webhook message...");
    const message = await webhook.send(
      content,
      [
        new Embed()
          .setAuthor(author_name, author_icon)
          .setTitle(title)
          .setDescription(description)
          .setColor(color)
          .setFooter(footer)
          .toJSON()
      ]
    )
    debug(`Webhook message sent, ID ${message.id}`)
  } catch (error) {
    return setFailed(error as Error);
  }
}

void main();
