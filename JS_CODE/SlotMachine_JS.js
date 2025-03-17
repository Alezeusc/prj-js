// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collet a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their wininnings 
// 7. Play again
const print =(toPrint) =>{
    console.log(toPrint);
};
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}


const _get_user_input_number = (message,min_value=0,max_value=999,
    error_msg="Invalid input") => {
        while (true) {
            const input_string = prompt(message);
            const input_number = parseFloat(input_string); 
    
            if (isNaN(input_number) || input_number <= min_value || input_number>max_value) {
                print(error_msg)
    
            } else {
                return input_number;
            }
        }
    }

const deposit = () => { 
    return _get_user_input_number(
        "Enter a depost amount: ",
        min_value=0,max_value=30000,
        "Invalid deposit amount, try again!");
} ;

const getNumberOfLines = () => { 
    return _get_user_input_number(
        "Enter the number of lines to bet on(1-3): ",
        min_value=0,max_value=3,
        "Invalid line amount, try again!");
} ;

const getBet = (balance,lines) =>{
    return _get_user_input_number(
        "Enter the bet per line: ",
        min_value=0,max_value=balance/lines,
        "Invalid bet, try again!");
}

const spin = () =>{
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [[],[],[]];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols]; //copies to a temp symbols for each reel
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random()* reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        
        }
    
    }
    return reels;
};

const transpose = (reels) =>{
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;

};

const printRows = (rows)=>{
    for (const row of rows){
        let rowString = "";
        for (const [i,symbol] of row.entries()){
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        print(rowString);
    }
};

const getWinnings = (rows,bet,lines) => {
    let winnings = 0;
    for (let row = 0;row < lines; row++){
        const symbols = rows[row];
        let allSame=true;
        for (const symbol of symbols) {
            if (symbol != symbols[0]){
                allSame= false;
                break;
            }
            
        }
        if (allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
};

const game = () =>{
    let balance = deposit();
    let keepPlaying = "y"
    while(true){
        print("You have a balance of $"+balance.toString())
        const numberOfLines = getNumberOfLines()
        const bet = getBet(balance,numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows,bet,numberOfLines)
        balance += winnings;
        print("You won, $"+ winnings.toString());
        if(balance<=0){
            print("You ran out of money!");
            break;
        }else{
            keepPlaying = prompt("Do you want to play again (y/n)?" );

        }
        
        if (keepPlaying != "y"){
            break;
        }
        


    }
    

};

game();
