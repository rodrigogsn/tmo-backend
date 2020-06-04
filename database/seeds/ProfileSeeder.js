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
    const job = await Factory.model("App/Models/Job").makeMany(20);
    await hirer_profile.jobs().saveMany(job);

    ////////////// Create user, profile and body for Worker
    const worker = await Factory.model("App/Models/User").create({
      user_group: "workers",
    });
    const worker_profile = await Factory.model("App/Models/Worker").make();
    // const worker_body = await Factory.model("App/Models/Body").make();
    await worker.worker().save(worker_profile);
    // await worker_profile.body().save(worker_body);
  }
}

module.exports = ProfileSeeder;
