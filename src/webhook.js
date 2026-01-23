const MAX_LENGTH = 2000;

async function sendToDiscord(message) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("DISCORD_WEBHOOK_URL manquante.");
  }

  const text = String(message);
  for (let i = 0; i < text.length; i += MAX_LENGTH) {
    const chunk = text.slice(i, i + MAX_LENGTH);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: chunk }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
  }
}

module.exports = { sendToDiscord };
