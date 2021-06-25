"use strict";

const Hash = use("Hash");
const Mail = use("Mail");

const UserHook = (exports = module.exports = {});

UserHook.makePasswordHash = async (userInstance) => {
  if (userInstance.dirty.password) {
    userInstance.password = await Hash.make(userInstance.password);
  }
};

UserHook.sendWelcomeMail = async (userInstance) => {
  const { username, email } = await userInstance;

  await Mail.send(["emails.new_user"], { username }, (message) => {
    message
      .to(email)
      .from("igorsantana@gmail.com", "Igor | Prova AdonisJS")
      .subject("Bem vindo ao Lottery Betting");
  });
};
