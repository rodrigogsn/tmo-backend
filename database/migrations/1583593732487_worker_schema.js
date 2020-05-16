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
      table.string("gender", 100).notNullable();
      table.string("name", 255).notNullable();
      table.string("document", 100).unique().notNullable();
      table.string("birthdate", 20).notNullable();
      table.string("phone", 100).notNullable();
      table.string("city", 255).notNullable();
      table.string("nationality", 255).notNullable();
      table.string("zipcode", 100);
      table.boolean("smoker").defaultTo(false);
      table.text("bio");
      table.string("avatar", 255);
      table.string("cover", 255);
      table.string("account_name", 100).notNullable();
      table.string("iban", 100).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("workers");
  }
}

module.exports = WorkerSchema;
