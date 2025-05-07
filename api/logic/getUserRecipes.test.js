import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserRecipes } from './getUserRecipes.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserRecipes')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let recipes2

            return getUserRecipes('67fab79679f66ace0e2c29cc', '67fab79679f66ace0e2c29cc')
                .then(recipes => recipes2 = recipes)
                .finally(() => console.assert(recipes2 instanceof Array, 'recipes 2 is an array'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
