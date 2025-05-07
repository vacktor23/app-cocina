export const Confirm = ({ title, message, onAccepted, onCancelled }) => {
    const handleCancelClick = () => onCancelled()
    const handleAcceptClick = () => onAccepted()

    return (
        <>

            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
                <div className="bg-white text-black rounded-2xl shadow-2xl px-8 py-6 max-w-sm w-full text-center space-y-4">
                    <h2 className="text-2xl font-semibold">{title}</h2>

                    <p className="text-sm">{message}</p>

                    <div className="flex justify-center gap-4 pt-4">
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg transition duration-200"
                            type="button"
                            onClick={handleCancelClick}
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-[#4CAF50] hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                            type="button"
                            onClick={handleAcceptClick}
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
