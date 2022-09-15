/**
 * 单个座位格式
 */
type SeatData = {
    id: string,
    row: number,
    column: number,
    isActive: boolean,
    isSelected?:boolean,
    isBought?:boolean
}

/**
 * 座位返回格式
 */
type SeatRequestData = {
    row: number,
    column: number,
    list: SeatData[]
}

/**
 * 订座列表返回的信息
 */
interface BaseSeatVo extends ResponseResultVo<object> {

}

/**
 * 订座列表返回的信息
 */
interface SeatListVo extends ResponseResultVo<SeatRequestData> {

}

/**
 * 座位请求参数
 */
interface SeatRequest {
    row: number,
    column: number
}