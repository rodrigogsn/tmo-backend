"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlbumsSchema extends Schema {
  up() {
    this.create("albums", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("job_category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("job_categories")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("cover_url");
      table.timestamps();
    });
  }

  down() {
    this.drop("albums");
  }
}

module.exports = AlbumsSchema;
