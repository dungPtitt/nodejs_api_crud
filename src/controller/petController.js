import petService from "../service/PetService";

let createPet = async(req, res)=>{
  try{
    let data = req.body;
    if(!data.sold){
      data.sold=0;
    }
    let response = await petService.handleCreatePet(data);
    if(response.errCode==0){
      return res.redirect("/");
    }
    return res.render("errPage", {errMessage: response.errMessage});
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let getPet = async(req, res)=>{
  try{
    let idPet = req.query.id;
    let response = await petService.handleGetPet(idPet);
    console.log(response);
    return res.render("pet/pets.ejs", {data: response.data});
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}
let getViewEditPet = async(req, res)=>{
  try{
    let idPet = req.query.id;
    let data = "";
    if(idPet!=-1){
      let response = await petService.handleGetPet(idPet);
      data = response.data;
    }else {
      data = {
        name: "",
        price: "",
        brand: "",
        sold: "1",
        dateManufacture: ""
      }
    }
    return res.render("pet/editAndAdd.ejs", {data: data, idPet: idPet});
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updatePet = async(req, res)=>{
  try{
    let data = req.body;
    if(!data.vaccinated){
      data.vaccinated = 0;
    }
    let response = await petService.handleUpdatePet(data);
    if(response.errCode==0){
      return res.redirect("/");
    }
    return res.render("errPage", {errMessage: response.errMessage});
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}
let deletePet = async(req, res)=>{
  try{
    let idPet = req.query.id;
    let response = await petService.handleDeletePet(idPet);
    if(response.errCode==0){
      return res.redirect("/");
    }
    return res.render("errPage", {errMessage: response.errMessage});
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

//---------------api--------------------------------------------------------------------------------------------------

let createPetApi = async(req, res)=>{
  try{
    let data = req.body;
    if(!data.sold){
      data.sold=0;
    }
    let response = await petService.handleCreatePet(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let getPetApi = async(req, res)=>{
  try{
    let idPet = req.query.id;
    let response = await petService.handleGetPet(idPet);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let updatePetApi = async(req, res)=>{
  try{
    let data = req.body;
    if(!data.vaccinated){
      data.vaccinated = 0;
    }
    let response = await petService.handleUpdatePet(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}
let deletePetApi = async(req, res)=>{
  try{
    let idPet = req.query.id;
    let response = await petService.handleDeletePet(idPet);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let findPetByNameApi = async(req, res)=>{
  try{
    let namePet = req.query.name;
    let response = await petService.handleFindPetByName(namePet);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

module.exports = {
  createPet,
  getPet,
  getViewEditPet,
  updatePet,
  deletePet,

  createPetApi,
  getPetApi,
  updatePetApi,
  deletePetApi,
  findPetByNameApi,
}