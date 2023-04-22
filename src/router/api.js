import express from "express";
import petController from "../controller/petController";
let router = express.Router()

const initApiRoute = (app)=> {
  router.post("/create-pet", petController.createPetApi);
  router.get("/get-pet", petController.getPetApi);
  router.put("/update-pet", petController.updatePetApi);
  router.delete("/delete-pet", petController.deletePetApi);
  router.get("/find-pet", petController.findPetByNameApi);
  return app.use("/api/v1/", router);
}

export default initApiRoute;