"use strict";

const Worker = use("App/Models/Worker");
const User = use("App/Models/User");
// const Body = use("App/Models/Body");

class WorkerController {
  async index() {
    const workers = await Worker.query()
      .with("user", (builder) => {
        builder.select(["id", "user_group", "email"]);
      })
      .with("gender", (builder) => {
        builder.select(["id", "name"]);
      })
      .with("body", (builder) => {
        builder.select([
          "worker_id",
          "body_type",
          "height",
          "bust",
          "waist",
          "hips",
          "hair",
          "eyes",
        ]);
      })
      .fetch();

    return workers;
  }

  async store({ request, auth }) {
    const data = request.only([
      "gender",
      "name",
      "document",
      "birthdate",
      "phone",
      "city",
      "nationality",
      "zipcode",
      "smoker",
      "bio",
      "smoker",
      "avatar",
      "cover",
      "account_name",
      "iban",
    ]);

    const worker = await Worker.create({ worker_id: auth.user.id, ...data });

    const user = await User.findOrFail(auth.user.id);

    return { worker, user };
  }

  async show({ params }) {
    const worker = await Worker.query()
      .with("user", (builder) => {
        builder.select(["id", "user_group", "email"]);
      })
      .with("gender", (builder) => {
        builder.select(["id", "name"]);
      })
      .with("body", (builder) => {
        builder.select([
          "worker_id",
          "body_type",
          "height",
          "bust",
          "waist",
          "hips",
          "hair",
          "eyes",
        ]);
      })
      .where("worker_id", "=", params.id)
      .fetch();

    return worker.toJSON()[0];
  }

  async update({ params, request }) {
    const worker = await Worker.findBy("worker_id", params.id);

    const data = request.only([
      "gender",
      "name",
      "document",
      "birthdate",
      "phone",
      "city",
      "nationality",
      "zipcode",
      "smoker",
      "bio",
      "smoker",
      "avatar",
      "cover",
      "account_name",
      "iban",
    ]);

    worker.merge(data);

    await worker.save();

    return worker;
  }

  async destroy({ params, request, response, auth }) {
    const worker = await Worker.findOrFail(params.id);

    if (worker.worker_id !== auth.user.id) {
      return response.status(401);
    }

    await worker.delete();
  }
}

module.exports = WorkerController;
