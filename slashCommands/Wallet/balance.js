module.exports = {
    name: "balance",
    usage: "/balance <arweave wallet address>",
    options: [
        {
            name: 'address',
            description: 'Укажите адрес кошелька',
            type: 'STRING',
            required: true
        }
    ],
    category: "Wallet",
    description: "Просмотреть баланс AR",
    ownerOnly: false,
    run: async (client, interaction) => {
        const Arweave = require("arweave");
        const Discord = require("discord.js");
        const wait = require('node:timers/promises').setTimeout;

        const arweave = Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https'
          }); // Инициализация arweave

        await interaction.deferReply({wait: 4000, ephemeral: true}); // Лимит 4 секунды
        arweave.wallets.getBalance(interaction.options.getString("address")).then((balance) => {
            let ar = arweave.ar.winstonToAr(balance); // Получение баланса адреса

            if (isNaN(ar)) ar = `Адрес не найден, убедитесь пожалуйста в его правильности.`;
            // Проверка на недействительный адрес(типа)

            const embed = new Discord.MessageEmbed();
            embed.setThumbnail(client.user.displayAvatarURL())
            embed.setColor("ORANGE")
            embed.addFields({
                name: "Адрес",
                value: `${interaction.options.getString("address")}`
            }, {
                name: "**AR**",
                value: `${ar}`
                },
            )

            embed.setFooter({text: `Просмотр баланса`, iconURL: `${client.user.displayAvatarURL()}`});
            return interaction.editReply({ embeds: [embed], ephemeral: true });
        });
    },
};
