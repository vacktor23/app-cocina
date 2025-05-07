import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const updateRecipeDescription = (recipeId, description) => {
    validate.id(recipeId, 'recipeId')
    validate.text(description, 'description')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/recipes/${recipeId}/description`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {

            if (response.status === 204)
                return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}