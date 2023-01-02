import { debug, setFailed, getInput, info, } from '@actions/core'
import { WebhookClient, Embed } from '@guildedjs/webhook-client';
import { getEnv } from './env';

async function main(): Promise<void> {
  const webhookUrl = getEnv("WEBHOOK_URL");
  const webhookUsername = getEnv("WEBHOOK_USERNAME");
  const webhookAvatar = getEnv("WEBHOOK_AVATAR");

  if (!webhookUrl) {
    debug(`Webhook URL ${webhookUrl}`);
    return setFailed("Missing webhook URL environment variable.");
  }

  const webhook = new WebhookClient(webhookUrl);
  const content = getInput("content");
  const title = getInput("title");
  const description = getInput("description");
  const color = getInput("color");
  const footer = getInput("footer");
  const author_name = getInput("author_name");
  const author_icon = getInput("author_icon");

  if (!content && !title && description) return setFailed("Missing both text content and embed content to send to webhook.");

  try {
    debug("Sending webhook message...");
    const message = await webhook.send(
      {
        content,
        embeds: title || description ? [
          new Embed()
            .setAuthor(author_name, author_icon)
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setFooter(footer)
            .toJSON()
        ] : undefined,
        avatar_url: webhookAvatar ?? undefined,
        username: webhookUsername ?? undefined
      }
    )
    info(`Webhook message sent, ID ${message.id}`)
  } catch (error) {
    return setFailed(error as Error);
  }
}

void main();
