import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@hooks/use-auth';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="max-w-[450px] w-full min-h-[85px] bg-purple-700 border-2 border-purple-900 flex justify-center items-center font-semibold p-5 flex-col">
        <h2 className="p-0 m-0 text-xl text-center">Aprende Códigos</h2>
        <Link href={user ? '/codes' : '/login'}>
          <button className="py-1 px-2 bg-white mt-3 max-w-[92px] hover:bg-slate-300">Empezar</button>
        </Link>
      </div>
    </div>
  );
}
