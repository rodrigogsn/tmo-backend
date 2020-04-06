const Gender = use("App/Models/Gender");

class GenderController {
  async index() {
    const genders = await Gender.query().fetch();

    return genders;
  }

  async store({ request, auth }) {
    const data = request.only(["name"]);

    const gender = await Gender.create({
      author_id: auth.user.id,
      ...data
    });

    return gender;
  }

  async show({ params }) {
    const gender = await Gender.findOrFail(params.id);

    return gender;
  }

  async update({ params, request }) {
    const gender = await Gender.findOrFail(params.id);

    const data = request.only(["name"]);

    gender.merge(data);

    await gender.save();

    return gender;
  }

  async destroy({ params, auth }) {
    const gender = await Gender.findOrFail(params.id);

    if (gender.author_id !== auth.user.id) {
      return response.status(401);
    }

    await gender.delete();
  }
}

module.exports = GenderController;
