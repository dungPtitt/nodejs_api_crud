import db from "../models/index";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let handleGetPet = (idPet)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idPet){
        let pets = await db.Pet.findAll();
        resolve({
          errCode: 0,
          message: "Get all Pet successfully!",
          data: pets
        })
      }
      let pet = await db.Pet.findOne({
        where: {id: idPet},
        raw: true
      });
      if(!pet){
        resolve({
          errCode: 2,
          message: "Pet not exist",
        })
      }
      resolve({
        errCode: 0,
        message: "Get Pet successfully!",
        data: pet
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleCreatePet= async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pet = await db.Pet.findOne({
        where: {name: data.name, dob: data.dob},
        raw: true
      })
      if(pet){
        return resolve({
          errCode: 2, 
          errMessage: "Pet co the bi trung do Tên và ngày sinh của sinh vien đã có trong database.Vui lòng thư lại!"
        })
      }
      await db.Pet.create({
        name: data.name,
        dob: data.dob,
        race: data.race,
        vaccinated: data.vaccinated?data.vaccinated:0
      })
      resolve({
        errCode: 0,
        message: "Create Pet successfully!"
      });
    } catch (e) {
      reject(e)
    }
  })
}

let handleUpdatePet = (data)=>{
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter"
        })
      }
      let pet = await db.Pet.findOne({
        where: { id: data.id },
        raw: false
      })
      if (!pet) {
        resolve({
          errCode: 2,
          errMessage: "Pet not found!"
        })
      }
      // ten va cac thuoc tinh kiem tra co su thay doi thi moi can kiem tra them
      if(!(pet.name==data.name && pet.dob==data.dob)){
        let checkPet = await db.Pet.findOne({
          where: {name: data.name, dob: data.dob},
          raw: true
        })
        if(checkPet){
          return resolve({
            errCode: 5,
            errMessage: "Tên và ngày sinh của pet đã có trong database.Vui lòng thư lại!"
          })
        }
      }
      pet.name = data.name;
      pet.dob = data.dob;
      pet.race = data.race;
      pet.vaccinated = data.vaccinated?data.vaccinated:0;
      await pet.save();
      resolve({
        errCode: 0,
        message: "Update Pet Successfully!",
      })
    } catch (e) {
      reject(e)
    }
  })
}

let handleDeletePet = (idPet)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idPet){
        return resolve({
          errCode: 1,
          errMessage: "Missing input parameter!"
        })
      }
      let pet = await db.Pet.findOne({
        where: {id: idPet},
        raw: false
      })
      if(!pet){
        return resolve({
          errCode: 2,
          errMessage: "pet not found!"
        })
      }
      await pet.destroy();
      return resolve({
        errCode:0,
        message: "Delete pet successfully!",
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleFindPetByName = (namePet)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!namePet){
        let pets = await db.Pet.findAll();
        resolve({
          errCode: 0,
          message: "Get all Pet successfully!",
          data: pets
        })
      }
      let pet = await db.Pet.findAll({
        where:{
          name: { [Op.like]: `%${namePet}%`}
        },
        raw: true
      });
      if(!pet){
        pet = [];
      }
      resolve({
        errCode: 0,
        message: "Get Pet successfully!",
        data: pet
      })
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleGetPet,
  handleCreatePet,
  handleUpdatePet,
  handleDeletePet,
  handleFindPetByName
}