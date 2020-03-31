"use strict";

const User = use("App/Models/User");
const Image = use("App/Models/Image");

class ImageController {
  async index() {
    const images = await Image.query().fetch();

    return images;
  }

  async store({ request, auth }) {
    const data = request.only(["name", "url"]);

    const image = await Image.create({ user_id: auth.user.id, ...data });

    const user = await User.findOrFail(auth.user.id);

    return { image, user };
  }

  async show({ params }) {
    const library = await Image.query()
      .where("user_id", "=", params.id)
      .fetch();

    return library;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ImageController;
