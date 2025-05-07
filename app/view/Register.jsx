import { logic } from '../logic'
import { errors } from 'com'
import { useContext } from '../context'

const { SystemError, ValidationError } = errors

export function Register({ onNavigateToLogin, onUserRegistered }) {
    const { alert } = useContext()

    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form

            logic.registerUser(name, email, username, password)
                .then(() => {
                    form.reset()
                    onUserRegistered()
                })
                .catch(error => {
                    console.error(error)

                    if (error instanceof SystemError)
                        alert('⛔️ ' + error.message)
                    else
                        alert('⚠️ ' + error.message)
                })
        } catch (error) {
            console.error(error)

            if (error instanceof ValidationError)
                alert('❗️ ' + error.message)
            else
                alert('⛔️ ' + error.message)
        }
    }

    const handleLoginClick = () => onNavigateToLogin()

    return (
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
                <h1 className="text-4xl font-light text-center text-gray-800 mb-8 tracking-wide">
                    Crea tu cuenta
                </h1>

                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Tu nombre"
                            className="mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="tucorreo@ejemplo.com"
                            className="mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

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
                        Registrarse
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <a
                        onClick={handleLoginClick}
                        className="text-green-600 hover:underline cursor-pointer"
                    >
                        Inicia sesión
                    </a>
                </p>
            </div>
        </div>
    )
}
