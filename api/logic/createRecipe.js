import { User, Recipe } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const createRecipe = (userId, image, title, description, cookingTime, ingredients) => {
    validate.id(userId, 'userId')
    validate.url(image, 'image')
    validate.maxLength(image, 500, 'image')
    validate.text(title, 'title')
    validate.maxLength(title, 100, 'title')
    validate.text(description, 'description')
    validate.maxLength(description, 2000, 'description')
    validate.number(cookingTime, 'cookingTime')
    validate.minValue(cookingTime, 1, 'cookingTime')
    validate.array(ingredients, 'ingredients')
    validate.minLength(ingredients, 1, 'ingredients')
    ingredients.forEach(ingredient => validate.text(ingredient, 'ingredient'))

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const recipe = {
                author: userId,
                image,
                title,
                description,
                cookingTime,
                ingredients
            }

            return Recipe.create(recipe)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}