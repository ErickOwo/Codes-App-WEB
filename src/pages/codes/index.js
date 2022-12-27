import { getData } from '@api/requests';
import { useEffect, useState } from 'react';
import endPoinst from '@api/index';
import Link from 'next/link';
import Image from 'next/image';

const Codes = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getDataFunction = async () => {
      const res = await getData(endPoinst.data.api);
      setData(res);
    };
    getDataFunction();
  }, []);

  return (
    <div className="min-w-full min-h-screen bg-[#EFEBEB] md:p-2 text-white font-semibold text-2xl ">
      <div className="h-[68px] bg-black p-2 flex justify-end">
        <Link href="/codes/add">
          <button
            className="bg-white text-black text-md py-1 px-2 mr-3
          "
          >
            Agregar Código
          </button>
        </Link>
      </div>
      <div className="p-2 text-black">Códigos: {data?.length}</div>
      <div className=" flex flex-wrap md:p-3 p-1 gap-4">
        {data?.map((item, index) => (
          <div key={index} className="bg-[#0B2586] px-3 py-5">
            {!item.imgURL ? (
              <div className="bg-black p-2 w-[280px] select-none md:w-[309px] h-[165px] font-light text-md">Fóto no disponible</div>
            ) : (
              <div className="bg-black w-[280px] select-none md:w-[309px] h-[165px] font-light text-md overflow-hidden flex">
                <Image width="309" height="195" src={item.imgURL}></Image>
              </div>
            )}
            <div>{item.title}</div>
            <div>{item.code}</div>
            <div className="flex flex-wrap gap-2 text-stone-800 mt-2 text-lg">
              <button className="bg-yellow-300 px-2 py-1 hover:bg-yellow-200">Editar</button>
              <button className="bg-red-500 px-2 py-1 hover:bg-red-400">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Codes;
