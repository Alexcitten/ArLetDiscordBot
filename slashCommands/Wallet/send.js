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
const Arweave = require("arweave")
const wait = require('node:timers/promises').setTimeout;
        const arweave = Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https'
          });
          
let key = await arweave.wallets.generate();
let transaction = await arweave.createTransaction({
    target: interaction.options.getString("target"),
    quantity: arweave.ar.arToWinston(interaction.options.getNumber("amount"))
}, key);

await interaction.deferReply({wait: 4000, ephemeral: true});
client.users.fetch(interaction.user.id).then((user) => {
    user.send({ files: [{attachment: new Buffer.from(JSON.stringify(key)), name: `Transaction.json`}], content: `Файл с Вашей транзакцией на сумму ${interaction.options.getNumber("amount")} AR на адрес ${interaction.options.getString("target")}`});	
})
    const embed = new client.discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor('Успешно!', 'https://cdn.discordapp.com/emojis/972516343247151285.webp?size=96&quality=lossless')
        .addField("На адрес", `${interaction.options.getString("target")}`)
        .addField("**Количество AR**", `${interaction.options.getNumber("amount")}`)
        .setColor('ORANGE')
        .setFooter({ text: `Я выслал Вам файл с Вашей транзакцией.`, iconURL: `${client.user.displayAvatarURL()}` });
    return interaction.editReply({ files: [{attachment: new Buffer.from(JSON.stringify(transaction)), name: `Transaction.json`}], embeds: [embed], ephemeral: true});	
},
};
