import 'dotenv/config'
import { data, User } from '../data/index.js'
import { registerUser } from './registerUser.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { DuplicityError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('registerUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on new user', () => {
        let result2

        return registerUser('pepe', 'pe@pepe.com', 'pepe', '123123123')
            .then(result => result2 = result)
            .finally(() => expect(result2).to.be.undefined)
            .then(() => User.findOne({ username: 'pepe' }).lean())
            .then(user => {
                expect(user.name).to.equal('pepe')
                expect(user.email).to.equal('pe@pepe.com')
                expect(user.username).to.equal('pepe')

                return bcrypt.compare('123123123', user.password)
            })
            .then(match => expect(match).to.be.true)

    })

    it('fails on existing user', () => {
        let catchedError

        return User.create({
            name: 'pepe',
            email: 'pe@pepe.com',
            username: 'pepe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => registerUser('pepe', 'pe@pepe.com', 'pepe', '123123123'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('user already exists')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})