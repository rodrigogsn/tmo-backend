const Model = use("Model");

class JobCategory extends Model {
  author() {
    return this.belongsToMany("App/Models/User", "author_id", "id");
  }
}

module.exports = JobCategory;
