"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class WorkerPreferenceSchema extends Schema {
  up() {
    this.create("worker_preferences", (table) => {
      table.increments();
      table.boolean("active").notNullable().defaultTo(true);
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
      table.integer("album_id").unsigned().notNullable().defaultTo(0);
      table.integer("min_budget_hour").notNullable().defaultTo(0);
      table.integer("max_budget_hour").notNullable().defaultTo(5000);
      table.integer("min_budget_event").notNullable().defaultTo(0);
      table.integer("max_budget_event").notNullable().defaultTo(5000);
      table.integer("min_range").notNullable().defaultTo(0);
      table.integer("max_range").notNullable().defaultTo(200);
      table.boolean("transport_help").notNullable().defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("worker_preferences");
  }
}

module.exports = WorkerPreferenceSchema;
