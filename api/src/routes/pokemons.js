const axios = require('axios');

const { Router } = require('express');

const router = Router();

router.get('/pokemons',() => {
    let danno = [];
	for (let i = 1; i <= 40; i++) {
		danno.push(axios.get('https://pokeapi.co/api/v2/pokemon/' + i));
	}
	return Promise.all(danno).then((response) => {
		const pokemones = response.map((danno) => {
			return (poke = {
				name: danno.data.name,
				id: danno.data.id,
				img: danno.data.sprites.other.dream_world.front_default,
				types: danno.data.types.map((e) => e.type.name),
				attack: danno.data.stats[1].base_stat,
			});
		});
		console.log(pokemones);
		return pokemones;
	});
    
});

module.exports = router;  //exportamos el router
