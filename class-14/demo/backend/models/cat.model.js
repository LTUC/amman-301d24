'use strict';

const mongoose = require('mongoose');

/*
 We are going to use mongoose, to do two things:
    - Create the schema
    - generate the model
*/

// Here we are creating a new schema obj, which will be used later on to generate the model
const catSchema = new mongoose.Schema({
    name: { type: String }
});


module.exports = catSchema;