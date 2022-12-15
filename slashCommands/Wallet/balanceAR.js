const Arweave = require("arweave")
const { WarpFactory } = require("warp-contracts");
const config = require("../../config.json")
const redstone = require('redstone-api');
const jwk = require('../../jwk.json') // idc about this wallet
const {LmdbCache} = require("warp-contracts-lmdb");
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "balance",
    options: [
        {
            name: 'address',
            description: 'AR Wallet 43 characters address',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    category: "AR Wallet",
    description: "Check AR and smart-contracts balance",
    async run(client, interaction, args) {

        const arweave = Arweave.init({
             host: 'arweave.net',
             port: 443,
             protocol: 'https'
        }); 

        const price = await redstone.getPrice("AR");

            await interaction.deferReply({ephemeral: true});

            if(interaction.options.getString("address").length !== 43) {
                interaction.editReply({
                    content: `You need to enter the Arweave wallet address with a length of **43 characters**. [More about Arweave wallets](https://docs.arweave.org/info/wallets/arweave-wallet)`
                })
            } else {

                interaction.editReply({
                    content: `Give me time to count and think :thinking:`
                })

                const warp = WarpFactory
                .forMainnet()
                .useStateCache(new LmdbCache({
                    dbLocation: `./cache/warp/state`
                  }
                ))
                .useContractCache(new LmdbCache({
                    dbLocation: `./cache/warp/contracts`
                }));

                let txId = await warp.contract(config.ardriveContract).connect(jwk).viewState({
                    function: "balance",
                    target: interaction.options.getString("address")
                })


            arweave.wallets.getBalance(interaction.options.getString("address")).then((balance) => {
                const ar = arweave.ar.winstonToAr(balance);
                const ARUsd = ar * price.value
                
            arweave.wallets.getLastTransactionID(interaction.options.getString("address")).then((transactionId) => {

            let ifFind = (typeof txId.result == "undefined" || !txId.result|| typeof txId.result.balance == "undefined" ? "Wallet is not defined \:D" : txId.result.balance) 
            if (isNaN(ar)) ar = `Wallet is not defined \:D`
            
        const embed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                {name: `<:wallet:1047085806696808538>  Wallet`, value: `${interaction.options.getString("address")}`},
                {name: `<:donate:1047492716474400798> AR`, value: `${ar} (\`$${ARUsd}\`)`, inline: true},
                {name: `<:donate:1047492716474400798> ArDrive`, value: `${ifFind}`, inline: true},
                {name: `<:q_:1045650172144783410>  Last Transaction`, value: `[ViewBlock](https://viewblock.io/arweave/tx/${transactionId})`, inline: true}
            ])
            .setColor('#FF8747')
            .setFooter({ 
                text: `Check AR and smart-token ArDrive wallet balance.`, 
                iconURL: `${client.user.displayAvatarURL()}` 
            });

        return interaction.followUp({ 
            embeds: [embed],
            ephemeral: true
        });     
     }); 
    });
   }
  } 
};
