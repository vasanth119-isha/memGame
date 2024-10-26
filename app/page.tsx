"use client"
import { useEffect } from 'react';
import { Board } from './game/board';
import { useRouter } from 'next/navigation';

export default function MemoryPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/form");
  },[]);
  return (
    <main className="flex flex-col gap-2 min-h-screen items-center justify-center p-1 bg-[url('/bg/ebg.png')] bg-cover">
      
      <div> Lost ?</div>
    </main>
  )
}
