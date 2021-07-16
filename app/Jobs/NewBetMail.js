"use strict";

const Mail = use("Mail");

class NewBetMail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return "NewBetMail-job";
  }

  async handle({ email, username, balls, type, price }) {
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
  }
}

module.exports = NewBetMail;
