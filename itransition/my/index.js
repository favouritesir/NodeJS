// ==============================================================
//      GENERALIZED ROCK-PAPER-SCISSORS GAME 
// ==============================================================
// AUTHOR       : Ashikur Rahman
// DESCRIPTION  : This is CLI based game using NodeJS. it accepts
//                an odd number ≥ 3 non-repeating strings where 
//                half of the next moves in the circle wins, half
//                of the previous moves in the circle lose. 
// DATE         : Sunday, 15 -September-2024 (15:46:18)
// ==============================================================


/************************************************************************ DEPENDENCIES */
const crypto = require('crypto'); // to generate hmac and key
const { title } = require('process');
const readline = require('readline');


/************************************************************************ APP SCAFFOLDING */
const app = {}      // app obj


/************************************************************************ APP CONFIGURATION */
readline.emitKeypressEvents(process.stdin);     // make input interface
process.stdin.setRawMode(true);

app.config = 
{             
    minLen:3,       // minimum moves length
    lenType: 'odd', // moves length type even or odd
    keyBytes: 32,   // 32 Bytes for 256 bits
    msg:{}          // messages -> set later
}

/************************************************************************ APP DATA */
app.data = {                
    moves:[],           // total moves get from command line on start()
    len:0,              // moves length set from start()
    key:'',             // cryptographically strong random key generate later
    hmac:'',            // generate later using key and computer choice 

    compMoveIndex:0,    // Computer move index
    compMove:'',        // computer move -> set later
    userMoveIndex:0,    // User move index
}

/************************************************************************** CONFIGURATION MESSAGES */
app.config.msg.lenErr = 
{
    title:'Few Arguments',
    des:`Your total move length must be >= ${app.config.minLen}`,
    hint:`Example: Rock Paper Scissors or Rock Paper Scissors Lizard Spock`+
         `or 1 2 3 4 5 6 7 8 9`,
}

app.config.msg.lenTypeErr = 
{
    title:'Initial Error',
    des:`You must passed odd number of arbitrary combinations`,
    hint:`Example: Rock Paper Scissors or Rock Paper Scissors Lizard Spock`+
         `or 1 2 3 4 5 6 7 8 9`,
}

app.config.msg.moveErr = 
{
    title:'Duplicate Moves',
    des:`You can not repeat any moves`,
    hint:`Suppose, you passed rock paper rock. Look here you repeat rock again.`
}

/************************************************************************* APP OPTION */
app.option = {
    types:{                 // moves length valid types
        even:0,
        odd:1,
    },
    resetInput:false,       // reset userMoveIndex or not
    msgMode:false,          // message is showing or not
    selector:['x','>',' '], // exit,select,other
    helpIcon:'?',           // help menu icon
}


/************************************************************************* UTILITIES */
app.moveLenType =x=> app.option.types[app.config.lenType];
app.lenTypeErr =x=> app.data.len%2 != app.moveLenType();
app.lenErr =x=> app.data.len < app.config.minLen ;

app.log =(...m)=> console.log(...m);                    // app message
app.cls =x=> process.stdout.write('\x1Bc');             // Clear Screen
app.exit =()=> process.exit(0);                         // close the program
app.getInput =f=> process.stdin.once('keypress',f);     // get key board input
app.rs = (s, n) => ''.padEnd(n,s);                      // make repeating string
app.prs = (s, n) => app.log(app.rs(s, n));              // print repeating str

// show ending hint for exit or re-play
app.endingHint =()=> app.log(` Hint:\n => press 0 or esc for exit.\n => press enter for play again.`);


// format the index number
app.formatIndex =i=> app.rs(' ',(app.data.len+1+'').length-i.length)+i;
app.bigLen = arr => arr.reduce((a,s)=>a.length>s.length?a:s).length;

/************************************************************************** PROGRAM START */
app.start =()=>
{
    app.data.moves = process.argv.slice(2); // Get user moves
    app.data.len = app.data.moves.length;   // Set moves length

    app.validate();                         // validate app moves or end game
    app.setComputerMove();                  // set computer move
    app.setHmac();                          // generate key and hmac
    app.gameScreen();                       // show screen to play the game
} 

// game result formula
app.result =(a,b,l)=>
{
    const m=parseInt(l/2);
    return ((a - b + m + l) % l) - m;
}

// stop the application
app.end =()=>
{
    app.cls();                              // clear the screen
    setTimeout(() => app.exit(),300);  // stop the program
}


/************************************************************************** APP VALIDATION */
app.validate =()=>
{
    if(app.lenTypeErr() + app.lenErr()) app.handleLenErr();

    app.data.moves.forEach((move, i, arr) => {
      if (arr.some((m, j) => (i != j) & (m === move))) app.handleDuplicateErr();
    });
}

/************************************************************************** HANDLE INITIAL ERROR */
app.handleLenErr =()=>
{   
    if(app.lenErr())app.msg(app.config.msg.lenErr);
    else app.msg(app.config.msg.lenTypeErr);
    app.exit();
}

app.handleDuplicateErr =()=>
{
    app.msg(app.config.msg.moveErr);
    app.exit();
}

/************************************************************************** APPLICATION MESSAGE */
app.msg =({title,des,hint})=>
{
  let len = app.bigLen([des, hint]) || title.length * 3;  // len for break line
  app.cls();                                            // clear the screen

  app.log(app.rs(" ", len / 2 - title.length), title);  // align to center
  app.prs("=", len);                                    // dynamic break line
  app.log("=> Description: ", des);                     // msg desctiption
  app.prs("-", len);                                    // dynamic break line

  if (hint) app.log(hint,'\n');                         // msg hint
}

