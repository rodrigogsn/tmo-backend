"use strict";

/*
|--------------------------------------------------------------------------
| ProfileSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class ProfileSeeder {
  async run() {
    ////////////// Create user and profile for Hirer
    const hirer = await Factory.model("App/Models/User").create({
      user_group: "hirers",
    });
    const hirer_profile = await Factory.model("App/Models/Hirer").make();
    await hirer.hirer().save(hirer_profile);

    ////////////// Create jobs
    const owner_id = hirer_profile.toJSON().hirer_id;
    await Factory.model("App/Models/Job").createMany(20, [{ owner_id }]);

    ////////////// Create user, profile and body for Worker
    const worker = await Factory.model("App/Models/User").create({
      user_group: "workers",
    });
    const worker_profile = await Factory.model("App/Models/Worker").make();
    await worker.worker().save(worker_profile);
  }
}

module.exports = ProfileSeeder;
