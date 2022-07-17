module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        client.user.setPresence({
            status: "idle"
        });
        console.log(`${client.user.tag} восстал из пепла ядерного огня`);
    }
}
