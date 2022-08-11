const Arweave = require('arweave')
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "createwallet",
    category: "AR Wallet",
    usage: "/createwallet",
    description: "Create AR wallet",
    ownerOnly: false,
    run: async (client, interaction, args) => {

        const arweave = Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https'
          });
          
          await interaction.deferReply({ephemeral: true});

        arweave.wallets.generate().then((key) => {
            arweave.wallets.jwkToAddress(key).then((address) => {
 
            client.users.fetch(interaction.user.id).then((user) => {
                user.send({ 
                    files: [{attachment: new Buffer.from(JSON.stringify(key)), 
                    name: `${address}.json`}], 
                    content: `You\'r private AR key from ${address}`});
                }) 

        const embed = new EmbedBuilder()
            .setTitle('Wallet with AR created')
            .setDescription('This key file is for your newly generated Arweave wallet that you must keep safe and secure. By safe and secure, we mean keeping it protected from loss or misplacement as it\’s not possible to regenerate. In simpler terms: once it\’s gone, it\’s gone! We always recommend storing it in a safe location on multiple (at least 3) devices. We also recommend that you encrypt the file, as anyone who has access to it also has access to your wallet.')
            .setFields([
                {name: `**AR Private key**`, value: `I sent you a file with your key here and in private messages`},
                {name: `Address`, value: `${address}`},
                {name: `Support server`, value: `[Go →](https://discord.gg/jNKWTx7AJp)`}
            ])
            .setColor('#FF8747')
            .setThumbnail('https://cdn.discordapp.com/attachments/972381539784601654/972451607134470214/arlet.png')
            .setFooter({ 
                text: `The administration will never ask for your key. The key is needed to enter the wallet`, 
                iconURL: `${client.user.displayAvatarURL()}` 
            });

            return interaction.editReply({ 
                files: [{attachment: new Buffer.from(JSON.stringify(key)), name: `${address}.json`}], 
                embeds: [embed], 
                ephemeral: true
         });     
      });
    });
  },
};