/************************************************************************* SET COMPUTER MOVE */
app.setComputerMove =()=>
{
    app.data.compMoveIndex = crypto.randomInt(app.data.len);
    app.data.compMove = app.data.moves[app.data.compMoveIndex];
}

/************************************************************************** SET H-MAC */ 
app.setHmac =()=>
{
    // set key
    app.data.key = crypto.randomBytes(app.config.keyBytes);

    // generate hmac
    app.data.hmac = crypto
      .createHmac("sha3-256", app.data.key)
      .update(app.data.compMove)
      .digest("hex");
}

/************************************************************************** APPLICATION INITIAL SCREEN */
app.gameScreen =()=>
{
    app.cls();
    app.showHmac();
    app.showMenu();
    app.showInputHint();
    app.handle();
}


app.showHmac =()=>
{
  app.menuBreakLine();                   // break line
  app.log(` HMAC: ${app.data.hmac}`);    // hmac
  app.menuBreakLine();                   // break line
}

app.menuBreakLine =()=>
{
    const { hmac, key } = app.data;
    app.prs("-", app.bigLen([hmac, key]) + 10); // break line
}

app.showMenu =()=>
{
    app.log(" Available Moves:\n‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾");
    let menus = ["exit", ...app.data.moves], selector;

    menus.forEach((move, i) => {
      selector = app.option.selector[i==app.data.userMoveIndex?(i==0?0:1):2];
      app.log(`  ${selector} ${app.formatIndex(i+'')} - ${move.toLowerCase()}`); // print menus
    });

    selector = app.data.userMoveIndex >= menus.length ? "-" : " ";
    app.log(`  ${selector} ${app.rs(app.option.helpIcon,(app.data.len+'').length)} - help`);
}

app.showInputHint =()=>
{
  app.menuBreakLine();  // break line
  app.log(` -> Type ? and number to navigate then press enter`);
  app.log(` -> Or use up & down arrow to navigate then press enter`);
  app.log(` -> Use backspace or esc for reset choice .`);
}

/************************************************************************** HANDLE THE APPLICATION */
app.handle =()=>
{
    app.getInput((s, key) => {
        if (s?.match(/[0-9\?]/g)) app.handleOption(s);
        else if (key.name === "up" || key.name === "down") app.handleArrow(key.name);
        else if (key.name === "return") app.handleEnter();
        else if (key.name === "backspace" || key.name === "escape") app.resetGame();
        else app.gameScreen();       
    });
}

// reset  the game
app.resetGame =()=> 
{
    app.data.userMoveIndex=0;       // reset user move
    app.gameScreen();
}
app.handleOption =s=>
{
    switch(s){
        case '?':app.data.userMoveIndex=app.data.len+1;break;
        default:
            let i = app.data.userMoveIndex * 10 + parseInt(s);              // make number by digit s
            i = i > app.data.len ? parseInt(s) : i;                         // validate the input
        
            app.data.userMoveIndex = i <= app.data.len ? i : 0;             // check input range
    }

    app.gameScreen();                                          // update screen
}

app.handleArrow =s=>
{
    let n = s == "up" ? --app.data.userMoveIndex : ++app.data.userMoveIndex;
    app.data.userMoveIndex = (n < 0 ? app.data.len+1 : n) % (app.data.len + 2);//2 for exit & help 
    app.gameScreen();
}

app.handleEnter =()=>
{
    let i=app.data.userMoveIndex;
    if (i) i > app.data.len ? app.showLogicScreen() : app.showResultScreen();
    else app.end();
}

/************************************************************************** RESULT SCREEN */
app.showResultScreen =()=>
{
    app.cls();
    app.showHmac();
    app.showResult();
    app.showKey();
    app.handleEndScreen();
}

app.showResult =()=>
{
    const {compMove,compMoveIndex,moves,userMoveIndex,len}=app.data;
    const res=app.result(userMoveIndex-1,compMoveIndex,len);
    // NB: subtract extra 1 -> we always count extra 1 for exit

    app.log(res?res>0?' Congratulation!! You win.':' Sorry! You lose.':' Draw!You can play again.');
    app.log(` Computer choose: ${compMove}\n You choose     : ${moves[userMoveIndex-1]}\n`);
    app.endingHint();
}

app.showKey =()=>
{
    app.menuBreakLine();                    // break line
    app.log(` KEY: ${app.data.key.toString('hex')}`);       // show key
    app.menuBreakLine();                    // break line
    
}

app.handleEndScreen =()=>
{
    app.getInput((s,key)=>{
        switch(key.name){
            case 'return': app.start(); break;
            case 'escape': app.end(); break;
            case '0': app.end(); break;
        }
    })
}

/************************************************************************** HELP SCREEN */
app.showLogicScreen =()=>
{
    app.cls();
    app.log(` Victory Logic:\n ‾‾‾‾‾‾‾‾‾‾‾‾‾‾`);
    app.showLogicTable();
    app.endingHint();
    app.handleEndScreen();
}

app.showLogicTable =()=>
{
    const moves=['PC‾v | User‾>',...app.data.moves];
    const maxLen=app.bigLen(moves);
    const lines=new Array(moves.length).fill("".padEnd(maxLen,'-')).join('-+-');

    moves.forEach((_,i)=>{
        const row=app.getLogicTableRow(i,moves).map(s=>s.padEnd(maxLen)).join(' | ');
        app.log(`+-${lines}-+\n| ${row} |`);
    })
    app.log(`+-${lines}-+`);
}

app.getLogicTableRow =(i,moves)=> 
{  
    return i == 0 ? moves :[
        moves[i],
        ...app.data.moves.map((_,j)=>{
            const r=app.result(j,i-1,moves.length-1);
            return r?r>0?'Win':'Lose':'Draw';
        })
    ]
}

/************************************************************************** RUN THE APPLICATION */
app.start();
