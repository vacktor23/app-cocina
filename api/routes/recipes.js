import { Router } from 'express'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'
import { logic } from '../logic/index.js'

export const recipes = Router();

recipes.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { image, title, description, cookingTime, ingredients } = req.body

    return logic.createRecipe(userId, image, title, description, cookingTime, ingredients)
        .then(() => res.status(201).send());
}))

recipes.get('/', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getRecipes(userId)
        .then(recipes => res.json(recipes))
}))

recipes.delete('/:recipeId', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { recipeId } = req.params;

    return logic.deleteRecipe(userId, recipeId)
        .then(() => res.status(204).send());
}))

recipes.patch('/:recipeId/likes', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { recipeId } = req.params

    return logic.toggleLikeRecipe(userId, recipeId)
        .then(() => res.status(204).send());
}))

recipes.patch('/:recipeId/description', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req

    const { recipeId } = req.params

    const { description } = req.body

    return logic.updateRecipeDescription(userId, recipeId, description)
        .then(() => res.status(204).send());
}))
