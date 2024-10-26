import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch, Redirect
} from 'react-router-dom';
import {
  Grid, Paper
} from '@mui/material';
import './styles/main.css';

//import axios from 'axios';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';
import LoginRegister from './components/loginRegister/loginRegister';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);

	this.state = {
		//currentUserId: -1,
		isLoggedIn: false,
		active_user : {
			_id: 0, 
			first_name: '', 
			last_name: '',
		},
	};

	this.setCurrentUser = (u, l) => {
		this.setState({active_user: u, isLoggedIn: l});
	};
  }


  render() {
	console.log(`PhotoShare.jsx: ${this.state.active_user._id} ${this.state.isLoggedIn}`);
    return (
      <HashRouter>
      <div>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <TopBar ActiveUser={this.state.active_user} SetUser={this.setCurrentUser}/>
        </Grid>
        <div className="main-topbar-buffer"/>
        <Grid item sm={3}>
          <Paper className="main-grid-item">
            <UserList key={Math.random()}/>
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper className="main-grid-item">
            <Switch>
            	{
					this.state.isLoggedIn ?
					<Route exact path="/" render={ () => <div>what</div> } />
					:
					<Redirect exact path="/" to="/login-register"/>
				}
				{
					this.state.isLoggedIn ?
					(
						<Route path="/users/:userId"
							render={ props => <UserDetail {...props} key={Math.random()}/>} />
					)
					:
					<Redirect path="/users/:userId" to="/login-register"/>
				}

				{
					this.state.isLoggedIn ?
					(
					<Route path="/photos/:userId"
						render ={ props => <UserPhotos {...props} /> } />
					)
					:
					<Redirect path="/photos/:userId" to="/login-register"/>
				}

				{
					this.state.isLoggedIn ?
					<Route path="/users" component={UserList}  />
					:
					<Redirect path="/users" to="/login-register"/>
				}

				{
					!this.state.isLoggedIn ?
					(
					<Route path="/login-register" 
						render={ props => <LoginRegister {...props} SetUser={this.setCurrentUser}/> } 
					/>
					)
					:
					<Redirect redirect="/login-register" to={`/users/${this.state.active_user._id}`}/>
				}
            </Switch>
          </Paper>
        </Grid>
      </Grid>
      </div>
      </HashRouter>
    );
  }
}


ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);
