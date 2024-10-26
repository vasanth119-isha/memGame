"use client"

import { Button } from "@material-tailwind/react"
import { reactLocalStorage } from "reactjs-localstorage";
import { SetGetLeaderBoardItems } from "../game/utils";

const TABLE_HEAD = ["Rank","Name", "Department", "Score"];
 
const TABLE_ROWS = [
  {
    id:"1",
    Name: "Rajeshwari",
    Department: "Click Up",
    Score: 650,
  },
  {
    id:"2",
    Name:"Vasanth",
    Department: "Sacred Walks",
    Score: 600,
  },
  {
    id:"3",
    Name: "Dedeepya",
    Department: "Dev Ops",
    Score: 610,
  },
  {
    id:"4",
    Name: "Ashwin",
    Department: "Sadhguru App",
    Score: 590,
  },
  {
    id:"5",
    Name: "Hansin",
    Department: "Miracles of Mind",
    Score: 580,
  },
];
const TestEntry = {
    Name: "Test",
    Department: "IT APPS",
    Score: 599,

}
export default function TestPage() {


  const setLbValues = ()=>{
    let lb = reactLocalStorage.getObject("leaderBoard",{"lb":[]},true) as {lb:[{}]};
    if(lb.lb.length < 5){
      TABLE_ROWS.map((value) =>{
        lb.lb.push(value);
      });
      
    }

    reactLocalStorage.setObject("leaderBoard",lb);

  }
  const testData = ()=>{
    Object.assign(TestEntry,{"id":""})
    SetGetLeaderBoardItems(TestEntry as { id: string,
      Name: string,
      Department: string,
      Score: number});

  }

  const removeValues = () =>{
    //reactLocalStorage.clear();
  }
  
  return (
    <main className="flex flex-row gap-2 min-h-screen items-center justify-center p-1 bg-[url('/bg/ebg.png')] bg-cover">
      
      <Button
         variant="gradient"
          color="blue"
          className="self-center px-4 mt-2 font-bold rounded text-white"
          onClick={()=>setLbValues()}
        >
          Set Data
        </Button>
        <Button
         variant="gradient"
          color="blue"
          className="self-center px-4 mt-2 font-bold rounded text-white"
          onClick={()=>testData()}
        >
          Test Data
        </Button>
        <Button
         variant="gradient"
          color="red"
          className="self-center px-4 mt-2 font-bold rounded text-white"
          onClick={()=>removeValues()}
        >
          Remove Data
        </Button>
    </main>
  )
}
