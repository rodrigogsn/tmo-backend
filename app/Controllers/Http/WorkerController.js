"use strict";

const Worker = use("App/Models/Worker");
const User = use("App/Models/User");

class WorkerController {
  async index() {
    const workers = await Worker.query()
      .with("user", (builder) => {
        builder.select(["id", "user_group", "email"]);
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
      "account_name",
      "account_number",
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
      "address",
      "additional",
      "number",
      "district",
      "state",
      "city",
      "nationality",
      "zipcode",
      "body_type",
      "hair",
      "eyes",
      "height",
      "bust",
      "waist",
      "hips",
      "smoker",
      "bio",
      "languages",
      "hobbies",
      "avatar",
      "cover",
      "account_name",
      "account_number",
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
