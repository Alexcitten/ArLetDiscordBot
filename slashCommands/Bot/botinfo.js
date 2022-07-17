module.exports = {
    name: "botinfo",
    usage: "/botinfo",
    category: "Bot",
    description: "Информация о боте",
    ownerOnly: false,
    run: async (client, interaction) => {
        const msg = await interaction.channel.send(`Подождите немного..`);
        const embed = new client.discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor('Информация о боте | v1.0')
            .addField("<:WhatTheBot:976864462164361226> _ _Что за бот?", `Это - первый крипто-бот, который позволяет создавать реальные крипто-кошельки, и переводить криптовалюты, так же будут взаимодействия с OpenSea API, что будет позволять легко создать собственный рынок для ваших невзаимозаменяемых токенов или NFT. Криптовалютная электронная коммерция: покупка, продажа и торги любым крипто-товаром. В команде \`help\` весь текущий функционал, остальной в разработке.`)
            .addField("<:peoples:976851868166787082> _ _Сервера", `${client.guilds.cache.size}`)
            .addField("<:time:976868189449375767> _ _Задержка", `Бот: ${Math.floor(msg.createdAt - interaction.createdAt)} ms\n API: ${client.ws.ping} ms`)
            .addField("<:donate:976853323342815262> _ _Другое", `Разработчик: Alexcitten#8275\n Discord.js v13.6.0\n Хостинг: Heroku\n Использовано ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} МБ`)
            .setColor('ORANGE')
            .setFooter({ text: `Полезные ссылки: /invite`, iconURL: `${client.user.displayAvatarURL()}` });
        await interaction.reply({embeds: [embed]});
        msg.delete();
    },
};