const ApartmentController = require('../controllers/apartment.controller')

module.exports = (app) => {
    app.get("/api/apartment/all", ApartmentController.findAllApartments)
    app.post("/api/apartment/create", ApartmentController.EnterAnApartment)
    app.get("/api/apartment/random", ApartmentController.findARandomApartment)
    app.get("/api/apartment/:Apartmentid", ApartmentController.findAnApartment)
    app.put("/api/apartment/update/:Apartmentid", ApartmentController.updateAnApartment)
    app.delete("/api/apartment/delete/:Apartmentid", ApartmentController.deleteOneApartment)
}
