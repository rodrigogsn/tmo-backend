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
      table.boolean("smoker").defaultTo(false);
      table.string("avatar", 255);
      table.string("cover", 255);
      table.string("languages");
      table.string("hobbies");
      table.text("bio");
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
