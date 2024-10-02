import React from 'react';

interface ContainerHorariosProps {
  title: string;
  horarios: string[];
}

const ContainerHorarios: React.FC<ContainerHorariosProps> = ({ title, horarios }) => {
  return (
    <div className="container-horarios flex-col items-center p-5">
      <section>
        <div className="container-horarios-section flex flex-col flex-wrap items-center justify-center mt-8 mb-8 w-full max-xl:mt-4">

          

          <div className="container-title text-center">
            <h2 className="font-semibold text-center text-2xl">{title}</h2>
          </div>
          <div className="container-options w-[60%] flex justify-center flex-wrap gap-5 mt-5 max-lg:w-[90%]">
            {horarios.map((hora, index) => (
              <button
                key={index}
                type="button"
                className="focus:outline-none text-white text-sm py-2.5 px-5 border-b-4 border-blue-600 rounded-md bg-blue-500 hover:bg-blue-400"
              >
                {hora.slice(0, 5)}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContainerHorarios;
