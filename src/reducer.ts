export enum AuthActionEnum {
    IS_AUTH = 'IS_AUTH'
}

interface IsAuthAction {
    type: AuthActionEnum
    payload: boolean
}

export interface IsAuthState {
    isAuth: boolean
}

const reducer = (state: IsAuthState, action: IsAuthAction) => {
    switch (action.type) {
        case AuthActionEnum.IS_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        default:
            return state;
    }
}

export default reducer