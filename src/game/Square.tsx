interface ISquare{
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cb: any,
    row: number,
    col: number
}
export default function Square(props : ISquare){
    const onClick = () => {
        props.cb(props.row, props.col);
    }
    return (
        <button className="square" onClick={ () => { onClick()}}>{props.value}</button>
    );
}