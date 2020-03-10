"use strict";

const Route = use("Route");

Route.post("/register", "AuthController.register");
Route.post("/authenticate", "AuthController.authenticate");

Route.group(() => {
  Route.resource("hirers", "HirerController").apiOnly();
}).middleware("auth");

Route.group(() => {
  Route.resource("workers", "WorkerController").apiOnly();
}).middleware("auth");

Route.group(() => {
  Route.resource("bodies", "BodyController").apiOnly();
}).middleware("auth");
