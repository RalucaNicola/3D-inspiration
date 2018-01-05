import React from 'react';
import ReactDOM from 'react-dom';
import TagList from './components/TagList';
import CardList from './components/CardList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import data from './data/data.json';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'show all'
    }
  }

  filterTag(tag) {
    this.setState({filter: tag});
  }

  _unique(xs) {
    return xs.filter(function(x, i) {
      return xs.indexOf(x) === i
    })
  }

  getCountedTags(tags) {
    let countedTags = [];
    tags.forEach((tag) => {
      const tagIndex = countedTags.findIndex((element) => {
        return (element.name === tag);
      });
      if (tagIndex === -1) {
        countedTags.push({
          name: tag,
          count: 1
        });
      }
      else {
        countedTags[tagIndex].count++;
      }
    });
    return countedTags;
  }

  getFilteredTags() {
    let tags = [];

    this.props.apps.forEach(function(app) {
      tags = tags.concat(app.tags);
    });

    let countedTags = this.getCountedTags(tags);
    if (this.state.filter === 'show all') {
      return countedTags.map((tag) => {
        return {
          name: tag.name,
          count: tag.count,
          display: 1
        }
      });
    }
    else {
      return countedTags.map((tag) => {
        return {
          name: tag.name,
          count: tag.count,
          display: (tag.name === this.state.filter) ? 1: 0
        }
      });
    }
  }

  getFilteredApps() {
    if (this.state.filter === 'show all') {
      return this.props.apps;
    }
    return this.props.apps.filter((app) => {
      if (app.tags.indexOf(this.state.filter) === -1) {
        return false;
      }
      return true;
    });
  }

  sortByCount(a, b) {
    if (a.count > b.count) {
      return -1;
    }
    else return 1;
  }

  render() {
    this.getFilteredApps();
    return(
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">3DVisualInspiration</h1>
        </header>
        <TagList tags={this.getFilteredTags().sort(this.sortByCount)} handleTagClick={this.filterTag.bind(this)}/>
        { (this.state.filter !== 'show all') &&
          <div id="remove-filter">
            <button onClick={() => {
              this.filterTag('show all');}
              }>Remove filter</button>
          </div>
        }
        <CardList data={this.getFilteredApps()}/>
      </div>
    );
  }
}


ReactDOM.render(
  <MuiThemeProvider>
    <App apps={data.apps}/>
  </MuiThemeProvider>,

  document.getElementById('root')
);
