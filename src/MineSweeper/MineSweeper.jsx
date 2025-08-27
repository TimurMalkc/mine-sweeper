import styles from "./MineSweeper.module.css"

function MineSweeper(){

    let tiles = [];
    for(let i = 0; i < 81; i++){
        tiles[i] = i;        
    }

    let mines = [];
    while(mines.length < 10){
        let mine = Math.floor(Math.random() * 81);
        if(!mines.includes(mine)){
            mines.push(mine);
        }
    }

    function checkNum(num){
        let column = (num) % 9;
        let row = Math.floor((num) / 9);
        let endColumn;
        let startColumn;
        let endRow;
        let startRow;

        if(column+1 > 8){
            endColumn = column;
            startColumn = column - 1;
        }else if(column-1 < 0){
            startColumn = column;
            endColumn = column + 1;
        }else{
            endColumn = column + 1;
            startColumn = column - 1;
        }

        if(row+1 > 8){
            endRow = row;
            startRow = row-1;
        }else if(row-1 < 0){
            startRow = row;
            endRow = row+1;
        }else{
            startRow = row-1;
            endRow = row+1;
        }

        return [startRow, endRow, startColumn, endColumn];
    }

    function checkArea(num){
        var count = 0;
        let points = checkNum(num);

        for(let i = points[0]; i <= points[1]; i++){
            for(let j = points[2]; j <= points[3]; j++){
                if(mines.includes(9*i+j)){
                    count++
                }
            }
        }

        return count;
    }
    
    console.log(mines);
    
    function checkMine(event){
        let mineCount = checkArea(event.target.textContent);
        if(mines.includes(Number(event.target.textContent))){
            event.target.style.backgroundColor = "red";
            event.target.textContent = "💣";
            event.target.disabled = "true";
        }else{
            event.target.disabled = "true";
            event.target.style.border = "none";
            event.target.style.color = "white";
            event.target.textContent = mineCount;
        }    
    }

    return(

        <>
            <div className={styles.mainDiv}>
                <div className={styles.headerDiv}>a</div>
                <div className={styles.subDiv}>
                    {tiles.map((obj, index) => (
                    <button key={index} className={styles.tile} onClick={checkMine}>{obj}</button>
                    ))}
                </div>
                <div className={styles.footerDiv}>a</div>
            </div>
        </>
    );
}

export default MineSweeper;