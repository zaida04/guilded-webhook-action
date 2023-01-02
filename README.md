# `guilded-webhook-action`

[![GitHub](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/guildedjs/guilded-webhook-action/blob/main/LICENSE)
[![CI workflows](https://github.com/guildedjs/guilded-webhook-action/actions/workflows/ci.yml/badge.svg)](https://github.com/guildedjs/guilded-webhook-action/actions/workflows/ci.yml)

Github Action for sending a message to a Guilded Webhook.

## Usage

```
name: Testing Webhook Sending
on: [push, pull_request]

jobs:
  webhook:
    name: Execute Webhook
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1

    - uses: guildedjs/guilded-webhook-action@v1
      env:
        WEBHOOK_URL: "https://media.guilded.gg/webhooks/XXXXXX/YYYYY"
        WEBHOOK_USERNAME: "Testing Webhook!"
        WEBHOOK_AVATAR: "https://picsum.photos/200"
      with:
        content: "Hello, how's it going?"
```

## Customization

**You must provide text content, or an embed with a title and description.**
### Args
| Name        	| Description                                                                 	|
|-------------	|-----------------------------------------------------------------------------	|
| content     	| Text content for the message.                                               	|
| title       	| Title for the embed sent with the message.                                   	|
| description 	| Description for the embed sent with the message.  	                          |
| color       	| Color for the embed sent with the message. 	                                  |
| footer      	| Footer for the embed sent with the message.                                 	|
| author_name 	| Author name for the embed sent with the message.                            	|
| author_icon 	| Author icon for the embed sent with the message.                             	|

### Env
| Name             	| Description                                                        	|
|------------------	|--------------------------------------------------------------------	|
| WEBHOOK_URL      	| Webhook URL                                                        	|
| WEBHOOK_USERNAME 	| Username that the webhook will have for the message sent           	|
| WEBHOOK_AVATAR   	| URL for the avatar that the webhook will have for the message sent 	|

## Contributing

1. Fork the repo
2. Create a branch with your changes
3. Create a pull request
4. Wait for it to be reviewed and potentially merged

## LICENSE

Licensed under the [MIT License](https://github.com/guildedjs/guilded-webhook-action/blob/main/LICENSE)
