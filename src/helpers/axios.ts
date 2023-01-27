import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const baseURL = 'https://kitsu.io/api/oauth';

const data = axios({
  method: 'post',
  url: `${baseURL}/token`,
  auth: {
    username: clientId!,
    password: clientSecret!
  },
  data: {
    grant_type: 'password',
    username: 'fabricio',
    password: process.env.KITSU_ACCOUNT_PASSWORD
  },
  headers: {
    'Content-Type': 'application/json'
  }
})

export const api = axios.create({
  baseURL: 'https://kitsu.io/api/edge/anime',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${data.then(response => response.data.access_token)}`
  }
})
