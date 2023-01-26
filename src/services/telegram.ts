import TelegramBot from 'node-telegram-bot-api'

export default function telegramBot() {
  const token = process.env.TELEGRAM_TOKEN

  const bot = new TelegramBot(token as string, { polling: true })

  bot.onText(/\/start/, (message: TelegramBot.Message) => {
    const chatId = message.chat.id

    bot.sendMessage(chatId, 'oi 😁')
  })
}