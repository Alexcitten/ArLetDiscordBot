const axios = require("axios");
const {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require('discord.js')
const Arweave = require("arweave")
const { WarpFactory } = require("warp-contracts");
const config = require("../../config.json")
const redstone = require('redstone-api');
const fetch = require('node-fetch');
const jwk = require('../../jwk.json') // idc about this wallet
const {LmdbCache} = require("warp-contracts-lmdb");
const { parse } = require('node-html-parser')

module.exports = {
    name: "arweave",
    category: "Arweave",
    options: [
      {
          name: 'createwallet',
          description: 'Create AR Wallet',
          type: 1
      },
      {
        name: 'balance',
        description: 'Check AR and smart-contracts balance',
        type: 1,
        options: [
            {
                name: 'address',
                description: 'AR Wallet 43 characters address',
                type: 3,
                required: true
            }
        ]
    },
    {
        name: 'arsend',
        description: 'Send AR',
        type: 1,
        options: [
            {
                name: 'target',
                description: 'AR Wallet Address',
                type: 3,
                required: true
            },
            {
                name: 'amount',
                minValue: '0.0009',
                maxValue: '10000',
                description: 'Quantity AR',
                type: 10,
                required: true
            },
            {
                name: 'wallet',
                description: 'Please attach your JSON Key File',
                type: 11,
                required: true
            }
        ]
    },
    {
        name: 'ardrivesend',
        description: 'Send smart-token ArDrive',
        type: 1,
        options: [
            {
                name: 'target',
                description: 'Arweave Wallet Address',
                type: 3,
                required: true
            },
            {
                name: 'amount',
                minValue: '0.0009',
                maxValue: '10000',
                description: 'Quantity ArDrive',
                type: 10,
                required: true
            },
            {
                name: 'wallet',
                description: 'Please attach your JSON Key File',
                type: 11,
                required: true
            }
        ]
    },
    {
        name: 'uploaddata',
        description: 'Upload data to main network Arweave',
        type: 1,
        options: [
            {
                name: 'data',
                description: 'Attach the data. It could be HTML code or any arbitrary data and are served like webpages',
                type: 11,
                required: true
            },
            {
                name: 'wallet',
                description: 'Please attach your JSON Key File',
                type: 11,
                required: true
            }
        ]
    },
    {
        name: 'information',
        description: 'About Arweave',
        type: 1
    },
  ],
    description: "Arweave",
     async run(client, interaction) {

        const arweave = Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https'
          });

        if(interaction.options._subcommand === 'createwallet') {              
            await interaction.deferReply({ephemeral: true});
    
            arweave.wallets.generate().then((key) => {
                arweave.wallets.jwkToAddress(key).then((address) => {
     
                client.users.fetch(interaction.user.id).then((user) => {
                    user.send({ 
                        files: [{attachment: new Buffer.from(JSON.stringify(key)), 
                        name: `${address}.json`}],
                        content: `Your private AR key from \`${address}\``
                        }).catch(() => {
                            return interaction.editReply({
                                content: `It seems to me that your private messages are disabled, so I can not send you data from the wallet so that they are not lost.`
                            })
                        });
                    })
    
                    const embed = new EmbedBuilder()
                    .setTitle('AR Wallet created')
                    .setDescription('This key file is for your newly generated Arweave wallet that you must keep safe and secure. By safe and secure, we mean keeping it protected from loss or misplacement as it\’s not possible to regenerate. In simpler terms: once it\’s gone, it\’s gone! We always recommend storing it in a safe location on multiple (at least 3) devices. We also recommend that you encrypt the file, as anyone who has access to it also has access to your wallet.')
                    .setFields([
                        {name: `<:wallet:1047085806696808538>  AR Keyfile`, value: `I sent you a file with your key here and in private messages`, inline: true},
                        {name: `<:addbot:1047492704352878733>  Address`, value: `${address}`, inline: true}
                    ])
                    .setColor('#FF8747')
                    .setFooter({ 
                        text: `The administration will never ask for your keyfile. The keyfile is needed to enter the wallet`, 
                        iconURL: `${client.user.displayAvatarURL()}` 
                    });
    
                return interaction.editReply({ 
                    files: [{attachment: new Buffer.from(JSON.stringify(key)), name: `${address}.json`}], 
                    embeds: [embed], 
                    ephemeral: true
             });     
          });
        });
       }

        if(interaction.options._subcommand === 'balance') {
                await interaction.deferReply({ephemeral: true});

                const price = await redstone.getPrice("AR");

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

        if(interaction.options._subcommand === 'arsend') {
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
        }).catch(() => {
                return interaction.editReply({
                    content: `It seems to me that your private messages are disabled, so I can not send you data from the wallet so that they are not lost.`
                })
        });

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
}

if(interaction.options._subcommand === 'ardrivesend') {
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

if(interaction.options._subcommand === 'uploaddata') {
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
}
if(interaction.options._subcommand === 'information') {
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
  },
};
