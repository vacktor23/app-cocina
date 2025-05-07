import 'dotenv/config'
import { data } from '../data/index.js'
import { getRecipes } from './getRecipes.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getRecipes')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let recipes2

            return getRecipes('6809f14c9c18bc69531ee9df')
                .then(recipes => recipes2 = recipes)
                .finally(() => {
                    console.assert(recipes2 instanceof Array, 'recipes2 is an array')
                    console.assert(recipes2.length === 2, "recipies have two elements")
                    console.log(recipes2)
                })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())