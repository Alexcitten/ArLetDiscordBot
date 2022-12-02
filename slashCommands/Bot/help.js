const {ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle} = require('discord.js')

module.exports = {
    name: "help",
    category: "Bot",
    description: "List commands",
    run: async (client, interaction, args) => {

        const embed = new EmbedBuilder()
        .setTitle(`Commands`)
        .addFields([
            {name: `<:wallet:1047085806696808538>  Wallet`, value: `❯ \`/createwallet\` - **Create AR wallet**\n ❯ \`/balance\` - **Check balance**\n ❯ \`/arsend\` - **Send AR**\n ❯ \`/ardrivesend\` - **Send smart-token ArDrive**`, inline: true},
            {name: `<:dac:1047085787864379392>  Other`, value: `❯ \`/help\` - **List commands**\n ❯ \`/botinfo\` - **About the bot**\n ❯ \`/invite\` - **Useful links**\n ❯ \`/arweave\` - **About Arweave**`, inline: true}
        ])
        .setColor('#FF8747')

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('UA')
                .setCustomId('helpmecap')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1047087115474841700'),

                new ButtonBuilder()
                .setLabel('Website')
                .setURL('https://arlet.tech')
                .setStyle(ButtonStyle.Link)
                .setEmoji('1047087115474841700'),

                new ButtonBuilder()
                .setLabel('Docs')
                .setURL('https://arlet.gitbook.io/docs/')
                .setStyle(ButtonStyle.Link)
                .setEmoji('1047087115474841700')
            )

        await interaction.reply({ 
            embeds: [embed],
            ephemeral: true,
            components: [row]
        });
    },
};

