"use strict";

const Hirer = use("App/Models/Hirer");
const User = use("App/Models/User");
const Job = use("App/Models/Job");

class HirerController {
  async index() {
    const hirers = await Hirer.query()
      .with("user")
      .fetch();

    return hirers;
  }

  async store({ request, auth }) {
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

    const hirer = await Hirer.create({ hirer_id: auth.user.id, ...data });

    const user = await User.findOrFail(auth.user.id);

    user.merge({ profile: 1 });

    await user.save();

    return { hirer, user };
  }

  async show({ params }) {
    const hirer = await Hirer.findBy("hirer_id", params.id);

    const jobs = await Job.query()
      .where("owner_id", "=", params.id)
      .fetch();

    return { hirer, jobs };
  }

  async update({ params, request }) {
    const hirer = await Hirer.findBy("hirer_id", params.id);

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

    hirer.merge(data);

    await hirer.save();

    return hirer;
  }

  async destroy({ params, response, auth }) {
    const hirer = await Hirer.findOrFail(params.id);

    if (hirer.hirer_id !== auth.user.id) {
      return response.status(401);
    }

    await hirer.delete();
  }
}

module.exports = HirerController;
