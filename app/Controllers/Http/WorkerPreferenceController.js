const WorkerPreference = use("App/Models/WorkerPreference");

class MatchController {
  async show({ params }) {
    const preferences = await WorkerPreference.query()
      .where("worker_id", "=", params.id)
      .fetch();

    return preferences;
  }

  // The store() is fired everytime the user toggles ON/OFF the preference for a Job Category
  async store({ request, response, auth }) {
    const worker_id = auth.user.id;

    const data = request.only(["active", "job_category"]);

    let preference = await WorkerPreference.query()
      .where("worker_id", "=", worker_id)
      .where("job_category", "=", data.job_category)
      .fetch();

    // Check if the preference already exists, then just switches the "active" to true/false
    if (preference.toJSON()[0]) {
      let bool = preference.toJSON()[0].active;

      await WorkerPreference.query()
        .where("worker_id", "=", worker_id)
        .where("job_category", "=", data.job_category)
        .update({ active: (bool ^= true) });

      return response.send(
        `This preference already exists, and now its active status is: ${bool}.`
      );
    }

    preference = await WorkerPreference.create({
      worker_id: auth.user.id,
      ...data
    });

    return preference;
  }

  async update({ params, request }) {
    const preference = await WorkerPreference.findOrFail(params.id);

    const data = request.only([
      "job_category",
      "album_id",
      "max_budget",
      "min_budget"
    ]);

    preference.merge(data);

    await preference.save();

    return preference;
  }
}

module.exports = MatchController;
