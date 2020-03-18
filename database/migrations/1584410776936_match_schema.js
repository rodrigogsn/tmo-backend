"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MatchSchema extends Schema {
  up() {
    this.create("matches", table => {
      table.increments();
      table
        .integer("job_id")
        .unsigned()
        .references("id")
        .inTable("jobs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("worker_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.boolean("worker_selected");
      table.timestamps();
    });
  }

  down() {
    this.drop("matches");
  }
}

module.exports = MatchSchema;
