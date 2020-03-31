"use strict";

const Schema = use("Schema");

class HirerSchema extends Schema {
  up() {
    this.create("hirers", table => {
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
      table.integer("gender_id").notNullable(); //needs to relate to a Gender Model
      table.string("name", 100).notNullable();
      table
        .string("document", 100)
        .unique()
        .notNullable();
      table.string("birthdate", 20).notNullable();
      table.string("location", 254).notNullable();
      table.string("zipcode", 80).notNullable();
      table.string("phone", 100);
      table.string("bio_title", 100);
      table.text("bio");
      table.string("avatar", 254);
      table.string("cover", 254);
      table.timestamps();
    });
  }

  down() {
    this.drop("hirers");
  }
}

module.exports = HirerSchema;
