module.exports = {
    name: "eval",
    usage: "/eval <code>",
    category: "Bot",
    options: [
        {
            name: 'code',
            description: 'Укажите JavaScript-код, который нужно выполнить',
            type: 'STRING',
            required: true
        }
    ],
    description: "Команда доступна лишь разработчику бота!",
    run: async (client, interaction) => {
        const Discord = require("discord.js");
        const { inspect } = require("util");
        const vm = require("vm");
        const codeContext =  {};

        vm.createContext(codeContext);
        let owners = require('../../config.js').ownerID;
        if(!owners.includes(interaction.user.id)) return interaction.reply({content: 'Это команда для разработчика.'});
        const code = interaction.options.getString("code");

        const embed = new Discord.MessageEmbed();

    try {
        function clean(text) {
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        }

        let hrDiff;
        const hrStart = process.hrtime();
        hrDiff = process.hrtime(hrStart);
        let output = eval(code);
        let asd = output;

        if (output instanceof Promise ||
            (Boolean(output) && typeof output.then === "function" &&
                typeof output.catch === "function")) output = await output;

        output = inspect(output, { depth: 0, maxArrayLength: null });
        output = clean(output);

        embed.setColor('#2F3136')
        embed.setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
        embed.setDescription(`\`\`\`fix\nOutput type:` +
            `${typeof asd}\nExecution time: ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}` +
            `${hrDiff[1] / 1000000}ms` +
            `\nOutput:\`\`\`\n\`\`\`json\n\n${output}\n\`\`\``)


    } catch (error) {
        embed.setColor('RED')
        embed.setAuthor({name: `Ошибка`})
        embed.setDescription(`Ошибка: \`\`\`js\n${error}\`\`\``)
    }
    interaction.reply({embed: [embed]})
    }
}
