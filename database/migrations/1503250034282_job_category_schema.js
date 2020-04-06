const Schema = use("Schema");

class JobCategorySchema extends Schema {
  up() {
    this.create("job_categories", table => {
      table.increments();
      table
        .integer("author_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .string("name", 100)
        .unique()
        .notNullable();
      table.text("description");
      table.timestamps();
    });
  }

  down() {
    this.drop("job_categories");
  }
}

module.exports = JobCategorySchema;
