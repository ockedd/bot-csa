const { Telegraf, Markup, HTML, Scenes, session } = require('telegraf')
const { bottoken } = require("./config/config");
const { channelid } = require("./config/config");
const { adminid } = require("./config/config");
const bot = new Telegraf(bottoken)
const { ref, get, child, set, update } = require("firebase/database");
const db = require("./bd.js");
const fs = require('fs');
const addFilmScene = require('./scenes/addfilm');
const scene = require("./scenes/addfilm");
const stage = new Scenes.Stage([ addFilmScene ])
bot.use(session());
bot.use(stage.middleware());
const checkMember = async (chatId, memberId) => {
    const info = await bot.telegram.getChatMember(chatId, memberId);
    if(info.status == "left") return false;
    return true;   
}

bot.command('start', async (ctx) => {
    let value = await get(child(ref(db), "users/" + ctx.chat.id))
    value = value.val();
    if(ctx.chat.username == undefined) {
        await update(child(ref(db), "users/" + ctx.chat.id), {"username": 'undefined'})
       try { await ctx.replyWithHTML('<b>🎬Привет любитель кино! Прежде чем начать пользоваться нашим ботом, подпишись: </b>' + '\n\n<a href="https://t.me/+bc9MOZxFDH0yNjEy">FilmClips</a>' + '\n\n<i>После подписки нажми на кнопку "Проверить подписку✅"</i>',
        Markup.inlineKeyboard([
            [Markup.button.callback('Проверить подписку✅','podpiska')]
        ])
        )
    } catch {

    }
        return
    } if(value == null) { 
        await update(child(ref(db), "users/" + ctx.chat.id), {"username": ctx.chat.username})
    }
   try { await ctx.replyWithHTML('<b>🎬Привет любитель кино! Прежде чем начать пользоваться нашим ботом, подпишись: </b>' + '\n\n<a href="https://t.me/+bc9MOZxFDH0yNjEy">FilmClips</a>' + '\n\n<i>После подписки нажми на кнопку "Проверить подписку✅"</i>',
    Markup.inlineKeyboard([
        [Markup.button.callback('Проверить подписку✅','podpiska')]
    ])
    )
} catch {

}
})
bot.action("podpiska", async (ctx) => {
    const checked = await checkMember(channelid, ctx.chat.id)
    if(!checked) return ctx.editMessageText("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithHTML('<b>Добро пожаловать ' + ctx.from.first_name + '</b>!\n\n<i>Доступ к базе данных открыт\n\nНажмите на кнопку </i><b>🔎 Найти фильм</b>',
    Markup.keyboard([
        ['🔎 Найти фильм']
    ]).resize()
    )
})
bot.hears('🔎 Найти фильм', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) 
    return ctx.replyWithHTML('<b>🎬Привет любитель кино! Прежде чем начать пользоваться нашим ботом, подпишись: </b>' + '\n\n<a href="https://t.me/+bc9MOZxFDH0yNjEy">FilmClips</a>' + '\n\n<i>После подписки нажми на кнопку "Проверить подписку✅"</i>',
    Markup.inlineKeyboard([
    [Markup.button.callback('Проверить подписку✅','podpiska')]
    ])
    )
    await ctx.replyWithAnimation({ source: fs.ReadStream('gifs/4d760df972f6fcbe080c3cc9a3095ed8_w200.gif') }, { caption: '<b>🎥Введи только код фильма</b>', parse_mode: 'HTML'})
})
bot.hears('200', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/3lishniy.jpeg") }, { caption: "🎬Название: <b>Третий лишний</b>\n🗣️Жанр: <b>Комедия</b>\n🗨️Оценка: <b>6.7/10</b>\n💢Возрастное ограничение: <b>18+</b>", parse_mode: "HTML"});
})
bot.hears('201', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/millionsposobovpoteryatgolovu.jpg") }, { caption: "🎬Название: <b>Миллион способов потерять голову</b>\n🗣️Жанр: <b>Комедия</b>\n🗨️Оценка: <b>6.2/10</b>\n💢Возрастное ограничение: <b>18+</b>", parse_mode: "HTML"});
})
bot.hears('202', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/glavniy_geroy.jpeg") }, { caption: "🎬Название: <b>Главный герой</b>\n🗣️Жанр: <b>Комедия/Боевик</b>\n🗨️Оценка: <b>7.4/10</b>\n💢Возрастное ограничение: <b>16+</b>", parse_mode: "HTML"});
})
bot.hears('203', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/dnevnikbasketbol.jpeg") }, { caption: "🎬Название: <b>Дневник баскетболиста</b>\n🗣️Жанр: <b>Драма/Независимое кино</b>\n🗨️Оценка: <b>7.8/10</b>\n💢Возрастное ограничение: <b>18+</b>", parse_mode: "HTML"});
})
bot.hears('204', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/brothers.jpeg") }, { caption: "🎬Название: <b>Братья 2009</b>\n🗣️Жанр: <b>Военный/Драма</b>\n🗨️Оценка: <b>7.4/10</b>\n💢Возрастное ограничение: <b>16+</b>", parse_mode: "HTML"});
})
bot.hears('205', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/vpritik.jpeg") }, { caption: "🎬Название: <b>Впритык 2010</b>\n🗣️Жанр: <b>Комедия</b>\n🗨️Оценка: <b>7.2/10</b>\n💢Возрастное ограничение: <b>16+</b>", parse_mode: "HTML"});
})
bot.hears('206', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/pochemuon.jpeg") }, { caption: "🎬Название: <b>Почему он</b>\n🗣️Жанр: <b>Комедия/Романтика</b>\n🗨️Оценка: <b>6.6/10</b>\n💢Возрастное ограничение: <b>18+</b>", parse_mode: "HTML"});
})
bot.hears('207', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/prizrak6.jpeg") }, { caption: "🎬Название: <b>Призрачная шестёрка</b>\n🗣️Жанр: <b>Боевик</b>\n🗨️Оценка: <b>6.1/10</b>\n💢Возрастное ограничение: <b>18+</b>", parse_mode: "HTML"});
})
bot.hears('208', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/Legend_2015.jpg") }, { caption: "🎬Название: <b>Легенда 2015</b>\n🗣️Жанр: <b>Криминальная драма</b>\n🗨️Оценка: <b>7.2/10</b>\n💢Возрастное ограничение: <b>18+</b>", parse_mode: "HTML"});
})
bot.hears('209', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/vechnost.jpeg") }, { caption: "🎬Название: <b>Вечность 2015</b>\n🗣️Жанр: <b>Фантастика/Драма/Криминал</b>\n🗨️Оценка: <b>8.2/10</b>\n💢Возрастное ограничение: <b>16+</b>", parse_mode: "HTML"});
})
bot.hears('210', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/pikseli.jpg") }, { caption: "🎬Название: <b>Пиксели</b>\n🗣️Жанр: <b>Комедия/Боевик/Фантастика</b>\n🗨️Оценка: <b>5.9/10</b>\n💢Возрастное ограничение: <b>12+</b>", parse_mode: "HTML"});
})
bot.hears('211', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/tachki.png") }, { caption: "🎬Название: <b>Тачки</b>\n🗣️Жанр: <b>Детский/Комедия</b>\n🗨️Оценка: <b>7.5/10</b>\n💢Возрастное ограничение: <b>6+</b>", parse_mode: "HTML"});
})
bot.hears('212', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/tachki2.png") }, { caption: "🎬Название: <b>Тачки 2</b>\n🗣️Жанр: <b>Детский/Комедия</b>\n🗨️Оценка: <b>6.8/10</b>\n💢Возрастное ограничение: <b>6+</b>", parse_mode: "HTML"});
})
bot.hears('213', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/tachki3.png") }, { caption: "🎬Название: <b>Тачки 3</b>\n🗣️Жанр: <b>Детский/Комедия</b>\n🗨️Оценка: <b>7.3/10</b>\n💢Возрастное ограничение: <b>6+</b>", parse_mode: "HTML"});
})
bot.hears('214', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/t-34.jpg") }, { caption: "🎬Название: <b>Т-34</b>\n🗣️Жанр: <b>Военный/Боевик</b>\n🗨️Оценка: <b>6.6/10</b>\n💢Возрастное ограничение: <b>12+</b>", parse_mode: "HTML"});
})
bot.hears('215', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/volkstreet.png") }, { caption: "🎬Название: <b>Волк с Уолл-стрит</b>\n🗣️Жанр: <b>Комедия</b>\n🗨️Оценка: <b>7.9/10</b>\n💢Возрастное ограничение: <b>18+</b>", parse_mode: "HTML"});
})
bot.hears('216', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/boyskaut.png") }, { caption: "🎬Название: <b>Последний бойскаут</b>\n🗣️Жанр: <b>Боевик/Комедия</b>\n🗨️Оценка: <b>7.7/10</b>\n💢Возрастное ограничение: <b>18+</b>", parse_mode: "HTML"});
})
bot.hears('217', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/focus.jpeg") }, { caption: "🎬Название: <b>Фокус</b>\n🗣️Жанр: <b>Романтика/Криминал</b>\n🗨️Оценка: <b>7.6/10</b>\n💢Возрастное ограничение: <b>18+</b>", parse_mode: "HTML"});
})
bot.hears('218', async (ctx) => {
    const checked2 = await checkMember(channelid, ctx.chat.id)
    if(!checked2) return ctx.reply("❌ТЫ НЕ ПОДПИСАЛСЯ НА КАНАЛ❌");
    ctx.replyWithPhoto({ source: fs.ReadStream("films/malibu.jpg") }, { caption: "🎬Название: <b>Спасатель Малибу</b>\n🗣️Жанр: <b>Комедия/Боевик</b>\n🗨️Оценка: <b>8.1/10</b>\n💢Возрастное ограничение: <b>18+</b>", parse_mode: "HTML"});
})
bot.hears('/adminpanel', async (ctx) => {
    if(ctx.from.id == adminid) {
    ctx.reply('Твоя личная панель для отображения статистики:', {
        reply_markup: {
        inline_keyboard: [
            [
                {text: 'Статистика юзеров', callback_data: 'stata'},
                {text: 'Добавить фильм', callback_data: 'filmadd'}
            ]
        ]
        }
    })
   }})
bot.action('stata', async (ctx) => {
   let users = await get(child(ref(db), "users")).then(users => {
    users = users.val();
    ctx.answerCbQuery('🌐Пользователей: ' + Object.keys(users).length);
    })
})
bot.action('filmadd', async (ctx) => ctx.scene.enter('addFilmScene'))
bot.hears('300', (ctx) => { 
    try {ctx.replyWithPhoto({url: urll}, {caption: '🎬Название: <b>' + film + '</b>' + '\n🗣️Жанр: <b>' + zanr + '</b>' + '\n🗨️Оценка: <b>' + rait + '</b>' + '\n💢Возрастное ограничение: <b>' + ogran + '</b>', parse_mode: 'HTML'}) }
    catch {
    }
})
console.log('Запустил бота')
bot.launch()