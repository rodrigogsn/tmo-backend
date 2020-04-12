"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Gender extends Model {
  author() {
    return this.belongsToMany("App/Models/User", "author_id", "id");
  }
}

module.exports = Gender;
