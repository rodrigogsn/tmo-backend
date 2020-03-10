"use strict";

const Body = use("App/Models/Body");

class BodyController {
  async index() {
    const bodies = await Body.query()
      .with("user")
      .fetch();

    return bodies;
  }

  async store({ request, response, auth }) {
    const data = request.only([
      "height",
      "bust",
      "waist",
      "hips",
      "shoe",
      "hair",
      "eyes"
    ]);

    const body = await Body.create({ worker_id: auth.user.id, ...data });

    return body;
  }

  async show({ params }) {
    const body = await Body.findBy("worker_id", params.id);

    return body;
  }

  async update({ params, request, response }) {
    const body = await Body.findOrFail(params.id);

    const data = request.only([
      "height",
      "bust",
      "waist",
      "hips",
      "shoe",
      "hair",
      "eyes"
    ]);

    body.merge(data);

    await body.save();

    return body;
  }

  async destroy({ params, request, response, auth }) {
    const body = await Body.findOrFail(params.id);

    if (body.worker_id !== auth.user.id) {
      return response.status(401);
    }

    await body.delete();
  }
}

module.exports = BodyController;
