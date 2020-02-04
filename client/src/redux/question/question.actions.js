import axios from "axios";
import {setAlert} from "../alert/alert.actions";
import {QuestionActionTypes} from "./question.types";


// Ask a question
export const askQuestion = (text, id) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const res = await axios.post(`/questions/${id}`, text, config);
        dispatch({
            type: QuestionActionTypes.ASK_QUESTION,
            payload: res.data
        })
        dispatch(setAlert("You Asked Your Question Successfully", "success"));
    } catch (err) {
        dispatch({
            type: QuestionActionTypes.QUESTION_ERROR,
            payload: { msg: err.message, status: err.response.status }
          });
    }
}

// Get Questions
export const getQuestions = id => async dispatch => {
    try {
        const res = await axios.get(`/questions/${id}`);
        dispatch({
            type: QuestionActionTypes.GET_QUESTIONS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: QuestionActionTypes.QUESTION_ERROR,
            payload: { msg: err.message, status: err.response.status }
          });
    }
}

// Update Question
export const updateQuestion = (text, id) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({text})

    try {
        const res = await axios.put(`/questions/${id}`, body, config);
        dispatch({
            type: QuestionActionTypes.UPDATE_QUESTION,
            payload: {text, id}
        });
        dispatch(setAlert("Successfully updated your question", "success"));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: QuestionActionTypes.QUESTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete Question 
export const deleteQuestion = id => async dispatch => {
    try {
        await axios.delete(`/questions/${id}`);
        dispatch({
            type: QuestionActionTypes.DELETE_QUESTION,
            payload: id
        });
        dispatch(setAlert("You successfully deleted your question", "success"));
    } catch (err) {
        dispatch({
            type: QuestionActionTypes.QUESTION_ERROR,
            payload: { msg: err.message, status: err.response.status }
          });
    }
}