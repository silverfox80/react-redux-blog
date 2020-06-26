import React from 'react';
import { connect } from 'react-redux';
//import { fetchUser } from '../actions';


class UserHeader extends React.Component {
  /*
  componentDidMount() {
    this.props.fetchUser(this.props.userId);
  }*/
  
  render() {
    //const user = this.props.users.find((user) => user.id === this.props.userId); //this could be in render but is better to put the logic inside the mapsStateToProps
    const { user } = this.props;
    if(!user) {
      return <div>Loading...</div>;
    }
    return <div className="header">{user.name}</div>
  }
}

const mapStateToProps = (state, ownProps) => {  //reference of the own component props
  //console.log(state);  
  return { user: state.users.find((user) => user.id === ownProps.userId) };
}

export default connect(mapStateToProps, {/*fetchUser*/})(UserHeader);