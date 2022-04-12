import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Linkbutton, Answerdiv } from './QnAStyledComponents.style.js';

class IndividualAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: false,
      helpful: false,
      helpCount: 0,
    };
    this.handleAreport = this.handleAreport.bind(this);
    this.handleAhelp = this.handleAhelp.bind(this);
  }

  componentDidMount() {
    this.setState({helpCount: this.props.help});
  }

  handleAreport (aid) {
    axios.put('/qa/answers/:answer_id/report',
      null,
      {
        params: {
          answer_id	: aid
        }
      }
    )
      .then(() => {
        this.setState({report: true});
      });
  }

  handleAhelp (aid) {
    axios.put('/qa/answers/:answer_id/helpful',
      null,
      {
        params: {
          answer_id: aid
        }
      }
    )
      .then(() => {
        this.setState({
          helpful: true,
          helpCount: this.state.helpCount += 1,
        });
      });
  }

  render() {
    return (
      <Answerdiv key={this.props.id}>
      A: {this.props.body} <br />
      by {this.props.name},
        {moment(this.props.date).format('LL')}
      | Helpful?<Linkbutton onClick={() => { this.handleAhelp(this.props.id); }} disabled={this.state.helpful}>Yes</Linkbutton>({this.state.helpCount})
      | {
          this.state.report
            ? <Linkbutton>Reported</Linkbutton>
            : <Linkbutton onClick={()=> { this.handleAreport(this.props.id); }}>Report</Linkbutton>
        }

      </Answerdiv>
    );
  }
}

export default IndividualAnswer;