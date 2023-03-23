import { ObjType } from "./components/JoinBlock"

export enum EnumType {
    JOINED = 'JOINED',
    SET_USERS = 'SET_USERS',
    SET_MESSAGES = 'SET_MESSAGES'
}
interface IsAuthAction {
    type: EnumType.JOINED
    payload: ObjType
}
interface UsersAction {
    type: EnumType.SET_USERS
    payload: string[]
}
interface MessagesAction {
    type: EnumType.SET_MESSAGES
    payload: string[]
}

export interface StateType {
    joined: boolean
    roomId: string | null
    userName: string | null
    users: string[]
    messages: string[]
}

const reducer = (state: StateType, action: IsAuthAction | UsersAction | MessagesAction) => {
    switch (action.type) {
        case EnumType.JOINED:
            return {
                ...state,
                joined: true,
                roomId: action.payload.roomId,
                userName: action.payload.userName
            }

        case EnumType.SET_USERS:
            return {
                ...state,
                users: action.payload
            }

        case EnumType.SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }

        default:
            return state;
    }
}

export default reducer