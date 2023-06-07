export interface ICategory {
    id: number,
    title: string,
}


export interface ITopic {
    id: number,
    title: string,
    timestamp: string,
    username: string,
    userId: number,
    text: string,
    maxCommentId: number,
    // comments: IComment[] | undefined,
}