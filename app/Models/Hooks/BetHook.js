"use strict";

const Mail = use("Mail");

const BetHook = (exports = module.exports = {});

BetHook.sendMailOnNewBet = async (betInstance) => {
  const { username, email } = await betInstance.user().fetch();
  const { type, price } = await betInstance.game().fetch();
  const { balls } = await betInstance;

  const priceConverted = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  await Mail.send(
    ["emails.new_bet"],
    { username, balls, type, price: priceConverted },
    (message) => {
      message
        .to(email)
        .from("igorsantana@gmail.com", "Igor | Prova AdonisJS")
        .subject("Nova aposta adquirida no Lottery Betting");
    }
  );
};
