import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

import default_photo from '../../assets/default_photo.svg'

export const SettingsPage = () => {

    const { user, onSetName, onSetPhoto } = useAuth()

    const [isEditing, setIsEditing] = useState(false);
    const [tempImage, setTempImage] = useState<string | null>(null); // Estado para la imagen temporal
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Estado para el archivo seleccionado

    const [name, setName] = useState<string>('');

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Crear una URL temporal para mostrar la imagen
            setTempImage(imageUrl); // Actualizar el estado temporal
            setSelectedFile(file); // Guardar el archivo seleccionado
        }
    };

    const handleOnSubmitChanges = async () => {
        if (!user) return

        if (selectedFile) {
            onSetPhoto(selectedFile, user)
        }

        if (name) {
            onSetName(name)
        }

        setIsEditing(false)
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h4 className="text-2xl font-bold py-3 mb-4">Configuración de la cuenta</h4>

            <div className="bg-white shadow rounded-lg p-6 mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img src={user?.photoURL ? user.photoURL : default_photo} alt="Profile" className="w-40 h-40 rounded-full object-cover" />
                    {/* <img src={''} alt="Profile" className="w-40 h-40 rounded-full object-cover" /> */}
                    <div>
                        <p className="text-lg font-semibold">{user?.name ?? 'Invitado'}</p>
                        <p className="text-gray-600">{user?.role ?? 'Estudiante'}</p>
                        <p className="text-gray-600">Universidad Manuela Beltran</p>
                    </div>
                </div>
                <button
                    className="bg-primary text-white px-4 py-2 rounded-md border border-transparent transition-all hover:bg-white hover:text-black hover:border-red-500"
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
                            <label className="block text-gray-700 font-medium mb-1">Nombre completo</label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-md p-2"
                                placeholder={user?.name ? user.name : 'Invitado'}
                                disabled={!isEditing}
                                onChange={handleOnChangeInput}
                                value={name}
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
                {
                    isEditing && (

                        <div className="flex space-x-4 mt-6">
                            <button
                                type="submit"
                                className="bg-primary text-white px-4 py-2 rounded-md border border-transparent transition-all hover:bg-white hover:text-black hover:border-primary"
                                onClick={handleOnSubmitChanges}
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
                    )
                }
            </div>
        </div>
    );
};
