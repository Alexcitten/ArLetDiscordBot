module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        client.user.setPresence({
            name: "arweave.org",
            status: "idle"
        });
        
        console.log(`${client.user.tag} rise from the ashes \:O`);
    }
}
