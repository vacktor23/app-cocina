import { logic } from '../logic'
import { useContext } from '../context'

export function Login({ onNavigateToRegister, onUserLoggedIn }) {
    const { alert } = useContext()

    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            logic.loginUser(username, password)
                .then(() => {
                    form.reset()

                    onUserLoggedIn()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRegisterClick = () => onNavigateToRegister()

    return (
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
                <h1 className="text-4xl font-light text-center text-gray-800 mb-8 tracking-wide">
                    Iniciar sesión
                </h1>

                <form onSubmit={handleLoginSubmit} className="space-y-5">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">Nombre de usuario</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="nombreDeUsuario"
                            className="mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-white rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300"
                    >
                        Iniciar sesión
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <a
                        onClick={handleRegisterClick}
                        className="text-green-600 hover:underline cursor-pointer"
                    >
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    )
}
