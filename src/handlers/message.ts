import TelegramBot from "node-telegram-bot-api";

export function startCommand(bot: TelegramBot) {
  bot.onText(/\/start/, (message: TelegramBot.Message) => {
    const hello = "Bem-vindo ao meu bot!\n\nEstou aqui para te ajudar a encontrar informações incríveis sobre animes.\n\nEscreva /help para saber mais sobre minhas funcionalidades incríveis. 🚀"

    bot.sendMessage(message.chat.id, hello)
  })
}

export function helpCommand(bot: TelegramBot) {
  bot.onText(/\/help/, (message: TelegramBot.Message) => {
    const hello = "Opções disponíveis: \n/start - Iniciar conversa com o bot \n/listar - Listar os animes disponíveis \n/buscar - Buscar anime específico"

    bot.sendMessage(message.chat.id, hello)
  })
}