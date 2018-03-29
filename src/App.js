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
    return (
      <div className="App">
        
        <div className="root" style={this.rootStyle()}>
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
        showHeader: true,
        showWelcome : true,
        showGallery : false,
        current_artist : 'David Craven',
        current_gallery : 'Pacific Art League Gallery',
        current_exhibition : 'Art of Nature Exhibition',
        background : 'white',
        welcomeAnimation : 2.5,
        rooms : []
      };
      this.welcomeStyle = function() {
         return {
           'animationDuration' : this.state.welcomeAnimation+'s',
         }
      };

      // this.foo = function(){
      //   var rooms = this.state.rooms.slice();
      //   console.log('in self? invoking function, rooms is', rooms);
        
      //   for (var i=0;i<6;i++) {
      //     rooms.push({'key' : 'room'+i, 'visible' : true})
      //   }
      //   console.log('rooms is now', rooms)
      //   this.setState({
      //     rooms : rooms
      //   })

      // }.call(this)

      
  };

  componentWillMount() {
    let rooms = this.state.rooms.slice();
    console.log('in  function, rooms is', rooms);
    
    for (var i=0;i<7;i++) {
      let bigOrSmall
      Math.random() > 0.5 ? bigOrSmall = 'small' : bigOrSmall = 'big'
      rooms.push({'size' : bigOrSmall , 'visible' : true})
    }
    console.log('rooms is now', rooms)
    this.setState({
      rooms : rooms
    })
  }

  enter(){
      this.props.hideHeader();
      this.props.changeRootColor('radial-gradient(circle, lightYellow,  white, lightBlue)');

      this.setState({
        showHeader : false,
        showWelcome : false,
        showGallery : true
      });
  };
  exit(){
    this.props.showHeader();
      this.setState({
        showHeader : true,
        showWelcome : true,
        showGallery : false,
        welcomeAnimation : 0
      });
  };

  selectRoom(e, index) {
    console.log('in select room, e is ', e, 'index is ', index)
    let roomsCopy = this.state.rooms.slice();

    for(var i=0;i<roomsCopy.length;i++){
      if(i !== index){roomsCopy[i].visible = false}
    }


    console.log('roomsCopy is ', roomsCopy)

    this.setState({
      rooms : roomsCopy
    })
    // let rooms = props.rooms.slice().map((e) => 
    //   e.visible ? e : false
    // ).map((i) =>
    //   i.size === 'big' ? <div className="room big" key={props.rooms.indexOf(i)}></div> : <div className="room small" key={props.rooms.indexOf(i)}></div>
    // )
    // console.log(rooms)
    // return (
    //   <div className="flexrow flexcontainer">
    //       {rooms}
    //   </div>
    // );
    // return roomsCopy
  }

  render() {

    const numbers = [1,2,3,4,5]
    const numbers2 = [6,7]
    const numbers3 = [8,9]
      // for(var a in this.state.rooms){
      //     if(this.state.rooms[a].visible){
      //       return (
              
      //       )
      //     }
      // }

    return (
      <div>
        {/////////HOME 
        }
        {this.state.showHeader && <header className="App-header">
          <div id="headerLeft">
            <h1 className="App-title">Welcome to the Virtual Gallery</h1>
          </div>
          <div id="headerRight">
                      <img src={logo} className="App-logo" alt="logo" />
          </div>
        </header>}
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

        {/////////GALLERY 
        }

        {this.state.showGallery && <div className="gallery-container">
            <div className="gallery-menu">
              <div id="gallery-goback" onClick={() => this.exit()}>
                back
              </div>
              <div id="gallery-descriptor">
                {this.state.current_gallery}
              </div>
            </div>
            <div className="gallery-main">
              <Rooms rooms={this.state.rooms} onClick={(el, idx) => this.selectRoom(el, idx)}/>
            </div>
            <div className="gallery-entrance">
                  MAIN ENTRANCE
            </div>          
        </div>}
      </div>
      );
  }
};
// <RandomRooms numArr={numbers} /> 
function RandomRooms(props) {
  const numbers = props.numArr;
  const rooms = numbers.map((number) =>
     Math.random() > 0.5 ? <div key={number.toString()}  className='room big' onClick={props.onClick}>{number} </div> : <div key={number.toString()}  className='room small' onClick={props.onClick}>{number} </div>
  );
  return (
    rooms
  );
}
function Rooms(props) {

  //THIS LOGIC NEEDS O BE ABSTRACTED OUT. THIS SHOULDN'T BE HANDLING ANY LOGIC
console.log('PROPS.ROOMS IS ', props.rooms)

  let rooms = props.rooms.slice().filter((e) => 
    e.visible ? true : false
  );
  console.log('YO MOTHERFUCKER ', rooms)
// debugger

  let barf = rooms.map((i, idx) =>
    i.size === 'big' ? <div 
    className="room big" 
    key={idx} 
    onClick={props.onClick.bind(this, i, props.rooms.indexOf(i))}>
    </div> : <div 
    className="room small" 
    key={idx} 
    onClick={props.onClick.bind(this, i, props.rooms.indexOf(i))}>
    </div>
  )
  console.log(rooms)
  return (
    <div className="flexrow flexcontainer">
        {barf}
    </div>
  );
}




// class Root extends React.Component {

function EnterButton(props) {
  return (
    <div className="enter-button" onClick={props.onClick}>
      ENTER
    </div>
  );
};

export default App;
