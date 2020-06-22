"use strict";

const Schema = use("Schema");

class JobSchema extends Schema {
  up() {
    this.create("jobs", (table) => {
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
      table.integer("status").notNullable().unsigned().defaultTo(1); // Open (1), On Going (2), Done (3), Cancelled (4)
      table.string("description").notNullable();
      table.string("start_date").notNullable();
      table.string("start_time").notNullable();
      table.string("expire_date").notNullable();
      table.string("expire_time").notNullable();
      table.string("location").notNullable();
      table.integer("worker_number").notNullable().defaultTo(1);
      table.string("worker_gender");
      table.integer("min_distance").notNullable().defaultTo(0);
      table.integer("max_distance").notNullable().defaultTo(200);
      table.integer("min_age").notNullable().defaultTo(18);
      table.integer("max_age").notNullable().defaultTo(99);
      table.integer("min_rate").notNullable().defaultTo(1);
      table.integer("max_rate").notNullable().defaultTo(5);
      table.integer("price").notNullable();
      table.integer("price_type").notNullable().defaultTo(1); // Per hour (1), Per event (2)
      table.string("hours");
      table.boolean("transport_help").notNullable().defaultTo(0);
      table.integer("transport_value");
      table.timestamps();
    });
  }

  down() {
    this.drop("jobs");
  }
}

module.exports = JobSchema;
