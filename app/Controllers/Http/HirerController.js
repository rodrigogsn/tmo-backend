"use strict";

const Hirer = use("App/Models/Hirer");
const User = use("App/Models/User");

class HirerController {
  async index() {
    const hirers = await Hirer.query()
      .with("user", (builder) => {
        builder.select(["id", "user_group", "email"]);
      })
      .fetch();

    return hirers;
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
      "body_type",
      "bio",
      "hair",
      "eyes",
      "smoker",
      "avatar",
      "cover",
      "cc_number",
      "cc_exp",
    ]);

    const hirer = await Hirer.create({ hirer_id: auth.user.id, ...data });

    const user = await User.findOrFail(auth.user.id);

    return { hirer, user };
  }

  async show({ params }) {
    const hirer = await Hirer.query()
      .with("user", (builder) => {
        builder.select(["id", "user_group", "email"]);
      })
      .with("jobs", (builder) => {
        builder.where("owner_id", "=", params.id);
      })
      .where("hirer_id", "=", params.id)
      .fetch();

    return hirer.toJSON()[0];
  }

  async update({ params, request }) {
    const hirer = await Hirer.findBy("hirer_id", params.id);

    const data = request.only([
      "gender",
      "name",
      "document",
      "birthdate",
      "phone",
      "city",
      "nationality",
      "zipcode",
      "body_type",
      "bio",
      "hair",
      "eyes",
      "smoker",
      "avatar",
      "cover",
      "cc_number",
      "cc_exp",
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
