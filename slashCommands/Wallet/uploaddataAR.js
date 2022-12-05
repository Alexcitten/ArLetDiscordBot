const Arweave = require("arweave")
const fetch = require('node-fetch');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { parse } = require('node-html-parser')

module.exports = {
    name: "uploaddata",
    options: [
        {
            name: 'data',
            description: 'Attach the data. It could be HTML code or any arbitrary data and are served like webpages',
            type: ApplicationCommandOptionType.Attachment,
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
    description: "Upload data to main network Arweave",
    run: async (client, interaction, args) => {

        const arweave = Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https'
          });  

          await interaction.deferReply({ephemeral: true});

        const keyName = interaction.options.getAttachment("wallet").name
        const keyUrl = interaction.options.getAttachment("wallet").url
        const linkToData = interaction.options.getAttachment("data").url

        const ifName = keyName.split(".").pop();

        if(ifName !== 'json') {
            interaction.editReply({
                content: `You need to enter the Arweave wallet keyfile with a .json extension. Your keyfiles don\'t go through third party processes, they are sent directly to Arweave. [More about Arweave wallets](https://docs.arweave.org/info/wallets/arweave-wallet)`
            })
        } else {


        fetch(keyUrl).then((res) => res.buffer()).then(async (result) => {
            let key = JSON.parse(result.toString())

        fetch(linkToData).then((res) => res.buffer()).then(async (result) => {
            let ARdata = parse(result).rawText

        const transaction = await arweave.createTransaction({
            data: Buffer.from(ARdata, 'utf8')
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
            content: `File with your transaction for https://arweave.net/${transaction.id}`});	
    })

    const embed = new EmbedBuilder()
        .setTitle('Successfully')
        .setDescription(`[Check transaction on ViewBlock](https://viewblock.io/arweave/tx/${transaction.id})`)
        .addFields([
            {name: `<:wallet:1047085806696808538>  Data`, value: `https://arweave.net/${transaction.id}`}
        ])
        .setColor('#FF8747')
        .setFooter({
            text: `I sent you a file with your data transaction.`, 
            iconURL: `${client.user.displayAvatarURL()}` 
        });

    return interaction.editReply({
         files: [{attachment: new Buffer.from(JSON.stringify(transaction)), 
         name: `Transaction.json`}], 
         embeds: [embed]
    });
    }
    })
    })
   }
 },
};
