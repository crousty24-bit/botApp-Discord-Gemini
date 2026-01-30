import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js'; //allow to exist on servers, get slash cmd
import { askGemini } from './gemini.js';

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
    try {
      await interaction.deferReply(); // 3.4 Déférer la réponse pour éviter le timeout
      const answer = await askGemini(prompt); // 3.5 Call Gemini
      const MAX_LENGTH = 2000;
      const chunks = []; // 3.6 split answer in parts of < 2000 char
      for (let i = 0; i < answer.length; i += MAX_LENGTH){
        chunks.push(answer.slice(i, i + MAX_LENGTH));
      }
      await interaction.editReply(chunks[0]); // 3.7 Send first part generated text
      for (let i = 1; i < chunks.length; i++){
        await interaction.followUp(chunks[i]); // 3.8 Send next parts generated text
      }
    } catch (err) {
      console.error(err);
      await interaction.editReply(
        '❌ Une erreur est survenue lors de la génération de la réponse.'
      );
    }
  }
});

// 4. Connexion du bot
client.login(process.env.DISCORD_BOT_TOKEN);