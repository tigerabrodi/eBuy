import {QuestionActionTypes} from "./question.types";


const initialState = {
    questions: [],
    loading: true,
    error: {}
}

const questionReducer = (state = initialState, action) => {
    const {payload, type} = action;
    switch (type) {
        case QuestionActionTypes.GET_QUESTIONS:
            return {
                ...state,
                questions: payload,
                loading: false
            }
            case QuestionActionTypes.ASK_QUESTION:
                return {
                    ...state,
                    questions: [payload, ...state.questions],
                    loading: false
                }
                case QuestionActionTypes.DELETE_QUESTION:
                    return {
                        ...state,
                        questions: state.questions.filter(question => question._id !== payload),
                        loading: false
                    }
                    case QuestionActionTypes.UPDATE_QUESTION:
                        return {
                            ...state,
                            questions: state.questions.map(question => question._id === payload.id ? {...question, text: payload.text} : question),
                            loading: false
                        }
            case QuestionActionTypes.QUESTION_ERROR:
                return {
                    ...state,
                    error: payload,
                    loading: false
                }
        default:
            return state;
    }
}

export default questionReducer