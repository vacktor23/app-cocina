import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserUsername } from './getUserUsername.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getUserUsername', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user', () => {
        let returnedUsername

        return User.create({
            name: 'pepe',
            email: 'pe@pepe.com',
            username: 'pepe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => getUserUsername(user.id))
            .then(username => returnedUsername = username)
            .finally(() => expect(returnedUsername).to.equal('pepe'))
    })

    it('fails on non-existing user', () => {
        let catchedError

        return getUserUsername(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})