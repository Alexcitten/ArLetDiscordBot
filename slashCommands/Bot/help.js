const {ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle} = require('discord.js')

module.exports = {
    name: "help",
    usage: '/help',
    category: "Bot",
    description: "List commands",
    ownerOnly: false,
    run: async (client, interaction, args) => {

        const embed = new EmbedBuilder()
        .setTitle(`Commands`)
        .addFields([
            {name: `<:donate:976853323342815262>  Wallet`, value: `❯ /createwallet - **Create AR wallet**\n ❯ /balance <AR 43-symbol wallet address> - **Check balance**\n ❯ /arsend <AR 43-symbol wallet address>, <quantity AR>, <JSON Key File AR wallet> - **Send AR**\n ❯ /ardrivesend <AR 43-symbol wallet address>, <quantity ANO>, <JSON Key File AR wallet> - **Send smart-token ArDrive**`},
            {name: `<:addbot:976851455355015178>  Other`, value: `❯ /help - **List commands**\n ❯ /botinfo - **About the bot**\n ❯ /invite - **Useful links**\n ❯ /arweave - **About Arweave**`}
        ])
        .setColor('#FF8747')
        .setFooter({
            text: 'ArLet v2',
            iconURL: 'https://cdn.discordapp.com/emojis/712228732387196958.webp?size=240&quality=lossless'
        });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('RU')
                .setCustomId('helpmecap')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1006668429031379054')
            )

        await interaction.reply({ 
            embeds: [embed],
            ephemeral: true,
            components: [row]
        });
    },
};
