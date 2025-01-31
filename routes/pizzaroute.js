const express = require('express');
const router = express.Router();
const { getPizzas, createPizzas, editPizzas, deletePizzas } = require('../controllers/pizzaController');

router.get('/', getPizzas);
router.post('/', createPizzas);
router.put('/:id', editPizzas);
router.delete('/:id', deletePizzas);

module.exports = router;
