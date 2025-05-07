import 'dotenv/config'
import { data } from '../data/index.js'
import { updateRecipeDescription } from './updateRecipeDescription.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST updateRecipeDescription')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null
            return updateRecipeDescription('67fab79679f66ace0e2c29cc', '67fe11c845ec7596cccf40a7', 'texto cambiado')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())