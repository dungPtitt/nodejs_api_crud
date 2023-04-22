import petService from "../service/petService"; 
import loginService from "../service/loginService";


let getViewLogin = (req, res)=>{
  try{
    return res.render("login.ejs", {data: null});
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let login = async(req, res)=>{
  try{
    let data = req.body;
    let response = await loginService.handleLogin(data);
    if(response.errCode==0){
      res.cookie("token", response.data, {
        maxAge: 1000 * 60*1// thoi gian song sau 1 phut;
      });
      return res.redirect("/verify");
    }
    return res.redirect("/login");
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let verify = async(req, res)=>{
  try{
    let token = req.cookies.token;
    let response = await loginService.verifyToken(token);
    if(response.errCode==0){
      return res.send("welcome");
    }
    return res.redirect("/login");
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

//
let getHomePage = async(req, res)=>{
  try{
    let response = await petService.handleGetPet();
    return res.render("pet/pets.ejs", {data: response.data});
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

module.exports = {
  getHomePage,
  getViewLogin,
  login,
  verify,
}