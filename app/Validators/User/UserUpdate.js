"use strict";

class UserUpdate {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: "email|unique:users",
      password: "confirmed",
    };
  }
}

module.exports = UserUpdate;
