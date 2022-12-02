const { WarpFactory } = require("warp-contracts");
const config = require("../../config.json")
const fetch = require('node-fetch');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "ardrivesend",
    options: [
        {
            name: 'target',
            description: 'AR Wallet Address',
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
    run: async (client, interaction, args) => {

        await interaction.deferReply({ephemeral: true});

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

        const warp = WarpFactory.forMainnet();

        let txId = await warp.contract(config.ardriveContract).connect(JSON.parse(result.toString())).writeInteraction({
            function: "transfer",
            qty: interaction.options.getNumber("amount"),
            target: interaction.options.getString("target")
          })

          client.users.fetch(interaction.user.id).then((user) => {  
            user.send({ 
                files: [{attachment: new Buffer.from(JSON.stringify(txId)), 
                name: `TransactionArDrive.json`}], 
                content: `File with your transaction for the amount \`${interaction.options.getNumber("amount")}\` ArDrive for wallet \`${interaction.options.getString("target")}\``});	
        })

        // what.
          // let errNull = (typeof txId == "null" || !txId || typeof txId == "null" ? "Declined. Transaction error, maybe it's because of the zero balance. If you think it's not, please [tell us.](https://discord.gg/K4XvmHusSJ)" : txId)
    const embed = new EmbedBuilder()
        .setTitle('Successfully')
        .addFields([
            {name: `<:wallet:1047085806696808538>  To wallet`, value: `${interaction.options.getString("target")}`}, 
            {name: `<:donate:1047492716474400798>  Quantity ArDrive`, value: `${interaction.options.getNumber("amount")}`},
            {name: `<:q_:1045650172144783410>  Transaction`, value: `I sent you a transaction file in this message and private messages`}
        ])
        .setColor('#FF8747')
        .setFooter({
            text: `ArDrive Transaction`, 
            iconURL: `${client.user.displayAvatarURL()}` 
        });

    return interaction.editReply({
        files: [{attachment: new Buffer.from(JSON.stringify(txId)),
        name: `TransactionArDrive.json`}], 
        embeds: [embed]
    });
    })
    } 
   }
  }
 }
