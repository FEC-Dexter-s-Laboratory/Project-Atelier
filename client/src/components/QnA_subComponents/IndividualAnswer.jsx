import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Linkbutton, Answerdiv, Answerphotos, Answerthumbnail, Byline} from './QnAStyledComponents.style.js';
import PhotoModal from '../library/PhotoModal.jsx';

class IndividualAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: false,
      helpful: false,
      helpCount: 0,
      photoModal: false,
      photo: {}
    };
    this.handleAreport = this.handleAreport.bind(this);
    this.handleAhelp = this.handleAhelp.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.setState({helpCount: this.props.help});
  }

  handleAreport (aid) {
    axios.put('/qa/answers/:answer_id/report',
      null,
      {
        params: {
          answer_id: aid
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

  toggleModal (photo) {
    this.setState({
      photoModal: !this.state.photoModal,
      photo: photo
    });
  }

  render() {
    let yesbutton = <Linkbutton onClick={() => { this.handleAhelp(this.props.id); }}>Yes</Linkbutton>;
    if (this.state.helpful) {
      yesbutton = <span style={{textDecoration: 'underline', color: 'teal'}} >Yes</span>;
    }

    const answerPhotos = this.props.photos.length > 0
      ? <Answerphotos>
        {this.props.photos.map((photo, index) => {
          return (
            <Answerthumbnail
              key={index}
              src={photo.url}
              onClick={() => this.toggleModal(photo)}
            >
            </Answerthumbnail>
          );
        })}
      </Answerphotos>
      : null;

    return (
      <>
        <Answerdiv>
      A: {this.props.body} <br />
          <Byline> by {this.props.name}, {moment(this.props.date).format('LL')}</Byline><br />
          {answerPhotos}<br />
         Helpful? {yesbutton} ({this.state.helpCount})
      | {
            this.state.report
              ? <Linkbutton>Reported</Linkbutton>
              : <Linkbutton onClick={()=> { this.handleAreport(this.props.id); }}>Report</Linkbutton>
          }
        </Answerdiv>
        <PhotoModal visible={this.state.photoModal} toggleModal={this.toggleModal} photo={this.state.photo}/>
      </>
    );
  }
}

export default IndividualAnswer;