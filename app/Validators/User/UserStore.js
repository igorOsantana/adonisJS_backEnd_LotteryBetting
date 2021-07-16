"use strict";

const Antl = use("Antl");

class UserStore {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: "required",
      email: "required|email|unique:users",
      password: "required",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = UserStore;
