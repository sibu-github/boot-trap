import {findInValueMapping} from './boardValueMapping';
import {
  BOARD_COL_SIZE,
  BOARD_ROW_SIZE,
  DeadBoardLineType,
  MARKER_CHAR,
  MisereQuotient,
} from './definitions';

export class Board {
  colSize: number;
  rowSize: number;
  private _items: string[][];

  constructor() {
    this.colSize = BOARD_COL_SIZE;
    this.rowSize = BOARD_ROW_SIZE;
    this._items = this.emptyArray();
  }

  private emptyArray() {
    return Array(this.colSize)
      .fill('')
      .map(() =>
        Array(this.rowSize)
          .fill('')
          .map(() => ''),
      );
  }

  get items() {
    return this._items;
  }

  public clone() {
    const board = new Board();
    for (let y = 0; y < this.colSize; y++) {
      for (let x = 0; x < this.rowSize; x++) {
        board._items[y][x] = this._items[y][x];
      }
    }
    return board;
  }

  public boardValue(): number {
    if (this.isDead()) {
      return MisereQuotient.one;
    }
    // empty board
    if (this.items.flat().filter(e => e === MARKER_CHAR).length === 0) {
      return MisereQuotient.c;
    }
    return findInValueMapping(this._items);
  }

  public markAtPos(x: number, y: number): void {
    if (x < 0 || x >= this.rowSize) {
      throw new Error('Invalid x position value: ' + x);
    }
    if (y < 0 || y >= this.colSize) {
      throw new Error('Invalid y position value: ' + y);
    }
    if (this.isDead()) {
      throw new Error('Dead board');
    }
    this._items[y][x] = MARKER_CHAR;
  }

  public clearAtPos(x: number, y: number) {
    if (x < 0 || x >= this.rowSize) {
      throw new Error('Invalid x position value: ' + x);
    }
    if (y < 0 || y >= this.colSize) {
      throw new Error('Invalid y position value: ' + y);
    }
    this._items[y][x] = '';
  }

  public isMovePossible(x: number, y: number) {
    return !this.isDead() && this._items[y][x] !== MARKER_CHAR;
  }

  public clear(): void {
    this._items = this.emptyArray();
  }

  public isDead(): boolean {
    const items = this._items.flat();
    const deadBoardPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return deadBoardPositions.some(pos =>
      pos.every(i => items[i] === MARKER_CHAR),
    );
  }

  public getDeadBoardLineType(): DeadBoardLineType | undefined {
    const items = this._items.flat();
    const lineTypeMapping = [
      {elem: [0, 1, 2], lineType: DeadBoardLineType.HorizontalOne},
      {elem: [3, 4, 5], lineType: DeadBoardLineType.HorizontalTwo},
      {elem: [6, 7, 8], lineType: DeadBoardLineType.HorizontalThree},
      {elem: [0, 3, 6], lineType: DeadBoardLineType.VerticalOne},
      {elem: [1, 4, 7], lineType: DeadBoardLineType.VerticalTwo},
      {elem: [2, 5, 8], lineType: DeadBoardLineType.VerticalThree},
      {elem: [0, 4, 8], lineType: DeadBoardLineType.DiagonalOne},
      {elem: [2, 4, 6], lineType: DeadBoardLineType.DiagonalTwo},
    ];

    const e = lineTypeMapping.find(t =>
      t.elem.every(i => items[i] === MARKER_CHAR),
    );
    if (e) {
      return e.lineType;
    }
  }
}

export default Board;
