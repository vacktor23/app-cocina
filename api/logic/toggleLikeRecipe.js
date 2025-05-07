import { User, Recipe } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const toggleLikeRecipe = (userId, recipeId) => {
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

            const { likes } = recipe

            const index = likes.findIndex(userObjectId => userObjectId.toString() === userId)

            if (index < 0)
                likes.push(userId)
            else
                likes.splice(index, 1)

            return Recipe.updateOne({ _id: recipeId }, { $set: { likes } })
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}