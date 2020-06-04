"use strict";

// const Env = use("Env");
const Youch = use("youch");
const BaseExceptionHandler = use("BaseExceptionHandler");

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { request, response }) {
    if (error.name === "ValidationException") {
      return response.status(error.status).send(error.messages);
    }

    if (error.name === "UserNotFoundException") {
      return response.status(error.status).send([{ message: "Invalid user." }]);
    }

    if (error.name === "PasswordMisMatchException") {
      return response
        .status(error.status)
        .send([{ message: "Invalid password." }]);
    }

    if (
      error.message.includes("ER_DUP_ENTRY") &&
      error.message.includes("_document_unique")
    ) {
      return response.status(error.status).send([
        {
          message:
            "This identification already exists in our database. You need to choose another.",
        },
      ]);
    }

    if (
      error.message.includes("ER_DUP_ENTRY") &&
      error.message.includes("_id_unique")
    ) {
      return response.status(error.status).send([
        {
          message:
            "This user already exists. If you are the owner, try to login again and complete your profile.",
        },
      ]);
    }

    const youch = new Youch(error, request.request);
    const errorJSON = await youch.toJSON();

    return response.status(error.status).send(errorJSON);
  }

  async report(error, { request }) {
    console.log(error);
  }
}

module.exports = ExceptionHandler;
