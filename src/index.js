require("dotenv").config();

const { askGemini } = require("./gemini");
const { sendToDiscord } = require("./webhook");

const prompt = process.argv.slice(2).join(" ").trim();

if (!prompt) {
  console.log("Usage: node src/index.js \"Ta question\"");
  process.exit(1);
}

async function run() {
  try {
    const answer = await askGemini(prompt);
    await sendToDiscord(answer);
    console.log("OK: message envoye dans Discord.");
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}

run();
