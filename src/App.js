import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//VIRTUAL GALLERY APP

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
        showHeader : true,
        rootColor : 'white'
      };
      this.hideHeader = () => this.setState({showHeader : false})
      this.showHeader = () => this.setState({showHeader : true})
      this.rootStyle = function(options) {
         return {
           background: this.state.rootColor,
         }
      };
      this.changeRootColor = (color) => 
        this.setState({
          rootColor : color
        });
  };

  
  

  render() {
    // style={this.rootStyle()}
    return (
      <div className="App">
        {this.state.showHeader && <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Virtual Gallery</h1>
        </header>}
        <div className="root" style={this.rootStyle()} >
          <Root 
          hideHeader={this.hideHeader} 
          showHeader={this.showHeader}
          changeRootColor={this.changeRootColor}
          />
        </div>
      </div>
    );
  }
};

class Root extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        current_room : {},
        showWelcome : true,
        showGallery : false,
        current_artist : 'David Craven',
        current_gallery : 'Pacific Art League Gallery',
        current_exhibition : 'Art of Nature Exhibition',
        background : 'white',
        welcomeAnimation : 2.5
      };
      this.welcomeStyle = function() {
         return {
           'animationDuration' : this.state.welcomeAnimation+'s',
         }
      };
  };

  enter(){
      // this.props.hideHeader();
      this.props.changeRootColor('radial-gradient(circle, lightYellow,  white, lightBlue)');

      this.setState({
        showWelcome : false,
        showGallery : true
      });
  };
  exit(){
      this.props.showHeader();
      // this.props.changeRootColor('radial-gradient(circle, lightYellow,  white, lightBlue)');

      this.setState({
        showWelcome : true,
        showGallery : false,
        welcomeAnimation : 0
      });
  };

  render() {
    return (
      <div>
        {this.state.showWelcome && <div className="welcome-panel" style={this.welcomeStyle()}>
            <div id="artist-text">
                  ARTIST
            </div>
            <div id="gallery-text">
                  GALLERY
            </div>
            <div id="exhibition-text">
                  EXHIBITION
            </div>
        </div>}

        {this.state.showWelcome && <div className="menu-panel" style={this.welcomeStyle()}>
            <div className="artist-dropdown">{this.state.current_artist}</div>
            <div className="gallery-dropdown">{this.state.current_gallery}</div>
            <div className="exhibition-dropdown">{this.state.current_exhibition}</div>
            <EnterButton
                 onClick={() => this.enter()}
                />
        </div>}
        {this.state.showGallery && <div className="gallery-container">
            <div className="gallery-layout">
            </div> 
            <div className="gallery-menu">
              <div id="gallery-goback" onClick={() => this.exit()}>
                  back
              </div>
              <div id="gallery-descriptor">
                  {this.state.current_gallery}
              </div>
            </div>
        </div>}
      </div>
      );
  }
};

// class Root extends React.Component {

function EnterButton(props) {
  return (
    <div className="enter-button" onClick={props.onClick}>
      ENTER
    </div>
  );
};

export default App;
