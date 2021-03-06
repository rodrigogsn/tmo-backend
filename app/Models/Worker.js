"use strict";

const Model = use("Model");

class Worker extends Model {
  user() {
    return this.belongsTo("App/Models/User", "worker_id", "id");
  }

  body() {
    return this.hasOne("App/Models/Body", "worker_id", "worker_id");
  }

  gender() {
    return this.hasOne("App/Models/Gender", "gender_id", "id");
  }

  match() {
    return this.hasMany("App/Models/Match");
  }
}

module.exports = Worker;
