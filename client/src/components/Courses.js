import React from 'react'; 

export default ({ context }) => {

    const { courses } = context;

    return (
        <div>
            <h1>Courses</h1> 
            {courses}
        </div>
    );
};