import connection from './connection.ts'
// import { Fruit, FruitSnakeCase, FruitData } from '../../models/fruit.ts'

interface User {
  auth_id: string
  genre: string
  time_to_watch: number
}
export function getContentIdByAuthId(auth_id: string, db = connection) {
  return db('watchlist').where('auth_id', auth_id).select('content_id')
}

export async function upsertProfile(user: User, db = connection) {
  await db('users').insert(user).onConflict('auth_id').merge()
}
