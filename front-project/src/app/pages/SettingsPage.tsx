import React, { useState } from 'react';
import { uploadFile } from '../../utils/upload-files';

export const SettingsPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState("/src/assets/profile1.jpg"); // Imagen por defecto
    const [tempImage, setTempImage] = useState<string | null>(null); // Estado para la imagen temporal
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Estado para el archivo seleccionado

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Crear una URL temporal para mostrar la imagen
            setTempImage(imageUrl); // Actualizar el estado temporal
            setSelectedFile(file); // Guardar el archivo seleccionado
        }
    };

    const handleConfirm = async () => {
        if (selectedFile) {
            const publicUrl = await uploadFile(selectedFile, "user-id-placeholder"); // Reemplaza con el ID real del usuario
            if (publicUrl) {
                console.log("URL de imagen pública:", publicUrl);
                setProfileImage(publicUrl); // Actualiza el estado con la URL pública
                setTempImage(null); // Restablecer el estado temporal
                setSelectedFile(null); // Limpiar el archivo seleccionado
                setIsEditing(false); // Cerrar el modo de edición
            } else {
                console.error("No se pudo obtener la URL pública de la imagen.");
            }
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h4 className="text-2xl font-bold py-3 mb-4">Configuración de la cuenta</h4>
            
            <div className="bg-white shadow rounded-lg p-6 mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img src={profileImage} alt="Profile" className="w-40 h-40 rounded-full object-cover" />
                    <div>
                        <p className="text-lg font-semibold">Juliana Bolivar Suarez</p>
                        <p className="text-gray-600">Estudiante</p>
                        <p className="text-gray-600">Universidad Manuela Beltran</p>
                    </div>
                </div>
                <button 
                    className="bg-red-500 text-black px-4 py-2 rounded-md border border-transparent transition-all hover:bg-white hover:text-black-500 hover:border-red-500"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    Editar perfil
                </button>
            </div>

            {isEditing && (
                <>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {tempImage && (
                        <div className="mt-4">
                            <h5 className="font-semibold">Vista previa:</h5>
                            <img src={tempImage} alt="Preview" className="w-40 h-40 rounded-full object-cover" />
                            <button 
                                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
                                onClick={handleConfirm}
                            >
                                Aceptar Cambios
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Form section */}
            <div className="bg-white shadow rounded-lg p-6 space-y-6 mt-6">
                {/* General Information Section */}
                <section id="account-general">
                    <h5 className="text-lg font-semibold mb-2">Información General</h5>
                    <div className="flex space-x-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Nombres</label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-md p-2"
                                placeholder="Juliana"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Apellidos</label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-md p-2"
                                placeholder="Bolivar Suarez"
                                disabled
                            />
                        </div>
                    </div>
                </section>

                {/* Info Section */}
                <section id="account-info">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Correo Electrónico*</label>
                            <input
                                type="email"
                                className="w-full border-gray-300 rounded-md p-2"
                                placeholder="jaimto@gmail.com"
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </section>

                {/* Change Password Section */}
                <section id="account-change-password">
                    {isEditing && (
                        <div className="space-y-4">
                            <h5 className="text-lg font-semibold mb-2">Cambiar Contraseña</h5>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Contraseña Actual*</label>
                                <input
                                    type="password"
                                    className="w-full border-gray-300 rounded-md p-2"
                                    placeholder="***********"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Confirmar Contraseña*</label>
                                <input
                                    type="password"
                                    className="w-full border-gray-300 rounded-md p-2"
                                    placeholder="***********"
                                />
                            </div>
                        </div>
                    )}
                </section>

                {/* Save and Cancel Buttons */}
                <div className="flex space-x-4 mt-6">
                    <button 
                        type="submit" 
                        className="bg-red-500 text-black px-4 py-2 rounded-md border border-transparent transition-all hover:bg-white hover:text-black-500 hover:border-red-500"
                    >
                        Guardar
                    </button>
                    <button 
                        type="button" 
                        className="bg-gray-500 text-white px-4 py-2 rounded-md border border-transparent transition-all hover:bg-white hover:text-red-500 hover:border-red-500"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};
