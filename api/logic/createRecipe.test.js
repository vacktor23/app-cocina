import 'dotenv/config'
import { data } from '../data/index.js'
import { createRecipe } from './createRecipe.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST createRecipe')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return createRecipe(
            '67fab79679f66ace0e2c29cc',
            'https://www.infobae.com/resizer/v2/TX564MRGQJAZ7HQ7SQGLT4VLAA.png?auth=888b0310bb7bff3126f0f53536b6debd6f0d5154aa9d9d806dd40eeb855f1925&smart=true&width=1200&height=630&quality=85',
            'lomo saltado',
            'Deliciosa receta peruana',
            30
        )
    })
    .then(result => {
        console.assert(result === undefined, 'result should be undefined after creation');
        console.log('Recipe created successfully');
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => data.disconnect())