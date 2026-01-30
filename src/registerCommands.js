import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';

const commands = [
  new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Envoyer un prompt à Gemini')
    .addStringOption(option =>
      option
        .setName('prompt')
        .setDescription('Le prompt à envoyer à Gemini')
        .setRequired(true)
    )
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try {
    console.log('⏳ Enregistrement de la commande /ask...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_BOT_API_ID,
        process.env.SERVER_GUILD_ID
      ),
      { body: commands }
    );

    console.log('✅ Commande /ask enregistrée avec succès.');
  } catch (error) {
    console.error('❌ Erreur lors de l’enregistrement :', error);
  }
})();
