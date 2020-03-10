"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Body extends Model {
  user() {
    return this.belongsTo("App/Models/User", "worker_id", "id");
  }
}

module.exports = Body;
