import React from 'react';
import { Card, CardText, CardMedia, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Assignment from 'material-ui/svg-icons/action/description';
import {grey400, grey900} from 'material-ui/styles/colors';
import './CardList.css';

class CardList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='card-wrapper'>
        {this.props.data.map(function (feature, index) {
          return (
            <Card className='card' key={index}>
              <CardTitle title={feature.title} className='card-title'/>
              <CardMedia>
                <img src={require('../data/images/' + feature.image)} alt='' />
              </CardMedia>
              <CardText className='desc'>
                <article className='desc-technology'>
                  <span><b>Framework:</b> {feature.framework}</span>
                </article>
                <article>
                  <span><b>Author:</b> {feature.author}</span>
                </article>
                <article>
                  <span><b>Tags:</b> {feature.tags.join(', ')}</span>
                </article>
                <a href={`${feature.url}`} target='_blank'>Go to visualization</a>
              </CardText>
            </Card>
          );
        }, this)}
      </div>
    )
  }
}

export default CardList;