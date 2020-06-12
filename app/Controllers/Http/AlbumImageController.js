const AlbumImage = use("App/Models/AlbumImage");
class AlbumController {
  async index() {
    const album_images = await AlbumImage.query().fetch();

    return album_images;
  }

  async store({ request, response }) {
    const data = request.only(["album_id", "image_id"]);

    const exists = await AlbumImage.query()
      .where("album_id", data.album_id)
      .where("image_id", data.image_id)
      .fetch();

    const album_length = await AlbumImage.query()
      .where("album_id", data.album_id)
      .fetch();

    if (exists.toJSON()[0]) {
      return response.status(409).send({
        error: {
          message: "This photo is already in this album.",
        },
      });
    }

    /**
     * Validate max number of album image creation
     */
    if (album_length.toJSON().length >= 6) {
      return response.status(403).send({
        error: {
          message:
            "Maximum photo number reached! Try deleting another photo first.",
        },
      });
    }

    const album_image = await AlbumImage.create(data);

    return album_image;
  }

  async show({ params }) {
    const album_image = await AlbumImage.findOrFail(params.id);

    return album_image;
  }

  // async update({ params, request }) {
  //   const album_image = await AlbumImage.findOrFail(params.id);

  //   const data = request.only(["album_id", "image_id"]);

  //   AlbumImage.merge(data);

  //   await AlbumImage.save();

  //   return album_image;
  // }

  async destroy({ params, response, auth }) {
    /**
     * WARNING: This deletes only the match between album and images,
     * but not the images themselves (neither the album records).
     */
    // const album_image = await AlbumImage.query()
    //   .where("album_id", params.album_id)
    //   .where("image_id", params.image_id)
    //   .fetch();

    // if (
    //   album_image.user_id !== auth.user.id &&
    //   auth.user.user_group !== "admin"
    // ) {
    //   return response.status(401);
    // }

    const image_delete = await await AlbumImage.query()
      .where("album_id", params.album_id)
      .where("image_id", params.image_id)
      .delete();

    if (image_delete) {
      return response.status(200).send({
        message: "Photo deleted!",
      });
    } else {
      return response.status(404).send({
        error: {
          message: "This photo isn't in this album anymore.",
        },
      });
    }
  }
}

module.exports = AlbumController;
