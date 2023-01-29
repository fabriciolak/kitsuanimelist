import TelegramBot from "node-telegram-bot-api";
import open from "open";

export async function searchAnimeCallback(bot: TelegramBot, callbackQuery: TelegramBot.CallbackQuery) {
  const prefix = "open_browser_kitsu_"
  const animeSlug = callbackQuery.data?.replace(prefix, "").split('_')[0]
  
  if (callbackQuery.data?.includes(prefix)) {
    bot.answerCallbackQuery(callbackQuery.id)
    await open(`https://kitsu.io/anime/${animeSlug}`)
  } else {
    return 
  }

}

export async function watchAnimeTrailer(bot: TelegramBot, callbackQuery: TelegramBot.CallbackQuery) {
  const prefix = "open_browser_youtube_"
  const videoId = callbackQuery.data?.replace(prefix, "").split('_')[0]
  
  console.log('clicado');
  

  if (callbackQuery.data?.includes(prefix)) {
    bot.answerCallbackQuery(callbackQuery.id)
    await open(`https://www.youtube.com/watch?v=${videoId}`)
  } else {
    return
  }

}