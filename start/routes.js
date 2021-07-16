"use strict";

const Route = use("Route");

Route.post("/users", "UserController.store").validator("/User/UserStore");

Route.group(() => {
  Route.get("/users", "UserController.show");
  Route.put("/users", "UserController.update").validator("/User/UserUpdate");
  Route.delete("/users", "UserController.destroy");

  Route.get("/bets", "BetController.index");
  Route.post("/bets", "BetController.store");
  Route.get("/bets/:id", "BetController.show");
  Route.put("/bets/:id", "BetController.update");
  Route.delete("/bets/:id", "BetController.destroy");
}).middleware(["auth"]);

Route.post("/sessions", "SessionController.store").validator(
  "/Session/SessionStore"
);

Route.post("/passwords", "ForgotPasswordController.store").validator(
  "/ForgotPassword/ForgotPassword"
);
Route.put("/passwords", "ForgotPasswordController.update").validator(
  "/ForgotPassword/ResetPassword"
);

Route.resource("/games", "GameController")
  .apiOnly()
  .validator(new Map([[["/games.store"], ["/Game/GameStore"]]]));
