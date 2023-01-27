import axios from "axios";
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

    // status: "current" | "finished" | "tba" | "unreleased" | "upcoming"
  
    const translateStatus = {
      current: 'Em exibição',
      finished: 'Finalizado',
      tba: 'A ser anunciado',
      unreleased: 'Não lançado',
      upcoming: 'Próximo a ser lançado'
    }
    
    const ageRating = {
      G: 'Classificação para todos os públicos',
      PG: 'Recomendação de orientação dos pais',
      R: 'Restrito',
      R18: 'Conteúdo explícito para maiores de 18 anos',
    }

    const captionMessage = `Inglês: ${animeData.titles.en}\nJaponês (Romaji): ${animeData.titles.en_jp}\nJaponês: ${animeData.abbreviatedTitles}\nTipo: ${animeData.showType}\nStatus: ${translateStatus[animeData.status]}\nPeríodo de exibição: ${format(new Date(animeData.startDate), "dd 'de' MM 'de' yyyy", {
      locale: ptBr,
    })}\nClassificação: ${ageRating[animeData.ageRating]}\nDuração: ${animeData.episodeLength} minuto cada`

    bot.sendPhoto(message.chat.id, animeData.posterImage.original, {
      reply_markup: {
        inline_keyboard: [
          [{
            text: 'Explorar',
            callback_data: 'search_anime'
          }],
          [{
            text: 'Assistir Trailer',
            callback_data: 'trailer_anime'
          }]
        ]
      },
      caption: captionMessage
    })
  })
}