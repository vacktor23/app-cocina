import { errors, validate } from 'com'

const { SystemError } = errors

export const registerUser = (name, email, username, password) => {
    validate.name(name)
    validate.minLength(name, 1, 'name')
    validate.maxLength(name, 20, 'name')
    validate.email(email)
    validate.username(username)
    validate.password(password)


    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, username, password })
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status == 201)
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