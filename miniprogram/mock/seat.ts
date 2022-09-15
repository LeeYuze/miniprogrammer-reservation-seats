import SeatGenerator from "./SeatGenerator"

const seatGenerator = new SeatGenerator(5, 5);

export const getSeatData = () => {
    return new Promise<SeatListVo>((resolve) => {
        const boughtList = seatGenerator.getBoughtList();
        let list = seatGenerator.getList().map(item => {
            const isBought = boughtList.some(boughtSeat => boughtSeat.id === item.id);
            return Object.assign({}, item, { isBought })
        });
        const seatRequestData: SeatListVo = {
            code: 200,
            data: {
                row: seatGenerator.getRow(),
                column: seatGenerator.getColumn(),
                list
            },
            msg: ''
        }
        // mock request waiting.
        setTimeout(() => {
            resolve(seatRequestData);
        }, 200)
    })
}

export const boughtSeat = (selectedSeats: SeatData[]) => {
    return new Promise<BaseSeatVo>((resolve) => {
        const seatRequestData: BaseSeatVo = {
            code: 200,
            data: {},
            msg: ''
        }

        seatGenerator.setSeatBought(selectedSeats);

        // mock request waiting.
        setTimeout(() => {
            resolve(seatRequestData);
        }, 200)
    })
}