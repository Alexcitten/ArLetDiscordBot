module.exports = {
    name: "botinfo",
    usage: "/botinfo",
    category: "Bot",
    description: "Информация о боте",
    ownerOnly: false,
    run: async (client, interaction) => {
        const Discord = require("discord.js");
        const msg = await interaction.channel.send(`Подождите немного..`);
        const embed = new Discord.MessageEmbed();
        embed.setColor("ORANGE")
        embed.setThumbnail(client.user.displayAvatarURL())
        embed.setAuthor({name: "Информация о боте | v1.0"})
        embed.addFields(
                {
                    name: "<:WhatTheBot:976864462164361226> _ _Что за бот?",
                    value: "Это - первый крипто-бот, " +
                        "который позволяет создавать реальные крипто-кошельки, и переводить криптовалюты, " +
                        "так же будут взаимодействия с OpenSea API, что будет позволять легко создать собственный рынок для ваших невзаимозаменяемых токенов или NFT. " +
                        "Криптовалютная электронная коммерция: покупка, продажа и торги любым крипто-товаром. " +
                        "В команде \\`help\\` весь текущий функционал, остальной в разработке."
                }, {
                    name: "<:peoples:976851868166787082> _ _Сервера",
                    value: `${client.guilds.cache.size}`
                }, {
                    name: "<:time:976868189449375767> _ _Задержка",
                    value: `Бот: ${Math.floor(msg.createdAt - interaction.createdAt)} ms` +
                            `API: ${client.ws.ping} ms`
                }, {
                    name: "<:donate:976853323342815262> _ _Другое",
                    value: `Разработчик: Alexcitten#8275 \n` +
                    "Discord.js v13.6.0 \n" +
                    "Хостинг: Heroku \n" +
                    `Использовано ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} МБ`
                },
            )

        embed.setFooter({ text: `Полезные ссылки: /invite`, iconURL: `${client.user.displayAvatarURL()}` });
        await interaction.reply({embeds: [embed]});
        msg.delete();
    },
};