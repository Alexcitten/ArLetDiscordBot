const redstone = require('redstone-api');
const axios = require("axios");
const {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require('discord.js')

module.exports = {
    name: "arweave",
    category: "Arweave",
    description: "About Arweave",
    run: async(client, interaction, args) => {

        async function getCurrentARPricePerGB() {
            const response = await axios.get("https://arweave.net/price/1073741824");
            return response.data * 0.000000000001;
          }
          
              const priceFeed = await redstone.getPrice("AR");
              const arPricePerGB = await getCurrentARPricePerGB();
              const usdPricePerGB = arPricePerGB * priceFeed.value;
              const usdPricePerGBFormatted = +usdPricePerGB.toFixed(2);

        let embedEn = new EmbedBuilder()
        .setTitle('Familiarization with Arweave')
        .setDescription('Arweave — it is a new protocol for storing data in a blockchain-like structure called Blockweave. It is built on a new consensus proof-of-access mechanism that makes truly low-cost data storage available for the first time. [Well, or so it will be clearer](https://arweave.medium.com/what-is-arweave-explain-like-im-five-425362144eb5)')
        .addFields([
            {name: `**Got it. What about smart contracts?**`, value: `In general, smart contracts are programs that run on blockchain when predetermined conditions are met. They automatically execute events or actions accordingly to the terms of contract.Smart contracts are deployed to the blockchain and are not controlled by the user - they run how they were programmed. User accounts interact with the contract by submitting transactions which execute functions from the contract.`, inline: true},
            {name: `**AR token this..?**`, value: `AR is the native token of the Arweave network. If you want to store data on Arweave you need to buy AR tokens to pay for data storage. If you have storage space for rent then you will be paid in AR too. AR has a limited supply of 66 million and can be bought and traded at most of the leading cryptocurrency exchanges.`, inline: true},
            {name: `**What is ArDrive?**`, value: `ArDrive isn't just another cloud storage service. It's permanent data storage which means any files you upload to ArDrive will outlive you! [ArDrive tokens](https://ardrive.io/what-are-ardrive-tokens/) are not used for paying to get your data uploaded onto ArDrive - that is what the Arweave (AR) token is for. Instead, ArDrive tokens have two main purposes: Rewards: Receive a share of the tips generated from all ArDrive transactions on the network. For Governance: Ability to vote in the strategic direction of the application and community.`, inline: true},
            {name: `**Another Money**`, value: `I also wanted to tell you about [Another Money](https://another.money) the first truly decentralized, smart and cheap token for usage in SmartWeave smart contracts and the first serious non-PST token based on arweave blockchain.`, inline: true},
            {name: `**Useful links**`, value: `[All about arweave](https://arwiki.wiki/#/en/main) ➥ [What is blockchain?](https://academy.warp.cc/tutorials/elementary/blockchain) ➥ [About smart-contracts](https://academy.warp.cc/tutorials/elementary/smartweave) ➥ [Environment](https://academy.warp.cc/tutorials/elementary/environment) ➥ [AR Price](https://app.redstone.finance/#/app/token/AR)`, inline: true}
        ])
        .setFooter({ 
            text: `AR Price: $${priceFeed.value} | $${usdPricePerGBFormatted} = 1 GB Data`, 
            iconURL: 'https://cdn.discordapp.com/emojis/712228732387196958.webp?size=240&quality=lossless'
        })
        .setColor('#FF8747')
        .setImage('https://cdn.discordapp.com/attachments/976860669926309970/1047555530324983888/2022-11-30_19.51.26.png')

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('UA')
            .setCustomId('arua')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1047087115474841700')
        )
        
        await interaction.reply({ 
            embeds: [embedEn], 
            components: [row], 
            ephemeral: true
        });     
  }
 }
