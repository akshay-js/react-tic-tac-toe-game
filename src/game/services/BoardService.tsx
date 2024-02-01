export class PlayerClass{
    private static opponent:string = "O";
    constructor(){
    }
    public static setOpponent(op: string){
        this.opponent = op;
    }
    public static getOpponent(){
        return this.opponent;
    }
}

class BoardService{
    public board:string[][] = [];
    private winner: string = '';

    private static _instance: BoardService = new BoardService();

    constructor(){
        if(BoardService._instance){
            throw new Error("Error in the object creation");
        }
        this.createBoard();
    }

    public static getInstance(): BoardService{
        return BoardService._instance;
    }

    private createBoard(): string[][]{
        PlayerClass.setOpponent('X');
        this.winner = '';
        this.board = Array.from({ length: 3 }, () => Array(3).fill('-'));
        return this.board;
    }

    public move(row: number, col: number){
        if(!this.isOver()){
            this.switchPlayer();
            this.board[row][col] = PlayerClass.getOpponent();
            this.isOver();
        }
    }
    
    public isOver(): boolean{
        if (this.checkRowWin() ||
        this.checkColumnWin() ||
        this.checkDiagonalWin() ||
        this.checkDraw()) {
            return true;
        }
        return false;
    }

    private switchPlayer(): void{
        PlayerClass.setOpponent(PlayerClass.getOpponent() === 'X' ? 'O' : 'X');
    }

    private setWinner(op: string){
        this.winner = op;
    }

    public getWinner(): string{
        return this.winner !== '' ? this.winner : 'none';
    }

    public reset(){
        this.createBoard();
    }

    private checkDiagonalWin(): boolean {
        const diag1 = this.board[0][0] !== '-' && this.board[0][0] === this.board[1][1] && this.board[2][2] === this.board[0][0];
        const diag2 = this.board[0][2] !== '-' && this.board[0][2] === this.board[1][1] && this.board[2][0] === this.board[0][2];
        if (diag1 || diag2) {
          this.setWinner(this.board[1][1]);
          return true;
        }
        return false;
    }

    private checkRowWin(): boolean {
        for (let row = 0; row < 3; row++) {
          if (
            this.board[row][0] !== '-' &&
            this.board[row][0] === this.board[row][1] &&
            this.board[row][1] === this.board[row][2]
          ) {
            this.setWinner(this.board[row][0]);
            return true;
          }
        }
        return false;
      }
    
      private checkColumnWin(): boolean {
        for (let col = 0; col < 3; col++) {
          if (
            this.board[0][col] !== '-' &&
            this.board[0][col] === this.board[1][col] &&
            this.board[1][col] === this.board[2][col]
          ) {
            this.setWinner(this.board[0][col]);
            return true;
          }
        }
        return false;
      }
    
      private checkDraw(): boolean {
        return this.board.every(row => row.every(cell => cell !== '-'));
      }
}
const obj = BoardService.getInstance();
export default obj;