const Album = use("App/Models/Album");
const JobCategory = use("App/Models/JobCategory");

class AlbumController {
  async index() {
    const albums = await Album.query()
      .with("category", (builder) => {
        builder.select(["id", "name"]);
      })
      .with("photos", (builder) => {
        builder
          .select(["album_id", "image_id"])
          .orderBy("image_id", "desc")
          .with("images", (builder) => {
            builder.select(["id", "url"]);
          });
      })
      .fetch();

    return albums;
  }

  async store({ request, response, auth }) {
    const data = request.only(["job_category_id"]);

    const exists = await Album.query()
      .where("user_id", auth.user.id)
      .where("job_category_id", data.job_category_id)
      .fetch();

    if (exists.toJSON()[0]) {
      return response.status(409).send({
        error: {
          message: "This user already has an album for this job category.",
        },
      });
    }

    const new_album = await Album.create({
      user_id: auth.user.id,
      ...data,
    });

    const result = await Album.query()
      .where("id", new_album.id)
      .with("category", (builder) => {
        builder.select(["id", "name"]);
      })
      .with("photos", (builder) => {
        builder
          .select(["album_id", "image_id"])
          .orderBy("image_id", "desc")
          .with("images", (builder) => {
            builder.select(["id", "url"]);
          });
      })
      .first();

    return result;
  }

  async show({ params }) {
    const albums = await Album.query()
      .where("user_id", "=", params.id)
      .with("category", (builder) => {
        builder.select(["id", "name"]);
      })
      .with("photos", (builder) => {
        builder
          .select(["album_id", "image_id"])
          .orderBy("image_id", "desc")
          .with("images", (builder) => {
            builder.select(["id", "url"]);
          });
      })
      .fetch();

    /**
     * Available categories to create an album from.
     */
    const category_fetch = await JobCategory.query().fetch();

    const category_arr = category_fetch
      .toJSON()
      .map((i) => ({ id: i.id, name: i.name }));

    const taken_categories = albums.toJSON().map((i) => i.job_category_id);

    const available_categories = category_arr.filter(
      (val) => !taken_categories.includes(val.id)
    );

    /**
     * Response
     */
    const result = {
      albums: albums.toJSON(),
      available_categories: available_categories.sort(),
    };

    return result;
  }

  async update({ params, request }) {
    const album = await Album.findOrFail(params.id);

    const data = request.only(["job_category_id"]);

    album.merge(data);

    await album.save();

    return album;
  }

  async destroy({ params, auth }) {
    const album = await Album.findOrFail(params.id);

    if (album.user_id !== auth.user.id && auth.user.user_group !== "admin") {
      return response.status(401);
    }

    await album.delete();

    // WARNING: Delete categories will not delete jobs that are inside them!
  }
}

module.exports = AlbumController;
