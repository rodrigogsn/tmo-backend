"use strict";

const Model = use("Model");

class Hirer extends Model {
  user() {
    return this.belongsTo("App/Models/User", "hirer_id", "id");
  }

  jobs() {
    return this.hasMany("App/Models/Job", "hirer_id", "owner_id");
  }

  gender() {
    return this.hasOne("App/Models/Gender", "gender_id", "id");
  }
}

module.exports = Hirer;
