const mongoose = require('mongoose');

const CharacterSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	gender: {
		//male, female, non-binary, or other
		type: String,
	},
	birthday: {
		//e.g., English, Spanish, Chinese, etc
		type: String,
	},
	culture: {
		//e.g., English, Spanish, Chinese, etc
		type: String,
	},
	category: {
		//e.g., fantasy, sci-fi, or realistic
		type: [String],
	},
	description: {
		//e.g., a man who loves to read
		type: String,
	},
	age: {
		type: Number,
	},
	height: {
		type: String,
	},
	weight: {
		type: String,
	},
	zodiac: {
		//e.g., cancer,capricon
		type: String,
	},
	temperament: {
		//e.g., sanguine,choleric
		type: [String],
	},
});

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;
