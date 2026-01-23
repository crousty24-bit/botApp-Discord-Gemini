# DiscordBot-Gemini-Webhook

A command-line Discord bot that leverages Google's Gemini AI to generate intelligent responses and automatically post them to Discord via webhooks.

## Overview

This bot integrates Google's Gemini 2.5 Flash language model with Discord, enabling seamless AI-powered message generation and delivery. It processes text prompts through the Gemini API and sends responses directly to Discord channels using webhook URLs.

## Features

- AI-powered responses using Google Gemini 2.5 Flash
- Direct Discord webhook integration for message delivery
- Automatic message chunking to handle Discord's 2000 character limit
- Command-line interface for prompt input
- Error handling and validation for API keys
- Environment variable configuration for security

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Google Gemini API key
- Discord webhook URL

## Installation

1. Clone the repository:
```bash
git clone https://github.com/crousty24-bit/DiscordBot-Gemini-Webhook.git
cd DiscordBot-Gemini-Webhook
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```
GEMINI_API_KEY=your_gemini_api_key_here
DISCORD_WEBHOOK_URL=your_discord_webhook_url_here
```

## Configuration

### Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)
  - Obtain from [Google AI Studio](https://aistudio.google.com/app/apikey)
  
- `DISCORD_WEBHOOK_URL`: Your Discord webhook URL (required)
  - Create a webhook in Discord server settings under Integrations

## Usage

Run the bot with a text prompt:

```bash
node src/index.js "Your question or prompt here"
```

### Example

```bash
node src/index.js "What is the capital of France?"
```

The bot will:
1. Send your prompt to the Gemini API
2. Receive the AI-generated response
3. Post the response to your Discord channel via webhook
4. Display confirmation in the terminal

## Project Structure

```
src/
  ├── index.js      - Main entry point and CLI handler
  ├── gemini.js     - Gemini API integration
  └── webhook.js    - Discord webhook communication
```

## API Details

### Gemini API

- **Endpoint**: Google Generative Language API (v1beta)
- **Model**: gemini-2.5-flash
- **Method**: POST with JSON payload

### Discord Webhook

- **Message Chunking**: Responses exceeding 2000 characters are automatically split into multiple messages
- **Format**: JSON payload with message content

## Error Handling

The bot provides clear error messages for common issues:

- Missing API keys
- Invalid API responses
- Discord webhook failures
- Malformed responses from Gemini

## Dependencies

- **dotenv**: ^17.2.3 - Environment variable management

## License

ISC

## Repository

[GitHub - DiscordBot-Gemini-Webhook](https://github.com/crousty24-bit/DiscordBot-Gemini-Webhook)

## Support

For issues and feature requests, visit the [GitHub Issues](https://github.com/crousty24-bit/DiscordBot-Gemini-Webhook/issues) page.