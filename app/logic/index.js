import { registerUser } from './registerUser.js'
import { loginUser } from './loginUser.js'
import { logoutUser } from './logoutUser.js'
import { isUserLoggedIn } from './isUserLoggedIn.js'
import { getUserUsername } from './getUserUsername.js'
import { getUserId } from './getUserId.js'

import { createRecipe } from './createRecipe.js'
import { getRecipe } from './getRecipe.js'
import { deleteRecipe } from './deleteRecipe.js'
import { updateRecipeDescription } from './updateRecipeDescription.js'
import { toggleLikeRecipe } from './toggleLikeRecipe.js'
import { getUserRecipe } from './getUserRecipe.js'


export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getUserUsername,
    getUserId,

    createRecipe,
    getRecipe,
    deleteRecipe,
    updateRecipeDescription,
    toggleLikeRecipe,
    getUserRecipe
}