const telegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options')

const token = '5796072168:AAF0joMyAARJO1JTgaTXMxlWzCbZ5Z6qA6A';

const bot = new telegramApi(token, { polling: true })
const chats = {};


const startGame = async(chatId) => {
    await bot.sendMessage(chatId, 'I made a number from 0 to 9, try to guess');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Lets try', gameOptions);
}


const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Initial greeting' },
        { command: '/info', description: 'Get info about user' },
        { command: '/game', description: 'Play a game' }
    ])

    bot.on('message', async msg => {
        console.log(msg)
        const text = msg.text;
        const chatId = msg.chat.id;
        const userName = msg.from.first_name;
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/70a/f7c/70af7c3c-dc27-4a8a-b96d-c3585c4e1c5a/10.jpg')
            return bot.sendMessage(chatId, `Welcome ${userName}!`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Your name is ${userName}`)
        }
        if (text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, `Try agaaaain`)
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        console.log(data, chats[chatId])
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data == chats[chatId]) {
            return await bot.sendMessage(chatId, `You win!`, againOptions)
        }
        return await bot.sendMessage(chatId, `Next time you'll have luck. Bot number is ${chats[chatId]}`, againOptions)
    })
}

start()