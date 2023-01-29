import telegramBot from './services/telegram'
import dotenv from 'dotenv'
dotenv.config()

function init() {
  telegramBot()

  console.log('👻');
}

init()