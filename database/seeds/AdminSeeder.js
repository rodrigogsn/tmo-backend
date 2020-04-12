"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class UserSeeder {
  async run() {
    ////////////// Create user for Admin
    const admin = await Factory.model("App/Models/User").create({
      user_group: "admin",
    });

    ////////////// Admin makes genders
    const gender = await Factory.model("App/Models/Gender").makeMany(7, [
      "Female",
      "Male",
      "Trans",
      "Agender",
      "Genderqueer",
      "Pangender",
      "Other",
    ]);

    await admin.genders().saveMany(gender);

    ////////////// Create job categories
    const job_category = await Factory.model(
      "App/Models/JobCategory"
    ).makeMany(8, [
      "Have a Drink",
      "Go to a Restaurant",
      "Have a Fine Dining",
      "Travel",
      "Modeling Job",
      "Acting Job",
      "Artists",
      "Influencers",
    ]);

    await admin.jobCategories().saveMany(job_category);
  }
}

module.exports = UserSeeder;
