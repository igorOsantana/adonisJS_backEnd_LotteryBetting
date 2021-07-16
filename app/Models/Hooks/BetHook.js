"use strict";

const Kue = use("Kue");
const Job = use("App/Jobs/NewBetMail");

const BetHook = (exports = module.exports = {});

BetHook.sendMailOnNewBet = async (betInstance) => {
  const { username, email } = await betInstance.user().fetch();
  const { type, price } = await betInstance.game().fetch();
  const { balls } = await betInstance;

  Kue.dispatch(
    Job.key,
    { email, username, balls, type, price },
    { attempts: 3 }
  );
};
