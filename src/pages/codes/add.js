import { useRef } from 'react';
import { postMultimedia } from '@api/requests';
import endPoinst from '@api/index';
import { useRouter } from 'next/router';

const AddCodes = () => {
  const formRef = useRef(null);
  const router = useRouter();

  const handlerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = { title: formData.get('title'), code: formData.get('code') };
    postMultimedia(endPoinst.data.api + '/add', data).then((res) => {
      if (!res.error)
        setTimeout(() => {
          router.push('/codes');
        }, 1200);
    });
  };

  return (
    <div className="w-full min-h-screen pt-20 flex justify-center items-start">
      <form ref={formRef} onSubmit={handlerSubmit} className="flex flex-col items-center w-full max-w-[450px] bg-[#0125f4] p-8 gap-2">
        <div className="flex flex-wrap gap-2 justify-between w-full">
          <label htmlFor="title">Nombre</label>
          <input id="title" name="title" className="border border-black"></input>
        </div>
        <div className="flex flex-wrap gap-2 justify-between w-full">
          <label htmlFor="code">Código</label>
          <input id="code" name="code" className="border border-black"></input>
        </div>
        <div className="flex flex-wrap gap-2 justify-between w-full">
          <label htmlFor="media" className="m-auto mt-5 bg-slate-50 py-2 px-7">
            Imagen
          </label>
          <input id="media" name="media" type="file" className="hidden"></input>
        </div>
        <button type="submit" className="py-2 px-16 m-auto bg-green-500">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default AddCodes;
