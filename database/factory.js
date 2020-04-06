const Factory = use("Factory");
const Hash = use("Hash");

Factory.blueprint("App/Models/User", async (faker, i, data) => {
  return {
    user_group: data.user_group,
    email: data.user_group,
    password: await Hash.make("123"),
    // email: faker.email(),
    // password: await Hash.make(faker.password()),
    profile: 0
  };
});

Factory.blueprint("App/Models/Hirer", async faker => {
  return {
    gender_id: 1,
    name: faker.name(),
    document: faker.cpf(),
    birthdate: faker.birthday({ string: true }),
    location: faker.address(),
    zipcode: faker.zip(),
    phone: faker.phone({ formatted: false }),
    bio_title: faker.sentence(),
    bio: faker.paragraph()
  };
});
