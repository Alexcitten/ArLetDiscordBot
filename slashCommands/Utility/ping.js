module.exports = {
    name: "ping",
    usage: "/ping",
    category: "Bot",
    description: "Проверка пинга бота",
    ownerOnly: false,
    run: async (client, interaction) => {
        const msg = await interaction.channel.send(`🏓 Идет подсчет...`);
        
        const pingEmbed = new client.discord.MessageEmbed()
            .setTitle('Понг?')
            .addField("Пинг", `${Math.floor(msg.createdAt - interaction.createdAt)}ms`, true)
            .addField("API", `${client.ws.ping}ms`, true)
            .setColor('#2F3136')
            .setFooter({ text: `Пинг бота`, iconURL: `${client.user.displayAvatarURL()}` });
        await interaction.reply({ embeds: [pingEmbed] });

        msg.delete();
    },
};
