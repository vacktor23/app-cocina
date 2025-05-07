import 'dotenv/config'
import { data } from '../data/index.js'
import { deleteRecipe } from './deleteRecipe.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST deleteRecipe')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return deleteRecipe('67fab79679f66ace0e2c29cc', '67fe117edef02ffbf59474cb')

                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())