import React from 'react';
import ReactDOM from 'react-dom';
import ProductView from './components/productview.jsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesData: [],
      keyword: 'Computer',
      value: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log('In mount ', window.location.href);
    // fetch(`http://ec2-52-14-77-150.us-east-2.compute.amazonaws.com:3005/product/${window.location.href.split('/')[4] || 1}`, {
      fetch(`/product/${window.location.href.split('/')[4] || 1}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
      console.log(data, 'this is from component did mount in index.jsx');
        this.setState({
          imagesData: data,
        });
        // console.log(data[0].productTag);
        // let imageSet = [];
        // for (let i = 0; i < data.length; i++) {
        //   if (data[i].productTag === this.state.keyword) {
        //     imageSet.push(data[i])
        //   }
        // }
        // console.log(imageSet);
        // this.setState({
        //   imagesData: imageSet
        // })
      });
  }

  // componentDidUpdate() {
  //   fetch('http://localhost:3005/data/grab', {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let imageSet = [];
  //       for (let i = 0; i < data.length; i++) {
  //         if (data[i].productTag === this.state.keyword) {
  //           imageSet.push(data[i])
  //         }
  //       }
  //       if (this.state.keyword != this.state.imagesData[0].productTag) {
  //         this.setState({
  //           imagesData: imageSet
  //         })
  //       }
  //     })
  // }

  handleSubmit(e) {
    this.setState({
      keyword: this.state.value,
    });
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    return (
      <>
        <AppBar
          style={{padding: '0 20px 0', backgroundColor: '#232f3e', height: '7%' }}
        >
          <Toolbar style={{ padding: '0px' }}>
            <IconButton
              edge="start"
              style={{ marginRight: '5px' }}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <h2>Amazon</h2>
            <div
              style={{
                backgroundColor: 'white',
                marginLeft: '20%',
                padding: '5px',
                borderRadius: '5px',
                position: 'relative',
                width: '32%',
              }}
            >
              <div style={{ width: '70%' }}>
                <SearchIcon
                  style={{
                    color: 'black',
                    height: '86%',
                    position: 'absolute',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '1.4em',
                  }}
                />
                {/* <form onSubmit={this.handleSubmit}> */}
                {/* <label> */}
                {/* Search */}
                {/* <input type="text" /> */}
                <InputBase
                  placeholder="Search…"
                  value={this.state.value}
                  onChange={this.handleChange}
                  inputProps={{ 'aria-label': 'Search' }}
                  style={{
                    color: 'black',
                    marginLeft: '5px',
                    display: 'inline-block',
                    width: '72%',
                    border: 'none',
                  }}
                />
              </div>
            </div>
            {/* </label> */}
            {/* </form> */}
          </Toolbar>
        </AppBar>
        <ProductView images={this.state.imagesData} />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('photoapp'));
