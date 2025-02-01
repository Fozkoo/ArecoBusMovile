import React from "react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "¿Estás seguro?",
    message = "¿Quieres continuar con esta acción?",
    confirmText = "Sí, continuar",
    cancelText = "Cancelar",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-gray-600">{message}</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
