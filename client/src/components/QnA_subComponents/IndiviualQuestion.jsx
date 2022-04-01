import React, { useState, useEffect } from 'react';

function SingleQuestion({ data }) {
const [dataObj, setDataObj] = useState([]);

useEffect (() => {
    data.results.sort((a, b) => {
      if (a.question_helpfulness > b.question_helpfulness) {
        return 1;
      } else {
        return 0;
    }
    });
    console.log(data);
  });

  return (
    <div>
      individual questions
    </div>
  );
}
export default SingleQuestion;