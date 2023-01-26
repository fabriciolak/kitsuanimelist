import TelegramBot from "node-telegram-bot-api";

export function searchAnimeCallback(bot: TelegramBot, callbackQuery: TelegramBot.CallbackQuery) {
  const anime = callbackQuery.message?.text
  
  bot.answerCallbackQuery(callbackQuery.id)
  
  bot.sendMessage(callbackQuery.message?.chat.id!, 'oi')
}