export async function seed(knex) {
  await knex('seen').del()
  await knex('seen').insert([
    { content_id: 1, movie_or_show: 'movie', auth_id: 3 },
    { content_id: 2, movie_or_show: 'show', auth_id: 2 },
    { content_id: 4, movie_or_show: 'movie', auth_id: 6 },
  ])
}
