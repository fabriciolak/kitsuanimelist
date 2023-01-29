import TelegramBot from "node-telegram-bot-api";
import open from 'open'

export async function searchAnimeCallback(bot: TelegramBot, callbackQuery: TelegramBot.CallbackQuery) {
  try {
    const prefix = "open_browser_kitsu_"
    const animeSlug = callbackQuery.data?.replace(prefix, "").split('_')[0]
    const url = `https://kitsu.io/anime/${animeSlug}`

    if (callbackQuery.data?.includes(prefix)) {
      bot.answerCallbackQuery(callbackQuery.id)
      
      await open(url)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log('open error', err);  
        })
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
    }

  } catch (error) {
    console.error(`watchAnimeTrailer error: `, error);
    
  }
}