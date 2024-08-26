// pages/TestPage.tsx
import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-red-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Error de Carga</h1>
        <p className="text-lg text-red-500">Ocurrió un error al cargar la página. Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    </div>
  );
};

export default TestPage;