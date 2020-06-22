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
          "nationality",
          "city",
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
      "description",
      "start_date",
      "start_time",
      "expire_date",
      "expire_time",
      "location",
      "worker_number",
      "worker_gender",
      "min_distance",
      "max_distance",
      "min_age",
      "max_age",
      "min_rate",
      "max_rate",
      "price",
      "price_type",
      "hours",
      "transport_help",
      "transport_value",
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
          "nationality",
          "city",
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
      "description",
      "start_date",
      "start_time",
      "expire_date",
      "expire_time",
      "location",
      "worker_number",
      "worker_gender",
      "min_distance",
      "max_distance",
      "min_age",
      "max_age",
      "min_rate",
      "max_rate",
      "price",
      "price_type",
      "hours",
      "transport_help",
      "transport_value",
    ]);

    job.merge(data);

    await job.save();

    return job;
  }

  async destroy({ params, response, auth }) {
    const job = await Job.findOrFail(params.id);

    console.log(auth.user.user_group);

    if (job.owner_id != auth.user.id && auth.user.user_group != "admin") {
      return response.status(401).json({
        code: 401,
        message: "Unauthorized. Only owners can delete their own jobs.",
      });
    }

    await job.delete();
  }
}

module.exports = JobController;
