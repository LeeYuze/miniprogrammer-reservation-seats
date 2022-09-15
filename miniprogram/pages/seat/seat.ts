import { getSeatData, boughtSeat } from "../../mock/seat"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        seatArray: [] as any[],
        selectedSeatArray: [] as any[],
        column: 0, // 每行多少列
        seatSize: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.getSeatData();

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 根据wrapper计算，每个seat的宽和高
     */
    calcSeatSize() {
        const query = wx.createSelectorQuery()
        query.select('.seat-wrapper').boundingClientRect()
        query.exec((res) => {
            const { width } = res[0];
            const pixelRatio = 750 / wx.getSystemInfoSync().windowWidth * 0.99;
            
            const seatSize = width ? (parseInt(width) / this.data.column) * pixelRatio : 0
            
            this.setData({
                seatSize
            })

        })
    },

    /**
     * 获取座位数据
     */
    async getSeatData(): Promise<void> {
        const res = await getSeatData();
        if (res.code === 200) {
            const { data } = res;
            const { column } = data;
            // 转换成前端可用的二维数组
            const binaryList = this.requestSeatDateConvert(data);
            this.setData({
                seatArray: [...binaryList],
                column
            })
            this.calcSeatSize()
        }
    },

    /**
     * 网络请求座位数据，转换成前端识别的数据
     * 
     * @return 返回SeatData二维数组
     */
    requestSeatDateConvert(seatRequestData: SeatRequestData): SeatData[][] {
        const { row, column, list } = seatRequestData;
        const copyList = [...list].map(seatData => Object.assign(seatData, { isSelected: false }));
        let resultList: SeatData[][] = [];

        for (let index = 0; index < row; index++) {
            resultList.push(copyList.splice(0, column));
        }

        return resultList
    },
    /**
     * 座位点击事件
     */
    handleSeatOnTap(event: any): void {
        const { currentTarget: { dataset: { id, row } } } = event;
        this.selectSeat(id, row);
    },

    /**
     * 选中座位
     * 未选中，调用则选中
     * 已选中，调用则未选中
     * 
     * @param id 座位id
     * @param row 第几行
     */
    selectSeat(id: string, row: number): void {
        const seatList: SeatData[][] = [...this.data.seatArray];
        let seatObj = seatList[row].find(item => item.id === id);
        // valid isBought
        if (seatObj && seatObj.isBought) return;

        seatObj = Object.assign(seatObj, { isSelected: seatObj && !seatObj.isSelected });

        // push current selected list.
        if (seatObj.isSelected) {
            this.addSelectedSeatArray(seatObj);
        } else {
            this.removeSelectedSeatArray(seatObj.id);
        }

        seatList[row].forEach(item => {
            if (item.id === (seatObj && seatObj.id)) {
                item = Object.assign(item, seatObj);
            }
        })

        this.setData({
            seatArray: [...seatList]
        })
    },
    /**
     * 将座位 放进 选中数组
     * @param seatData 座位信息
     */
    addSelectedSeatArray(seatData: SeatData): void {
        const list = [...this.data.selectedSeatArray, seatData];
        this.setData({
            selectedSeatArray: [...list]
        })
    },
    /**
     * 移除选中数组
     * @param id 移除id
     */
    removeSelectedSeatArray(id: string): void {
        const { selectedSeatArray } = this.data;
        if (selectedSeatArray.length <= 0) return;
        const list = this.data.selectedSeatArray.filter(item => item.id !== id);
        this.setData({
            selectedSeatArray: [...list]
        })
    },
    /**
     * 清空选中数组
     */
    clearSelectedSeatArray() {
        const { selectedSeatArray } = this.data;
        if (selectedSeatArray.length <= 0) return;
        this.setData({
            selectedSeatArray: []
        })
    },
    /**
     * 订座事件
     */
    handleBoughtSeatOnTap(): void {
        if (!this.isValidBoughtSeat()) return;
        this.orderSeat(this.data.selectedSeatArray);
        this.clearSelectedSeatArray()
    },

    /**
     * 订座
     * @param seats 选中座位
     */
    async orderSeat(selectedSeats: SeatData[]): Promise<void> {
        const list = [...selectedSeats];
        
        await boughtSeat(list);
        this.getSeatData();
    },
    /**
     * 检测符不符合购买条件
     */
    isValidBoughtSeat(): boolean {
        const { selectedSeatArray } = this.data;
        if (selectedSeatArray.length <= 0) return false;
        return true;
    }
})