import React from 'react';
import {
  ListItemAvatar,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import {Link} from 'react-router-dom';

// import ImageIcon from '@mui/icons-material/Image';

import './userList.css';

const users = window.models.userListModel();

/**
 * Define UserList, a React component of project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Typography variant='body1'>
          This is the user list, which takes up 3/12 of the window. You might
          choose to use <a href='https://mui.com/components/lists/'>Lists</a>{' '}
          and <a href='https://mui.com/components/dividers/'>Dividers</a> to
          display your users like so:
        </Typography>
        <List component='nav'>
          {users.map((user) => (
            <div key={user._id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    alt={`${user.first_name}`}
                    src='#'
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={<Link to={`/user/${user._id}`}>{user.first_name} {user.last_name}</Link>}
                  key={user._id}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        <Typography variant='body1'>
          The model comes in from window.models.userListModel()
        </Typography>
      </div>
    );
  }
}

export default UserList;
