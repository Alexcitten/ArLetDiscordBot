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
const Arweave = require("arweave")
const wait = require('node:timers/promises').setTimeout
        // Инициализация arweave 
        const arweave = Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https'
          });
          // Лимит 4 секунды
          await interaction.deferReply({wait: 4000, ephemeral: true});
          // Получение баланса адреса
          arweave.wallets.getBalance(interaction.options.getString("address")).then((balance) => {
            let ar = arweave.ar.winstonToAr(balance);
              // Проверка на недействительный адрес(типа)
            if (isNaN(ar)) ar = `Адрес не найден, убедитесь пожалуйста в его правильности.`;
              
          const balEmbed = new client.discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .addField("Адрес", `${interaction.options.getString("address")}`)
            .addField("**AR**", `${ar}`)
            .setColor('ORANGE')
            .setFooter({ text: `Просмотр баланса`, iconURL: `${client.user.displayAvatarURL()}` });
        return interaction.editReply({ embeds: [balEmbed], ephemeral: true });
        });
    },
};
