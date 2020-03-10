"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BodySchema extends Schema {
  up() {
    this.create("bodies", table => {
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
      table.integer("height");
      table.integer("bust");
      table.integer("waist");
      table.integer("hips");
      table.integer("shoe");
      table.string("hair", 100);
      table.string("eyes", 100);
      table.timestamps();
    });
  }

  down() {
    this.drop("bodies");
  }
}

module.exports = BodySchema;
