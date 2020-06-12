"use strict";

const Model = use("Model");

class Image extends Model {
  user() {
    return this.belongsTo("App/Models/User", "user_id", "id");
  }
}

module.exports = Image;
