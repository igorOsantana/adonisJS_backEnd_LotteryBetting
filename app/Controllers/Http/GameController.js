"use strict";

const Game = use("App/Models/Game");

class GameController {
  async index() {
    const game = await Game.all();

    return game;
  }

  async store({ request }) {
    const games = request.input("types");

    const game = await Game.createMany(games);

    return game;
  }

  async show({ params }) {
    const game = await Game.findOrFail(params.id);

    return game;
  }

  async update({ params, request }) {
    const game = await Game.findOrFail(params.id);
    const data = request.only([
      "type",
      "description",
      "range",
      "price",
      "max-number",
      "color",
    ]);

    game.merge(data);

    await game.save();

    return game;
  }

  async destroy({ params }) {
    const game = await Game.findOrFail(params.id);

    await game.delete();
  }
}

module.exports = GameController;
