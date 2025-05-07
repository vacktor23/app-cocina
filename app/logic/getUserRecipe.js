import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const getUserRecipe = targetUserId => {
    validate.id(targetUserId, 'targetUserId')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/users/${targetUserId}/recipes`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => {
                        const recipes = body

                        recipes.forEach(recipe => {
                            recipe.createdAt = new Date(recipe.createdAt)
                            if (recipe.modifiedAt) recipe.modifiedAt = new Date(recipe.modifiedAt)
                        })

                        return recipes
                    })

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })

}