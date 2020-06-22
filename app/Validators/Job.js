"use strict";

const Antl = use("Antl");

class Job {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      start_date: "required",
      start_time: "required",
      location: "required",
      description: "required",
      expire_date: "required",
      expire_time: "required",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Job;
