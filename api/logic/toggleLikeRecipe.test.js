import 'dotenv/config'
import { data } from '../data/index.js'
import { toggleLikeRecipe } from './toggleLikeRecipe.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST toggleLikeRecipe')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return toggleLikeRecipe('67fab79679f66ace0e2c29cc', '67fe11c845ec7596cccf40a7')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())