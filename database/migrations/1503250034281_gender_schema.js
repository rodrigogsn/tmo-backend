"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GenderSchema extends Schema {
  up() {
    this.create("genders", table => {
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
      table.timestamps();
    });
  }

  down() {
    this.drop("genders");
  }
}

module.exports = GenderSchema;
