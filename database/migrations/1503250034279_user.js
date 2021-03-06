"use strict";

const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("user_group", 100).notNullable();
      table.string("email", 254).notNullable().unique();
      table.string("password", 60).notNullable();
      table.boolean("profile").notNullable();
      table.boolean("profile2").notNullable();
      table.boolean("confirmed").notNullable().defaultTo(false);
      table.string("token");
      table.timestamp("token_created_at");
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
