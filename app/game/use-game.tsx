"use client";

import { useEffect, useReducer, Reducer } from "react";

import { CARDS, WAIT_TIMEOUT, MATCHING_CARDS, GAME_ACTIONS, INIT_REVEAL_TIMEOUT } from "./constants";
import { isGameOver, shuffle, shuffleNumbers } from "./utils";

interface GameState {
  cards: string[];
  found: string[];
  revealedIndexes: number[];
  moves: number;
  initialReveal:boolean;
  randomRevealIndex:number[];
  revealInitial:number[];
  score:number;
}

interface GameAction {
  type: string;
  card?: string;
  cardIndex?: number;
}

const initialGameState: GameState = {
  cards: [...CARDS],
  found: [],
  revealedIndexes: [],
  moves: 0,
  initialReveal:false,
  randomRevealIndex:[],
  revealInitial:Array.from({ length: CARDS.length }, (_, i) => i),
  score:1000,
};

export function useGame() {
  const [game, dispatchGame] = useReducer(gameReducer, initialGameState);

  let intiRevealTimeout: ReturnType<typeof setTimeout>;

  

  useEffect(() => {
    reset();
    
  }, []);//first time only

  useEffect(() => {
    
    if(game.initialReveal)
    {
      console.log("calling clear Time out");
      clearTimeout(intiRevealTimeout);
    }
    else{
      intiRevealTimeout = setTimeout(() => {
        dispatchGame({ type: GAME_ACTIONS.REVEAL_RANDOM });
      }, INIT_REVEAL_TIMEOUT);
    }
    
    return () => {
      clearTimeout(intiRevealTimeout);}
  });

  useEffect(()=>{
    const interval = setInterval(() => {
      if(game.initialReveal){ 
      dispatchGame({type:GAME_ACTIONS.GAME_SCORE_1});
    }

    }, 1000);

    if( game.score < 500 || isGameOver(game.found)){
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(intiRevealTimeout);
    }
  });

  useEffect(() => {
    let foundTimeout: ReturnType<typeof setTimeout>,
      revealTimeout: ReturnType<typeof setTimeout>;

    if (game.revealedIndexes.length === MATCHING_CARDS) {
      const [first, second]: number[] = game.revealedIndexes;
      if (game.cards[first] === game.cards[second]) {
        foundTimeout = setTimeout(() => {
          dispatchGame({ type: GAME_ACTIONS.FIND, card: game.cards[first] });
        }, WAIT_TIMEOUT);
      }

      revealTimeout = setTimeout(() => {
        dispatchGame({ type: GAME_ACTIONS.HIDE_REVEALED });
      }, WAIT_TIMEOUT);
    }

    return () => {
      if (foundTimeout) clearTimeout(foundTimeout);
      if (revealTimeout) clearTimeout(revealTimeout);
    };
  }, [game.revealedIndexes]);//every time reavealed index changes

  const revealCard = (cardIndex: number) => {
    if (game.revealedIndexes.length < MATCHING_CARDS) {
      dispatchGame({ type: GAME_ACTIONS.REVEAL, cardIndex });
    }
  };

  const reset = () => {
    dispatchGame({ type: GAME_ACTIONS.RESET });

  };

  return {
    state: {
      ...game,
    },
    handler: {
      revealCard,
      reset,
    },
  };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === GAME_ACTIONS.REVEAL) {
    const cardIndex = action.cardIndex as number;
    const revealedIndexes =
      state.revealedIndexes.length > 0
        ? [...state.revealedIndexes, cardIndex]
        : [cardIndex];
    return {
      ...state,
      revealedIndexes,
      moves: state.moves + 1,
    };
  }
  if (action.type === GAME_ACTIONS.REVEAL_RANDOM){
    
    let initialReavealArray = state.revealInitial;
    let initialReveal = false;
    let randomRevealIndex: number[] = [];
    if(initialReavealArray.length === 0)
    {
        initialReveal = true;
    }
    else
    {
      randomRevealIndex = initialReavealArray.splice(0,5) || [-1];
    }
    
    console.log("Dispatched Random Reveal:",randomRevealIndex);
    return{
        ...state,
        randomRevealIndex: randomRevealIndex,
        revealInitial:initialReavealArray,
        initialReveal:initialReveal    
    }; 
    
    
  }
  if(action.type == GAME_ACTIONS.GAME_SCORE_1)
  {
    return{
      ...state,
      score:state.score-10,
    };
  }

  if (action.type === GAME_ACTIONS.HIDE_REVEALED) {
    return {
      ...state,
      revealedIndexes: [],
    };
  }
  if (action.type === GAME_ACTIONS.FIND) {
    const card = action.card as string;
    const found = state.found.length > 0 ? [...state.found, card] : [card];

    return {
      ...state,
      score:state.score+20,
      found,
    };
  }

  if (action.type === GAME_ACTIONS.RESET) {
    let rangeArray = Array.from({ length: CARDS.length }, (_, i) => i);

    return {
      cards: shuffle([...CARDS]),
      found: [],
      revealedIndexes: [],
      moves: 0,
      initialReveal:false,
      randomRevealIndex:[],
      revealInitial:shuffleNumbers([...rangeArray]),
      score:1000,
    };
  }

  return state;
}