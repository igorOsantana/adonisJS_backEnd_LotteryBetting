"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BetSchema extends Schema {
  up() {
    this.create("bets", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("game_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("games");
      table.string("balls").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("bets");
  }
}

module.exports = BetSchema;
