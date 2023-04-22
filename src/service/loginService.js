import db from "../models/index";
const jwt = require('jsonwebtoken');

let handleLogin = (data)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!data){
        return resolve({
          errCode: 2,
          errMessage: "Missing input!"
        })
      }
      let account = await db.Account.findOne({
        where: {email: data.email, password: data.password}
      })
      if(account) {
        let token = jwt.sign({ email: data.email }, 'mk', {expiresIn: 1});
        // console.log(token);
        return resolve({
          errCode: 0,
          errMessage: "Valided",
          data: token
        })
      }
      return resolve({
        errCode: 1,
        errMessage: "Invalided"
      })
    }catch(e){
      return reject(e);
    }
  });
}

let verifyToken = (token)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      // console.log(token);
      if(!token){
        return resolve({
          errCode: 1,
          errMessage: "Failed"
        })
      }
      let result = jwt.verify(token, 'mk');
      if(result){
        return resolve({
          errCode: 0,
          errMessage: "Successfully!"
        })
      }
      return resolve({
        errCode: 1,
        errMessage: "Failed"
      })
    }catch(e){
      reject(e);
    }
  });  
}

module.exports = {
  handleLogin,
  verifyToken,
}