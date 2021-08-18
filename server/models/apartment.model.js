const mongoose = require("mongoose");

const ApartmentSchema = new mongoose.Schema({
    Apartment_Name: {
        type: String,
        required: [true, "Must enter apartment name"],
        minLength: [3, "Apartment name must be at least 3 characters."]
    },
    Picture: {
        type: String,
        required: [true, "Image of the apartment is mandatory. Just copy the image address and paste it into the picture input box."]
    },
    Address: {
        type: String,
        required: [true, "Must include Address or location of residence."],
        minLength: [5, "Your address need not be less than 5 characters. Add to the address sir/ma'am! Respectfully"]
    },
    Rent: {
        type: Number,
        required: [true, "Must include the cost of living."],
        minLength: [1, "Include a minimum of 1 character for the rent!"]
    },
    Amenities: {
        type: String,
        required: [true, "Must include Amenities!"],
        minLength: [1, "Do some research and type in some amenities for this apartment."]
    },
    Description: {
        type: String,
        required: [true, "Enter a description of the apartment!"],
        minLength: [15, "Be more detailed with your description! Include a minimum of 15 characters!"]
    },
    URL: {
        type: String,
        required: [true, "Must include a link to the apartment of place of residence!"],
        minLength: [5, "C'mon, the URL has got to be longer than that!"]
    }
})

const Apartment = mongoose.model("Apartment", ApartmentSchema);

module.exports = Apartment;



