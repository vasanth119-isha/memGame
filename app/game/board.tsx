"use client";

import { SetStateAction, useEffect, useReducer, useState } from "react";
import Image from 'next/image'
import { useGame } from "./use-game";
import { isGameOver } from "./utils";
import { MATCHING_CARDS } from "./constants";
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { reactLocalStorage } from "reactjs-localstorage";
import { useRouter } from "next/navigation";


function Card({
  item,
  onClick,
  revealed = false,
  found = false,
  index
}: {
  item: string;
  onClick: () => void;
  revealed?: boolean;
  found?: boolean;
  index:any;
}) {
  const cardTransitionClasses = "transition duration-500";
  const cardContentTransitionClasses = "transition duration-300";
  //const contentClasses = "bg-gradient-to-r from-light-green-600 to-light-green-700 w-full h-full absolute top-0 left-0 rounded";
  const contentClasses = "bg-[url('/bg/chipbg.png')] bg-cover w-full h-full absolute top-0 left-0 rounded";
  const flipUpClasses = "scale-x-100 opacity-100";
  const flipDownClasses = "-scale-x-100 opacity-0";

  return (
    <button
      className={`w-32 h-32 relative col-span-1 ${cardTransitionClasses} ${
        found ? "opacity-0" : ""
      }`}
      onClick={() => {
        if (!found && !revealed) {
          onClick();
        }
      }}
      aria-label="Memory Card"
    >
      <div
        className={`flex items-center justify-center ${contentClasses} ${cardTransitionClasses} ${
          revealed ? flipDownClasses : flipUpClasses
        }`}
      >
        <p
          className={` text-4xl text-white font-Cabin font-bold ${cardContentTransitionClasses} ${
            revealed ? "opacity-0" : "opacity-100"
          }`}
        >{index+1}</p>
      </div>

      <div
        className={`flex items-center justify-center ${contentClasses} ${cardTransitionClasses} ${
          revealed ? flipUpClasses : flipDownClasses
        }`}
      >
        <p
          className={`text-3xl ${cardContentTransitionClasses} ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
        
          {<Image src={item} alt={""} width="108" height="108" className=" pointer-events-none" />}
        </p>
      </div>
    </button>
  );
}

export function Board() {
  
  const { state, handler } = useGame();
 
  const router = useRouter();
  
  useEffect(() => {
    if(isGameOver(state.found))
    {
      goToLeaderboard();
    }
  },[state.found]);

  let goToLeaderboard = () =>{
    if(isGameOver(state.found))
    {
        reactLocalStorage.set("currentPlayerScore",state.score);
    }
    else{
      reactLocalStorage.set("currentPlayerScore",0);
    }
    
    router.push('/leaderboard', { scroll: false });
  }

  return (
    <div className="flex w-full items-center justify-center gap-2 flex-col text-purple-950 space-y-5" aria-label="Memory Board">
      <div style={{ width: 124, height: 124 }}>
            
        <CircularProgressbarWithChildren
          value={Number(state.score)}
          background
          backgroundPadding={5}
          styles={buildStyles({
            pathColor: "#7cb342",
            trailColor: "#fdd835",
            backgroundColor: '#212121',
            strokeLinecap: "butt"
          })}
          minValue={0}
          maxValue={1000}
          strokeWidth={12}
          counterClockwise

        >
          <div style={{ fontSize: 20}} className="text-center text-white font-bold">
            <strong >Score<br/>{Number(state.score)}</strong>
          </div>
        </CircularProgressbarWithChildren>;

      </div>
     
      <div className="w-auto grid grid-cols-5 items-start justify-center gap-2">
        {state.cards.map((item, i) => (
          <Card
            item={item}
            key={`key-item-${item}-${i}`}
            onClick={() => handler.revealCard(i)}
            found={state.found.includes(item)}
            revealed={!state.initialReveal ? state.randomRevealIndex.includes(i) :state.revealedIndexes.includes(i)}
            index={i}
          />
        ))}
      </div>
      <div className="flex flex-row gap-2">
        <Button
         variant="gradient"
          color="red"
          className="self-center px-4 mt-2 font-bold rounded text-white"
          onClick={() => handler.reset()}
        >
          Reset Game
        </Button>
        <Button
         variant="gradient"
          color="blue"
          className="self-center px-4 mt-2 font-bold rounded text-white"
          onClick={()=>goToLeaderboard()}
        >
          End Game
        </Button>
        <Button
         variant="gradient"
          color="green"
          className="self-center px-4 mt-2 font-bold rounded text-white"
          onClick={()=>goToLeaderboard()}
        >
          New Game
        </Button>
      </div>

      {/* <Dialog
        open={isOpen}
        size={"lg"}
        handler={()=>setOpen(false)}
      >
        <DialogHeader className="text-center">{""}</DialogHeader>
        <DialogBody className="text-5xl text-center">
            Your Score<br/>{Number(state.score)}
            
           {isGameOver(state.found)? <LeaderBoard />: <div className=" text-4xl text-center"> Leader Board:<br/> Waiting for Game to Finish </div>} 
        </DialogBody>
        <DialogFooter>
        <Button
            variant="text"
            color="red"
            onClick={() => setOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handler.reset(); 
              setOpen(false);}}
          >
            <span>Start Game</span>
          </Button>
        </DialogFooter>
      </Dialog> */}
    </div>
  );
}
