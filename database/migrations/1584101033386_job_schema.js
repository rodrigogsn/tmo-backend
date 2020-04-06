"use strict";

const Schema = use("Schema");

class JobSchema extends Schema {
  up() {
    this.create("jobs", table => {
      table.increments();
      table
        .integer("owner_id")
        .unsigned()
        .notNullable()
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
      table.string("status", 1).notNullable(); // Open (O), Taken (T), Done (D), Cancelled (C)
      table.string("name", 100).notNullable();
      table.text("description").notNullable();
      table.integer("value").notNullable();
      table.string("location", 254).notNullable();
      table.string("zipcode", 80).notNullable();
      table.integer("schedule", 80).notNullable(); //this is a timestamp
      table.timestamps();
    });
  }

  down() {
    this.drop("jobs");
  }
}

module.exports = JobSchema;
