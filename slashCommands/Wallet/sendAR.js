const Arweave = require("arweave")
const redstone = require('redstone-api');
const fetch = require('node-fetch');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "arsend",
    options: [
        {
            name: 'target',
            description: 'AR Wallet Address',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'amount',
            minValue: '0.0009',
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
    async run(client, interaction, args) {

        const arweave = Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https'
          });  

          await interaction.deferReply({ephemeral: true});

        const price = await redstone.getPrice("AR");
        const ARUsd = interaction.options.getNumber("amount") * price.value

        const keyUrl = interaction.options.getAttachment("wallet").url
        const keyName = interaction.options.getAttachment("wallet").name

        const ifName = keyName.split(".").pop();

        if(interaction.options.getString("target").length !== 43) {
            interaction.editReply({
                content: `You need to enter the Arweave wallet address with a length of **43 characters**. [More about Arweave wallets](https://docs.arweave.org/info/wallets/arweave-wallet)`
            })
        } else {

        if(ifName !== 'json') {
            interaction.editReply({
                content: `You need to enter the Arweave wallet keyfile with a .json extension. Your keyfiles don\'t go through third party processes, they are sent directly to Arweave. [More about Arweave wallets](https://docs.arweave.org/info/wallets/arweave-wallet)`
            })
        } else {

        fetch(keyUrl).then((res) => res.buffer()).then(async (result) => {
        let key = JSON.parse(result.toString())
        const transaction = await arweave.createTransaction({
            target: interaction.options.getString("target"),
            quantity: arweave.ar.arToWinston(interaction.options.getNumber("amount")) 
        }, key);

        await arweave.transactions.sign(transaction, key); 
        const response = await arweave.transactions.post(transaction);

        if(response.status !== 200) {
            const embedErr = new EmbedBuilder()
            .setTitle('Error.')
            .setDescription(`The transaction was not successful. This may be due to the fact that you entered something incorrectly. Recheck everything.\n [Let us know if you think this is a mistake.](https://discord.gg/frZ9KAGgnG)`)
            .addFields([
                {name: `<:wallet:1047085806696808538>  Status`, value: `${response.status}`}
            ])
            .setColor('#FF0000')
    
        return interaction.editReply({
             embeds: [embedErr]
        });
        } else {

    client.users.fetch(interaction.user.id).then((user) => {  
        user.send({ 
            files: [{attachment: new Buffer.from(JSON.stringify(transaction)), 
            name: `Transaction.json`}], 
            content: `File with your transaction for the amount \`${interaction.options.getNumber("amount")}\` AR for wallet \`${interaction.options.getString("target")}\``});	
    })

    arweave.wallets.jwkToAddress(key).then((address) => {
    arweave.wallets.getBalance(address).then((balance) => {
        const ar = arweave.ar.winstonToAr(balance);
        const ARUsdBalance = ar * price.value

    const embed = new EmbedBuilder()
        .setTitle('Successfully')
        .setDescription(`[Check transfer on ViewBlock](https://viewblock.io/arweave/tx/${transaction.id})`)
        .addFields([
            {name: `<:wallet:1047085806696808538>  To wallet`, value: `${interaction.options.getString("target")}`}, 
            {name: `<:donate:1047492716474400798>  Quantity AR`, value: `${interaction.options.getNumber("amount")} (\`$${ARUsd}\`)`}
        ])
        .setColor('#FF8747')
        .setFooter({
            text: `I sent you a file with your AR transaction. Balance: ${ar} AR ($${ARUsdBalance})`, 
            iconURL: `${client.user.displayAvatarURL()}` 
        });

    return interaction.editReply({
         files: [{attachment: new Buffer.from(JSON.stringify(transaction)), 
         name: `Transaction.json`}], 
         embeds: [embed]
    });
    })
    })
    }
    })
   }
  }
 },
};
