const Factory = use("Factory");
const Hash = use("Hash");

Factory.blueprint("App/Models/User", async (faker, i, data) => {
  return {
    user_group: data.user_group,
    email: `${data.user_group}@email.com`,
    password: data.user_group,
    profile: 1, // Declares that this user has the first profile step completed
    profile2: 1, // Profile complete
  };
});

Factory.blueprint("App/Models/Hirer", async (faker) => {
  return {
    gender: "Male",
    name: faker.name({ gender: "male" }),
    document: faker.cpf(),
    birthdate: "04/05/1991",
    phone: faker.phone({ formatted: false }),
    address: "Ave. Bailantes",
    additional: "A1",
    number: "101",
    district: "Riberas",
    city: "Madrid",
    state: "Kentucky",
    nationality: "ES",
    zipcode: faker.zip(),
    body_type: "Endomorph",
    hair: "Black",
    eyes: "Blue",
    smoker: false,
    languages: "English,Spanish",
    hobbies: "Hiking,Ice Skating",
    cc_number: "4111111111111111",
    cc_exp: "12/30",
    bio: faker.paragraph(),
  };
});

Factory.blueprint("App/Models/Worker", async (faker) => {
  return {
    gender: "Female",
    name: faker.name({ gender: "female" }),
    document: faker.cpf(),
    birthdate: "11/06/1990",
    phone: faker.phone({ formatted: false }),
    address: "Ave. Cuatro Hermanos",
    additional: "Apto 3",
    number: "23",
    district: "Cindras",
    city: "Barcelona",
    state: "Caros",
    nationality: "ES",
    zipcode: faker.zip(),
    body_type: "Mesomorph",
    hair: "Red",
    eyes: "Hazel",
    height: faker.integer({ min: 150, max: 220 }),
    bust: faker.integer({ min: 40, max: 80 }),
    waist: faker.integer({ min: 40, max: 80 }),
    hips: faker.integer({ min: 40, max: 80 }),
    bio: faker.paragraph({ sentences: 3 }),
    smoker: true,
    languages: "English,Spanish,Chinese",
    hobbies: "Video Gaming,Dancing,Singing",
    account_name: "Main Account",
    account_number: "0000000000005",
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
    status: 1,
    description: faker.paragraph({ sentences: 4 }),
    start_date: "12/20/2020",
    start_time: "19:00",
    expire_date: "12/21/2020",
    expire_time: "22:00",
    location: faker.address(),
    worker_number: faker.integer({ min: 1, max: 10 }),
    worker_gender: "Female",
    min_distance: 1,
    max_distance: 200,
    min_age: 18,
    max_age: faker.integer({ min: 18, max: 50 }),
    min_rate: faker.integer({ min: 1, max: 2 }),
    max_rate: faker.integer({ min: 3, max: 5 }),
    price: faker.integer({ min: 35, max: 100 }),
    price_type: 2,
    hours: faker.integer({ min: 1, max: 10 }),
    transport_help: 1,
    transport_value: faker.integer({ min: 10, max: 25 }),
  };
});
