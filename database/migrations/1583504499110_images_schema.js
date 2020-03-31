"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ImagesSchema extends Schema {
  up() {
    this.create("images", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name", 100);
      table.string("url", 254);
      table.timestamps();
    });
  }

  down() {
    this.drop("images");
  }
}

module.exports = ImagesSchema;
