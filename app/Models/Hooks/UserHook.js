"use strict";

const Hash = use("Hash");
const Kue = use("Kue");
const Job = use("App/Jobs/NewUserMail");

const UserHook = (exports = module.exports = {});

UserHook.makePasswordHash = async (userInstance) => {
  if (userInstance.dirty.password) {
    userInstance.password = await Hash.make(userInstance.password);
  }
};

UserHook.sendWelcomeMail = async (userInstance) => {
  const { username, email } = await userInstance;

  Kue.dispatch(Job.key, { email, username }, { attempts: 3 });
};
