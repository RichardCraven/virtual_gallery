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

  componentDidMount() {
  console.log('HELLO?');

  // var $this = $(ReactDOM.findDOMNode(this));
  // set el height and width etc.
  var droppingDiv = document.getElementById('draghere');
  console.log(droppingDiv);
  }

  render() {
    return (
      <div className="App">
        
        <div className="root">
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
        containerHeight : '50%',
        welcomeAnimation : 2.5,
        rooms: [
          {size : 'small', visible : true, selected : false},
          { size: 'big', visible: true, selected: false },
          { size: 'small', visible: true, selected: false },
          { size: 'big', visible: true, selected: false },
          { size: 'big', visible: true, selected: false },
          { size: 'small', visible: true, selected: false },
          { size: 'small', visible: true, selected: false },
          { size: 'small', visible: true, selected: false },
          { size: 'small', visible: true, selected: false }
        ],
        colors : ['red','yellow','blue','green','purple','grey','orange','pink']
      };
      this.welcomeStyle = function() {
         return {
           'animationDuration' : this.state.welcomeAnimation+'s',
         }
      };
      this.containerHeight = function() {
         return {
           'height' : this.state.containerHeight,
         }
      };
  };
  componentWillMount() {
    let rooms = this.state.rooms.slice();
    for (var i=0;i<rooms.length;i++) {
      // let bigOrSmall
      // Math.random() > 0.5 ? bigOrSmall = 'small' : bigOrSmall = 'big'
      // rooms.push({'size' : bigOrSmall , 'visible' : true, selected : false})
      let walls = {
        north : [true, 'North Wall'],
        south : [true, 'South Wall'],
        east : [true, 'East Wall'],
        west : [true, 'West Wall'],
        main : [true, '']
      }
      rooms[i].walls = walls
    }
    this.setState({
      rooms : rooms
    })
    // console.log(this.state.rooms)
  }
  enter(){
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      console.log("File API supported.!");
    } else {
      console.log("The File APIs are not fully supported in this browser.");
    }
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
  selectRoom(index){
    let roomsCopy = this.state.rooms.slice();

    for(var i=0;i<roomsCopy.length;i++){
      if(i !== index){roomsCopy[i].visible = false} else{
        roomsCopy[i].selected = true;
      }
    };
    this.setState({
      rooms : roomsCopy,
      containerHeight : '100%'
    })
  }
  selectWall(index, type) {
    let rooms = this.state.rooms.slice();
    // console.log('IN SELECT WALL, idx is ', index)
    // rooms[index].walls[type] = !rooms[index].walls[type];
    
    for(var i in rooms[index].walls){
      if (i === type) { rooms[index].walls[i][0] = 'selected' } else { 
        rooms[index].walls[i][0] = false
        rooms[index].walls[i][1] = ''
      }
    }
    this.setState({
      rooms: rooms
    })
  }
  
  roomStyle(idx) {
  var flexGrow, width, color;
  let rooms = this.state.rooms;
  // let colors = this.state.colors;

  if (this.state.rooms[idx].visible) {
    if (this.state.rooms[idx].size === 'big') {
      color = 'lightBlue';
      width = '200px'
    } else {
      color = 'lightGreen';
      width = '100px'
    }
    flexGrow = 20
    return {
      flexGrow: flexGrow,
      color: color
    }
  } else {
    flexGrow = 0.000001
    width = '0.01px'

    return {

      flexGrow: flexGrow,
      width: width,
      border: 'none'
    }
  }
};
  wallStyle(idx, type) {
  // console.log(idx, type)
  let flexGrow;
  let rooms = this.state.rooms.slice();

  // if(rooms[idx].walls[type]){
  //   flexGrow = 20
  //   return {
  //     flexGrow: flexGrow
  //   }
  // }
    
  // let colors = this.state.colors;
  switch (type) {
    case 'north':
      if(rooms[idx].walls[type][0] === true){
        return {
          flex: '1 1'
        }
      } else if (rooms[idx].walls[type][0] === 'selected'){
        return {
          flex: '30 1'
        }
      } else if (rooms[idx].walls[type][0] === false) {
        return {
          flex: '0.00000001 0.0001'
        }
      }
      break;
    case 'main':
      if (rooms[idx].walls[type][0] === true) {
        return {
          flex: '6 1'
        }
      } else if (rooms[idx].walls[type][0] === false){
        return {
          flex: '0.0000001 0.0001'
        }
      }
      break;
    case 'south':
      if (rooms[idx].walls[type][0] === true) {
        return {
          flex: '1 1'
        }
      } else if (rooms[idx].walls[type][0] === 'selected') {
        return {
          flex: '30 1'
        }
      } else if (rooms[idx].walls[type][0] === false) {
        return {
          flex: '0.000001 0.0001'
        }
      }
      break;
    default:
      break;
  }
};
  roomClassName(index) {
    if(this.state.rooms[index].size === 'big'){
      if (!this.state.rooms[index].selected){
        return 'room big unselected'
      } else{
        return 'room big selected'
      }
    } else {
      if (!this.state.rooms[index].selected) {
        return 'room small unselected'
      } else {
        return 'room small selected'
      }
    }
  }

  resetGallery() {
    console.log('restting gallery')
    let rooms = this.state.rooms.slice();
    for (var i = 0; i < rooms.length; i++) {
      rooms[i].visible = true; 
      rooms[i].selected = false;

    }
    this.setState({
      rooms: rooms,
      containerHeight: '50%'
    })
  }

  render() {
    // console.log('dropping div is ', droppingDiv);
    
    function startRead(evt) {
      // return document.getElementById('file').files[0];
      var file = document.getElementById("file").files[0];
      if (file) {
        //  getAsText(file);
       return alert("Name: " + file.name + "\n" + "Last Modified Date :" + file.lastModifiedDate);
      }
    }

    function startReadFromDrag(evt) {
      var file = evt.dataTransfer.files[0];
      if (file) {
        //  getAsText(file);
        var fileAttr = "Name: " + file.name + "\n" + "Last Modified Date :" + file.lastModifiedDate;
        document.getElementById("#draghere").text(fileAttr);
        alert(fileAttr);

      }
      evt.stopPropagation();
      evt.preventDefault();
    }

   

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
                  <input type='file' id='file' name='files[]' onChange={event => startRead(event)} multiple/>
            </div>
                  <div id="draghere" >Drop files here</div>
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
            <div className="gallery-top">
              {/* <div id="gallery-goback" onClick={() => this.exit()}>
                back
              </div> */}
              <div id="gallery-descriptor">
                {this.state.current_gallery}
              </div>
            </div>
            <div className="flexcon2">
              <div className="gallery-menu">
              <div className='toHome' onClick={() => this.exit()} >HOME</div>
                <div className='backToGallery' onClick={() => this.resetGallery()} >Back to Gallery</div>
                <div className='contactGallery'>Contact the Gallery</div>
              </div>
              <div className="gallery-main">
              <Rooms 
                 rooms={this.state.rooms} 
                 onClick={(el, idx) => this.selectRoom(el, idx)} 
                 roomStyle={(idx) => this.roomStyle(idx)} 
                 wallStyle={(idx, type) => this.wallStyle(idx, type)} 
                 containerHeight={() => this.containerHeight()} 
                 roomClassName={(idx) => this.roomClassName(idx)}
                 selectWall={(idx, type) => this.selectWall(idx, type)}
              />
              </div>
            </div>
            <div className="gallery-entrance">
                  MAIN ENTRANCE
            </div>          
        </div>}
      </div>
      );
  }
};
function Rooms(props) {

  let rooms = props.rooms.slice().map((i, idx) =>
    i.size === 'big' ? <div 
    // className="room big flexcontainer" 
    className={props.roomClassName.bind(this, idx)()} 
    key={idx} 
    onClick={props.onClick.bind(this, idx)}
    style={props.roomStyle.bind(this, idx)()}
    > 
      {/* <div className="flexrow">
        <div style={{ height: '30px', backgroundColor: 'red', flex: '1 1 80px'}}></div>
      </div>
      <div className="flexrow">
        <div style={{ height: '30px', backgroundColor: 'green', flex: '1 1 80px' }}></div>
      </div> */}
      {/* <div style={{ height: '30px', backgroundColor: 'green', flex: '1 1 80px' }}></div> */}
      <div className={'north-wall'} style={props.wallStyle.bind(this, idx, 'north')()} onClick={props.selectWall.bind(this, idx, 'north')}>{props.rooms[idx].walls['north'][1]}
        <div className='picture'></div> <div className='picture'></div> <div className='picture'></div>
      </div>  
      <div className={'main-room'} style={props.wallStyle.bind(this, idx, 'main')()} onClick={props.selectWall.bind(this, idx, 'main')}></div>
      <div className={'south-wall'} style={props.wallStyle.bind(this, idx, 'south')()} onClick={props.selectWall.bind(this, idx, 'south')}>{props.rooms[idx].walls['south'][1]}</div>
    </div> : <div 
    // className="room small" 
    className={props.roomClassName.bind(this, idx)()}
    key={idx} 
    onClick={props.onClick.bind(this, idx)}
    style={props.roomStyle.bind(this, idx)()}
    >
        <div className={'north-wall'} style={props.wallStyle.bind(this, idx, 'north')()} onClick={props.selectWall.bind(this, idx, 'north')}>{props.rooms[idx].walls['north'][1]}</div>
        <div className={'main-room'} style={props.wallStyle.bind(this, idx, 'main')()} onClick={props.selectWall.bind(this, idx, 'main')}></div>
        <div className={'south-wall'} style={props.wallStyle.bind(this, idx, 'south')()} onClick={props.selectWall.bind(this, idx, 'south')}>{props.rooms[idx].walls['south'][1]}</div>
    </div>
  )
  return (
    <div className="flexrow flexcontainer" style={props.containerHeight()}>
        {rooms}
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
