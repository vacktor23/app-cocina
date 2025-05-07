import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router'

import { Recipes } from './Recipes';
import { CreateRecipe } from './CreateRecipe'
import { Profile } from './Profile'

import { logic } from '../../logic'
import { useContext } from '../../context';

export function Home({ onUserLoggedOut }) {
    const { alert, confirm } = useContext()

    const [username, setUsername] = useState('')

    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            logic.getUserUsername()
                .then(username => setUsername(username))
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }, [])

    const handleLogoutClick = () => {
        confirm('¿Estás seguro de que deseas cerrar sesión?')
            .then(accepted => {
                if (accepted)
                    try {
                        logic.logoutUser()

                        onUserLoggedOut()
                    } catch (error) {
                        console.error(error)

                        alert(error.message)
                    }
            })
    }

    const handleAddRecipeClick = () => navigate('/create-recipe')

    const handleRecipeCreated = () => navigate('/')

    const handleRecipeCreateCancelled = () => navigate('/')

    const handleHomeClick = () => navigate('/')

    const handleUserClick = () => {
        try {
            const userId = logic.getUserId()

            navigate(`/${username}`, { state: { userId } })
        } catch (error) {
            alert(error.message)
        }
    }

    console.debug('Home -> render')

    return (
        <div className="bg-[#f8f9fa] min-h-screen">

            <header className="flex justify-between items-center fixed top-0 w-full bg-[#4CAF50] py-4 px-6 shadow-lg z-50">
                <h1
                    className="text-3xl font-bold text-white cursor-pointer"
                    onClick={handleHomeClick}
                >
                    Recetas
                </h1>

                <h2
                    className="text-lg text-white cursor-pointer"
                    onClick={handleUserClick}
                >
                    {username}
                </h2>

                <button
                    type="button"
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                    onClick={handleLogoutClick}
                >
                    Logout
                </button>
            </header>

            <main className="pt-[80px] pb-[70px] px-4">
                <Routes>
                    <Route path="/create-recipe" element={<CreateRecipe onRecipeCreated={handleRecipeCreated} onRecipeCreateCancelled={handleRecipeCreateCancelled} />} />
                    <Route path="/:username" element={<Profile />} />
                    <Route path="/" element={<Recipes />} />
                </Routes>
            </main>

            <footer className="flex justify-center items-center fixed bottom-0 w-full bg-[#4CAF50] py-4 px-6 shadow-lg">
                {pathname === '/' && (
                    <button
                        onClick={handleAddRecipeClick}
                        className="bg-[#FFEB3B] text-[#4CAF50] w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-xl hover:bg-yellow-400 transition duration-200"
                    >
                        +
                    </button>
                )}
            </footer>
        </div>
    )
}
