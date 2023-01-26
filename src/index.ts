import telegramBot from './services/telegram'
import dotenv from 'dotenv'
dotenv.config()

function init() {
  const args = process.argv

  if (args.includes('telegram')) {
    telegramBot()
    console.log('Bot is running 👻')
  }
}

init()