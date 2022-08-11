const { Client, GatewayIntentBits, Collection } = require('discord.js');
const handler = require("./handler/index");
const config = require('./botconfig.json')
const Discord = require('discord.js');

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.DirectMessageTyping,
  ],
}); 


module.exports = client;
client.discord = Discord;
client.commands = new Collection();
client.slash = new Collection();

handler.loadEvents(client);
handler.loadSlashCommands(client);

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: " + err);
});
process.on("unhandledRejection", (reason, promise) => {
    console.log("[Фаталити] Possibly Unhandled Rejection at: Promise ", promise, " reason: ", reason.message);
});

client.login(config.token);
