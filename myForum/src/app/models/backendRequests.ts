import { IUser } from "./userModel";

export interface ILoginRequest {
    username: string, //or email
    password: string,
}

export interface ILoginByTokenRequest {
    authToken: string,
}

export interface ILoginResponse {
    authToken: string,
    id: number,
    username: string,
    email: string,
}

export interface IRegisterRequest {
    username: string,
    email: string,
    password: string,
}

export interface ILogoutRequest {
    authToken: string,
    logoutOtherSessions: boolean,
}

export interface IDeleteUserRequest {
    authToken: string,
}

export interface IChangePasswordRequest {
    userId: number,
    oldPassword: string,
    newPassword: string,
    logoutOtherSessions: boolean,
    dontLogoutToken: string,
}

export interface IGetUsersRequest {
    authToken: string,
}

export interface IGetUsersResponse { 
    users: IUser[],
}

export interface IAddEmailRequest {
    authToken: string,
    email: string,
}



export interface IAddTopicRequest {
    authToken: string,
    categoryId: number,
    title: string,
    text: string,
}

export interface IAddCommentRequest {
    authToken: string,
    categoryId: number,
    topicId: number,
    text: string,
}

export interface IDeleteTopicRequest {
    authToken: string,
    categoryId: number,
    topicid: number
}

export interface IDeleteCommentRequest {
    authToken: string,
    categoryId: number,
    topicId: number,
    commentId: number,
}