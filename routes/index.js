var express = require('express');
var router = express.Router();
var mid = require("../middleware/mid");
var authentificationController = require("../controller/authentificationController");
var profileController = require("../controller/profileController");
var petsController = require("../controller/petsController");
var eventController = require("../controller/eventController");
var multer = require('multer');

var storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null,"./public/uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
      cb(null,Date.now()+"_"+file.originalname );
  }
});
var upload = multer({ storage: storage ,limits:{fieldSize:1024*1024*3}});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/contacts', function(req, res, next) {
  res.render('contacts');
});

router.get('/login',mid.loggedOut, function(req, res, next) {
  res.render('login');
});
router.post('/login', authentificationController.login_post);

router.get("/forgetPassword",mid.loggedOut,function(req,res,next){
  res.render("forgetPassword");
});
router.post("/forgetPassword",authentificationController.forgetPassword_post)

router.post("/resetPassword",authentificationController.resetPassword_post)

router.get("/register",mid.loggedOut, function(req, res, next) {
  res.render("register");
});
router.post("/register",upload.single("avatar"),authentificationController.register_post);

router.get("/profile",mid.loggedIn,profileController.profile);

router.get("/updateProfile",mid.loggedIn,profileController.updateProfile_get);
router.post("/updateProfile",upload.single("avatar"),profileController.updateProfile_post);

router.get("/logout",mid.loggedIn,authentificationController.logout);

router.get("/profile/myPets",mid.loggedIn,petsController.myPets);

router.get("/profile/addPet",mid.loggedIn,function(req,res,next){
  res.render("addPet");
});
router.post("/profile/addPet",upload.single("photo"),petsController.addPet_post);

router.get("/profile/petProfile/:petId",mid.loggedIn,petsController.petProfile);

router.get("/profile/updatePetProfile/:petId",mid.loggedIn,petsController.updatePetProfile_get);
router.post("/profile/updatePetProfile/:petId",upload.single("photo"),petsController.updatePetProfile_post);

router.get("/profile/deletePet/:petId",mid.loggedIn,petsController.deletePet);

router.get("/profile/petProfile/:petId/addAppointment",mid.loggedIn,function(req,res,next){
  res.render("addAppointment");
});
router.post("/profile/petProfile/:petId/addAppointment",eventController.addAppointment_post);
router.get("/profile/petProfile/:petId/updateAppointment/:appointmentId",mid.loggedIn,eventController.updateAppointment_get);
router.post("/profile/petProfile/:petId/updateAppointment/:appointmentId",eventController.updateAppointment_post);
router.get("/profile/petProfile/:petId/deleteAppointment/:appointmentId",mid.loggedIn,eventController.deleteAppointment);

router.get("/profile/petProfile/:petId/addBath",mid.loggedIn,function(req,res,next){
  res.render("addBath");
});
router.post("/profile/petProfile/:petId/addBath",eventController.addBath_post);
router.get("/profile/petProfile/:petId/updateBath/:bathId",mid.loggedIn,eventController.updateBath_get);
router.post("/profile/petProfile/:petId/updateBath/:bathId",eventController.updateBath_post);
router.get("/profile/petProfile/:petId/deleteBath/:bathId",mid.loggedIn,eventController.deleteBath);

router.get("/profile/petProfile/:petId/addVaccine",mid.loggedIn,function(req,res,next){
  res.render("addVaccine");
});
router.post("/profile/petProfile/:petId/addVaccine",eventController.addVaccine_post);
router.get("/profile/petProfile/:petId/updateVaccine/:vaccineId",mid.loggedIn,eventController.updateVaccine_get);
router.post("/profile/petProfile/:petId/updateVaccine/:vaccineId",eventController.updateVaccine_post);
router.get("/profile/petProfile/:petId/deleteVaccine/:vaccineId",mid.loggedIn,eventController.deleteVaccine);

router.get("/profile/petProfile/:petId/addFood",mid.loggedIn,function(req,res,next){
  res.render("addFood");
});
router.post("/profile/petProfile/:petId/addFood",eventController.addFood_post);
router.get("/profile/petProfile/:petId/updateFood/:foodId",mid.loggedIn,eventController.updateFood_get);
router.post("/profile/petProfile/:petId/updateFood/:foodId",eventController.updateFood_post);
router.get("/profile/petProfile/:petId/deleteFood/:foodId",mid.loggedIn,eventController.deleteFood);

router.get("/profile/petProfile/:petId/addTreatment",mid.loggedIn,function(req,res,next){
  res.render("addTreatment");
});
router.post("/profile/petProfile/:petId/addTreatment",eventController.addTreatment_post);
router.get("/profile/petProfile/:petId/updateTreatment/:treatmentId",mid.loggedIn,eventController.updateTreatment_get);
router.post("/profile/petProfile/:petId/updateTreatment/:treatmentId",eventController.updateTreatment_post);
router.get("/profile/petProfile/:petId/deleteTreatment/:treatmentId",mid.loggedIn,eventController.deleteTreatment);

module.exports = router;
