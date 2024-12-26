import { IonPage } from '@ionic/react'
import React, { useState } from 'react'
import methods from '../service/Helper'
const Admin = () => {

    const [formData, setFormData] = useState({
        latitud: "",
        longitud: "",
        referencia: "",
        recorridoId: "",
    })

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await methods.createCoordenadas(formData);
            setSuccessMessage("Coordenadas creadas con éxito!");
            setFormData({
                latitud: "",
                longitud: "",
                referencia: "",
                recorridoId: "",
            });
            window.location.reload();
        } catch (error) {
            setErrorMessage("Error al crear las coordenadas.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <IonPage>
                <div className="flex flex-col h-[100vh] justify-center items-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Crear Coordenadas</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="latitud" className="block text-gray-700 font-medium mb-2">
                                Latitud
                            </label>
                            <input
                                type="number"
                                id="latitud"
                                name="latitud"
                                value={formData.latitud}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="longitud" className="block text-gray-700 font-medium mb-2">
                                Longitud
                            </label>
                            <input
                                type="number"
                                id="longitud"
                                name="longitud"
                                value={formData.longitud}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="referencia" className="block text-gray-700 font-medium mb-2">
                                Referencia
                            </label>
                            <input
                                type="text"
                                id="referencia"
                                name="referencia"
                                value={formData.referencia}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="recorridoId" className="block text-gray-700 font-medium mb-2">
                                Recorrido ID
                            </label>
                            <input
                                type="number"
                                id="recorridoId"
                                name="recorridoId"
                                value={formData.recorridoId}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? "Creando..." : "Crear"}
                        </button>
                    </form>
                    {successMessage && (
                        <div className="mt-4 text-green-600 font-medium">{successMessage}</div>
                    )}
                    {errorMessage && (
                        <div className="mt-4 text-red-600 font-medium">{errorMessage}</div>
                    )}
                </div>
            </IonPage>

        </>
    )
}

export default Admin