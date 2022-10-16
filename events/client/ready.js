const { ActivityType } = require('discord.js')
    module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        client.user.setPresence({
          activities: [{ name: `https://arlet.tech`, type: ActivityType.Watching }],
          status: 'idle',
        });
        
        console.log(`${client.user.tag} rise from the ashes \:O`);
    }
}
