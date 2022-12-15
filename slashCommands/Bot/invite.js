const {ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle} = require('discord.js')

module.exports = {
    name: "invite",
    category: "Bot",
    description: "Useful links",
    run (client, interaction) {

        const variables = [
            "The bot owner dog is called Siri",
            "Arweave is a protocol that allows you to store data permanently, sustainably, with a single upfront fee.", 
            "Arweave transaction signatures are a cryptographic way to prove that a public and private key pair is the true originator of the transaction.", 
            "An RSA signature is a 512byte key, but when we take the SHA-256 hash of that, we get the transaction id. This means it\’s not possible to know a transaction's id until it\’s been signed.", 
            "Arweave.app is a web wallet, which means it\’s just some code running in ARDRIVEther tab in your browser.", 
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
            .setTitle('Useful links')
            .addFields([
                {name: `<:web:1047492748539854858>  Website`, value: `[Go →](https://arlet.tech)`, inline: true},
                {name: `<:addbot:1047492704352878733>  Add Bot`, value: `[Go →](https://discord.com/oauth2/authorize?client_id=631868778074079245&permissions=277025704960&scope=bot%20applications.commands)`, inline: true},
                {name: `<:dserver:1047492729430626384>  Discord Server`, value: `[Go →](https://discord.gg/frZ9KAGgnG)`, inline: true},
                {name: `<:donate:1047492716474400798>  Donate`, value: `Arweave: \`0hw0sQxeBSPnpQ1dL4pjKGOqlIZnFuCWryNXl34o2bo\` or [money](https://alexcitten.diaka.ua/donate)`, inline: true}
            ])
            .setColor('#FF8747')
            .setFooter({ 
                text: `About the bot: /botinfo | Did you know: ${fact}`, 
                iconURL: `${client.user.displayAvatarURL()}` 
            });

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('UA')
                .setCustomId('links')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1047087115474841700')
            )

        return interaction.reply({
            embeds: [embed],
            ephemeral: true,
            components: [row]
        });
        
    },
};
