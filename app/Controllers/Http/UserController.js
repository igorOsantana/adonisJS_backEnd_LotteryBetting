"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ request }) {
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);

    return user;
  }

  async show({ auth }) {
    const user = await User.findOrFail(auth.user.id);

    return user;
  }

  async update({ auth, request }) {
    const user = await User.findOrFail(auth.user.id);
    const data = request.only(["username", "email", "password"]);

    user.merge(data);

    await user.save();

    return user;
  }

  async destroy({ auth }) {
    const user = await User.findOrFail(auth.user.id);

    await user.delete();
  }
}

module.exports = UserController;
