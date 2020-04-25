const Factory = use("Factory");
const Hash = use("Hash");

Factory.blueprint("App/Models/User", async (faker, i, data) => {
  return {
    user_group: data.user_group,
    email: data.user_group,
    password: data.user_group,
    profile: 1, // Declares that this user has a profile
  };
});

Factory.blueprint("App/Models/Gender", async (faker, i, data) => {
  return {
    name: data[i],
  };
});

Factory.blueprint("App/Models/Hirer", async (faker) => {
  return {
    gender_id: 2,
    name: faker.name({ gender: "male" }),
    document: faker.cpf(),
    birthdate: faker.birthday({ string: true }),
    location: faker.address(),
    zipcode: faker.zip(),
    phone: faker.phone({ formatted: false }),
    bio: faker.paragraph(),
  };
});

Factory.blueprint("App/Models/Worker", async (faker) => {
  return {
    gender_id: 1,
    name: faker.name({ gender: "female" }),
    document: faker.cpf(),
    birthdate: faker.birthday({ string: true }),
    location: faker.address(),
    zipcode: faker.zip(),
    phone: faker.phone({ formatted: false }),
    bio: faker.paragraph({ sentences: 3 }),
  };
});

Factory.blueprint("App/Models/Body", async (faker) => {
  return {
    height: faker.integer({ min: 150, max: 220 }),
    bust: faker.integer({ min: 40, max: 80 }),
    waist: faker.integer({ min: 40, max: 80 }),
    hips: faker.integer({ min: 40, max: 80 }),
    shoe: faker.integer({ min: 30, max: 45 }),
    hair: "Pink",
    eyes: "Hazel",
  };
});

Factory.blueprint("App/Models/JobCategory", async (faker, i, data) => {
  return {
    name: data[i],
    description: faker.sentence(),
  };
});

Factory.blueprint("App/Models/Job", async (faker) => {
  return {
    job_category: faker.integer({ min: 1, max: 8 }),
    status: "O",
    name: faker.sentence({ words: 3 }),
    description: faker.paragraph({ sentences: 4 }),
    value: faker.integer({ min: 100, max: 500 }),
    location: faker.address(),
    zipcode: faker.zip(),
    schedule: faker.timestamp(),
  };
});
