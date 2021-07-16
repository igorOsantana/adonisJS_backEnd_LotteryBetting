"use strict";

const Mail = use("Mail");

class NewUserMail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return "NewUserMail-job";
  }

  async handle({ email, username }) {
    await Mail.send(["emails.new_user"], { username }, (message) => {
      message
        .to(email)
        .from("igorsantana@gmail.com", "Igor | Prova AdonisJS")
        .subject("Bem vindo ao Lottery Betting");
    });
  }
}

module.exports = NewUserMail;
