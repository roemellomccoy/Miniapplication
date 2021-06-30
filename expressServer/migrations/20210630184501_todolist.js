
exports.up = function(knex) {
  return knex.schema.createTable('todolist', table => {
    table.increments('id');
    table.string('title').notNullable();
})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('todolist');
};
