"use strict";

class UserStore {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: "required",
      email: "required|email|unique:users",
      password: "required|confirmed",
    };
  }
}

module.exports = UserStore;
