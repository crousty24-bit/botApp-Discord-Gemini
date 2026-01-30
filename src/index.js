import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js'; //allow to exist on servers, get slash cmd

// 1. Création du client Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// 2. Confirmation de connexion
client.once('ready', () => {
  console.log(`🤖 Bot connecté en tant que ${client.user.tag}`);
});

// 3. Écoute des interactions
client.on('interactionCreate', async (interaction) => {
  // 3.1 Vérifier que c’est une slash command
  if (!interaction.isChatInputCommand()) return;

  // 3.2 Vérifier le nom de la commande
  if (interaction.commandName === 'ask') {
    // 3.3 Récupérer l’option "prompt"
    const prompt = interaction.options.getString('prompt');

    // 3.4 Répondre (test)
    await interaction.reply({
      content: `🧪 Reçu : "${prompt}"`,
    });
  }
});

// 4. Connexion du bot
client.login(process.env.DISCORD_BOT_TOKEN);