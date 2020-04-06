"use strict";

const User = use("App/Models/User");

class AuthController {
  async register({ request }) {
    const data = request.only(["user_group", "email", "password", "profile"]);

    const user = await User.create(data);

    return user;
  }

  async authenticate({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    const user = await User.query()
      .where("email", email)
      .fetch();

    const data = user.toJSON()[0];

    return { ...token, data };
  }
}

module.exports = AuthController;
