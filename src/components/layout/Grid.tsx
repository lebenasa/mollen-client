import { createContext, ReactNode, useContext } from "react";

export type OneColumns = 1;
export type TwoColumns = 2;
export type ThreeColumns = 3;
export type FourColumns = 4;
export type FiveColumns = 5;
export type SixColumns = 6;
export type EightColumns = 8;
export type TwelveColumns = 12;
export type TwentyFourColumns = 24;

const GridContext = createContext({ columns: 5 });

export interface GridProps {
    children: ReactNode,
    columns?: OneColumns | TwoColumns | ThreeColumns | FourColumns | FiveColumns | SixColumns | EightColumns | TwelveColumns | TwentyFourColumns,
}

function Grid(props: GridProps) {
    const columns = props.columns ?? 5;
    return (
        <div className="pure-g">
            <GridContext.Provider value={{ columns }}>
                {props.children}
            </GridContext.Provider>
        </div>
    );
}

export interface GridItemProps {
    children: ReactNode,
    columnSpan?: number,
}

function Item(props: GridItemProps) {
    const gridProps = useContext(GridContext);
    const columnSpan = props.columnSpan ?? 1;
    return (
        <div className={`pure-u-${columnSpan}-${gridProps.columns}`}>
            {props.children}
        </div>
    );
}

Grid.Item = Item;
export default Grid;