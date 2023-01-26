import TelegramBot from 'node-telegram-bot-api'
import { searchAnimeCallback } from '../callbacks/searchAnime'
import { helpCommand, startCommand } from '../handlers/message'
import { searchAnime } from '../handlers/searchAnime'

export default function telegramBot() {
  const token = process.env.TELEGRAM_TOKEN

  const bot = new TelegramBot(token as string, { polling: true })

  startCommand(bot)
  helpCommand(bot)


  // search anime

  searchAnime(bot)

  bot.on("callback_query", (callbackQuery: TelegramBot.CallbackQuery) => {
    searchAnimeCallback(bot, callbackQuery)
  })
}