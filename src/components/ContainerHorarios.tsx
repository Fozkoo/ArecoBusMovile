import React from 'react';

interface ContainerHorariosProps {
  title: string;
  horarios: string[];
}

const ContainerHorarios: React.FC<ContainerHorariosProps> = ({ title, horarios }) => {
  return (
    <div className="container-horarios flex-col items-center  p-3">
      <section>
        <div className="container-horarios-section   g p-5  rounded-xl   flex flex-col flex-wrap items-center justify-center mt-8 mb-8 w-full max-xl:mt-0 max-xl:mb-0">
          <div className="container-title text-black  shadow-md p-2  rounded-xl text-center">
            <h2 className="font-medium text-center  text-xl">{title}</h2>
          </div>
          <div className="container-options  w-[60%] flex justify-center flex-wrap gap-4 mt-5 max-lg:w-[90%]">
            {horarios.map((hora, index) => (
              <button
                key={index}
                type="button"
                className="focus:outline-none text-white text-sm py-2.5 px-5 border-b-4 border-[rgb(100,100,242)] rounded-md bg-[rgb(100,100,242)]"
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
