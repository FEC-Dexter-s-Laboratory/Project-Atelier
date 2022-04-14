import React from 'react';
import axios from 'axios';
import {Linkbutton, Questiondiv, Innerquestiondiv, Questionheader} from './QnAStyledComponents.style.js';

class IndividualQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpCount: 0,
      helpful: false,
      report: false
    };
    this.handleQhelp = this.handleQhelp.bind(this);
    this.handleQreport = this.handleQreport.bind(this);
  }

  componentDidMount() {
    this.setState({helpCount: this.props.help});
  }

  //event handlers
  handleQhelp (qid) {
    axios.put('/qa/questions/:question_id/helpful',
      null,
      {
        params: {
          question_id: qid
        }
      }
    )
      .then(() => {
        this.setState({
          helpCount: this.state.helpCount += 1,
          helpful: true,
        });
      });
  }

  handleQreport (qid) {
    axios.put('/qa/questions/:question_id/report',
      null,
      {
        params: {
          question_id: qid
        }
      }
    )
      .then(() => {
        this.setState({report: true});
      });
  }

  render() {
    let yesbutton = <Linkbutton onClick={() => { this.handleQhelp(this.props.id); }}>Yes</Linkbutton>;
    if (this.state.helpful) {
      yesbutton = <span style={{textDecoration: 'underline'}} >Yes</span>;
    }
    return (
      <Questionheader>
        <Questiondiv>Q: {this.props.body} </Questiondiv>
        <Innerquestiondiv>Helpful? {yesbutton}
          ({this.state.helpCount})
          | <Linkbutton onClick={() => this.props.modalF(this.props.id)}>Add Answer</Linkbutton>
          | {
            this.state.report
              ? <Linkbutton>Reported</Linkbutton>
              : <Linkbutton onClick={() => this.handleQreport(this.props.id)}>Report</Linkbutton>
          }
        </Innerquestiondiv>
      </Questionheader>
    );
  }
}

export default IndividualQuestion;