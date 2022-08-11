const Arweave = require("arweave")
const fetch = require('node-fetch');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "arsend",
    usage: "/send <address> <amount> <wallet>",
    options: [
        {
            name: 'target',
            description: 'AR wallet address',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'amount',
            minValue: '0.5',
            maxValue: '10000',
            description: 'Quantity AR',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: 'wallet',
            description: 'Please attach your JSON Key File',
            type: ApplicationCommandOptionType.Attachment,
            required: true 
        }
    ],
    category: "AR Wallet",
    description: "Send AR",
    ownerOnly: false,
    run: async (client, interaction, args) => {

        const arweave = Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https'
          });  

        let keyUrl = interaction.options.getAttachment("wallet").url

        fetch(keyUrl).then((res) => res.buffer()).then(async (result) => {
        let key = JSON.parse(result.toString())

        let transaction = await arweave.createTransaction({
            target: interaction.options.getString("target"),
            quantity: arweave.ar.arToWinston(interaction.options.getNumber("amount")) 
        }, key);

        await arweave.transactions.sign(transaction, key); 
        await arweave.transactions.post(transaction);

        await interaction.deferReply({ephemeral: true});

    client.users.fetch(interaction.user.id).then((user) => {  
        user.send({ 
            files: [{attachment: new Buffer.from(JSON.stringify(transaction)), 
            name: `Transaction.json`}], 
            content: `File with your transaction for the amount ${interaction.options.getNumber("amount")} AR for wallet ${interaction.options.getString("target")}`});	
    })

    const embed = new EmbedBuilder()
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle('Successfully!')
        .addFields([
            {name: `To wallet`, value: `${interaction.options.getString("target")}`}, 
            {name: `**Quantity AR**`, value: `${interaction.options.getNumber("amount")}`}
        ])
        .setColor('#FF8747')
        .setFooter({
            text: `I sent you a file with you\'r AR transaction.`, 
            iconURL: `${client.user.displayAvatarURL()}` 
        });

    return interaction.editReply({
         files: [{attachment: new Buffer.from(JSON.stringify(transaction)), 
         name: `Transaction.json`}], 
         embeds: [embed], 
         ephemeral: true
    });
  })
 },
};
