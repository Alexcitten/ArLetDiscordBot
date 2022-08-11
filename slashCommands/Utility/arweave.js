const redstone = require('redstone-api');
const {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require('discord.js')
module.exports = {
    name: "arweave",
    usage: "/arweave",
    category: "Arweave",
    description: "About Arweave",
    ownerOnly: false,
    run: async(client, interaction, args) => {
        const price = await redstone.getPrice("AR");

        let embedEn = new EmbedBuilder()
        .setTitle('Familiarization with arweave')
        .setDescription('Arweave — it is a new protocol for storing data in a blockchain-like structure called Blockweave. It is built on a new consensus proof-of-access mechanism that makes truly low-cost data storage available for the first time. [Well, or so it will be clearer](https://arweave.medium.com/what-is-arweave-explain-like-im-five-425362144eb5)')
        .addFields([
            {name: `**Understood. What about smart contracts?**`, value: `In general, smart contracts are programs that run on blockchain when predetermined conditions are met. They automatically execute events or actions accordingly to the terms of contract.Smart contracts are deployed to the blockchain and are not controlled by the user - they run how they were programmed. User accounts interact with the contract by submitting transactions which execute functions from the contract.`},
            {name: `**AR token this..?**`, value: `AR is the native token of the Arweave network. If you want to store data on Arweave you need to buy AR tokens to pay for data storage. If you have storage space for rent then you will be paid in AR too. AR has a limited supply of 66 million and can be bought and traded at most of the leading cryptocurrency exchanges.`},
            {name: `**What is Another Money?**`, value: `It\'s](https://another.money) the first truly decentralized, smart and cheap token for usage in SmartWeave smart contracts and the first serious non-PST token based on arweave blockchain.`},
            {name: `**And what is the essence of this bot?**`, value: `It\'s made for [arweave community](https://discord.gg/9CXP2H7e5N), for ease of use arweave, and the bot has its own [Open Source](https://github.com/Alexcitten/ArLetDiscordBot).`},
            {name: `**Useful links**`, value: `[All about arweave](https://arwiki.wiki/#/en/main) ➥ [What is blockchain?](https://academy.warp.cc/tutorials/elementary/blockchain) ➥ [About smart-contracts](https://academy.warp.cc/tutorials/elementary/smartweave) ➥ [Environment](https://academy.warp.cc/tutorials/elementary/environment) ➥ [AR Price](https://app.redstone.finance/#/app/token/AR)`}
        ])
        .setFooter({ 
            text: `AR Price: ${price.value}$`, 
            iconURL: 'https://cdn.discordapp.com/emojis/712228732387196958.webp?size=240&quality=lossless'
        })
        .setColor('#FF8747')
        .setImage('https://cdn.discordapp.com/attachments/991389953269452990/1006802917535260692/unknown.png')
        .setThumbnail('https://cdn.discordapp.com/emojis/712228732387196958.webp?size=240&quality=lossless')

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('RU')
            .setCustomId('arru')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1006668429031379054')
        )
        
        await interaction.reply({ 
            embeds: [embedEn], 
            components: [row], 
            ephemeral: true}
        );  
        
  }
 }