"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class WorkerPreferenceSchema extends Schema {
  up() {
    this.create("worker_preferences", table => {
      table.increments();
      table
        .boolean("active")
        .notNullable()
        .defaultTo(true);
      table
        .integer("worker_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("job_category")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("job_categories")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("album_id")
        .unsigned()
        .notNullable()
        .defaultTo(0);
      // .references("id")
      // .inTable("albums")
      // .onUpdate("CASCADE")
      // .onDelete("CASCADE");
      table
        .integer("max_budget")
        .notNullable()
        .defaultTo(0);
      table
        .integer("min_budget")
        .notNullable()
        .defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("worker_preferences");
  }
}

module.exports = WorkerPreferenceSchema;
