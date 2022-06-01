import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-king.png'
import whiteLogo from '../../assets/white-king.png'

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        const diagonal = () => {
            if(!super.canMove(target))
                return false
            const dx = Math.abs(this.cell.x - target.x)
            const dy = Math.abs(this.cell.y - target.y)            
            return (dx === 1 && dy === 1)
        }
        const gorizontalVertical = () => {
            if (((target.y === this.cell.y) || (target.y === this.cell.y - 1) || (target.y === this.cell.y + 1))
                && ((target.x === this.cell.x) || (target.x === this.cell.x - 1) || (target.x === this.cell.x + 1))
                && this.cell.board.getCell(target.x, target.y).isEmpty() ) {
                    return true;
                }
            return false
        }

        return diagonal() || gorizontalVertical()
    }
}