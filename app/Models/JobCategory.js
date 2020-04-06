const Model = use("Model");

class JobCategory extends Model {
  author() {
    return this.belongsTo("App/Models/User", "author_id", "id");
  }
}

module.exports = JobCategory;
