
exports.up = function(knex) {
    return knex.schema.withSchema('dispatcher').createTable('queues', table => {
        table.increments('id').primary()
        table.string('description').notNull()
        table.string('system').notNull().unique()
        table.timestamps()
    })
};

exports.down = function(knex) {
    return knex.schema.withSchema('dispatcher').dropTable('queues')
};
