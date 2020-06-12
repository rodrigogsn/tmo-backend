"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Album extends Model {
  category() {
    return this.hasMany("App/Models/JobCategory", "job_category_id", "id");
  }

  photos() {
    return this.hasMany("App/Models/AlbumImage", "id", "album_id");
  }
}

module.exports = Album;
