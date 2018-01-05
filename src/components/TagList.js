import React from 'react';
import Chip from 'material-ui/Chip';
import {indigo100, white} from 'material-ui/styles/colors';
import './TagList.css';

class TagList extends React.Component {
  constructor(props) {
    super(props);
  }

  scale(count) {
    const minHeight = 20;
    const maxHeight = 30;
    const minCount = 2;
    const maxCount = 5;
    return (maxHeight - minHeight) * (count - minCount) / (maxCount - minCount) + minHeight;
  }

  render() {
    return (
      <div className='tag-wrapper'>
        {
          this.props.tags.map(function(tag, index){
            return <Chip
                    backgroundColor={tag.display ? indigo100 : '#eee'}
                    style={{
                      height: this.scale(tag.count) + 'px',
                      lineHeight: this.scale(tag.count) + 'px'
                    }}
                    className='chip'
                    onClick={() => this.props.handleTagClick(tag.name)}
                    key={index}>{tag.name}
                  </Chip>
          }, this)
        }
      </div>
    );
  }
}

export default TagList;