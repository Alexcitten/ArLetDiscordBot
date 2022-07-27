module.exports = {
    name: "createwallet",
    category: "Wallet",
    usage: "/createwallet",
    description: "Создать AR-кошелёк",
    ownerOnly: false,
    run: async (client, interaction) => {
        const Discord = require("discord.js");
        const wait = require('node:timers/promises').setTimeout;
        const Arweave = require('arweave');

        const arweave = Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https'
        }); // Инициализация arweave

        await interaction.deferReply({wait: 4000, ephemeral: true}); // Лимит 4 секунды

        arweave.wallets.generate().then((key) => {
            arweave.wallets.jwkToAddress(key).then((address) => {
                client.users.fetch(interaction.user.id).then((user) => {
                    user.send(
                        {
                            files:
                                [
                                    {
                                        attachment: new Buffer.from(JSON.stringify(key)),
                                        name: `${address}.json`
                                    }
                                    ],
                            content: `Ваш приватный ключ arweave от кошелька ${address}`
                        }
                        );
                }); // Отправка ключа кошелька пользователю в ЛС и создание кошелька(arweave.wallets.generate())

               const embed = new client.discord.MessageEmbed();
                embed.setThumbnail(
                    'https://cdn.discordapp.com/attachments/972381539784601654/972451607134470214/arlet.png'
                )

                embed.setColor('GREEN')
                embed.setTitle('AR | Крипто-кошёлек успешно создан.')
                embed.setDescription('Этот ключевой файл предназначен для вашего недавно созданного кошелька Arweave, ' +
                   'который вы должны хранить в безопасности. ' +
                   'Под безопасным и надежным мы подразумеваем его защиту от потери или неправильного размещения, ' +
                   'поскольку его невозможно восстановить. Проще говоря: если что-то ушло, то ушло! ' +
                   'Мы всегда рекомендуем хранить его в безопасном месте на нескольких (как минимум 3) устройствах. ' +
                   'Мы также рекомендуем вам зашифровать файл, так как любой, кто имеет к нему доступ, ' +
                   'также имеет доступ к вашему кошельку.')

                embed.addFields({
                    name: "**Приватный ключ**",
                    value: "Я выслал Вам тут и в личные сообщения файл с Вашим ключем"
                }, {
                    name: "Публичный адрес",
                    value: `${address}`,
                }, {
                    name: "Сервер поддержки бота",
                    value: "[Перейти →](https://discord.gg/jNKWTx7AJp)"
                }
                )

                embed.setFooter(
                    {
                        text: `Администрация никогда не попросит Ваш ключ. Ключ нужен для входа в кошелёк`,
                        iconURL: `${client.user.displayAvatarURL()}`
                    }
                    );

            return interaction.editReply(
                {
                    files:
                        [
                            {
                                attachment: new Buffer.from(JSON.stringify(key)),
                                name: `${address}.json`}
                        ],
                    embeds: [embed],
                    ephemeral: true
                }
                );
    });
});
},
};