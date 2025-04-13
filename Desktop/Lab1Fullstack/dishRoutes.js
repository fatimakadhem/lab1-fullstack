console.log('📦 dishRoutes.js laddades');

const express = require('express');
const router = express.Router();
const Dish = require('./dishModel');

// GET alla recept
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET recept med ID
router.get('/:id', async (req, res) => {
    try {
      const dish = await Dish.findById(req.params.id);
      if (!dish) return res.status(404).json({ message: 'Recept hittades inte' });
      res.json(dish);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// GET recept med namn
router.get('/:name', async (req, res) => {
  try {
    const dish = await Dish.findOne({ name: req.params.name });
    if (!dish) return res.status(404).json({ message: 'Recept hittades inte' });
    res.json(dish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST nytt recept
router.post('/', async (req, res) => {
  try {
    const count = await Dish.countDocuments(); // 👈 Räkna befintliga rätter
    const newDish = new Dish({
      ...req.body,
      dishId: count + 1             // 👈 Sätt dishId automatiskt
    });
    await newDish.save();
    res.status(201).json(newDish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// PUT uppdatera recept via ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Recept hittades inte' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE recept via ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Dish.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Recept hittades inte' });
    res.json({ message: 'Recept raderat' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
