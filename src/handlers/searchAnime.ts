import TelegramBot from "node-telegram-bot-api";

export function searchAnime(bot: TelegramBot) {
  bot.onText(/\/buscar/, (message: TelegramBot.Message) => {
    const poster = "https://media.kitsu.io/anime/poster_images/12/original.png"
    const captionMessage = "📅 **Início: 20/10/1993**\n🔜 Próximo episódio: 29/01/2023\n🚦 Status: em andamento\n🌎 Titulo em inglês: One Piece\n📖 Titulo canônico: One Piece\n🔞 NSFW: não\n🎥 Trailer: https://www.youtube.com/watch?v=CmTeYj2FmRc\n📺 Streaming: Funimation, Crunchyroll, Hulu, VRV"
    bot.sendPhoto(message.chat.id, poster, {
      reply_markup: {
        inline_keyboard: [
          [{
            text: 'Explorar',
            callback_data: 'search_anime'
          }]
        ]
      },
      caption: captionMessage
    })
  })
}