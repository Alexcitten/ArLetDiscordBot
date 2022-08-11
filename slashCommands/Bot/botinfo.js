const {ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle} = require('discord.js')

module.exports = {
    name: "botinfo",
    usage: "/botinfo",
    category: "Bot",
    description: "About the bot",
    ownerOnly: false,
    run: async (client, interaction) => {

        const variables = [
            "The bot owner dog is called Siri",
            "Arweave is a protocol that allows you to store data permanently, sustainably, with a single upfront fee.", 
            "Arweave transaction signatures are a cryptographic way to prove that a public and private key pair is the true originator of the transaction.", 
            "An RSA signature is a 512byte key, but when we take the SHA-256 hash of that, we get the transaction id. This means it\’s not possible to know a transaction's id until it\’s been signed.", 
            "Arweave.app is a web wallet, which means it\’s just some code running in another tab in your browser.", 
            "Profit sharing tokens (PSTs) are a simple mechanism built using SmartWeave that shares the proceeds of any revenue stream on the permaweb.", 
            "By minting a profit sharing token for a revenue stream, users and developers are able to trade proportions of future profit from the assets by trading the profit sharing token itself.", 
            "Gateways are the mechanism through which users view content on the the permaweb, allowing users to point their unmodified web browser to a transaction ID in the Arweave network and have the content rendered locally.",
            "The process of mining in the Arweave network is designed to increase the number of replications of the dataset as much as possible. This process revolves around the creation and testing of a large number of Succinct Proofs of Random Access (SPoRAs) in every block production period.", 
            "At the time of generating a block, a network-wide search subspace (10% of the network) is chosen for nodes to read random data from.", 
            "The candidate block\’s metadata and a random number (the nonce) are hashed together using RandomX.", 
            "Tokens are released from the inflation schedule, as well as the endowment (as appropriate) to miners that produce blocks.", 
            "A constraint on the search space of the network is employed in order to enforce that miners are incentivized to store data that is not as well-replicated in the network.",
            "Profit sharing communities (PSCs) are a mechanism for developers to express the ownership and governance rights of their permaweb app in code. These organizations are represented by smart contracts in SmartWeave, the smart contracting framework for Arweave."
        ]

        const fact = variables[Math.floor(Math.random() * variables.length)];

        const embedEn = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('About ArLet v2')
            .addFields([
                {name: `<:WhatTheBot:976864462164361226>  What is bot?`, value: `It\'s made for [arweave community](https://discord.gg/9CXP2H7e5N), for ease of use arweave, and the bot has its own [Open Source](https://github.com/Alexcitten/ArLetDiscordBot).`},
                {name: `<:peoples:976851868166787082>  Guilds`, value: `${client.guilds.cache.size}`},
                {name: `<:time:976868189449375767>  Ping`, value: `${client.ws.ping}`},
                {name: `<:donate:976853323342815262>  Other`, value: `Bot owner: Alexcitten#0001\n Discord.js v14.2.0\n Hosting: Heroku\n Used ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`}
            ])
            .setColor('#FF8747')
            .setFooter({ 
                text: `Useful links: /invite | Did you know: ${fact}`, 
                iconURL: `${client.user.displayAvatarURL()}` 
            });

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('RU')
                .setCustomId('info')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1006668429031379054')
            )

        await interaction.reply({
            embeds: [embedEn],
            ephemeral: true,
            components: [row]
        });
    },
};
