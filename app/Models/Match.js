"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Match extends Model {
  worker() {
    return this.belongsTo("App/Models/User", "worker_id", "id");
  }

  profile() {
    return this.belongsTo("App/Models/Worker", "worker_id", "worker_id");
  }

  jobs() {
    return this.belongsTo("App/Models/Job", "job_id", "id");
  }
}

module.exports = Match;
