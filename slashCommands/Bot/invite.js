module.exports = {
    name: "invite",
    usage: "/invite",
    category: "Bot",
    description: "Ссылки бота",
    ownerOnly: false,
    run: async (client, interaction) => {
        const Discord = require("discord.js");
        const embed = new Discord.MessageEmbed();
        embed.setThumbnail(client.user.avatarURL());
        embed.setAuthor({name: "Полезные ресурсы"});
        embed.setColor("ORANGE");
        embed.addFields(
            {
                name: "<:WhatTheBot:976864462164361226> _ _Наш сайт",
                value: `[Перейти →](https://arlet.ml)`
            }, {
                name: "<:addbot:976851455355015178> _ _Пригласить бота",
                value: `[Перейти →](https://discord.com/oauth2/authorize?` +
                    `client_id=631868778074079245&permissions=277025704960&scope=bot%20applications.commands)`
            }, {
                name: "<:peoples:976851868166787082> _ _Сервер поддержки",
                value: `[Перейти →](https://discord.gg/jNKWTx7AJp)`
            }, {
              name: "<:up:976858697361920082> _ _Оценить бота",
              value: `[Перейти →](https://bots.server-discord.com/631868778074079245)`
            }, {
                name: "<:donate:976853323342815262> _ _Поддержать разработчика",
                value: "[MetaMask](https://metamask.io/): 0x996Ed13D3C3695Ecea397e44cC3f16fd501e48a9'"
            },
        );
        embed.setFooter({text: `Информация о боте: /botinfo\`, iconURL: \`${client.user.displayAvatarURL()}`});
        return interaction.reply({embeds: [embed]});
    },
};