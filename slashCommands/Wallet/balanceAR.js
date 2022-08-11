const Arweave = require("arweave")
const { WarpNodeFactory } = require("warp-contracts");
const config = require("../../config.json")
const jwk = require('../../jwk.json') // I don't care about this wallet.
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "balance",
    usage: "/balance <arweave wallet address>",
    options: [
        {
            name: 'address',
            description: 'AR wallet address',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    category: "AR Wallet",
    description: "Check AR and smart-contracts balance",
    ownerOnly: false,
    run: async (client, interaction, args) => {

        const arweave = Arweave.init({
             host: 'arweave.net',
             port: 443,
             protocol: 'https'
        }); 

            await interaction.deferReply({ephemeral: true});

            const smartweave = WarpNodeFactory.memCached(arweave);
                let txId = await smartweave.contract(config.anoContract).connect(jwk).viewState({
                    function: "balance",
                    target: interaction.options.getString("address")
                })

            arweave.wallets.getBalance(interaction.options.getString("address")).then((balance) => {
                let ar = arweave.ar.winstonToAr(balance);
            
            let anoQty = (typeof txId.result == "undefined" || !txId.result|| typeof txId.result.balance == "undefined" ? "Wallet is not defined \:D" : txId.result.balance) 
            if (isNaN(ar)) ar = `Wallet is not defined \:D`
            
        const embed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                {name: `Wallet`, value: `${interaction.options.getString("address")}`},
                {name: `**AR**`, value: `${ar}`},
                {name: `**ANO**`, value: `${anoQty}`}
            ])
            .setColor('#FF8747')
            .setFooter({ 
                text: `Check AR and smart-token ANO wallet balance.`, 
                iconURL: `${client.user.displayAvatarURL()}` 
            });

        return interaction.editReply({ 
            embeds: [embed], 
            ephemeral: true 
        });     
     }); 
   }
};