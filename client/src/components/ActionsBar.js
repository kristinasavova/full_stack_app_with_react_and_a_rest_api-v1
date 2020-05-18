import React , { Component } from 'react';

export default class ActionsBar extends Component {

    render () {
        return (
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <span>
                            <a className="button" href="/">Update Course</a>
                            <a className="button" href="/">Delete Course</a>
                        </span>
                        <a className="button-secondary" href="/">Return to List</a>
                    </div>
                </div>
            </div>
        );
    }
}