"use strict";

const Job = use("App/Models/Job");
const User = use("App/Models/User");

class JobController {
  async index() {
    const jobs = await Job.query()
      .with("user", (builder) => {
        builder.select(["id", "email", "user_group"]);
      })
      .with("category", (builder) => {
        builder.select(["id", "name"]);
      })
      .with("owner", (builder) => {
        builder.select([
          "id",
          "hirer_id",
          "name",
          "location",
          "zipcode",
          "birthdate",
          "avatar",
        ]);
      })
      .with("matches")
      .fetch();

    return jobs;
  }

  async store({ request, auth }) {
    const data = request.only([
      "job_category",
      "status",
      "name",
      "description",
      "value",
      "location",
      "zipcode",
      "schedule",
      "workers_applied",
      "worker_selected",
    ]);

    const jobs = await Job.create({ owner_id: auth.user.id, ...data });

    const user = await User.findOrFail(auth.user.id);

    return { jobs, user };
  }

  async show({ params }) {
    const job = await Job.query()
      .with("user", (builder) => {
        builder.select(["id", "email", "user_group"]);
      })
      .with("category", (builder) => {
        builder.select(["id", "name"]);
      })
      .with("owner", (builder) => {
        builder.select([
          "id",
          "hirer_id",
          "name",
          "location",
          "zipcode",
          "birthdate",
          "avatar",
        ]);
      })
      .with("matches")
      .where("id", "=", params.id)
      .fetch();

    return job;
  }

  async update({ params, request }) {
    const job = await Job.findOrFail(params.id);

    const data = request.only([
      "job_category",
      "status",
      "name",
      "description",
      "value",
      "location",
      "zipcode",
      "schedule",
      "workers_applied",
      "worker_selected",
    ]);

    job.merge(data);

    await job.save();

    return job;
  }

  async destroy({ params, response, auth }) {
    const job = await Job.findOrFail(params.id);

    if (job.owner_id !== auth.user.id) {
      return response.status(401);
    }

    await job.delete();
  }
}

module.exports = JobController;
