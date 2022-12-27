    import React, { useEffect } from "react";
    import GameSquare from "./GameSquare"
    import {nanoid} from "nanoid"
    import Confetti from 'react-confetti'

    export default function Board(){

    const [gameSquares , setGameSquers] = React.useState(newBoard())
    const [win , setWin] = React.useState(false)
    const [isX , setIsX] = React.useState(true)


    
    function newBoard(){
        const newBoard = []
        for(let i=0;i<9;i++){
            newBoard.push({
                isMark : false,
                isCircle : false,
                isX : false, 
                id : nanoid()
            })
        }
        return newBoard
    }



    function click(id) {
        console.log("start");
        let erase = false;
        const turn = isX;
        const updateBoard = gameSquares.map((currentSquare) => {
          if (currentSquare.id === id) {
            if (!currentSquare.isMark) {
              console.log(currentSquare);
              let newVal = {
                ...currentSquare,
                isMark: true,
                isX: isX,
                isCircle: !isX
              };
    
              return newVal;
            }
            erase = true;
            console.log({ isX });
            return {
              ...currentSquare,
              isMark: false,
              isX: false,
              isCircle: false
            };
          } else {
            return currentSquare;
          }
        });
        setGameSquers(updateBoard);
        if (!erase) {
          setIsX((prev) => {
            console.log({});
            return !prev;
          });
        }
      }
      console.log({ isX });
    const squaresElements =  gameSquares.map(gameSquares => <GameSquare 
        key={gameSquares.id}
        isMark={gameSquares.isMark}
        isCircle={gameSquares.isCircle}
        isX={gameSquares.isX}
        click={() => click(gameSquares.id)}
        />)

        function restart(){
            setGameSquers(newBoard())
            setWin(false)
        }
        
        useEffect(() => { 
                        
                if(   ((gameSquares[0].isMark) && (gameSquares[0].isX === gameSquares[1].isX && gameSquares[1].isX === gameSquares[2].isX))
                    ||((gameSquares[3].isMark) && (gameSquares[3].isX === gameSquares[4].isX && gameSquares[4].isX === gameSquares[5].isX))
                    ||((gameSquares[6].isMark) && (gameSquares[6].isX === gameSquares[7].isX && gameSquares[7].isX === gameSquares[8].isX))
                    ||((gameSquares[0].isMark) && (gameSquares[0].isX === gameSquares[3].isX && gameSquares[3].isX === gameSquares[6].isX))
                    ||((gameSquares[1].isMark) && (gameSquares[1].isX === gameSquares[4].isX && gameSquares[4].isX === gameSquares[7].isX))
                    ||((gameSquares[2].isMark) && (gameSquares[2].isX === gameSquares[5].isX && gameSquares[5].isX === gameSquares[8].isX))
                    ||((gameSquares[0].isMark) && (gameSquares[0].isX === gameSquares[4].isX && gameSquares[4].isX === gameSquares[8].isX))
                    ||((gameSquares[2].isMark) && (gameSquares[2].isX === gameSquares[4].isX && gameSquares[4].isX === gameSquares[6].isX))
                    )    {
                        console.log("useEffect win")
                        setWin(true)
                    }    
            
        }, [gameSquares]);

        return (
            <div className="Board">
            {squaresElements}
            {win && <Confetti/>}
            {win && <button onClick={restart}>restart</button>}
            </div>
        )
    }
