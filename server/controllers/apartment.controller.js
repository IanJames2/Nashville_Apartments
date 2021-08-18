const Apartment = require("../models/Apartment.model")

module.exports.findAllApartments = (req, res) => {
    Apartment.find() //BUILT IN FUNCTION!
        .then(allApartments => {
            console.log("*****FINDING_ALL_APARTMENTS*****")
            res.json({results: allApartments})
        })
        .catch(err => res.json(err))
    }

module.exports.findAnApartment = (req, res) =>{
    Apartment.findOne({_id: req.params.Apartmentid}) //BUILT IN FUNCTION!
    .then(oneApartment => res.json({results: oneApartment}))
    .catch(err => res.json(err))
}

module.exports.EnterAnApartment = (req, res) => {
    Apartment.create(req.body) //BUILT IN FUNCTION!
        .then(newApartment=> res.json({results: newApartment}))
        .catch(err => res.json(err))
    }

module.exports.updateAnApartment = (req, res) =>{
    Apartment.findOneAndUpdate(   //BUILT IN FUNCTION!
        {_id: req.params.Apartmentid},
        req.body,
        {new:true, runValidators:true})
        .then(updateAnApartment => res.json({results: updateAnApartment}))
        .catch(err => res.json(err))
    }

module.exports.deleteOneApartment = (req, res)=>{
    Apartment.deleteOne({_id: req.params.Apartmentid})   //BUILT IN FUNCTION!
    .then(deletedResult => res.json({results: deletedResult}))
    .catch(err => res.json(err))
}

module.exports.findARandomApartment = (req,res)=>{   //BUILT IN FUNCTION!
    console.log("***********FINDING A RANDOM Apartment**********")
    Apartment.find()
        .then(allapartments => {
            let maxindex = allapartments.length
            console.log(Math.random(maxindex))
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
            let randomNum = getRandomInt(maxindex)
            console.log("RANDOM INDEX IS -->", randomNum)

            res.json({results: allapartments[randomNum]})
        })
        .catch(err => res.json(err))
    }



        