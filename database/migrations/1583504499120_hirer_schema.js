"use strict";

const Schema = use("Schema");

class HirerSchema extends Schema {
  up() {
    this.create("hirers", (table) => {
      table.increments();
      table
        .integer("hirer_id")
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
      table.string("body_type", 100);
      table.string("hair", 100);
      table.string("eyes", 100);
      table.boolean("smoker").defaultTo(false);
      table.text("bio");
      table.string("avatar", 255);
      table.string("cover", 255);
      table.string("cc_number", 16).notNullable();
      table.string("cc_exp", 7).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("hirers");
  }
}

module.exports = HirerSchema;
