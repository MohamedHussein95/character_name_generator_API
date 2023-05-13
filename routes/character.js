const express = require('express');
const Character = require('../models/Character');
const { faker } = require('@faker-js/faker');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const characters = await Character.find({}).sort();

		res.json(characters);
	} catch (error) {
		res.json({ error });
	}
});
router.get('/search', async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			gender,
			birthday,
			culture,
			category,
			description,
			age,
			height,
			weight,
			zodiac,
			temperament,
		} = req.query;

		let query = {};

		if (firstName) {
			query.firstName = firstName;
		}

		if (lastName) {
			query.lastName = lastName;
		}

		if (category) {
			query.category = category;
		}

		if (age) {
			query.age = age;
		}
		if (gender) {
			query.gender = gender;
		}
		if (birthday) {
			query.birthday = birthday;
		}
		if (culture) {
			query.culture = culture;
		}
		if (description) {
			query.description = description;
		}
		if (height) {
			query.height = height;
		}
		if (weight) {
			query.weight = weight;
		}
		if (zodiac) {
			query.zodiac = zodiac;
		}
		if (temperament) {
			query.temperament = temperament;
		}

		const characters = await Character.find(query);

		res.json(characters);
	} catch (error) {
		res.json({ error });
	}
});

router.get('/random', async (req, res) => {
	const category = ['fantasy', 'sci-fi', 'realistic'];
	const temperament = ['sanguine', 'choleric', 'melancholic', 'phlegmatic'];
	try {
		const character = new Character({
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			gender: faker.person.gender(),
			birthday: faker.date.birthdate(),
			culture: faker.location.country(),
			category: [
				category[Math.floor(Math.random() * category.length)],
				category[Math.floor(Math.random() * category.length) + 1],
			],
			description: faker.person.bio(),
			age: faker.number.int({ min: 18, max: 100 }),
			height: faker.number.int({ min: 120, max: 220 }),
			weight: faker.number.int({ min: 40, max: 150 }),
			zodiac: faker.person.zodiacSign(),
			temperament: [
				temperament[Math.floor(Math.random() * temperament.length) + 1],
				temperament[Math.floor(Math.random() * temperament.length)],
			],
		});

		await character.save();

		res.json(character);
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
});

router.get('/custom_random', async (req, res) => {
	const dcategory = ['fantasy', 'sci-fi', 'realistic'];
	const dtemperament = ['sanguine', 'choleric', 'melancholic', 'phlegmatic'];
	const {
		gender,
		category,
		age,
		height,
		weight,
		zodiac,
		temperament,
		minH,
		maxH,
		minW,
		maxW,
	} = req.body;

	try {
		const character = new Character({
			firstName: faker.person.firstName(gender),
			lastName: faker.person.lastName(gender),
			gender: gender || faker.person.gender(),
			birthday: faker.date.birthdate(),
			culture: faker.location.country(),
			category:
				category || dcategory[Math.floor(Math.random() * dcategory.length)],
			description: faker.person.bio(),
			age: age || faker.number.int({ min: 18, max: 100 }),
			height: height || faker.number.int({ min: minH, max: maxH }),
			weight: weight || faker.number.int({ min: minW, max: maxW }),
			zodiac: zodiac || faker.person.zodiacSign(),
			temperament:
				temperament ||
				dtemperament[Math.floor(Math.random() * dtemperament.length)],
		});

		await character.save();

		res.json(character);
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
});

module.exports = router;
