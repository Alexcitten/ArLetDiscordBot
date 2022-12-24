const redstone = require('redstone-api');
const axios = require("axios");
const {ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle} = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const {NodeClient} = require('hs-client');
const {Network} = require('hsd');
const network = Network.get('main');

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (interaction.isButton()) {

        const clientOptions = {
            port: network.rpcPort,
            apiKey: 'arlet-api-key'
        }
              
          const HSDclient = new NodeClient(clientOptions);
    
          const hsdresult = await HSDclient.execute('getconnectioncount');

       async function getCurrentARPricePerGB() {
        const response = await axios.get("https://arweave.net/price/1073741824");
        return response.data * 0.000000000001;
      }
      
          const priceFeed = await redstone.getPrice("AR");
          const arPricePerGB = await getCurrentARPricePerGB();
          const usdPricePerGB = arPricePerGB * priceFeed.value;
          const usdPricePerGBFormatted = +usdPricePerGB.toFixed(2);

          const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

       const embedUaAr = new EmbedBuilder()
       .setTitle('Ознайомлення з Arweave')
       .setDescription('Arweave — це блокчейн-протокол для децентралізованого вічного зберігання даних. Це новий протокол для зберігання даних у структурі, схожій на блокчейн, під назвою Blockweave. Він створений на основі нового консенсусного механізму підтвердження доступу, який вперше робить доступним справді недороге зберігання даних. [Ну або так буде зрозуміліше](https://arweave.medium.com/what-is-arweave-explain-like-im-five-425362144eb5)')
       .addFields([
           {name: `**Зрозумів. А як щодо смарт-контрактів?**`, value: `Загалом смарт-контракти — це програми, які працюють на блокчейні, коли виконуються заздалегідь визначені умови. Вони автоматично виконують події або дії відповідно до умов контракту. Розумні контракти розгортаються в блокчейні і не контролюються користувачем – вони виконуються так, як їх було запрограмовано. Облікові записи користувачів взаємодіють із контрактом, надаючи транзакції, які виконують функції з контракту.`, inline: true},
           {name: `**AR токен це..?**`, value: `AR є нативним токеном мережі Arweave. Якщо ви хочете зберігати дані на Arweave, вам потрібно купити токени AR, щоб заплатити за зберігання даних. Якщо ви орендуєте місце для зберігання, вам також платитимуть у AR. AR має обмежену пропозицію в 66 мільйонів, і їх можна купувати та торгувати на більшості провідних бірж криптовалют.`, inline: true},
           {name: `**Що таке ArDrive?**`, value: `ArDrive — це не просто ще один хмарний сервіс зберігання. Це постійне сховище даних, що означає, що будь-які файли, які ви завантажуєте в ArDrive, переживуть вас! [Токени ArDrive](https://ardrive.io/what-are-ardrive-tokens/) не використовуються для оплати за завантаження ваших даних на ArDrive – саме для цього призначений токен Arweave (AR). Натомість токени ArDrive мають дві основні мети: Винагороди: отримуйте частку підказок, отриманих від усіх транзакцій ArDrive у мережі. Для управління: можливість голосувати за стратегічний напрям програми та спільноти.`, inline: true},
           {name: `**Another Money**`, value: `Я також хотів розповісти вам про [Another Money](https://another.money), перший по-справжньому децентралізований, розумний і дешевий токен для використання в смарт-контрактах SmartWeave і перший серйозний не-PST-токен на основі блокчейну Arweave.`, inline: true},
           {name: `**Корисні посилання**`, value: `[Усе про Arweave](https://arwiki.wiki/#/en/main) ➥ [Що таке блокчейн?](https://academy.warp.cc/tutorials/elementary/blockchain) ➥ [Про смарт-контракти](https://academy.warp.cc/tutorials/elementary/smartweave) ➥ [Навколишнє середовище](https://academy.warp.cc/tutorials/elementary/environment) ➥ [Ціна AR](https://app.redstone.finance/#/app/token/AR)`, inline: true}
       ])
       .setFooter({ 
           text: `Ціна AR: $${priceFeed.value} | $${usdPricePerGBFormatted} = 1 ГБ даних`, 
           iconURL: 'https://cdn.discordapp.com/emojis/712228732387196958.webp?size=240&quality=lossless'
       })
       .setColor('#FF8747')
       .setImage('https://media.discordapp.net/attachments/976860669926309970/1047565717584752680/2022-11-30_20.31.54.png')

        const variables = [
            "Собаку власника бота звуть Сірі",
            "Arweave — це протокол, який дозволяє зберігати дані постійно, стабільно, за єдину авансову плату.",
            "Підписи транзакцій Arweave — це криптографічний спосіб довести, що пара відкритих і закритих ключів є справжнім ініціатором транзакції.",
            "Підпис RSA — це 512-байтний ключ, але коли ми беремо його хеш SHA-256, ми отримуємо ідентифікатор транзакції. Це означає, що неможливо дізнатися ідентифікатор транзакції, доки вона не буде підписана",
            "Arweave.app — це веб-гаманець, що означає, що це лише деякий код, який працює в іншій вкладці вашого браузера.",
            "Токени розподілу прибутку (PST) — це простий механізм, створений за допомогою SmartWeave, який розподіляє надходження від будь-якого потоку доходу на permaweb",
            "Чеканивши токен розподілу прибутку для потоку доходу, користувачі та розробники можуть торгувати пропорціями майбутнього прибутку від активів, торгуючи самим жетоном розподілу прибутку",
            "Шлюзи — це механізм, за допомогою якого користувачі переглядають вміст у permaweb, що дозволяє користувачам спрямовувати свій немодифікований веб-браузер на ідентифікатор транзакції в мережі Arweave та відображати вміст локально",
            "Процес майнінгу в мережі Arweave розроблено для максимального збільшення кількості реплікацій набору даних. Цей процес обертається навколо створення та тестування великої кількості коротких доказів довільного доступу (SPoRA) у кожному виробництві блоку. період.",
            "Під час генерації блоку підпростір пошуку в масштабі мережі (10% мережі) вибирається для вузлів, з яких зчитуються випадкові дані.",
            "Метадані блоку-кандидата та випадкове число (nonce) хешуються разом за допомогою RandomX.",
            "Токени вивільняються з графіка інфляції, а також ендавмент (у відповідних випадках) майнерам, які виробляють блоки.",
            "Обмеження на простір пошуку в мережі використовується для того, щоб заохочувати майнерів зберігати дані, які не так добре тиражуються в мережі",
            "Спільноти розподілу прибутку (PSC) — це механізм, за допомогою якого розробники можуть виражати права власності та управління своїм додатком permaweb у коді. Ці організації представлені смарт-контрактами в SmartWeave, структурі смарт-контрактів для Arweave"
        ]

        const fact = variables[Math.floor(Math.random() * variables.length)];

        const embedUaInfo = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('О ArLet v4')
            .addFields([
                {name: `<:q_:1045650172144783410>  Що це за бот?`, value: `Цей бот створений для взаємодії з Arweave, HandShake, Stargaze та в майбутньому буде ще багато функціоналу. Для багатьох цей бот корисний функціоналом та цікавий.`, inline: true},
                {name: `<:f_:1045650173579235338>  Плани`, value: `[В планах](https://github.com/Alexcitten/ArLetDiscordBot#in-plans) | [Найближчий функціонал](https://github.com/Alexcitten/ArLetDiscordBot#the-closest-functionality) | [Наступне оновлення](https://github.com/Alexcitten/ArLetDiscordBot#next-update)`, inline: true},
                {name: `<:t_:1045650175080812594>  Статистика`, value: `Серверів: **${client.guilds.cache.size}**\n Пінг: **${client.ws.ping}**\n Пам'ять: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}** МБ / 64 ГБ | Хостинг на виділеному сервері\n Час роботи: **${duration}**\nHSD з'єднаннь: **${hsdresult}**`},
                {name: `<:c_:1045650170370588674>  Інше`, value: `От <a:alexciten_avatar:1045646847328399370> [Alexcitten#0001](https://alexcitten.dev/) | Discord.JS v14.2.0 | **[Вихідний код](https://github.com/Alexcitten/ArLetDiscordBot)**`}
            ])
            .setColor('#FF8747')
            .setFooter({ 
                text: `Корисні посилання: /invite | Чи знали Ви: ${fact}`, 
                iconURL: `${client.user.displayAvatarURL()}`
            });

            const embedUaLinks = new EmbedBuilder()
            .setTitle('Полезные ссылки')
            .addFields([
                {name: `<:web:1047492748539854858>  Веб-сайт`, value: `[Перейти →](https://arlet.tech)`, inline: true},
                {name: `<:addbot:1047492704352878733>  Додати бота`, value: `[Перейти →](https://discord.com/oauth2/authorize?client_id=631868778074079245&permissions=277025704960&scope=bot%20applications.commands)`, inline: true},
                {name: `<:dserver:1047492729430626384>  Діскорд сервер`, value: `[Перейти →](https://discord.gg/frZ9KAGgnG)`, inline: true},
                {name: `<:donate:1047492716474400798>  Донат`, value: `Arweave: \`0hw0sQxeBSPnpQ1dL4pjKGOqlIZnFuCWryNXl34o2bo\` або [гроші](https://alexcitten.diaka.ua/donate)`, inline: true}
            ])
            .setColor('#FF8747')
            .setFooter({ 
                text: `Про бота: /botinfo | Чи знали Ви: ${fact}`, 
                iconURL: `${client.user.displayAvatarURL()}` 
            });

            const embedUaHelp = new EmbedBuilder()
        .setTitle(`Список команд`)
        .addFields([
            {name: `<:wallet:1047085806696808538>  Arweave`, value: `❯ \`/createwallet\` - **Створити AR гаманець**\n ❯ \`/balance\` - **Перевірити AR баланс**\n ❯ \`/arsend\` - **Надіслати AR**\n ❯ \`/ardrivesend\` - **Надіслати смарт-токен ArDrive**\n\`/uploaddata\` - **Завантажити дані в основну мережу Arweave**\n \`/information\` - **Про Arweave**`, inline: true},
            {name: `<:beta1:1056241303240839211><:beta2:1056241301605056542>  Handshake`, value: `❯ \`/createwallet\` - **Створити HNS гаманець**\n ❯ \`/received\` - **Загальна сума, отримана на вказану адресу**\n ❯ \`/nameinfo\` - **Інформація про домен**\n ❯ \`/utxoinfo\` - **Інформація про UTXO з Chain**\n\`/gettxout\` - ***Отримати вихідну точку транзакції**\n \`/sendhns\` - **Створити та шаблон транзакції (корисно для multisig). Не транслює та не додає до гаманця.**\n\`/validateaddress\` - **Перевіряє адресу**\n\`/signtx\` - **Підпис транзакції (корисно для multisig)**`, inline: true},
            {name: `<:dac:1047085787864379392>  Інше`, value: `❯ \`/help\` - **Список команд**\n ❯ \`/botinfo\` - **Про бота**\n ❯ \`/invite\` - **Корисні посилання**`, inline: true}        ])
        .setColor('#FF8747')

        const helprow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Веб-сайт')
                .setURL('https://arlet.tech')
                .setStyle(ButtonStyle.Link)
                .setEmoji('1047087115474841700'),

                new ButtonBuilder()
                .setLabel('Документація')
                .setURL('https://arlet.gitbook.io/docs/')
                .setStyle(ButtonStyle.Link)
                .setEmoji('1047087115474841700')
            )

        if(interaction.customId === 'info') {
            return interaction.reply({
                embeds: [embedUaInfo],
                ephemeral: true
           })
        }

        if(interaction.customId === 'helpmecap') {
            return interaction.reply({
                embeds: [embedUaHelp],
                ephemeral: true,
                components: [helprow]
           })
        }

        if(interaction.customId === 'arua') {
            return interaction.reply({
                embeds: [embedUaAr],
                ephemeral: true
           })
        }

        if(interaction.customId === 'links') {
            return interaction.reply({
                embeds: [embedUaLinks],
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
const redstone = require('redstone-api');
const axios = require("axios");
const {ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle} = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const {NodeClient} = require('hs-client');
const {Network} = require('hsd');
const network = Network.get('main');

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (interaction.isButton()) {

        const clientOptions = {
            port: network.rpcPort,
            apiKey: 'arlet-api-key'
        }
              
          const HSDclient = new NodeClient(clientOptions);
    
          const hsdresult = await HSDclient.execute('getconnectioncount');

       async function getCurrentARPricePerGB() {
        const response = await axios.get("https://arweave.net/price/1073741824");
        return response.data * 0.000000000001;
      }
      
          const priceFeed = await redstone.getPrice("AR");
          const arPricePerGB = await getCurrentARPricePerGB();
          const usdPricePerGB = arPricePerGB * priceFeed.value;
          const usdPricePerGBFormatted = +usdPricePerGB.toFixed(2);

          const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

       const embedUaAr = new EmbedBuilder()
       .setTitle('Ознайомлення з Arweave')
       .setDescription('Arweave — це блокчейн-протокол для децентралізованого вічного зберігання даних. Це новий протокол для зберігання даних у структурі, схожій на блокчейн, під назвою Blockweave. Він створений на основі нового консенсусного механізму підтвердження доступу, який вперше робить доступним справді недороге зберігання даних. [Ну або так буде зрозуміліше](https://arweave.medium.com/what-is-arweave-explain-like-im-five-425362144eb5)')
       .addFields([
           {name: `**Зрозумів. А як щодо смарт-контрактів?**`, value: `Загалом смарт-контракти — це програми, які працюють на блокчейні, коли виконуються заздалегідь визначені умови. Вони автоматично виконують події або дії відповідно до умов контракту. Розумні контракти розгортаються в блокчейні і не контролюються користувачем – вони виконуються так, як їх було запрограмовано. Облікові записи користувачів взаємодіють із контрактом, надаючи транзакції, які виконують функції з контракту.`, inline: true},
           {name: `**AR токен це..?**`, value: `AR є нативним токеном мережі Arweave. Якщо ви хочете зберігати дані на Arweave, вам потрібно купити токени AR, щоб заплатити за зберігання даних. Якщо ви орендуєте місце для зберігання, вам також платитимуть у AR. AR має обмежену пропозицію в 66 мільйонів, і їх можна купувати та торгувати на більшості провідних бірж криптовалют.`, inline: true},
           {name: `**Що таке ArDrive?**`, value: `ArDrive — це не просто ще один хмарний сервіс зберігання. Це постійне сховище даних, що означає, що будь-які файли, які ви завантажуєте в ArDrive, переживуть вас! [Токени ArDrive](https://ardrive.io/what-are-ardrive-tokens/) не використовуються для оплати за завантаження ваших даних на ArDrive – саме для цього призначений токен Arweave (AR). Натомість токени ArDrive мають дві основні мети: Винагороди: отримуйте частку підказок, отриманих від усіх транзакцій ArDrive у мережі. Для управління: можливість голосувати за стратегічний напрям програми та спільноти.`, inline: true},
           {name: `**Another Money**`, value: `Я також хотів розповісти вам про [Another Money](https://another.money), перший по-справжньому децентралізований, розумний і дешевий токен для використання в смарт-контрактах SmartWeave і перший серйозний не-PST-токен на основі блокчейну Arweave.`, inline: true},
           {name: `**Корисні посилання**`, value: `[Усе про Arweave](https://arwiki.wiki/#/en/main) ➥ [Що таке блокчейн?](https://academy.warp.cc/tutorials/elementary/blockchain) ➥ [Про смарт-контракти](https://academy.warp.cc/tutorials/elementary/smartweave) ➥ [Навколишнє середовище](https://academy.warp.cc/tutorials/elementary/environment) ➥ [Ціна AR](https://app.redstone.finance/#/app/token/AR)`, inline: true}
       ])
       .setFooter({ 
           text: `Ціна AR: $${priceFeed.value} | $${usdPricePerGBFormatted} = 1 ГБ даних`, 
           iconURL: 'https://cdn.discordapp.com/emojis/712228732387196958.webp?size=240&quality=lossless'
       })
       .setColor('#FF8747')
       .setImage('https://media.discordapp.net/attachments/976860669926309970/1047565717584752680/2022-11-30_20.31.54.png')

        const variables = [
            "Собаку власника бота звуть Сірі",
            "Arweave — це протокол, який дозволяє зберігати дані постійно, стабільно, за єдину авансову плату.",
            "Підписи транзакцій Arweave — це криптографічний спосіб довести, що пара відкритих і закритих ключів є справжнім ініціатором транзакції.",
            "Підпис RSA — це 512-байтний ключ, але коли ми беремо його хеш SHA-256, ми отримуємо ідентифікатор транзакції. Це означає, що неможливо дізнатися ідентифікатор транзакції, доки вона не буде підписана",
            "Arweave.app — це веб-гаманець, що означає, що це лише деякий код, який працює в іншій вкладці вашого браузера.",
            "Токени розподілу прибутку (PST) — це простий механізм, створений за допомогою SmartWeave, який розподіляє надходження від будь-якого потоку доходу на permaweb",
            "Чеканивши токен розподілу прибутку для потоку доходу, користувачі та розробники можуть торгувати пропорціями майбутнього прибутку від активів, торгуючи самим жетоном розподілу прибутку",
            "Шлюзи — це механізм, за допомогою якого користувачі переглядають вміст у permaweb, що дозволяє користувачам спрямовувати свій немодифікований веб-браузер на ідентифікатор транзакції в мережі Arweave та відображати вміст локально",
            "Процес майнінгу в мережі Arweave розроблено для максимального збільшення кількості реплікацій набору даних. Цей процес обертається навколо створення та тестування великої кількості коротких доказів довільного доступу (SPoRA) у кожному виробництві блоку. період.",
            "Під час генерації блоку підпростір пошуку в масштабі мережі (10% мережі) вибирається для вузлів, з яких зчитуються випадкові дані.",
            "Метадані блоку-кандидата та випадкове число (nonce) хешуються разом за допомогою RandomX.",
            "Токени вивільняються з графіка інфляції, а також ендавмент (у відповідних випадках) майнерам, які виробляють блоки.",
            "Обмеження на простір пошуку в мережі використовується для того, щоб заохочувати майнерів зберігати дані, які не так добре тиражуються в мережі",
            "Спільноти розподілу прибутку (PSC) — це механізм, за допомогою якого розробники можуть виражати права власності та управління своїм додатком permaweb у коді. Ці організації представлені смарт-контрактами в SmartWeave, структурі смарт-контрактів для Arweave"
        ]

        const fact = variables[Math.floor(Math.random() * variables.length)];

        const embedUaInfo = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('О ArLet v4')
            .addFields([
                {name: `<:q_:1045650172144783410>  Що це за бот?`, value: `Цей бот створений для взаємодії з Arweave, HandShake, Stargaze та в майбутньому буде ще багато функціоналу. Для багатьох цей бот корисний функціоналом та цікавий.`, inline: true},
                {name: `<:f_:1045650173579235338>  Плани`, value: `[В планах](https://github.com/Alexcitten/ArLetDiscordBot#in-plans) | [Найближчий функціонал](https://github.com/Alexcitten/ArLetDiscordBot#the-closest-functionality) | [Наступне оновлення](https://github.com/Alexcitten/ArLetDiscordBot#next-update)`, inline: true},
                {name: `<:t_:1045650175080812594>  Статистика`, value: `Серверів: **${client.guilds.cache.size}**\n Пінг: **${client.ws.ping}**\n Пам'ять: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}** МБ / 64 ГБ | Хостинг на виділеному сервері\n Час роботи: **${duration}**\nHSD з'єднаннь: **${hsdresult}**`},
                {name: `<:c_:1045650170370588674>  Інше`, value: `От <a:alexciten_avatar:1045646847328399370> [Alexcitten#0001](https://alexcitten.dev/) | Discord.JS v14.2.0 | **[Вихідний код](https://github.com/Alexcitten/ArLetDiscordBot)**`}
            ])
            .setColor('#FF8747')
            .setFooter({ 
                text: `Корисні посилання: /invite | Чи знали Ви: ${fact}`, 
                iconURL: `${client.user.displayAvatarURL()}`
            });

            const embedUaLinks = new EmbedBuilder()
            .setTitle('Полезные ссылки')
            .addFields([
                {name: `<:web:1047492748539854858>  Веб-сайт`, value: `[Перейти →](https://arlet.tech)`, inline: true},
                {name: `<:addbot:1047492704352878733>  Додати бота`, value: `[Перейти →](https://discord.com/oauth2/authorize?client_id=631868778074079245&permissions=277025704960&scope=bot%20applications.commands)`, inline: true},
                {name: `<:dserver:1047492729430626384>  Діскорд сервер`, value: `[Перейти →](https://discord.gg/frZ9KAGgnG)`, inline: true},
                {name: `<:donate:1047492716474400798>  Донат`, value: `Arweave: \`0hw0sQxeBSPnpQ1dL4pjKGOqlIZnFuCWryNXl34o2bo\` або [гроші](https://alexcitten.diaka.ua/donate)`, inline: true}
            ])
            .setColor('#FF8747')
            .setFooter({ 
                text: `Про бота: /botinfo | Чи знали Ви: ${fact}`, 
                iconURL: `${client.user.displayAvatarURL()}` 
            });

            const embedUaHelp = new EmbedBuilder()
        .setTitle(`Список команд`)
        .addFields([
            {name: `<:wallet:1047085806696808538>  Arweave`, value: `❯ \`/createwallet\` - **Створити AR гаманець**\n ❯ \`/balance\` - **Перевірити AR баланс**\n ❯ \`/arsend\` - **Надіслати AR**\n ❯ \`/ardrivesend\` - **Надіслати смарт-токен ArDrive**\n\`/uploaddata\` - **Завантажити дані в основну мережу Arweave**\n \`/information\` - **Про Arweave**`, inline: true},
            {name: `<:wallet:1047085806696808538>  Handshake`, value: `❯ \`/createwallet\` - **Створити HNS гаманець**\n ❯ \`/received\` - **Загальна сума, отримана на вказану адресу**\n ❯ \`/nameinfo\` - **Інформація про домен**\n ❯ \`/utxoinfo\` - **Інформація про UTXO з Chain**\n\`/gettxout\` - ***Отримати вихідну точку транзакції**\n \`/sendhns\` - **Створити та шаблон транзакції (корисно для multisig). Не транслює та не додає до гаманця.**\n\`/validateaddress\` - **Перевіряє адресу**\n\`/signtx\` - **Підпис транзакції (корисно для multisig)**`, inline: true},
            {name: `<:dac:1047085787864379392>  Інше`, value: `❯ \`/help\` - **Список команд**\n ❯ \`/botinfo\` - **Про бота**\n ❯ \`/invite\` - **Корисні посилання**`, inline: true}        ])
        .setColor('#FF8747')

        const helprow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Веб-сайт')
                .setURL('https://arlet.tech')
                .setStyle(ButtonStyle.Link)
                .setEmoji('1047087115474841700'),

                new ButtonBuilder()
                .setLabel('Документація')
                .setURL('https://arlet.gitbook.io/docs/')
                .setStyle(ButtonStyle.Link)
                .setEmoji('1047087115474841700')
            )

        if(interaction.customId === 'info') {
            return interaction.reply({
                embeds: [embedUaInfo],
                ephemeral: true
           })
        }

        if(interaction.customId === 'helpmecap') {
            return interaction.reply({
                embeds: [embedUaHelp],
                ephemeral: true,
                components: [helprow]
           })
        }

        if(interaction.customId === 'arua') {
            return interaction.reply({
                embeds: [embedUaAr],
                ephemeral: true
           })
        }

        if(interaction.customId === 'links') {
            return interaction.reply({
                embeds: [embedUaLinks],
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
