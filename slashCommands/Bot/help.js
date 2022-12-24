const {ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle} = require('discord.js')

module.exports = {
    name: "help",
    category: "Bot",
    description: "List commands",
    run(client, interaction, args) {

        const embed = new EmbedBuilder()
        .setTitle(`Commands`)
        .addFields([
            {name: `<:wallet:1047085806696808538>  Arweave`, value: `❯ \`/createwallet\` - **Create AR wallet**\n ❯ \`/balance\` - **Check balance**\n ❯ \`/arsend\` - **Send AR**\n ❯ \`/ardrivesend\` - **Send smart-token ArDrive**\n\`/uploaddata\` - **Upload data to main network Arweave**\n \`/information\` - **About Arweave**`, inline: true},
            {name: `<:beta1:1056241303240839211><:beta2:1056241301605056542>  Handshake`, value: `❯ \`/createwallet\` - **Create HNS wallet**\n ❯ \`/received\` - **Total amount received by specified address**\n ❯ \`/nameinfo\` - **Information on a given name**\n ❯ \`/utxoinfo\` - **Information about UTXO\'s from Chain**\n\`/gettxout\` - ***Get outpoint of the transaction**\n \`/sendhns\` - **Create and template a transaction (useful for multisig). Does not broadcast or add to wallet.**\n\`/validateaddress\` - **Validates address**\n\`/signtx\` - **Sign a templated transaction (useful for multisig)**`, inline: true},
            {name: `<:dac:1047085787864379392>  Bot`, value: `❯ \`/help\` - **List commands**\n ❯ \`/botinfo\` - **About the bot**\n ❯ \`/invite\` - **Useful links**\n`, inline: true}
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

        return interaction.reply({ 
            embeds: [embed],
            ephemeral: true,
            components: [row]
        });
    },
};
