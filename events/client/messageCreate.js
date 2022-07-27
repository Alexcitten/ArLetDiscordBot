module.exports = {
    name: 'messageCreate',

    async execute(message, client) {
        if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith('2')) return;
        const [cmd, ...args] = message.content.slice('2').trim().split(" ");
        const command = client.commands.get(cmd.toLowerCase()) ||
            client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
        
        if (!command) return;
        
        if (command.ownerOnly) {
            if (message.author.id !== client.config.ownerID) {
                return message.reply({ content: "И куда ты лезешь", allowedMentions: { repliedUser: false } });
            }
        }
        
        await command.run(client, message, args);
    }
}
