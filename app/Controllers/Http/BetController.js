"use strict";

const Bet = use("App/Models/Bet");

class BetController {
  async index({ auth }) {
    const bets = await Bet.query()
      .where("user_id", auth.user.id)
      .with("game")
      .fetch();

    return bets;
  }

  async store({ auth, request }) {
    const betsToStore = request.input("bets");

    const newBets = betsToStore.map((bet) => {
      return { ...bet, user_id: Number(auth.user.id) };
    });

    const bets = await Bet.createMany(newBets);

    return bets;
  }

  async show({ params }) {
    const bets = await Bet.findOrFail(params.id);

    await bets.load("game");
    await bets.load("user");

    return bets;
  }

  async update({ params, request }) {
    const bet = await Bet.findOrFail(params.id);
    const balls = request.input("balls");

    bet.merge({ balls: balls });

    await bet.save();

    return bet;
  }

  async destroy({ params }) {
    const bet = await Bet.findOrFail(params.id);

    await bet.delete();
  }
}

module.exports = BetController;
