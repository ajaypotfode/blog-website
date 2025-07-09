export type SubscriberData = {
    autherId: string,
    email: string
}

export interface SubscriberResult {
    _id: string,
    autherId: string,
    email: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}


export interface GetSubscriberResponse {
    message: string,
    success: boolean,
    result?: SubscriberResult[]
    error?: unknown

}

export interface GetSingleSubscriberResponse {
    message: string,
    success: boolean,
    result?: SubscriberResult,
    error?: unknown

}


export interface SubscriberInitialState {
    subscribers: SubscriberResult[],
    email:string
}



// type GlobalRejectedPayload= {}