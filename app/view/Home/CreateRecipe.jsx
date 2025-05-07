import { logic } from '../../logic'
import { useContext } from '../../context'

export function CreateRecipe({ onRecipeCreated, onRecipeCreateCancelled }) {
    const { alert } = useContext()

    const handleFormSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const image = form.image?.value || ''
            const title = form.title?.value || ''
            const description = form.description?.value || ''
            const cookingTime = form.cookingTime?.value || ''
            const ingredientsText = form.ingredients?.value || ''
            const ingredients = ingredientsText
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)


            if (!image || !title || !description || !cookingTime) {
                alert('Please fill in all the fields.')
                return
            }

            const parsedCookingTime = Number(cookingTime)

            logic.createRecipe(image, title, description, parsedCookingTime, ingredients)
                .then(() => onRecipeCreated())
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleCancelClick = () => onRecipeCreateCancelled()

    return (
        <section className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-4 py-6">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Recipe</h1>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="image" className="text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            placeholder="Enter image URL"
                            className="mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Recipe title"
                            className="mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Short description"
                            className="mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="ingredients" className="text-sm font-medium text-gray-700">Ingredients</label>
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            placeholder="One ingredient per line"
                            className="mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                            rows={4}
                        ></textarea>
                    </div>


                    <div className="flex flex-col">
                        <label htmlFor="cookingTime" className="text-sm font-medium text-gray-700">Cooking Time (minutes)</label>
                        <input
                            type="number"
                            id="cookingTime"
                            name="cookingTime"
                            placeholder="Time in minutes"
                            className="mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="flex justify-between space-x-4">
                        <button
                            className="w-full py-3 bg-gray-300 text-gray-700 rounded-full text-lg font-semibold hover:bg-gray-400 transition duration-300"
                            type="button"
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-500 text-white rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}
