module.exports = {
    name: "send",
    usage: "/send <address> <amount>",
    options: [
        {
            name: 'target',
            description: 'Укажите адрес кошелька',
            type: 'STRING',
            required: true
        },
        {
            name: 'amount',
            minValue: '1',
            maxValue: '10000',
            description: 'Сумма AR',
            type: 'NUMBER',
            required: true
        }
    ],
    category: "Wallet",
    description: "Перевести AR на кошелёк",
    ownerOnly: false,
    run: async (client, interaction) => {
        const Discord = require("discord.js");
        const Arweave = require("arweave")
        const wait = require('node:timers/promises').setTimeout;

        const arweave = Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https'
          }); // Инициализация arweave

        let key = await arweave.wallets.generate();
        let transaction = await arweave.createTransaction({
            target: interaction.options.getString("target"),
            quantity: arweave.ar.arToWinston(interaction.options.getNumber("amount"))
        }, key); // Транзакция

        await interaction.deferReply({wait: 4000, ephemeral: true});
        client.users.fetch(interaction.user.id).then((user) => {
            user.send(
                {
                    files:
                        [
                            {
                                attachment: new Buffer.from(JSON.stringify(transaction)),
                                name: `Transaction.json`
                            }
                            ], content: `Файл с Вашей транзакцией на сумму ${interaction.options.getNumber("amount")} AR ` +
                             `на адрес ${interaction.options.getString("target")}`
                }
                );
        }) // Отправка транзакции в ЛС и лимит на выполнение 4 секунды команды

        const embed = new Discord.MessageEmbed();
        embed.setThumbnail(client.user.displayAvatarURL())
        embed.setAuthor({name: "Успешно",
            iconURL: "https://cdn.discordapp.com/emojis/972516343247151285.webp?size=96&quality=lossless"})

        embed.setColor("ORANGE")
        embed.addFields({
            name: "На адрес",
            value: `${interaction.options.getString("target")}`
        }, {
            name: "**Количество AR**",
            value: `${interaction.options.getNumber("amount")}`
        },
        )
        embed.setFooter({text: `Я выслал Вам файл с Вашей транзакцией.`, iconURL: `${client.user.displayAvatarURL()}`});
    return interaction.editReply(
        {
            files:
                [
                    {
                        attachment: new Buffer.from(JSON.stringify(transaction)),
                        name: `Transaction.json`
                    }
                    ],
            embeds: [embed],
            ephemeral: true
        }
        );
},
};
