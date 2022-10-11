const Arweave = require("arweave");
const { WarpFactory } = require("warp-contracts");
const config = require("../../config.json")
const fetch = require('node-fetch');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "ardrivesend",
    usage: "/ardivesend <address> <amount> <wallet>",
    options: [
        {
            name: 'target',
            description: 'AR wallet address',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'amount',
            minValue: '0.01',
            maxValue: '10000',
            description: 'Quantity ARDRIVE',
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
    description: "Send smart-token ARDRIVE",
    ownerOnly: false,
    run: async (client, interaction, args) => {

        await interaction.deferReply({ephemeral: true});

        const arWallet = interaction.options.getAttachment("wallet").url

        fetch(arWallet).then((res) => res.buffer()).then(async (result) => {

        const warp = WarpFactory.forMainnet();

          let txId = await smartweave.contract(config.ardriveContract).connect(JSON.parse(result.toString())).writeInteraction({
            function: "transfer",
            qty: interaction.options.getNumber("amount"),
            target: interaction.options.getString("target")
          })

    let errNull = (typeof txId == "null" || !txId || typeof txId == "null" ? "Declined. Transaction error, maybe it's because of the zero balance. If you think it's not, please [tell us.](https://discord.gg/jNKWTx7AJp)" : txId) 
    
    const embed = new EmbedBuilder()
        .setThumbnail('https://cdn.discordapp.com/attachments/991389953269452990/1006899537094385724/logo.png')
        .setTitle('Smart-token ArDrive')
        .setFields([
            {name: `To wallet`, value: `${interaction.options.getString("target")}`},
            {name: `**Quantity ARDRIVE**`, value: `${interaction.options.getNumber("amount")}`},
            {name: `**Transaction ID**`, value: `${errNull}`}
        ])
        .setColor('#FF8747')
        .setFooter({ 
            text: `Transaction`, 
            iconURL: 'https://cdn.discordapp.com/attachments/991389953269452990/1006899537094385724/logo.png'
        });
      
    await interaction.editReply({
         embeds: [embed], 
         ephemeral: true
    });	
  })
 }
};
