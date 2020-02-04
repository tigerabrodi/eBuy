import React, { Fragment, useState, useEffect } from 'react';
import Moment from "react-moment";
import { Link } from 'react-router-dom';
import { deleteQuestion, updateQuestion } from '../../../redux/question/question.actions';
import { connect } from 'react-redux';

const Question = ({question: {_id, text, user, date}, addAnswer, deleteQuestion, updateQuestion, productUserId, userId}) => {

    const [editMode, setEditMode] = useState(false);
    const [textToEdit, setTextToEdit] = useState(text);
    const [answerMode, setAnswerMode] = useState(false);
    const [textToAnswer, setTextToAnswer] = useState("");

    return (
        <Fragment>
            <div className="card bg-info m-4">
            <div className="card-body">
                {editMode ? (
                    <Fragment>
                    <input className="form-control" value={textToEdit} placeholder="Something else on your mind ?..." type="text" onChange={e => setTextToEdit(e.target.value)} required/>
                    <button type="button" className="btn btn-success m-2" onClick={() => {
                        updateQuestion(textToEdit, _id);
                        setEditMode(false);
                    }}>Submit</button>
                    </Fragment>
                ) : (
                   <p className="secondary"> {text} </p>
                )}
                <p className="card-text"><small className="text-muted">Asked <Moment format="YYYY/MM/DD">{date}</Moment> by {user.name} </small></p>
                {user._id === userId && (
                    <Fragment>
                                    <button className="btn btn-primary mx-1" onClick={() => setEditMode(!editMode)}> <i className="fas fa-edit" /> </button>
                <button className="btn btn-danger mx-1" onClick={() => deleteQuestion(_id)}> <i className="fas fa-trash" /> </button>
                    </Fragment>
                )}
            </div>
            </div>
        </Fragment>
    );
}

export default connect(null, {deleteQuestion, updateQuestion})(Question);
