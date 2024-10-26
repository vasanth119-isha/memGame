import LeaderBoard from "./leader-board";


export default function MemoryPage() {
  
  return (
    <main className="flex flex-col gap-2 min-h-screen items-center justify-center p-1 bg-[url('/bg/ebg.png')] bg-cover">
      
      <LeaderBoard />
    </main>
  )
}
