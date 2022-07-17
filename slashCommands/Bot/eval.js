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
        const discord = require('discord.js'),
      { inspect } = require("util"),
      vm = require("vm"),
      codeContext =  {};
vm.createContext(codeContext);
let owners = require('../../config.js').ownerID
if(!owners.includes(interaction.user.id)) return interaction.reply({content: 'Это команда для разработчика.'});
    const code = interaction.options.getString("code")
    
    try {
        let hrDiff;
        const hrStart = process.hrtime();
        hrDiff = process.hrtime(hrStart);
        let output = eval(code);
        let asd = output;
        if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
        output = inspect(output, { depth: 0, maxArrayLength: null });
        output = clean(output);

            let embed = new client.discord.MessageEmbed()
            .setAuthor(interaction.user.tag, interaction.user.avatarURL())
            .setDescription(`\`\`\`fix\nOutput type: ${typeof asd}\nExecution time: ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms\nOutput:\`\`\`\n\`\`\`json\n\n${output}\n\`\`\``)
            .setColor('#2F3136')
            interaction.reply({embeds: [embed]})

    } catch (error) {
        let errbed = new client.discord.MessageEmbed()
        .setAuthor(`Ошибка`)
        .setDescription(`Ошибка: \`\`\`js\n${error}\`\`\``)
        .setColor('RED')
        interaction.reply({embeds: [errbed]});
    }
 
    function clean(text) {
        return text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203)); // 477733320583544838
}
    }
}
