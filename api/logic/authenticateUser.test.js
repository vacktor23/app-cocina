import 'dotenv/config'
import { data } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST authenticateUser')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let id2

            return authenticateUser('victor', '123123123')
                .then(id => id2 = id)
                .finally(() => console.assert(typeof id2 === 'string', 'userId is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())