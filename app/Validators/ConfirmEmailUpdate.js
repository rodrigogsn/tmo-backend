"use strict";

const Antl = use("Antl");

class ConfirmEmailUpdate {
  get rules() {
    return {
      token: "required",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = ConfirmEmailUpdate;
