import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Admin from './Admin';
import Error404 from './Error404';
import { Switch, Route } from 'react-router-dom';
import Moment from 'moment';
import { connect } from 'react-redux';

class App extends React.Component {

  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      masterTicketList: {},
      selectedTicket: null
    };
    // this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  componentWillUnmount(){
    console.log('componentWillUnmount');
    clearInterval(this.waitTimeUpdateTimer);
  }

  // componentWillMount() {
  //   console.log('componentWillMount');
  // }
  //
  // componentWillReceiveProps() {
  //   console.log('componentWillReceiveProps');
  // }
  //
  // shouldComponentUpdate() {
  //   console.log('shouldComponentUpdate');
  //   return true;
  // }
  //
  // componentWillUpdate() {
  //   console.log('componentWillUpdate');
  // }
  //
  // componentDidUpdate() {
  //   console.log('componentDidUpdate');
  // }

  updateTicketElapsedWaitTime() {
    let newMasterTicketList = Object.assign({}, this.state.masterTicketList);
    Object.keys(newMasterTicketList).forEach(ticketId => {
      newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
    });
    this.setState({masterTicketList: newMasterTicketList});
  }

  // Refactor using redux, no longer need:
  // handleAddingNewTicketToList(newTicket){
  //   let newTicketId = v4();
  //   let newMasterTicketList = Object.assign({}, this.state.masterTicketList, {
  //     [newTicket.id]: newTicket
  //   });
  //   newMasterTicketList[newTicket.id].formattedWaitTime = newMasterTicketList[newTicket.id].timeOpen.fromNow(true);
  //   this.setState({masterTicketList: newMasterTicketList});
  // }

  handleChangingSelectedTicket(ticketId){
    this.setState({selectedTicket: ticketId});
  }

  render(){
    console.log(this.state.masterTicketList);
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=><TicketList ticketList={this.state.masterTicketList} />} />
          <Route path='/newticket' render={()=><NewTicketControl />} />
          <Route path='/admin' render={(props)=><Admin ticketList={this.state.masterTicketList} currentRouterPath={props.location.pathname}
            onTicketSelection={this.handleChangingSelectedTicket}
            selectedTicket={this.state.selectedTicket}/>} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    masterTicketList: state
  }
}

export default connect(mapStateToProps)(App);
