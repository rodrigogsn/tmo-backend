"use strict";

const Antl = use("Antl");

class Hirer {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      document: "required|unique:hirers",
      avatar: "url",
      cover: "url",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Hirer;
