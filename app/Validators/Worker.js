"use strict";

const Antl = use("Antl");

class Worker {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      document: "required|unique:workers",
      avatar: "url",
      cover: "url",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Worker;
