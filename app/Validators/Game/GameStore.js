"use strict";

const Antl = use("Antl");

class GameStore {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      types: [
        {
          type: "required",
          description: "required",
          range: "required",
          price: "required",
          "max-number": "required",
          color: "required",
        },
      ],
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = GameStore;
