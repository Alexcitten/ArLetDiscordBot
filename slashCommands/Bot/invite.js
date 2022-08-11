const {ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle} = require('discord.js')

module.exports = {
    name: "invite",
    usage: "/invite",
    category: "Bot",
    description: "Useful links",
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

        const embed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('Useful links')
            .addFields([
                {name: `<:WhatTheBot:976864462164361226>  Website`, value: `[Go →](https://alexcitten.ml/arlet)`},
                {name: `<:addbot:976851455355015178>  Add bot`, value: `[Go →](https://discord.com/oauth2/authorize?client_id=631868778074079245&permissions=277025704960&scope=bot%20applications.commands)`},
                {name: `<:peoples:976851868166787082>  Discord server`, value: `[Go →](https://discord.gg/jNKWTx7AJp)`},
                {name: `<:up:976858697361920082>  Rate bot`, value: `[Go →](https://bots.server-discord.com/631868778074079245)`},
                {name: `<:donate:976853323342815262>  Donate`, value: `[MetaMask](https://metamask.io) 0x996Ed13D3C3695Ecea397e44cC3f16fd501e48a9 or [DonationAlerts](https://www.donationalerts.com/r/alexcitten)`}
            ])
            .setColor('#FF8747')
            .setFooter({ 
                text: `About bot: /botinfo | Did you know: ${fact}`, 
                iconURL: `${client.user.displayAvatarURL()}` 
            });

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('RU')
                .setCustomId('links')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1006668429031379054')
            )

        return interaction.reply({
            embeds: [embed],
            ephemeral: true,
            components: [row]
        });
        
    },
};