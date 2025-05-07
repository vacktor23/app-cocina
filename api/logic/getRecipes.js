import { ValidationError, NotFoundError, SystemError } from 'com/errors.js';
import { User, Recipe } from '../data/index.js';
import { validate } from 'com';

export const getRecipes = (userId) => {
    validate.id(userId)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            return Recipe.find()
                .select('-__v').sort('-createAt')
                .populate('author', 'username').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(recipes => {
                    recipes.forEach(recipe => {
                        recipe.id = recipe._id.toString()
                        delete recipe._id

                        if (recipe.author._id) {
                            recipe.author.id = recipe.author._id.toString()
                            delete recipe.author._id
                        }

                        recipe.liked = recipe.likes.some(userObjectId => userObjectId.toString() === userId)
                        recipe.likesCount = recipe.likes.length
                        delete recipe.likes

                        recipe.own = recipe.author.id === userId

                    })

                    return recipes
                })
        })


}