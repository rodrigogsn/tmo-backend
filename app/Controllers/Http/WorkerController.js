"use strict";

const Worker = use("App/Models/Worker");
const User = use("App/Models/User");
const Body = use("App/Models/Body");

class WorkerController {
  async index() {
    const workers = await Worker.query()
      .with("user")
      .with("body")
      .fetch();

    return workers;
  }

  async store({ request, response, auth }) {
    const data = request.only([
      "profile",
      "gender_id",
      "name",
      "document",
      "birthdate",
      "location",
      "zipcode",
      "phone",
      "bio_title",
      "bio",
      "avatar",
      "cover"
    ]);

    const worker = await Worker.create({ worker_id: auth.user.id, ...data });

    const user = await User.findOrFail(auth.user.id);

    user.merge({ profile: 1 });

    await user.save();

    return { worker, user };
  }

  async show({ params }) {
    const worker = await Worker.findBy("worker_id", params.id);

    const body = await Body.findBy("worker_id", params.id);

    return { worker, body };
  }

  async update({ params, request }) {
    const worker = await Worker.findBy("worker_id", params.id);

    const data = request.only([
      "gender_id",
      "name",
      "document",
      "birthdate",
      "location",
      "zipcode",
      "phone",
      "bio_title",
      "bio",
      "avatar",
      "cover"
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
