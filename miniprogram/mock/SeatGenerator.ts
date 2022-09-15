export default class SeatGenerator {
    // 生成的行
    private row: number;
    // 生成的列
    private column: number;
    // 生成的座位
    private list: SeatData[];
    // 已经购买的位置
    private boughtList: SeatData[];

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
        this.list = [];
        this.boughtList = [
            {
                id: "12",
                row: 3,
                column: 4,
                isActive: true
            }
        ];
        this.generateList();
    }

    private generateList(): void {
        const row = this.row;
        const column = this.column;
        let columnCnt = 1;
        let rowCnt = 1;

        this.list = Array(row * column).fill(0).map((item, index) => {
            if (index % row === 0 && index !== 0) {
                rowCnt++;
            }
            if (columnCnt === column) {
                columnCnt = 1;
            } else {
                columnCnt += 1;
            }
            return {
                id: `${index}`,
                row: rowCnt,
                column: columnCnt,
                isActive: true
            }
        }).sort((a, b) => {
            if (a.row === b.row) {
                return a.column - b.column
            }
            return a.row - b.row
        }).map(item => Object.assign({}, item, { isActive: item.column !== 3 }))
    }

    public setSeatBought(selectedSeats: SeatData[]): void {
        if (selectedSeats.length <= 0) return;
        this.boughtList = [...this.boughtList, ...selectedSeats];
    }

    public getRow(): number {
        return this.row;
    }

    public getColumn(): number {
        return this.column;
    }

    public getList(): SeatData[] {
        return this.list;
    }

    public getBoughtList(): SeatData[] {
        return this.boughtList;
    }
}