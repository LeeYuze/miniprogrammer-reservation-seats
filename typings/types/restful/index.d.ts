/**
 * 请求状态
 */
declare enum ResponseResultVoCode {
    SUCCESS = 200
}

/**
 * restful格式
 */
interface ResponseResultVo<T> {
    code: ResponseResultVoCode,
    data: T,
    msg: string
}