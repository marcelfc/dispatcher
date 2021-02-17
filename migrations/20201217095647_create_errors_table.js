exports.up = function(knex) {
    return knex.schema.withSchema('dispatcher').createTable('error', table => {
        table.increments('id').primary()
        table.string('url').notNull()
        table.string('system').notNull()
        table.text('error').notNull()
        table.timestamp('created_at').notNull().defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.withSchema('dispatcher').dropTable('error')
};
