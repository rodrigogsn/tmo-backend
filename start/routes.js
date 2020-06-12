"use strict";

const Route = use("Route");

Route.post("register", "AuthController.register").validator("User");
Route.post("authenticate", "AuthController.authenticate").validator("Session");
Route.post("passwords", "ForgotPasswordController.store").validator(
  "ForgotPassword"
);
Route.put("passwords", "ForgotPasswordController.update").validator(
  "ResetPassword"
);

// Confirm user was created successfully using mail confirmation
Route.post("confirm", "ConfirmEmailController.store").validator(
  "ConfirmEmailCreate"
);
Route.put("confirm", "ConfirmEmailController.update").validator(
  "ConfirmEmailUpdate"
);

// Allow users to enter the app if they've already filled in a profile (turn profile=true)
Route.put("register/:id/:profile", "AuthController.confirmProfile");

Route.group(() => {
  Route.resource("hirers", "HirerController")
    .apiOnly()
    .validator(new Map([[["hirer.store"], ["Hirer"]]]));
}).middleware("auth");

Route.group(() => {
  Route.resource("workers", "WorkerController")
    .apiOnly()
    .validator(new Map([[["worker.store"], ["Worker"]]]));
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
  Route.resource("albums", "AlbumController").apiOnly();
}).middleware("auth");

Route.group(() => {
  Route.resource("album_images", "AlbumImageController").apiOnly();
}).middleware("auth");

Route.get("album_images", "AlbumImageController.index");
Route.get("album_images/:id", "AlbumImageController.show");
Route.post("album_images", "AlbumImageController.store");
Route.delete(
  "album_images/:album_id/:image_id",
  "AlbumImageController.destroy"
).middleware("auth");

Route.group(() => {
  Route.resource("worker_preferences", "WorkerPreferenceController").apiOnly();
}).middleware("auth");
