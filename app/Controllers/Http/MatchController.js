"use strict";

const Match = use("App/Models/Match");

class MatchController {
  async show({ params }) {
    const matches = await Match.query()
      .where("job_id", "=", params.id)
      .with("worker")
      .with("profile")
      .fetch();

    return matches;
  }

  async store({ request, response, auth }) {
    const worker_id = auth.user.id;

    const data = request.only(["job_id", "worker_selected"]);

    const hasMatch = await Match.query()
      .where("worker_id", "=", worker_id)
      .where("job_id", "=", data.job_id)
      .fetch();

    // Check if match already exists, and avoid duplicates
    if (hasMatch.toJSON()[0]) {
      return response.send("You have already applied to this job.");
    }

    const match = await Match.create({
      worker_id: auth.user.id,
      ...data
    });

    return match;
  }

  async update({ params, request, auth }) {
    const match = await Match.findOrFail(params.id);

    const data = request.only(["worker_selected"]);

    match.merge(data);

    await match.save();

    return match;
  }

  async destroy({ params, response, auth }) {
    const match = await Match.findOrFail(params.id);

    if (match.worker_id !== auth.user.id) {
      return response.status(401);
    }

    await match.delete();
  }
}

module.exports = MatchController;
