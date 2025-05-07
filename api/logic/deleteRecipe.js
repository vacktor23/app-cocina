import { User, Recipe } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export const deleteRecipe = (userId, recipeId) => {
    validate.id(userId, 'userId')
    validate.id(recipeId, 'recipeId')

    return Promise.all([
        User.findById(userId).lean(),
        Recipe.findById(recipeId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, recipe]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!recipe) throw new NotFoundError('recipe not found')

            if (recipe.author.toString() !== userId) throw new OwnershipError('user is not author of post')

            return Recipe.deleteOne({ _id: recipeId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}