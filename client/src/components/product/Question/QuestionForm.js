import React, {useState, Fragment} from 'react';
import {connect} from "react-redux";
import {askQuestion} from "../../../redux/question/question.actions";

const QuestionForm = ({id, askQuestion}) => {

    const [text, setText] = useState("");
    const onSubmit = e => {
        e.preventDefault();
        askQuestion({text}, id);
    }

    return (
        <Fragment>
        <form onSubmit={e => onSubmit(e)}> 
        <p className="lead text-danger text-monospace font-weight-bold mt-5 font-italic">Any Questions About The Product</p>
        <textarea placeholder="Do You Have Any Question ..." value={text} onChange={e => setText(e.target.value)} cols="10" rows="1" className="form-control" required></textarea>
        <input type="submit" className="btn btn-outline-warning mt-2"/>
        </form>
        </Fragment>
    );
}

export default connect(null, {askQuestion})(QuestionForm);
