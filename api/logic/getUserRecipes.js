import { SystemError } from 'com/errors.js'
import { User, Recipe } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

export const getUserRecipes = (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return Promise.all([
        User.findById(userId).lean(),
        User.findById(targetUserId).lean(),
        Recipe.find({ author: targetUserId }).select('-__v').sort('-createdAt').populate('author', 'username').lean()

    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, targetUser, recipes]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!targetUser) throw new NotFoundError('targetUser not found')

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
}