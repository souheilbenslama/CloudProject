var Appointment = require("../models/Appointment");
var Bath = require("../models/Bath");
var Food = require("../models/Food");
var Treatment = require("../models/Treatment");
var Vaccine = require("../models/Vaccine");
var Weight = require("../models/Weight");
const Pet = require("../models/Pet");
const Dossier = require("../models/Dossier");
var exports = module.exports = {};

exports.getDossiers = function(req,res,next){
    Dossier.find({vet:req.user._id,confirm:true}).populate("pet").exec(function(err,dossiers){
        if(err){
            err.message = "dossier not found!";
            return next(err.message);
        }else{
            res.send(dossiers);
        }
    });
}

exports.requests = function(req,res,next){
    Dossier.find({vet:req.user._id,confirm:true}).populate("pet").exec(function(err,dossiers){
        if(err){
            err.message = "dossier not found!";
            return next(err.message);
        }else{
            res.send(dossiers);
        }
    });
}

exports.requestsOnHold = function(req,res,next){
    Dossier.find({pet:req.params.petId,confirm:false}).populate("pet").exec(function(err,dossiers){
        if(err){
            err.message = "dossier not found!";
            return next(err.message);
        }else{
            res.send(dossiers);
        }
    });
}

exports.getDossier = function(req,res,next){
    Dossier.findById(req.params.dossierId).exec(function(err,dossier){
        if(err){
            err.message = "dossier not found!";
            return next(err.message);
        }else{
            var limit = (dossier.status=="open")? new Date():dossier.updatedAt;
            Pet.findById(dossier.pet).exec(function(err,pet){
                if(err){
                    err.message="pet not found";
                    return next(err.message);
                }else{
                    Bath.find({pet:pet._id,date:{$lte:limit}},function(err,baths){
                        if(err){
                            err.message="bath not found";
                            next(err.message);
                        }else{
                            /* if(!baths){
                                baths = [];
                            }
                            baths.sort(function(a,b){return a.date-b.date;});*/
                            Food.find({pet:pet._id,date:{$lte:limit}},function(err,food){
                                if(err){
                                    err.message="food not found";
                                    next(err.message);
                                }else{
                                    /* if(!food){
                                        food = [];
                                    }
                                    food.sort(function(a,b){return a.date-b.date;}); */
                                    Appointment.find({pet:pet._id,date:{$lte:limit}},function(err,appointments){
                                        if(err){
                                            err.message="appointment not found";
                                            next(err.message);
                                        }else{
                                            /* if(!appointments){
                                                appointments = [];
                                            }
                                            appointments.sort(function(a,b){return a.date-b.date;}); */
                                            Treatment.find({pet:pet._id,date:{$lte:limit}},function(err,treatments){
                                                if(err){
                                                    err.message="treatment not found";
                                                    next(err.message);
                                                }else{
                                                    /* if(!treatments){
                                                        treatments = [];
                                                    }
                                                    treatments.sort(function(a,b){return a.date-b.date;}); */
                                                    Vaccine.find({pet:pet._id,date:{$lte:limit}},function(err,vaccines){
                                                        if(err){
                                                            err.message="vaccine not found";
                                                            next(err.message);
                                                        }else{
                                                            /* if(!vaccines){
                                                                vaccines = [];
                                                            }
                                                            vaccines.sort(function(a,b){return a.date-b.date;}); */
                                                            return res.send({pet:pet,bath:baths,food:food,appointment:appointments,Treatment:treatments,vaccine:vaccines});
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }  
    });
}

exports.requestVet = function(req,res,next){
    var dossierData = {
        vet:req.params.vetId,
        pet:req.params.petId
    };
    Dossier.create(dossierData,function(error){ 
        if(error){
            return next(error);
        }else{
            res.status(200).send("Demande acces envoyé");
        }
    }); 
}

exports.cancelRequest = function(req,res,next){
    Dossier.remove({ _id: req.params.dossierId }, function(err,dossier) {
        if (err) {
            next(err);
        }
        else if(dossier.confirm){
            res.status(403).send("request denied!");
        }else{
            res.status(200).send("request deleted");
        }
    });
}

exports.giveAccess = function(req,res,next){
    Dossier.findById(req.params.dossierId).exec(function(error){
        if(error){
            return next(error);
        }else{
            Dossier.findOneAndUpdate({_id:req.params.dossierId},{$set:{confirm:true}},function(err){
                if(err){
                    next(err);
                }else{
                    res.status(200).send("access given");
                    
                }
            });
        }
    });
}

exports.addRapport = function(req,res,next){
    Dossier.findById(req.params.dossierId).exec(function(error){
        if(error){
            return next(error);
        }else{
            Pet.findOneAndUpdate({_id:req.params.dossierId},{$set:req.body},function(err){
                if(err){
                    next(err);
                }else{
                    res.status(200).send("rapport updated");
                    
                }
            });
        }
    });
}