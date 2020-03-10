"use strict";

const Hirer = use("App/Models/Hirer");
const User = use("App/Models/User");

class HirerController {
  async index() {
    const hirers = await Hirer.query()
      .with("user")
      .fetch();

    return hirers;
  }

  async store({ request, response, auth }) {
    const data = request.only([
      "gender_id",
      "name",
      "document",
      "birthdate",
      "location",
      "zipcode",
      "phone",
      "bio_title",
      "bio"
    ]);

    const hirer = await Hirer.create({ hirer_id: auth.user.id, ...data });

    const user = await User.findOrFail(auth.user.id);

    user.merge({ profile: 1 });

    await user.save();

    return { hirer, user };
  }

  async show({ params }) {
    const hirer = await Hirer.findBy("hirer_id", params.id);

    return hirer;
  }

  async update({ params, request }) {
    const hirer = await Hirer.findOrFail(params.id);

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
      "bio"
    ]);

    hirer.merge(data);

    await hirer.save();

    return hirer;
  }

  async destroy({ params, request, response, auth }) {
    const hirer = await Hirer.findOrFail(params.id);

    if (hirer.hirer_id !== auth.user.id) {
      return response.status(401);
    }

    await hirer.delete();
  }
}

module.exports = HirerController;
