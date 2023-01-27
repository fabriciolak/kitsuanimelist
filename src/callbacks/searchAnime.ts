import TelegramBot from "node-telegram-bot-api";

export function searchAnimeCallback(bot: TelegramBot, callbackQuery: TelegramBot.CallbackQuery) {
  
  if (callbackQuery.data?.includes("kitsu.io")) {
    bot.answerCallbackQuery(callbackQuery.id)
    bot.sendMessage(callbackQuery.message?.chat.id!, `Acesse: ${callbackQuery.data}`)
  } else {
    return 
  }

}

export function watchAnimeTrailer(bot: TelegramBot, callbackQuery: TelegramBot.CallbackQuery) {
  const message = `Confira o trailer desse anime incrível aqui:\n\nhttps://www.youtube.com/${callbackQuery.data}`
  
  if (callbackQuery.data?.includes('watch?v=')) {
    bot.answerCallbackQuery(callbackQuery.id)
    bot.sendMessage(callbackQuery.message?.chat.id!, message)
  } else {
    return
  }

}