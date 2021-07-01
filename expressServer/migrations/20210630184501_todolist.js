
exports.up = function(knex) {
  return knex.schema.createTable('todolist', table => {
    table.increments('id');
    table.string('title').notNullable();
    table.string('category').notNullable();
    table.string('date').notNullable();
})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('todolist');
};
