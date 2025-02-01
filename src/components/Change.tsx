import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { swapHorizontalOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

interface ChangeProps {
    path: string;
}

const Change: React.FC<ChangeProps> = ({ path }) => {
    const history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirm = () => {
        setIsModalOpen(false);
        history.push(path);
    };

    return (
        <>
            <div
                className="globo fixed !z-50 top-[83%] left-[75%] w-[45px] h-[45px] bg-blue-500 rounded-full cursor-pointer flex justify-center items-center"
                onClick={() => setIsModalOpen(true)}
            >
                <IonIcon icon={swapHorizontalOutline} className="w-[30px] h-[30px] text-white" />
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                title="¿Cambiar al recorrido inverso?"
                message="Te redirigiremos al mismo colectivo, pero en el sentido contrario. ¿Quieres continuar?"
                confirmText="Sí, cambiar sentido"
                cancelText="No, mantener sentido"
            />
        </>
    );
};

export default Change;
