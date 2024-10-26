import { Labrada } from 'next/font/google';
import { ITEMS } from './constants';
import { reactLocalStorage } from "reactjs-localstorage";
export const shuffle = (array: string[]) => [...array].sort(() => Math.random() - 0.5);
export const shuffleNumbers = (array: number[]) => [...array].sort(() => Math.random() - 0.5);
export const isGameOver = (foundCards: string[]) => foundCards.length === ITEMS.length

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

export const SetGetLeaderBoardItems = (
    currentPlayerInfo
:{
    id:string
    Name:string,
    Department:string,
    Score:number
}) =>{
    currentPlayerInfo["id"] = uuidv4();
    let lb = reactLocalStorage.getObject("leaderBoard",{"lb":[{}]},true) as 
    {
        lb:
        [{  
            id: string,
            Name: string,
            Department: string,
            Score: number
        }]
    };
    
    lb.lb.push(currentPlayerInfo);
    lb.lb.sort((a, b) => b.Score - a.Score);
    reactLocalStorage.setObject("leaderBoard",lb);
    const index = lb.lb.map(i => i.id).indexOf(currentPlayerInfo["id"]);
    if(index<10)
    {
        return {
            isTopTen:true,
            index:index,
            data:lb.lb.length < 10 ? lb.lb:lb.lb.slice(0,10)
        }
    
    }

    return {
        isTopTen:false,
        index:-1,
        data:lb.lb.length < 10 ? lb.lb:lb.lb.slice(0,10)
    }

    console.log("LB Data:",lb.lb,"Index:",index);
    
}