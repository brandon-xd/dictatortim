const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Don't do it."),
  async execute(interaction) {
    await interaction.reply("I hate Overwatch 2!");
  },
};
