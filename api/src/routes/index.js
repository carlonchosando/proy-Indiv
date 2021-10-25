const  PokeRout  = require('./pokemons.js');

const { Router } = require('express');



const router = Router();
router.use('/pokemons', PokeRout);



module.exports = router;

