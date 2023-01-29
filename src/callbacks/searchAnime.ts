import TelegramBot from "node-telegram-bot-api";
import open from 'open'
import { exec } from 'child_process'

export async function searchAnimeCallback(bot: TelegramBot, callbackQuery: TelegramBot.CallbackQuery) {
  try {
    const prefix = "open_browser_kitsu_"
    const animeSlug = callbackQuery.data?.replace(prefix, "").split('_')[0]
    const url = `https://kitsu.io/anime/${animeSlug}`

    if (callbackQuery.data?.includes(prefix)) {
      bot.answerCallbackQuery(callbackQuery.id)
      await open(url, { wait: true })
      bot.sendMessage(callbackQuery.message?.chat.id!, `Se o link não abriu automaticamente, acesse-o manualmente clicando aqui: ${url}`)
    }
  } catch (error) {
    console.error(`searchAnimeCallback error: `, error);
    
  }

}

export async function watchAnimeTrailer(bot: TelegramBot, callbackQuery: TelegramBot.CallbackQuery) {
  try {
    const prefix = "open_browser_youtube_"
    const videoId = callbackQuery.data?.replace(prefix, "").split('_')[0]
    const url = `https://www.youtube.com/watch?v=${videoId}`

    if (callbackQuery.data?.includes(prefix)) {
      bot.answerCallbackQuery(callbackQuery.id)
      await open(url, { wait: true })
      bot.sendMessage(callbackQuery.message?.chat.id!, `Se o link não abriu automaticamente, acesse-o manualmente clicando aqui: ${url}`)
    }

  } catch (error) {
    console.error(`watchAnimeTrailer error: `, error);
    
  }
}