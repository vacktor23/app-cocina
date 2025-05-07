import { useState, useEffect } from "react";
import { Recipe } from './Recipe';
import { logic } from '../../logic';
import { useContext } from '../../context';

export function Recipes({ targetUserId }) {
    const { alert } = useContext();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadRecipes = () => {
        setLoading(true);

        try {
            (targetUserId ? logic.getUserRecipe(targetUserId) : logic.getRecipe())
                .then(setRecipes)
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadRecipes();
    }, [targetUserId]);

    const handleRecipeLikeToggled = () => loadRecipes();
    const handleRecipeDeleted = () => loadRecipes();
    const handleRecipesDescriptionEdited = () => loadRecipes();

    return (
        <section>
            {recipes.length === 0 && !loading ? (
                <p>No recipes found.</p>
            ) : (
                recipes.map(recipe => (
                    <Recipe
                        key={recipe.id}
                        recipe={recipe}
                        onRecipeLikeToggled={handleRecipeLikeToggled}
                        onRecipeDeleted={handleRecipeDeleted}
                        onRecipeDescriptionEdited={handleRecipesDescriptionEdited}
                    />
                ))
            )}
        </section>
    );
}
