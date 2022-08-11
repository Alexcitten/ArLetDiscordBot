const redstone = require('redstone-api');
module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (interaction.isButton()) {

       const price = await redstone.getPrice("AR");

       let embedRuAr = new client.discord.EmbedBuilder()
        .setTitle('Ознакомление с arweave')
        .setDescription('Arweave — это новый протокол хранения данных в структуре, похожей на блокчейн, которая называется Blockweave. Он построен на новом согласованном механизме доказательства доступа, который впервые делает доступным действительно недорогое хранилище данных. [Ну, или так будет понятнее](https://arweave.medium.com/what-is-arweave-explain-like-im-five-425362144eb5)')
        .addFields([
            {name: `**Понял. А смарт-контракты?**`, value: `Это программы, которые запускаются на блокчейне при выполнении заранее определенных условий. Они автоматически выполняют события или действия в соответствии с условиями контракта. Смарт-контракты развернуты в блокчейне и не контролируются пользователем — они работают так, как были запрограммированы. Учетные записи пользователей взаимодействуют с контрактом, отправляя транзакции, которые выполняют функции контракта. [Подробнее](https://academy.warp.cc/tutorials/elementary/smartweave)`},
            {name: `**Токен AR это..?**`, value: `AR — это собственный токен сети Arweave. Если вы хотите хранить данные в Arweave, вам нужно купить токены AR для оплаты хранения данных. Если у вас есть складское помещение в аренду, вам также будут платить в AR. AR имеет ограниченный запас в 66 миллионов и может быть куплен и продан на большинстве ведущих криптовалютных бирж.`},
            {name: `**Что такое Another Money?**`, value: `[Это](https://another.money) первый по-настоящему децентрализованный, умный и дешевый токен для использования в смарт-контрактах SmartWeave и первый серьезный токен, не относящийся к PST, основанный на блокчейне arweave.`},
            {name: `**И в чём суть этого бота?**`, value: `Он создан для [сообщества](https://discord.gg/9CXP2H7e5N) arweave, для удобства в использовании arweave, и бот имеет свой [Open Source](https://github.com/Alexcitten/ArLetDiscordBot).`},
            {name: `**Полезные ссылки**`, value: `[Всё о arweave](https://arwiki.wiki/#/en/main) ➥ [Что такое блокчейн?](https://academy.warp.cc/tutorials/elementary/blockchain) ➥ [О смарт-контрактах](https://academy.warp.cc/tutorials/elementary/smartweave) ➥ [Окружающая среда](https://academy.warp.cc/tutorials/elementary/environment) ➥ [График AR](https://app.redstone.finance/#/app/token/AR)`}
        ])
        .setFooter({
             text: `Цена AR: ${price.value}$`,
             iconURL: 'https://cdn.discordapp.com/emojis/712228732387196958.webp?size=240&quality=lossless'
        })
        .setColor('#FF8747')
        .setImage('https://cdn.discordapp.com/attachments/991389953269452990/1006487175090675732/unknown.png')
        .setThumbnail('https://cdn.discordapp.com/emojis/712228732387196958.webp?size=240&quality=lossless')

        const variables = [
            "Собаку владельца бота зовут Сири",
            "Arweave — это протокол, который позволяет вам хранить данные постоянно, устойчиво, с единовременной предоплатой.",
            "Подписи транзакций Arweave — это криптографический способ доказать, что пара открытого и закрытого ключей является истинным инициатором транзакции.",
            "Подпись RSA представляет собой ключ размером 512 байт, но когда мы берем его хэш SHA-256, мы получаем идентификатор транзакции. Это означает, что невозможно узнать идентификатор транзакции, пока она не будет подписана",
            "Arweave.app — это веб-кошелек, а это значит, что это просто код, работающий в другой вкладке вашего браузера.",
            "Токены распределения прибыли (PST) — это простой механизм, созданный с использованием SmartWeave, который распределяет доходы от любого потока доходов в постоянной сети",
            "Выпуская токен распределения прибыли для потока доходов, пользователи и разработчики могут торговать пропорциями будущей прибыли от активов, торгуя самим токеном распределения прибыли.",
            "Шлюзы — это механизм, с помощью которого пользователи просматривают контент в постоянной сети, позволяя пользователям указывать в своем немодифицированном веб-браузере идентификатор транзакции в сети Arweave и отображать контент локально.",
            "Процесс майнинга в сети Arweave предназначен для максимального увеличения количества репликаций набора данных. Этот процесс вращается вокруг создания и тестирования большого количества кратких доказательств произвольного доступа (SPoRA) в каждом производстве блоков. период.",
            "Во время генерации блока подпространство поиска в сети (10% сети) выбирается для узлов, из которых считываются случайные данные.",
            "Метаданные блока-кандидата и случайное число (одноразовый номер) хэшируются вместе с использованием RandomX.",
            "Токены освобождаются от графика инфляции, а также пожертвований (при необходимости) майнерам, производящим блоки.",
            "Ограничение пространства поиска в сети используется для того, чтобы стимулировать майнеров к хранению данных, которые не так хорошо воспроизводятся в сети",
            "Сообщества по распределению прибыли (PSC) — это механизм, позволяющий разработчикам выражать в коде права владения и управления своим постоянным веб-приложением. Эти организации представлены смарт-контрактами в SmartWeave, структуре смарт-контрактов для Arweave",
        ]

        const fact = variables[Math.floor(Math.random() * variables.length)];

        const embedRuInfo = new client.discord.EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('О ArLet | v2')
            .addFields([
                {name: `<:WhatTheBot:976864462164361226>  Для чего этот бот?`, value: `Он создан для [сообщества](https://discord.gg/9CXP2H7e5N) arweave, для удобства в использовании arweave, и бот имеет свой [Open Source](https://github.com/Alexcitten/ArLetDiscordBot).`},
                {name: `<:peoples:976851868166787082>  Сервера`, value: `${client.guilds.cache.size}`},
                {name: `<:time:976868189449375767>  Пинг`, value: `${client.ws.ping}`},
                {name: `<:donate:976853323342815262>  Другое`, value: `Разработчик бота: Alexcitten#0001\n Discord.js v14.2.0\n Хостинг: Heroku\n Использовано ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} МБ`}
            ])
            .setColor('#FF8747')
            .setFooter({ 
                text: `Полезные ссылки: /invite | Знали ли Вы: ${fact}`, 
                iconURL: `${client.user.displayAvatarURL()}`
            });

            const embedRuLinks = new client.discord.EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('Полезные ссылки')
            .addFields([
                {name: `<:WhatTheBot:976864462164361226>  Сайт`, value: `[Перейти →](https://alexcitten.ml/arlet)`},
                {name: `<:addbot:976851455355015178>  Добавить бота`, value: `[Перейти →](https://discord.com/oauth2/authorize?client_id=631868778074079245&permissions=277025704960&scope=bot%20applications.commands)`},
                {name: `<:peoples:976851868166787082>  Сервер поддержки`, value: `[Перейти →](https://discord.gg/jNKWTx7AJp)`},
                {name: `<:up:976858697361920082>  Оценить бота`, value: `[Перейти →](https://bots.server-discord.com/631868778074079245)`},
                {name: `<:donate:976853323342815262>  Поддержка`, value: `[MetaMask](https://metamask.io) 0x996Ed13D3C3695Ecea397e44cC3f16fd501e48a9 or [DonationAlerts](https://www.donationalerts.com/r/alexcitten)`}
            ])
            .setColor('#FF8747')
            .setFooter({ 
                text: `О боте: /botinfo | Знали ли Вы: ${fact}`, 
                iconURL: `${client.user.displayAvatarURL()}` 
            });

            const embedRuHelp = new client.discord.EmbedBuilder()
        .setTitle(`Список команд`)
        .addFields([
            {name: `<:donate:976853323342815262>  Кошелёк`, value: `❯ /createwallet - **Создать AR кошелёк**\n ❯ /balance <43-ёх символьный адрес кошелька AR> - **Просмотреть баланс**\n ❯ /arsend <43-ёх символьный адрес кошелька AR>, <количество AR>, <JSON Key File кошелька AR> - **Отправить AR**\n ❯ /anosend <43-ёх символьный адрес кошелька AR>, <количество ANO>, <JSON Key File кошелька AR> - **Отправить смарт-токен [another.money](https://another.money)`},
            {name: `<:addbot:976851455355015178>  Другое`, value: `❯ /help - **Список команд**\n ❯ /botinfo - **О боте**\n ❯ /invite - **Полезные ссылки**\n ❯ /arweave - **О Arweave**`}
        ])
        .setColor('#FF8747')
        .setFooter({
            text: `ArLet v2`,
            iconURL: `${client.user.displayAvatarURL()}`
        });

        if(interaction.customId === 'info') {
            await interaction.reply({
                embeds: [embedRuInfo],
                ephemeral: true
           })
        }

        if(interaction.customId === 'helpmecap') {
            await interaction.reply({
                embeds: [embedRuHelp],
                ephemeral: true
           })
        }

        if(interaction.customId === 'arru') {
            await interaction.reply({
                embeds: [embedRuAr],
                ephemeral: true
           })
        }

        if(interaction.customId === 'links') {
            await interaction.reply({
                embeds: [embedRuLinks],
                ephemeral: true
           })
        }
    }

        if (!interaction.isCommand()) return;

        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'Oops.. tell Alexcitten#0001 please about this!' });
               
        const args = [];
        
        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        
        try {
            command.run(client, interaction, args)
        } catch (e) {
            interaction.reply({ content: e.message });
        }
    }
}
