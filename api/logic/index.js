import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUserUsername } from './getUserUsername.js'

import { createRecipe } from './createRecipe.js'
import { getRecipes } from './getRecipes.js'
import { deleteRecipe } from './deleteRecipe.js'
import { updateRecipeDescription } from './updateRecipeDescription.js'
import { toggleLikeRecipe } from './toggleLikeRecipe.js'
import { getUserRecipes } from './getUserRecipes.js'




export const logic = {
    registerUser,
    authenticateUser,
    getUserUsername,

    createRecipe,
    getRecipes,
    deleteRecipe,
    updateRecipeDescription,
    toggleLikeRecipe,
    getUserRecipes

}