const {EmbedBuilder} = require('discord.js')
const {WalletClient, NodeClient} = require('hs-client');
const {Network} = require('hsd');
const network = Network.get('main');

module.exports = {
    name: "handshake",
    category: "HandShake",
    options: [
      {
          name: 'createwallet',
          description: 'Create HNS Wallet',
          type: 1,
          options: [
              {
                  name: 'id',
                  description: 'Wallet ID',
                  type: 3,
                  required: true
              },
              {
                  name: 'passphrase',
                  description: 'A strong passphrase used to encrypt the wallet',
                  type: 3,
                  required: true
              },
              {
                name: 'watchonly',
                description: 'Watch only?',
                type: 5,
                required: true
            }
          ]
      },
      {
           name: 'received',
           description: 'Total amount received by specified address',
           type: 1,
           options: [
              {
                    name: 'address',
                    description: 'Account Name(Wallet ID)',
                    type: 3,
                    required: true
              }
          ]
    },
    {
         name: 'nameinfo',
         description: 'Information on a given name',
         type: 1,
         options: [
            {
                  name: 'name',
                  description: 'Name you wish to look up',
                  type: 3,
                  required: true
            }
        ]
  },
    {
        name: 'utxoinfo',
        description: 'Information about UTXO\'s from Chain',
        type: 1,
    },
    {
        name: 'gettxout',
        description: 'Get outpoint of the transaction',
        type: 1,
        options: [
           {
                 name: 'txhash',
                 description: 'Transaction hash',
                 type: 3,
                 required: true
           },
           {
                name: 'index',
                description: 'Index of the Outpoint tx',
                type: 10,
                required: true
           }
       ]
    },
    {
        name: 'sendhns',
        description: 'Create and template a transaction (useful for multisig). Does not broadcast or add to wallet.',
        type: 1,
        options: [
           {
                 name: 'id',
                 description: 'Wallet Name(ID)',
                 type: 3,
                 required: true
           },
           {
                name: 'password',
                description: 'Passphrase to unlock the account',
                type: 3,
                required: true
           },
           {
                name: 'rate',
                description: 'The rate for transaction fees. Denominated in subunits per kb',
                type: 10,
                required: true
           },
           {
                name: 'value',
                description: 'Value to send in subunits (or whole HNS) | int (or float)',
                type: 10,
                required: true
           },
           {
                name: 'address',
                description: 'Destination address for transaction',
                type: 3,
                required: true
           },
       ]
    },
    {
        name: 'validateaddress',
        description: 'Validates address',
        type: 1,
        options: [
           {
                 name: 'address',
                 description: 'Wallet Address',
                 type: 3,
                 required: true
           }
       ]
    },
    {
        name: 'signtx',
        description: 'Sign a templated transaction (useful for multisig)',
        type: 1,
        options: [
           {
                 name: 'txhex',
                 description: 'Transaction Hex to sign',
                 type: 3,
                 required: true
           },
           {
                name: 'password',
                description: 'Passphrase to unlock the account',
                type: 3,
                required: true
           }
       ]
    },
  ],
    description: "HandShake",
     run(client, interaction) {

        let id, passphrase, watchOnly, address, name, txhash, index, includemempool, txhex;

            id = interaction.options.getString("id")
            passphrase = interaction.options.getString("passphrase")
            address = interaction.options.getString("address")
            name = interaction.options.getString("name")
            txhash = interaction.options.getString("txhash");
            index = interaction.options.getNumber("index");
            includemempool = 1;
            idtx = interaction.options.getString("id")
            passphrasetx = interaction.options.getString("password")
            rate = interaction.options.getNumber("rate")
            value = interaction.options.getNumber("value")
            address = interaction.options.getString("address")
            txhex = interaction.options.getString("txhex")


        const walletOptions = {
            port: network.walletPort,
            apiKey: 'arlet-api-key'
        }

        const clientOptions = {
            port: network.rpcPort,
            apiKey: 'arlet-api-key'
        }


        const createWalletOptions = {
            passphrase: passphrase,
            watchOnly: watchOnly
        };

        const TXOptions = {
            passphrase: passphrasetx,
            rate: rate,
            outputs: [{ value: value, address: address }]
        };

        const SignOptions = { tx: txhex, passphrase: passphrasetx };


        const HSDClient = new NodeClient(clientOptions);
        const walletClient = new WalletClient(walletOptions);

        const wallet = walletClient.wallet(id);

      if(interaction.options._subcommand === 'createwallet') {
        (async() => {
            await interaction.deferReply({ephemeral: true});
            
            const result = await walletClient.createWallet(id, createWalletOptions);

                client.users.fetch(interaction.user.id).then((user) => {
                    user.send({ 
                        content: `Please write down for yourself what the HNS wallet \`${id}\` passphrase is ||\`${passphrase}\`|| with the token ||\`${result.token}\`||`
                        }).catch(() => {
                            return interaction.editReply({
                                content: `It seems to me that your private messages are disabled, so I can not send you data from the wallet so that they are not lost.`
                            })
                        });
                    })

            if(interaction.options.getBoolean("watchonly") !== true) {
                    const embedTrue = new EmbedBuilder()
                    .setTitle('HandShake Wallet created')
                    .setFields([
                        {name: `<:publicinfo:1053729088239587408>  Wallet ID`, value: `${id}`, inline: true},
                        {name: `<:security:1053600755178811393>  Passphrase`, value: `||${passphrase}||`, inline: true},
                        {name: `<:security:1053600755178811393>  Wallet Token`, value: `||${result.token}||`, inline: true}
                    ])
                    .setColor('#FF8747')
                    .setFooter({ 
                        text: `The administration will never ask for your wallet token and passphrase. The token is needed to enter the wallet`, 
                        iconURL: `${client.user.displayAvatarURL()}` 
                    });

                return interaction.editReply({ 
                    embeds: [embedTrue], 
                    ephemeral: true
                });
        } else {
                const embedFalse = new EmbedBuilder()
                .setTitle('HandShake Wallet created')
                .setDescription('You created watch only wallet, like Ledger wallets or to track txs without being able to spend anything.')
                .setFields([
                    {name: `<:publicinfo:1053729088239587408>  Wallet ID`, value: `${id}`, inline: true},
                    {name: `<:security:1053600755178811393>  Passphrase`, value: `||${passphrase}||`, inline: true},
                    {name: `<:security:1053600755178811393>  Wallet Token`, value: `||${result.token}||`, inline: true}
                ])
                .setColor('#FF8747')
                .setFooter({ 
                    text: `The administration will never ask for your wallet token and passphrase. The token is needed to enter the wallet`, 
                    iconURL: `${client.user.displayAvatarURL()}` 
                });

                return interaction.editReply({ 
                    embeds: [embedFalse], 
                    ephemeral: true
                });
        }
          })();
        }
      
      if(interaction.options._subcommand === 'utxoinfo') {   
            (async () => {
                await interaction.deferReply({ephemeral: true})

                const result = await HSDClient.execute('gettxoutsetinfo');

                    const embedUtxo = new EmbedBuilder()
                    .setTitle('Returns information about UTXO\'s from Chain.')
                    .setDescription(`[HNS Network](https://hnsnetwork.com/names/${result.bestblock})`)
                    .setFields([
                        {name: `<:security:1053600755178811393>  Best Block`, value: `${result.bestblock}`, inline: true},
                        {name: `<:security:1053600755178811393>  Transactions`, value: `${result.transactions}`, inline: true},
                        {name: `<:security:1053600755178811393>  Tx outs`, value: `${result.txouts}`, inline: true},
                        {name: `<:security:1053600755178811393>  Bytes Serialized`, value: `${result.bytes_serialized}`, inline: true},
                        {name: `<:security:1053600755178811393>  Hash Serialized`, value: `${result.hash_serialized}`, inline: true},
                        {name: `<:security:1053600755178811393>  Total Amount`, value: `${result.total_amount} / ${result.total_burned} burned HNS`, inline: true},
                    ])
                    .setColor('#FF8747')
                    .setFooter({ 
                        text: `https://arlet.tech`
                    });

                return interaction.editReply({ 
                    embeds: [embedUtxo], 
                    ephemeral: true
                });
            })();
      }
            if(interaction.options._subcommand === 'received') {
                (async () => {
                    await interaction.deferReply({ephemeral: true})

                    const result = await walletClient.execute('getreceivedbyaddress', [address]).catch(() => {
                        return `I didn't find this wallet. Maybe he\'s unfaithful? If you think this is a bug, please let us know at the support server.`
                    })

                    const embedBalance = new EmbedBuilder()
                    .setTitle('Total received')
                    .setFields([
                        {name: `<:wallet:1047085806696808538>  Address`, value: `${address}`, inline: true},
                        {name: `<:donate:1047492716474400798>  Total HNS received`, value: `${result}`, inline: true},
                    ])
                    .setColor('#FF8747')
                    .setFooter({ 
                        text: `https://arlet.tech`
                    });

                return interaction.editReply({ 
                    embeds: [embedBalance], 
                    ephemeral: true
                });
            
                })();
            }
            if(interaction.options._subcommand === 'nameinfo') {
                (async () => {
                    await interaction.deferReply({ephemeral: true})
        
                    const result = await HSDClient.execute('getnameinfo', [ name ]);

                    if(result.info === null) {  
                        return interaction.editReply({ 
                            content: `I did not find this domain. If you think this is a bug, please let us know at the support server.`,
                            ephemeral: true
                    });

                    } else {
                        console.log(result)
                    const embedName = new EmbedBuilder()
                    .setTitle(`Information on a ${name}/ domain`)
                    .setFields([
                        {name: `<:security:1053600755178811393>  Reserved`, value: `${result.start.reserved}`, inline: true},
                        {name: `<:security:1053600755178811393>  Week & Start`, value: `${result.start.week} / ${result.start.start}`, inline: true},
                        {name: `<:security:1053600755178811393>  State`, value: `${result.info.state}`, inline: true},
                        {name: `<:security:1053600755178811393>  Block Height & Renewal`, value: `${result.info.height} / ${result.info.renewal}\n \nRenewal period start: ${result.info.stats.renewalPeriodStart}\n Renewal period end: ${result.info.stats.renewalPeriodEnd}\n Blocks until expire: ${result.info.stats.blocksUntilExpire}\n Days until expire: ${result.info.stats.daysUntilExpire}`, inline: true},
                        {name: `<:security:1053600755178811393>  Owner(Hash & Index)`, value: `${result.info.owner.hash}\n Index: ${result.info.owner.index}`, inline: true},
                        {name: `<:security:1053600755178811393>  Name Hash`, value: `${result.info.nameHash}`, inline: true}
                    ])
                    .setColor('#FF8747')
                    .setFooter({ 
                        text: `https://arlet.tech`
                    });
        
                return interaction.editReply({ 
                    embeds: [embedName], 
                    ephemeral: true
                });
            }
                    })();
            }
            if(interaction.options._subcommand === 'gettxout') {
                (async() => {
                    await interaction.deferReply({ephemeral: true});
                    
                    const result = await HSDClient.execute('gettxout', [ txhash, index, includemempool ]);
        
                    if(result === null) {
                        return interaction.editReply({ 
                            content: `I did not find this transaction hash. If you think this is a bug, please let us know at the support server.`,
                            ephemeral: true
                    });

                    } else {
                    if(result.coinbase !== true) {
                        const embedFalse = new EmbedBuilder()
                        .setTitle('Get outpoint of the transaction')
                        .setDescription(`[HNS Network](https://hnsnetwork.com/txs/${txhash}) | [Niami.io](https://www.niami.io/tx/${txhash}) | [HNS Fans](https://e.hnsfans.com/tx/${txhash})`)
                        .setFields([
                            {name: `<:wallet:1047085806696808538>  Transaction Hash`, value: `${txhash}`, inline: true},
                            {name: `<:wallet:1047085806696808538>  Best Block`, value: `${result.bestblock}`, inline: true},
                            {name: `<:wallet:1047085806696808538>  Confirmations`, value: `${result.confirmations}`, inline: true},
                            {name: `<:wallet:1047085806696808538>  Value`, value: `${result.value}`, inline: true}
                        ])
                        .setColor('#FF8747')
                        .setFooter({ 
                            text: `Not Coinbase transaction`
                        });
        
                    return interaction.editReply({ 
                        embeds: [embedFalse], 
                        ephemeral: true
                    });
                } else {
                    const embedTrue = new EmbedBuilder()
                    .setTitle('Get outpoint of the transaction')
                    .setDescription(`[HNS Network](https://hnsnetwork.com/txs/${txhash}) | [Niami.io](https://www.niami.io/tx/${txhash}) | [HNS Fans](https://e.hnsfans.com/tx/${txhash})`)
                    .setFields([
                        {name: `<:wallet:1047085806696808538>  Transaction Hash`, value: `${txhash}`, inline: true},
                        {name: `<:wallet:1047085806696808538>  Best Block`, value: `${result.bestblock}`, inline: true},
                        {name: `<:wallet:1047085806696808538>  Confirmations`, value: `${result.confirmations}`, inline: true},
                        {name: `<:wallet:1047085806696808538>  Value`, value: `${result.value}`, inline: true}
                    ])
                    .setColor('#FF8747')
                    .setFooter({ 
                        text: `Coinbase transaction`
                    });
        
                return interaction.editReply({ 
                    embeds: [embedTrue], 
                    ephemeral: true
                });
                }
            }
          })();
        }
        if(interaction.options._subcommand === 'sendhns') {
            (async () => {
                await interaction.deferReply({ephemeral: true})

                const result = await wallet.createTX(TXOptions);

                if(result === null) {
                    const embedErr = new EmbedBuilder()
                    .setTitle('Error.')
                    .setDescription(`The transaction was not successful. This may be due to the fact that you entered something incorrectly. Recheck everything.\n [Let us know if you think this is a mistake.](https://discord.gg/frZ9KAGgnG)`)
                    .setColor('#FF0000')
    
                return interaction.editReply({
                    embeds: [embedErr]
                });
                } else {

                    client.users.fetch(interaction.user.id).then((user) => {
                        user.send({ 
                            files: [{attachment: new Buffer.from(JSON.stringify(result)), 
                            name: `HNSTransaction.json`}],
                            content: `File with your transaction for the amount \`${interaction.options.getNumber("value")}\` HNS for wallet \`${interaction.options.getString("address")}\``
                            }).catch(() => {
                                return interaction.editReply({
                                    content: `It seems to me that your private messages are disabled, so I can not send you data from the wallet so that they are not lost.`
                                })
                            });
                        })
                        const embedTX = new EmbedBuilder()
                        .setTitle('Successfully')
                        .setDescription(`[HNS Network](https://hnsnetwork.com/txs/${result.hash})`)
                        .addFields([
                            {name: `<:wallet:1047085806696808538>  To wallet`, value: `${interaction.options.getString("address")}`}, 
                            {name: `<:donate:1047492716474400798>  Quantity HNS`, value: `${interaction.options.getNumber("value")}`}
                        ])
                        .setColor('#FF8747')
                        .setFooter({
                            text: `I sent you a file with your HNS transaction, where are all the details.`, 
                            iconURL: `${client.user.displayAvatarURL()}` 
                        });

                    return interaction.editReply({
                        files: [{attachment: new Buffer.from(JSON.stringify(transaction)), 
                        name: `HNSTransaction.json`}], 
                        embeds: [embedTX]
                    });
                }
          })();
        }
        if(interaction.options._subcommand === 'validateaddress') {
            (async () => {
                await interaction.deferReply({ephemeral: true})

                const result = await HSDClient.execute('validateaddress', [ address ]);
                
                if(result.isvalid !== true) {
                    return interaction.editReply({
                        content: `No, this HNS address is invalid.`
                    })
                } else {
                    const embed = new EmbedBuilder()
                    .setTitle('Validates address')
                    .setFields([
                        {name: `<:wallet:1047085806696808538>  Address`, value: `\`${address}\` is valid!`, inline: true},
                        {name: `<:wallet:1047085806696808538>  Script?`, value: `${result.isscript}`, inline: true},
                        {name: `<:wallet:1047085806696808538>  Spendable?`, value: `${result.isspendable}`, inline: true},
                        {name: `<:wallet:1047085806696808538>  Witness program`, value: `${result.witness_program}`, inline: true}
                    ])
                    .setColor('#FF8747')
                    .setFooter({ 
                        text: `Witness version: ${result.witness_version}`
                    });
    
                return interaction.editReply({
                    embeds: [embed]
                });
                }
            })();
        }
        if(interaction.options._subcommand === 'signtx') {
            (async () => {
                await interaction.deferReply({ephemeral: true})

                const result = await wallet.sign(SignOptions);

                if(result === null) {
                    const embedErr = new EmbedBuilder()
                    .setTitle('Error.')
                    .setDescription(`Sign transaction was not successful. This may be due to the fact that you entered something incorrectly. Recheck everything.\n [Let us know if you think this is a mistake.](https://discord.gg/frZ9KAGgnG)`)
                    .setColor('#FF0000')
    
                return interaction.editReply({
                    embeds: [embedErr]
                });
                } else {

                    client.users.fetch(interaction.user.id).then((user) => {
                        user.send({ 
                            files: [{attachment: new Buffer.from(JSON.stringify(result)), 
                            name: `SignHNSTransaction.json`}],
                            content: `File with your sign transaction for hex \`${interaction.options.getString("txhex")}\``
                            }).catch(() => {
                                return interaction.editReply({
                                    content: `It seems to me that your private messages are disabled, so I can not send you data from the wallet so that they are not lost.`
                                })
                            });
                        })
                        const embedTX = new EmbedBuilder()
                        .setTitle('Successfully')
                        .addFields([
                            {name: `<:wallet:1047085806696808538>  Hex`, value: `${result.hex}`}, 
                            {name: `<:wallet:1047085806696808538>  Hash`, value: `${result.hash}`}
                        ])
                        .setColor('#FF8747')
                        .setFooter({
                            text: `I sent you a file with your sign transaction, where are all the details.`, 
                            iconURL: `${client.user.displayAvatarURL()}` 
                        });

                    return interaction.editReply({
                        files: [{attachment: new Buffer.from(JSON.stringify(transaction)), 
                        name: `SignHNSTransaction.json`}], 
                        embeds: [embedTX]
                    });
                }
          })();
        }
    },
};