"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class WorkerSchema extends Schema {
  up() {
    this.create("workers", table => {
      table.increments();
      table
        .integer("worker_id")
        .unique()
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("gender_id").notNullable(); //needs to relate to gender Model
      table.string("name", 100).notNullable();
      table.string("document", 100).unique();
      table.string("birthdate", 20).notNullable();
      table.string("location", 254).notNullable();
      table.string("zipcode", 80).notNullable();
      table.string("phone", 100);
      table.string("bio_title", 100);
      table.text("bio").notNullable();
      table.string("avatar", 254);
      table.string("cover", 254);
      table.timestamps();
    });
  }

  down() {
    this.drop("workers");
  }
}

module.exports = WorkerSchema;
