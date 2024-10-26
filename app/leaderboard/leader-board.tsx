"use client"
import { Button, Card, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { SetGetLeaderBoardItems } from "../game/utils";
 
const TABLE_HEAD = ["Rank","Name", "Department", "Score"];
 
const TABLE_ROWS = [
  {
    Rank: 1,
    name: "John Michael",
    Department: "IT APPS",
    Score: "1050",
  },
  {
    Rank: 2,
    name:"Alexa Liras",
    Department: "IPD",
    Score: "1000",
  },
  {
    Rank: 3,
    name: "Michael Levi",
    Department: "Ishanga",
    Score: "950",
  },
  {
    Rank: 4,
    name: "Richard Gran",
    Department: "Sadhanapadha",
    Score: "900",
  },
  {
    Rank: 5,
    name: "John Michael",
    Department: "IT APPS",
    Score: "850",
  },
  {
    Rank: 6,
    name: "John Michael",
    Department: "IT APPS",
    Score: "1050",
  },
  {
    Rank: 7,
    name:"Alexa Liras",
    Department: "IPD",
    Score: "1000",
  },
  {
    Rank: 8,
    name: "Michael Levi",
    Department: "Ishanga",
    Score: "950",
  },
  {
    Rank: 9,
    name: "Richard Gran",
    Department: "Sadhanapadha",
    Score: "900",
  },
  {
    Rank: 10,
    Name: "John Michael",
    Department: "IT APPS",
    Score: "850",
  },
];
 
const LeaderBoard = () => {
  const [currentPlayerInfo,setCurrentPlayerInfo] = useState({
    Name:"",
    Department:"",
    Score:0,
  });
  const [lbData,setLBData] = useState({
    isTopTen:false,
    index:-1,
    data:[{
      id:"",
      Name:"",
      Department:"",
      Score:0,
    }]
  });
 

  let currentPlayerName;// = reactLocalStorage.get("currentPlayerName");
  let currentPlayerDepartment;
  let currentPlayerScore;
  // = reactLocalStorage.get("currentPlayerDepartment");
  //console.log(`Name:${currentPlayerName} Department${currentPlayerDepartment}`);
  
  const router = useRouter();
  let pushToForm = () =>{
    
    router.push('/form', { scroll: false });
  }


  useEffect(() => {
    
    currentPlayerName = reactLocalStorage.get("currentPlayerName") as string || "";
    currentPlayerDepartment = reactLocalStorage.get("currentPlayerDepartment") as string ||"";
    currentPlayerScore = reactLocalStorage.get("currentPlayerScore") as number ||0;
    console.log(`Name:${currentPlayerName} Department${currentPlayerDepartment}`);
    setCurrentPlayerInfo({
      Name:currentPlayerName,
      Department:currentPlayerDepartment,
      Score:currentPlayerScore,
    }
    );
    let {isTopTen,index,data} = SetGetLeaderBoardItems({
      id:"",
      Name:currentPlayerName,
      Department:currentPlayerDepartment,
      Score:currentPlayerScore,
    });
    console.log("LB Data",data);
    setLBData({
      isTopTen:isTopTen,
      index:index,
      data:data
    });

  },[]);

  
  return (
    
    <Card className="h-4/5 w-4/5 overflow-x-hidden overflow-y-auto bg-blue-gray-900">
      <Typography variant="h4" color="white" className=" m-2 text-center">
          Your Score: {currentPlayerInfo.Score}
        </Typography>
        <Typography color={lbData.isTopTen ? "blue" :"white"} className="mb-2 font-normal text-center">
          {lbData.isTopTen ? `Congratulations ${currentPlayerInfo.Name} You are in top 10`:`Good Game ${currentPlayerInfo.Name}, Try again for Top 10`}
        </Typography>
      <table className="w-full min-w-max table-auto text-left gap-4">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-light-green-900 p-4"
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-bold leading-none"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lbData.data.map(({ id,Name,Department,Score }, index) => {
            const isCurrentPlayer = index === lbData.index;
            const classes = isCurrentPlayer ? "p-4 border border-double border-4 border-light-green-600" : "p-4 border-b border-blue-gray-50 bg-blue-gray-900 ";
 
            return (
              <tr key={id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {`#${index+1}`}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {Name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {Department}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-medium"
                  >
                    {Score}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
         variant="gradient"
          color="green"
          className="self-center m-4 font-bold rounded text-white"
          onClick={()=> pushToForm()}
        >
          New Game
        </Button>
    </Card>
  );
}

export default LeaderBoard;