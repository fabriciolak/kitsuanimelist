import TelegramBot from 'node-telegram-bot-api'
import { helpCommand, startCommand } from '../handlers/message'

export default function telegramBot() {
  const token = process.env.TELEGRAM_TOKEN

  const bot = new TelegramBot(token as string, { polling: true })

  startCommand(bot)
  helpCommand(bot)
}