export class PlayerClass{
    private static opponent:string = "O";
    private static winner: string = ""
    constructor(){
    }
    public static setOppnent(op: string){
        this.opponent = op;
    }
    public static getOpponent(){
        return this.opponent;
    }
    public static setWinner(op: string){
        this.winner = op;
    }
    public static getWinner(){
        return this.winner;
    }
}

class BoardService{
    public board:string[][] = [];

    private static _instance: BoardService = new BoardService();

    constructor(){
        if(BoardService._instance){
            throw new Error("Error in the object creation");
        }
        PlayerClass.setOppnent('X');
        this.createBoard();
        BoardService._instance = this;
    }

    public static getInstance(): BoardService{
        return BoardService._instance;
    }
    createBoard(): string[][]{
        for (let i = 0; i < 3; i++) {
            this.board[i] = [];
            for(let k=0; k< 3; k++){
                this.board[i][k] = "-";
            }
        }
        return this.board;
    }

    public move(row: number, col: number){
        if(!this.isOver()){
            if(PlayerClass.getOpponent() === 'X'){
                PlayerClass.setOppnent('O');
            }else{
                PlayerClass.setOppnent('X');
            }
            this.board[row][col] = PlayerClass.getOpponent();
            this.isOver();
        }
    }
    
    public isOver(): boolean{
        if(this.board[0][0] !== '-' && this.board[0][0] === this.board[1][1] && this.board[2][2] === this.board[0][0]){
            PlayerClass.setWinner(this.board[0][0]);
            return true;
        }
        return false;
    }
}
const obj = BoardService.getInstance();
export default obj;