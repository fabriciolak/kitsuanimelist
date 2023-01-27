import TelegramBot from "node-telegram-bot-api";

export function searchAnimeCallback(bot: TelegramBot, callbackQuery: TelegramBot.CallbackQuery) {
  const anime = callbackQuery.message?.text
  
  if (callbackQuery.data === 'search_anime') {
    bot.answerCallbackQuery(callbackQuery.id)
    bot.sendMessage(callbackQuery.message?.chat.id!, 'oi')
  }
  
}

export function watchAnimeTrailer(bot: TelegramBot, callbackQuery: TelegramBot.CallbackQuery) {
  const message = `Confira o trailer desse anime incrível aqui:\n\nhttps://www.youtube.com/watch?v=${callbackQuery.data}`
  bot.answerCallbackQuery(callbackQuery.id)
  bot.sendMessage(callbackQuery.message?.chat.id!, message)
}