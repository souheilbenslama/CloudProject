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

router.post('/login',mid.loggedOut, authentificationController.login);

router.post("/forgetPassword",mid.loggedOut,authentificationController.forgetPassword);

router.put("/resetPassword",mid.loggedOut,authentificationController.resetPassword);

router.post("/register",mid.loggedOut,upload.single("avatar"),authentificationController.register);

router.route("/profile")
      .get(mid.loggedIn,profileController.profile)
      .put(mid.loggedIn,upload.single("avatar"),profileController.updateProfile);

router.get("/getUsers",mid.loggedIn,profileController.getUsers);

router.get("/myPets",mid.loggedIn,petsController.myPets);
router.post("/addPet",mid.loggedIn,upload.single("photo"),petsController.addPet);
router.route("/pet/:petId")
      .get(mid.loggedIn,petsController.petProfile)
      .put(mid.loggedIn,upload.single("photo"),petsController.updatePetProfile)
      .delete(mid.loggedIn,petsController.deletePet);

router.route("/pet/:petId/appointment")
      .post(mid.loggedIn,eventController.addAppointment)
      .get(mid.loggedIn,eventController.showAppointments);
router.route("/pet/:petId/appointment/:appointmentId")
      .get(mid.loggedIn,eventController.findAppointment)
      .put(mid.loggedIn,eventController.updateAppointment)
      .delete(mid.loggedIn,eventController.deleteAppointment);

router.route("/pet/:petId/bath")
      .post(mid.loggedIn,eventController.addBath)
      .get(mid.loggedIn,eventController.showBaths);
router.route("/pet/:petId/bath/:bathId")
      .get(mid.loggedIn,eventController.findBath)
      .put(mid.loggedIn,eventController.updateBath)
      .delete(mid.loggedIn,eventController.deleteBath);

router.route("/pet/:petId/weight")
      .post(mid.loggedIn,eventController.addWeight)
      .get(mid.loggedIn,eventController.showWeights);
router.route("/pet/:petId/weight/:weightId")
      .get(mid.loggedIn,eventController.findWeight)
      .put(mid.loggedIn,eventController.updateWeight)
      .delete(mid.loggedIn,eventController.deleteWeight);

router.route("/pet/:petId/vaccine")
      .post(mid.loggedIn,eventController.addVaccine)
      .get(mid.loggedIn,eventController.showVaccines);
router.route("/pet/:petId/vaccine/:vaccineId")
      .get(mid.loggedIn,eventController.findVaccine)
      .put(mid.loggedIn,eventController.updateVaccine)
      .delete(mid.loggedIn,eventController.deleteVaccine);

router.route("/pet/:petId/food")
      .post(mid.loggedIn,eventController.addFood)
      .get(mid.loggedIn,eventController.showFood);
router.route("/pet/:petId/food/:foodId")
      .get(mid.loggedIn,eventController.findFood)
      .put(mid.loggedIn,eventController.updateFood)
      .delete(mid.loggedIn,eventController.deleteFood);

router.route("/pet/:petId/treatment")
      .post(mid.loggedIn,eventController.addTreatment)
      .get(mid.loggedIn,eventController.showTreatments);
router.route("/pet/:petId/treatment/:treatmentId")
      .get(mid.loggedIn,eventController.findTreatment)
      .put(mid.loggedIn,eventController.updateTreatment)
      .delete(mid.loggedIn,eventController.deleteTreatment);

router.put("/pet/:petId/status",mid.loggedIn,petsController.updateStatus);
router.put("/pet/:petId/sold",mid.loggedIn,petsController.sold);

module.exports = router;
