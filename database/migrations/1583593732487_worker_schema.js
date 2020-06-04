"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class WorkerSchema extends Schema {
  up() {
    this.create("workers", (table) => {
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
      table.string("gender").notNullable();
      table.string("name").notNullable();
      table.string("document").unique().notNullable();
      table.string("birthdate", 20).notNullable();
      table.string("phone").notNullable();
      table.string("address");
      table.string("additional");
      table.string("number");
      table.string("district");
      table.string("city").notNullable();
      table.string("state");
      table.string("nationality").notNullable();
      table.string("zipcode");
      table.string("body_type");
      table.string("hair");
      table.string("eyes");
      table.integer("height");
      table.integer("bust");
      table.integer("waist");
      table.integer("hips");
      table.boolean("smoker").defaultTo(false);
      table.string("avatar", 255);
      table.string("cover", 255);
      table.string("languages");
      table.string("hobbies");
      table.text("bio");
      table.string("account_name", 100).notNullable();
      table.string("account_number", 100).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("workers");
  }
}

module.exports = WorkerSchema;
