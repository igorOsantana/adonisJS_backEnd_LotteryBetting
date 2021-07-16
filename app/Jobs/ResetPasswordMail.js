"use strict";

const Mail = use("Mail");

class ResetPasswordMail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return "ResetPasswordMail-job";
  }

  async handle({ email, username, link }) {
    await Mail.send(
      ["emails.forgot_password"],
      { email, username, link },
      (message) => {
        message
          .to(email)
          .from("igorsantana@gmail.com", "Igor | Prova AdonisJS")
          .subject("Recuperação de senha");
      }
    );
  }
}

module.exports = ResetPasswordMail;
