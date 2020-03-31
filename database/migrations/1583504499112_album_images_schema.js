"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlbumImagesSchema extends Schema {
  up() {
    this.create("album_images", table => {
      table.increments();
      table
        .integer("album_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("albums")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("image_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("images")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("album_images");
  }
}

module.exports = AlbumImagesSchema;
