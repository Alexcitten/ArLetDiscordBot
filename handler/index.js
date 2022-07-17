const fs = require("fs");
const chalk = require("chalk");

const loadEvents = async function (client) {
    const eventFolders = fs.readdirSync("./events");
    for (const folder of eventFolders) {
        const eventFiles = fs
        .readdirSync(`./events/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            
            if (event.name) {
                console.log(chalk.bgBlueBright.black(` ✔️ => Ивент ${file} загружен`));
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => Ивент ${file} не загружен, ибо отсутствует help.name или help.name отсутствует в строке `));
                continue;
            }
            
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}

const loadSlashCommands = async function (client) {
    let slash = []

    const commandFolders = fs.readdirSync("./slashCommands");
    for (const folder of commandFolders) {
        const commandFiles = fs
        .readdirSync(`./slashCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`../slashCommands/${folder}/${file}`);
            
            if (command.name) {
                client.slash.set(command.name, command);
                slash.push(command)
                console.log(chalk.bgBlueBright.black(` ✔️ => Слеш-команда ${file} загружена`));
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => Слеш-команда ${file} не загружена, ибо отсутствует help.name или help.name отсутствует в строке`));
                continue;
            }
        }
    }

    client.on("ready", async() => {
        return client.application.commands.set(slash)
    })
}
module.exports = {
    loadEvents,
    loadSlashCommands
}
