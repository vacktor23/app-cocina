import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const createRecipe = (image, title, description, cookingTime, ingredients) => {
    validate.url(image, 'image')
    validate.maxLength(image, 1000, 'image')

    validate.text(title, 'title')
    validate.maxLength(title, 100, 'title')

    validate.text(description, 'description')
    validate.maxLength(description, 2000, 'description')

    validate.number(cookingTime, 'cookingTime')
    validate.array(ingredients, 'ingredients')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, title, description, cookingTime, ingredients })
    })
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(response => {
            if (response.status === 201)
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

