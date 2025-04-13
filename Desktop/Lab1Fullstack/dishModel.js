const mongoose = require('mongoose');

// Skapa ett schema för ett recept
const dishSchema = new mongoose.Schema({
  dishId: Number,                // Eget nummer-ID som t.ex. 1, 2, 3...
  name: { type: String, required: true, unique: true }, // Namnet måste vara unikt
  ingredients: [String],        // Lista av ingredienser
  preparationSteps: [String],   // Lista av steg
  cookingTime: Number,          // Tillagningstid i minuter
  origin: String,               // Varifrån rätten kommer
  spiceLevel: String,           // Eget fält: t.ex. Mild, Medel, Stark
  vegetarian: Boolean,          // Valfritt extra fält
  difficulty: String            // Valfritt extra fält: t.ex. Lätt, Medel, Svår
});

// Skapa och exportera modellen
const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;
