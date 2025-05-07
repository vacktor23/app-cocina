import { useState } from "react";
import { useNavigate } from 'react-router';

import { logic } from '../../logic';
import { useContext } from '../../context';

export function Recipe({ recipe, onRecipeLikeToggled, onRecipeDeleted, onRecipeDescriptionEdited }) {
    const { alert, confirm } = useContext();
    const [view, setView] = useState('');

    const navigate = useNavigate();

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikeRecipe(recipe.id)
                .then(() => onRecipeLikeToggled())
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleDeleteClick = () => {
        confirm('Delete recipe?')
            .then(accepted => {
                if (accepted) {
                    try {
                        logic.deleteRecipe(recipe.id)
                            .then(() => onRecipeDeleted())
                            .catch(error => {
                                console.error(error);
                                alert(error.message);
                            });
                    } catch (error) {
                        console.error(error);
                        alert(error.message);
                    }
                }
            });
    };

    const handleEditDescriptionClick = () => setView('edit-description');
    const handleEditDescriptionCancelClick = () => setView('');

    const handleEditDescriptionSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event;
            const { description: { value: description } } = form;

            logic.updateRecipeDescription(recipe.id, description)
                .then(() => {
                    onRecipeDescriptionEdited();
                    setView('');
                })
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleUsernameClick = () => navigate(`/${recipe.author.username}`, {
        state: { userId: recipe.author.id }
    });

    return (
        <article className="bg-white rounded-2xl shadow-xl p-6 m-4 max-w-3xl mx-auto">
            <h3
                className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer hover:underline"
                onClick={handleUsernameClick}
            >
                {recipe.author.username}
            </h3>

            <div className="flex justify-center mb-4">
                <img
                    className="w-full max-w-3xl h-72 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
                    src={recipe.image}
                    alt="Recipe image"
                />
            </div>

            {view === '' && (
                <p className="text-gray-700 mb-4">{recipe.description}</p>
            )}

            {view === '' && recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">Ingredients:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            )}

            {view === 'edit-description' && (
                <form onSubmit={handleEditDescriptionSubmit} className="space-y-2 mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        defaultValue={recipe.description}
                        className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            onClick={handleEditDescriptionCancelClick}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            )}

            <div className="flex justify-between items-center text-sm text-gray-600">
                <time>{new Date(recipe.createdAt).toLocaleDateString()}</time>

                <button
                    onClick={handleToggleLikeClick}
                    className="text-lg hover:scale-110 transition-transform"
                >
                    {`${recipe.liked ? '♥️' : '🤍'} (${recipe.likesCount})`}
                </button>

                {recipe.own && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleEditDescriptionClick}
                            title="Edit description"
                            className="text-xl hover:text-green-600"
                        >
                            📝
                        </button>

                        <button
                            onClick={handleDeleteClick}
                            title="Delete recipe"
                            className="text-xl hover:text-red-600"
                        >
                            🗑️
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
}
