export const Alert = ({ title, message, onAccepted }) => {
    const handleAcceptClick = () => onAccepted()

    console.debug('Alert -> render')

    return (
        <>
            <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-40"></div>

            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
                <div className="bg-white text-black rounded-2xl shadow-2xl px-8 py-6 max-w-sm w-full text-center space-y-4">
                    <h2 className="text-2xl font-semibold">{title}</h2>

                    <p className="text-sm">{message}</p>

                    <button
                        type="button"
                        onClick={handleAcceptClick}
                        className="bg-[#4CAF50] hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </>
    )
}
