const { Client, Collection, Intents } = require('discord.js');
const client = new Client({
  intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_MESSAGE_TYPING,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

const handler = require("./handler/index");

const Discord = require('discord.js');
const config = require('./config.js')
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