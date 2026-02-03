const mongoose = require('mongoose');
const { Schema } = mongoose;

const MenuSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
        //trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String, // store image URL or path
        required: true
    }
});

const Menu = mongoose.model('menu', MenuSchema);
Menu.createIndexes();
module.exports = Menu;