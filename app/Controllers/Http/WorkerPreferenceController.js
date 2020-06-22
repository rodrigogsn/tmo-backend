const WorkerPreference = use("App/Models/WorkerPreference");

class MatchController {
  async show({ params }) {
    const preferences = await WorkerPreference.query()
      .where("worker_id", "=", params.id)
      .fetch();

    return preferences;
  }

  // The store() is fired everytime the user toggles ON/OFF the preference for a Job Category
  async store({ request, auth }) {
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

      preference = await WorkerPreference.query()
        .where("worker_id", "=", auth.user.id)
        .fetch();

      return preference;
    }

    await WorkerPreference.create({
      worker_id: auth.user.id,
      ...data,
    });

    preference = await WorkerPreference.query()
      .where("worker_id", "=", auth.user.id)
      .fetch();

    return preference;
  }

  async update({ params, request, response, auth }) {
    const data = request.only([
      "album_id",
      "min_budget_hour",
      "max_budget_hour",
      "min_budget_event",
      "max_budget_event",
      "min_range",
      "max_range",
      "transport_help",
    ]);

    await WorkerPreference.query()
      .where("worker_id", "=", auth.user.id)
      .where("job_category", "=", params.id)
      .update(data);

    const preferences = await WorkerPreference.query()
      .where("worker_id", "=", auth.user.id)
      .fetch();

    return preferences;
  }
}

module.exports = MatchController;
