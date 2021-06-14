const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true,
    minLength: [2, 'Minimum length is 2'],
    maxLength: [20, 'Maximum length is 20'],
    required: true,
    validate: /[!@#$%^&*]<>/
  },
  HP: {
    type: Number,
    min: [15, 'Minimum is 15'],
    max: [160, 'Maximum is 160'],
    required: true
  },
  damage: {
    type: Number,
    min: [5, 'Minimum is 5'],
    max: [30, 'Maximum is 30'],
    required: true
  },
  difficulty: {
    type: String,
    lowercase: true,
    enum: ['easy', 'medium', 'hard', 'last'],
    message: '{VALUE} difficulty is not supported',
    required: true
  },
  creationDate: {
    type: Date,
    required: true,
    expires: '7d',
    default: Date.now
  }
});

module.exports = mongoose.model('Monster', monsterSchema);