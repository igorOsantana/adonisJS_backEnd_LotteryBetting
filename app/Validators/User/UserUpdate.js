"use strict";

const Antl = use("Antl");

class UserUpdate {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: "email|unique:users",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = UserUpdate;
