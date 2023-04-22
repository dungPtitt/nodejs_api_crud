import express from "express";
import homeController from "../controller/homeController";
import petController from "../controller/petController";
let router = express.Router()

const initWebRoute = (app)=> {
  router.get("/login", homeController.getViewLogin);
  router.post("/login", homeController.login);
  router.get("/verify", homeController.verify);

  //
  router.get("/", homeController.getHomePage);
  router.post("/create-pet", petController.createPet);
  router.get("/edit-add-pet", petController.getViewEditPet);
  router.post("/update-pet", petController.updatePet);
  router.get("/delete-pet", petController.deletePet);
  return app.use("/", router);
}

export default initWebRoute;