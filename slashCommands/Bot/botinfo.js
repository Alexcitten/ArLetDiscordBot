const {ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle} = require('discord.js')
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: "botinfo",
    category: "Bot",
    description: "About the bot",
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

        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

        const embedEn = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('About ArLet v3')
            .addFields([
                {name: `<:q_:1045650172144783410>  What is bot?`, value: `This unusual Discord Bot is created for the Arweave Community, for ease of transactions of AR token and smart contracts based on Arweave and other interactions, creating a semi-cold arweave wallet, balance view. There will be many things in the future`, inline: true},
                {name: `<:f_:1045650173579235338>  Plans`, value: `[In plans](https://github.com/Alexcitten/ArLetDiscordBot#in-plans) | [The closest functionality](https://github.com/Alexcitten/ArLetDiscordBot#the-closest-functionality) | [Next update](https://github.com/Alexcitten/ArLetDiscordBot#next-update)`, inline: true},
                {name: `<:t_:1045650175080812594>  Stats`, value: `Guilds: **${client.guilds.cache.size}**\n Ping: **${client.ws.ping}**\n Memory: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / 64 GB** | Dedicated Server Hosting\n Uptime: **${duration}**`},
                {name: `<:c_:1045650170370588674>  Other`, value: `By <a:alexciten_avatar:1045646847328399370> [Alexcitten#0001](https://alexcitten.dev/) | Discord.JS v14.2.0 | **[Open-Source](https://github.com/Alexcitten/ArLetDiscordBot)**`}
            ])
            .setColor('#FF8747')
            .setFooter({ 
                text: `Useful links: /invite | Did you know: ${fact}`, 
                iconURL: `${client.user.displayAvatarURL()}` 
            });

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('UA')
                .setCustomId('info')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1047087115474841700'),

                new ButtonBuilder()
                .setLabel('Website')
                .setURL('https://arlet.tech')
                .setStyle(ButtonStyle.Link)
                .setEmoji('1047087115474841700'),

                new ButtonBuilder()
                .setLabel('Docs')
                .setURL('https://arlet.gitbook.io/docs/')
                .setStyle(ButtonStyle.Link)
                .setEmoji('1047087115474841700')
            )

        await interaction.reply({
            embeds: [embedEn],
            ephemeral: true,
            components: [row]
        });
    },
};
