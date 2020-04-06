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

Route.group(() => {
  Route.resource("jobs", "JobController").apiOnly();
}).middleware("auth");

Route.group(() => {
  Route.resource("job_categories", "JobCategoryController").apiOnly();
}).middleware("auth");

Route.group(() => {
  Route.resource("genders", "GenderController").apiOnly();
}).middleware("auth");

Route.group(() => {
  Route.resource("matches", "MatchController").apiOnly();
}).middleware("auth");

Route.group(() => {
  Route.resource("images", "ImageController").apiOnly();
}).middleware("auth");

Route.group(() => {
  Route.resource("worker_preferences", "WorkerPreferenceController").apiOnly();
}).middleware("auth");
