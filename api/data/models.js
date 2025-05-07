import { constant } from 'com'
import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const user = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
    },
    email: {
        type: String,
        required: true,
        match: constant.EMAIL_REGEX,
        maxLength: 30,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})


const recipe = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        match: constant.URL_REGEX,
        maxLength: 500,
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000
    },

    ingredients: {
        type: [String],
        required: true,
        validate: arr => arr.length > 0
    },

    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    cookingTime: {
        type: Number,
        required: true,
        min: 1
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const User = model('User', user)
const Recipe = model('Recipe', recipe)


export {
    User,
    Recipe

}