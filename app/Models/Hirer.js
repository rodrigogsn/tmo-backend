"use strict";

const Model = use("Model");

class Hirer extends Model {
  user() {
    return this.belongsTo("App/Models/User", "hirer_id", "id");
  }
}

module.exports = Hirer;
