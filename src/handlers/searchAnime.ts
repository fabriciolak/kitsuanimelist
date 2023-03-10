import { format } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import TelegramBot from "node-telegram-bot-api";
import { api } from "../helpers/axios";

interface Anime {
  data: {
    attributes: {
      slug: string
      titles: {
        en: string
        en_jp: string
        ja_jp: string
      }
      canonicalTitle: string
      abbreviatedTitles: string
      startDate: string
      endDate: string
      popularityRank: number
      ageRating: "G" | "PG" | "R" | "R18"
      status: "current" | "finished" | "tba" | "unreleased" | "upcoming"
      posterImage: {
        original: string
      }
      episodeLength: number
      episodeCount: number
      youtubeVideoId: string
      showType: "ONA" | "OVA" | "TV" | "movie" | "music" | "special"
      nsfw: boolean
    }
  }[]
}

export function searchAnime(bot: TelegramBot) {

  async function getAnimeData(name:string) {
    const response = await api.get<Anime>(`?filter[text]=${name}`)

    const animeData = {
      slug: response.data.data[0].attributes.slug,
      titles: response.data.data[0].attributes.titles,
      canonicalTitle: response.data.data[0].attributes.canonicalTitle,
      abbreviatedTitles: response.data.data[0].attributes.abbreviatedTitles,
      startDate: response.data.data[0].attributes.startDate,
      endDate: response.data.data[0].attributes.endDate,
      popularityRank: response.data.data[0].attributes.popularityRank,
      ageRating: response.data.data[0].attributes.ageRating,
      status: response.data.data[0].attributes.status,
      posterImage: response.data.data[0].attributes.posterImage,
      episodeLength: response.data.data[0].attributes.episodeLength,
      episodeCount: response.data.data[0].attributes.episodeCount,
      youtubeVideoId: response.data.data[0].attributes.youtubeVideoId,
      showType: response.data.data[0].attributes.showType,
      nsfw: response.data.data[0].attributes.nsfw
    }

    return {
      animeData,
      response: response.data.data
    }
    
  }

  bot.onText(/\/buscar (.+)/, async (message: TelegramBot.Message, match: RegExpExecArray | null) => {

    const { animeData } = await getAnimeData(match![1])

    const translateStatus = {
      current: 'Em exibi????o',
      finished: 'Finalizado',
      tba: 'A ser anunciado',
      unreleased: 'N??o lan??ado',
      upcoming: 'Pr??ximo a ser lan??ado'
    }
    
    const ageRating = {
      G: 'Classifica????o para todos os p??blicos',
      PG: 'Recomenda????o de orienta????o dos pais',
      R: 'Restrito',
      R18: 'Conte??do expl??cito para maiores de 18 anos',
    }

    const captionMessage = `Ingl??s: ${animeData.titles.en}\nJapon??s (Romaji): ${animeData.titles.en_jp}\nJapon??s: ${animeData.abbreviatedTitles}\nTipo: ${animeData.showType}\nStatus: ${translateStatus[animeData.status]}\nPer??odo de exibi????o: ${format(new Date(animeData.startDate), "dd 'do' MM 'de' yyyy", {
      locale: ptBr,
    })}\nClassifica????o: ${ageRating[animeData.ageRating]}\nDura????o: ${animeData.episodeLength} minuto cada`

    bot.sendPhoto(message.chat.id, animeData.posterImage.original, {
      reply_markup: {
        inline_keyboard: [
          [{
            text: 'Explorar',
            callback_data: `open_browser_kitsu_${animeData.slug}`
          }],
          [{
            text: 'Assistir Trailer',
            callback_data: `open_browser_youtube_${animeData.youtubeVideoId}`
          }]
        ]
      },
      caption: captionMessage
    })
  })
}