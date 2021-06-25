"use strict";

class GameStore {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      type: "required",
      description: "required",
      range: "required",
      price: "required",
      max_number: "required",
      color: "required",
    };
  }
}

module.exports = GameStore;
