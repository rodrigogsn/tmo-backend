"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class AlbumImage extends Model {
  album() {
    return this.belongsTo("App/Models/Album", "album_id", "id");
  }

  images() {
    return this.belongsTo("App/Models/Image", "image_id", "id");
  }
}

module.exports = AlbumImage;
