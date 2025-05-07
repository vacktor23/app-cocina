

export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister();
    const handleLoginClick = () => onNavigateToLogin();

    return (
        <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-green-700 mb-12 tracking-wider font-[Quicksand]">
                CocinArte
            </h1>
            <img
                src="https://s2.abcstatics.com/media/bienestar/2020/02/08/pasta-con-esparragos-aceitunas-y-pistachos-kwB--1248x698@abc.jpg"
                alt="Deliciosa comida"
                className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-full shadow-lg mb-12"
            />

            <div className="flex flex-col space-y-4 w-full max-w-xs">
                <button
                    onClick={handleRegisterClick}
                    className="w-full py-3 bg-green-500 text-white rounded-full text-lg font-medium hover:bg-green-600 transition"
                >
                    Registrarse
                </button>
                <button
                    onClick={handleLoginClick}
                    className="w-full py-3 border border-green-500 text-green-600 rounded-full text-lg font-medium hover:bg-green-50 transition"
                >
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
}
