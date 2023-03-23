import { ObjType } from "./components/JoinBlock"

export enum EnumType {
    JOINED = 'JOINED',
    SET_USERS = 'SET_USERS',
    NEW_MESSAGE = 'NEW_MESSAGE'
}
interface IsAuthAction {
    type: EnumType.JOINED
    payload: ObjType
}
interface UsersAction {
    type: EnumType.SET_USERS
    payload: string[]
}

type message = {
    userName: string
    text: string
  }
interface MessagesAction {
    type: EnumType.NEW_MESSAGE
    payload: message
}

export interface StateType {
    joined: boolean
    roomId: string | null
    userName: string  
    users: string[] | []
    messages: message[] | []
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

        case EnumType.NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
             }

        default:
            return state;
    }
}

export default reducer