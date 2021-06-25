"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class User extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", "UserHook.makePasswordHash");
    this.addHook("afterCreate", "UserHook.sendWelcomeMail");
  }

  bets() {
    return this.hasMany("App/Models/Bet");
  }

  tokens() {
    return this.hasMany("App/Models/Token");
  }
}

module.exports = User;
