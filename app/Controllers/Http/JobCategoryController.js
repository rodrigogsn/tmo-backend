const JobCategory = use("App/Models/JobCategory");

class JobCategoryController {
  async index() {
    const job_categories = await JobCategory.query().fetch();

    return job_categories;
  }

  async store({ request, auth }) {
    const data = request.only(["name", "description"]);

    const job_category = await JobCategory.create({
      author_id: auth.user.id,
      ...data
    });

    return job_category;
  }

  async show({ params }) {
    const job_category = await JobCategory.findOrFail(params.id);

    return job_category;
  }

  async update({ params, request }) {
    const job_category = await JobCategory.findOrFail(params.id);

    const data = request.only(["name", "description"]);

    job_category.merge(data);

    await job_category.save();

    return job_category;
  }

  async destroy({ params, auth }) {
    const job_category = await JobCategory.findOrFail(params.id);

    if (job_category.author_id !== auth.user.id) {
      return response.status(401);
    }

    await job_category.delete();

    // WARNING: Delete categories will not delete jobs that are inside them!
  }
}

module.exports = JobCategoryController;
