"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlbumsSchema extends Schema {
  up() {
    this.create("albums", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name", 100).notNullable();
      table.string("cover_url", 254).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("albums");
  }
}

module.exports = AlbumsSchema;
