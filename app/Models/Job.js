"use strict";

const Model = use("Model");

class Job extends Model {
  user() {
    return this.belongsTo("App/Models/User", "owner_id", "id");
  }

  owner() {
    return this.belongsTo("App/Models/Hirer", "owner_id", "id");
  }

  matches() {
    return this.hasMany("App/Models/Match");
  }
}

module.exports = Job;
