import TelegramBot from 'node-telegram-bot-api'
import { searchAnimeCallback, watchAnimeTrailer } from '../callbacks/searchAnime'
import { helpCommand, startCommand } from '../handlers/message'
import { searchAnime } from '../handlers/searchAnime'

export default function telegramBot() {
  const token = process.env.TELEGRAM_TOKEN

  const bot = new TelegramBot(token as string, { polling: true })

  startCommand(bot)
  helpCommand(bot)

  bot.setMyCommands([
    {
      command: 'start',
      description: 'Inicia o uso do bot, mostrando uma mensagem de boas-vindas e informando sobre as funcionalidades disponíveis.'
    },
    {
      command: 'help',
      description: 'O comando "/help" é usado para exibir informações sobre os comandos disponíveis no bot e como usá-los'
    },
    {
      command: 'buscar',
      description: 'Procura por animes de acordo com o título informado.'
    }
  ])

  // search anime

  searchAnime(bot)
  
  bot.on("callback_query", async (callbackQuery: TelegramBot.CallbackQuery) => {
    await searchAnimeCallback(bot, callbackQuery)
  })

  bot.on("callback_query", async (callbackQuery: TelegramBot.CallbackQuery) => {
    await watchAnimeTrailer(bot, callbackQuery)
  })
}