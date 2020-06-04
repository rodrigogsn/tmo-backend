"use strict";

const Antl = use("Antl");

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: "required|email|unique:users",
      password: "required|confirmed",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = User;
