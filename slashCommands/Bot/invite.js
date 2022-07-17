module.exports = {
    name: "invite",
    usage: "/invite",
    category: "Bot",
    description: "Ссылки бота",
    ownerOnly: false,
    run: async (client, interaction) => {

        const embed = new client.discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor('Полезные ресурсы')
            .addField("<:WhatTheBot:976864462164361226> _ _Наш сайт", `[Перейти →](https://arlet.ml)`)
            .addField("<:addbot:976851455355015178> _ _Пригласить бота", `[Перейти →](https://discord.com/oauth2/authorize?client_id=631868778074079245&permissions=277025704960&scope=bot%20applications.commands)`)
            .addField("<:peoples:976851868166787082> _ _Сервер поддержки", `[Перейти →](https://discord.gg/jNKWTx7AJp)`)
            .addField("<:up:976858697361920082> _ _Оценить бота", "[Перейти →](https://bots.server-discord.com/631868778074079245)")
            .addField("<:donate:976853323342815262> _ _Поддержать разработчика", '[MetaMask](https://metamask.io/): 0x996Ed13D3C3695Ecea397e44cC3f16fd501e48a9')
            .setColor('ORANGE')
            .setFooter({ text: `Информация о боте: /botinfo`, iconURL: `${client.user.displayAvatarURL()}` });
        return interaction.reply({embeds: [embed]});
    },
};