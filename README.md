# [ArLet — Discord Bot | 1450+ guilds](https://arlet.tech)

This unusual Discord-bot is created for the Arweave Community, for ease of transactions of AR token and smart contracts based on Arweave and other interactions, creating a semi-cold arweave wallet, balance view and more!

This is far from all the functionality, because the bot was planned to be originally with extensive functionality, support for Bitcoin, Cosmos(ATOM), HNS, and so on, also provide cryptocurrency electronic commerce: buying, selling, and bidding on any cryptogood at Opensea API (and we already have the key to the API)

The purpose of the ArLet in Discord — open a new sphere of functionality with a unique implementation that we plan with cryptocurrencies and smart contracts and simplify use the Discord users with these cryptocurrencies and tokens. As you know, the current functionality is far from the end! We want to go far as we can.

#### Bot by Alexcitten#0001 | [Add Bot](https://discord.com/api/oauth2/authorize?client_id=631868778074079245&permissions=2147795968&scope=bot%20applications.commands)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=This%20Discord%20Bot%20made%20for%20interact%20with%20cryptocurrencies&url=https://github.com/Alexcitten/ArLetDiscordBot%20&hashtags=arweave,arweavediscord,smartweave,discordbot,discordfuture,bitcoindiscord,hns,cosmosatom,crypto,cryptocurrency,redstone,ArLet,technology,future,smartdiscord)

## Getting Started

This code is provided for study, and it is sitting right now in the present ArLet. You can take it, but please make it unique, with a significant modification, let's develop this sphere in the bots together! Everyone is already tired of these bots of the same type with userinfo command, kick and commands of receiving pictures of funny cats, let's make useful and interesting bots, from which we at least get a donate of 10$, buy something, exchange it for the fact that it costs 15$, then 20$, and so, until there is a large amount, we will buy several businesses, create a monopoly... Let's better buy pistachios.

## In plans

* Track various metrics in real time.
* Finding the right information on [ArWiki](https://arwiki.wiki/#/en)
* Support for BTC, [HNS](https://hsd-dev.org/), Cosmos(ATOM) and similar cryptocurrencies
* OpenSea API; buying, selling, and bidding on any cryptogood.

## The closest functionality
* Interactions with Cosmos(ATOM) cryptocurrency
* A /command with a lot of information about decentralization, etc.
* Cryptocurrency transfers by Discord Handle<br>
    ╰ /profile & /profile @User#0000 - Shows a person's profile, his wallets (which he connects himself if desired) and bio<br>
       ╰ /addbio - Add bio to /profile.<br>
         ╰ /addarwallet - Connect AR wallet to your Discord profile<br>
           ╰ /arsenduser @User#0000 <quantity> <Key File.json> and other transfer commands<br>
             ╰ /gift <quantity> <Key File.json> - Send the desired amount to a random person who has connected their AR wallet<br>
* [Fully](https://github.com/jfbeats/ArweaveWalletConnectorNode) security using [arweave.app](https://arweave.app)

## Next update
* Upload data to Arweave
* [HandShake](https://hsd-dev.org/) functionality support
* Interact with [Stargaze](https://stargaze.zone)

#### All planned functionality will appear gradually
         
### Install

I'm glad you wanted to download this.

```
# Clone the repository
git clone https://github.com/Alexcitten/ArLetDiscordBot.git
npm i
node index.js
```

## Built With

* [arweave](https://www.npmjs.com/package/arweave) - Interact with Arweave
* [SmartWeave](https://academy.warp.cc/tutorials/elementary/smartweave) & [Warp Contracts](https://github.com/warp-contracts/warp) - Smart Contracts
* [discord.js v14](https://discord.js.org/#/) - This is what most bots rely on.
* [chalk](https://www.npmjs.com/package/chalk) - Just output to the console, beautiful.
* [node-fetch](https://www.npmjs.com/package/node-fetch) - It is used in arsend & ardrivesend commands for Key File
* [RedStone API](https://www.npmjs.com/package/redstone-api) - For real-time AR pricing
