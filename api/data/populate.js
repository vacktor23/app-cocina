import 'dotenv/config'
import { data, User, Recipe } from '../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Recipe.deleteMany({})
        ])
            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return User.insertMany([
                    { name: 'María López', email: 'maria@recetas.com', username: 'mariaL', password: hash },
                    { name: 'Juan Pérez', email: 'juan@recetas.com', username: 'juanP', password: hash },
                    { name: 'Lucía Torres', email: 'lucia@recetas.com', username: 'luciaT', password: hash },
                ])
            })
            .then(([maria, juan, lucia]) => {
                return Recipe.insertMany([
                    {
                        author: maria.id,
                        title: 'Paella mixta',
                        image: 'https://www.recetasderechupete.com/wp-content/uploads/2020/04/Paella-mixta-de-marisco-y-carne.jpg',
                        description: 'Paella mixta con mariscos y carne, una receta ideal para compartir en familia.',
                        cookingTime: 75,
                        likes: [juan.id, lucia.id],
                        createdAt: new Date(),
                        modifiedAt: null
                    },
                    {
                        author: juan.id,
                        title: 'Lasaña casera',
                        image: 'https://cdn7.kiwilimon.com/recetaimagen/37283/640x640/37083.jpg.webp',
                        description: 'Lasaña casera con carne y mucho queso. ¡Deliciosa!',
                        cookingTime: 50,
                        likes: [],
                        createdAt: new Date(),
                        modifiedAt: null
                    },
                    {
                        author: lucia.id,
                        title: 'Tarta de manzana',
                        image: 'https://cdn0.recetasgratis.net/es/posts/5/7/2/tarta_de_manzana_casera_32275_orig.jpg',
                        description: 'Tarta de manzana tradicional, perfecta para la merienda.',
                        cookingTime: 60,
                        likes: [],
                        createdAt: new Date(),
                        modifiedAt: null
                    }
                ])
            })
    })
    .catch(console.error)
    .finally(() => data.disconnect())
