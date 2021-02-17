exports.up = function(knex) {
    return knex.schema.withSchema('dispatcher').createTable('crons', table => {
        table.increments('id').primary()
        table.string('url').notNull()
        table.string('description', 1000).notNull()
        table.string('period').notNull()
        table.timestamps()
        table.integer('id_queue').references('id')
            .inTable('dispatcher.queues').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.withSchema('dispatcher').dropTable('crons')
};
