export async function up(knex) {
  await knex.schema.createTable('seen', (table) => {
    table.increments('id').primary()
    table.integer('content_id')
    table.string('movie_or_show')
    table.integer('auth_id')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('seen')
}
