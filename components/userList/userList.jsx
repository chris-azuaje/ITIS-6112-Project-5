import React, { useEffect, useState } from 'react';
import {
  ListItemAvatar,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button
  // Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import './userList.css';
import axios from 'axios';
import Sidebar from './sidebar';

/**
 * Define UserList, a React component of project #5
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState("");
  const [mustLogin, setMustLogin] = useState(false);

  useEffect(() => {
    axios.get(`/user/list`).then(
      (data) => {
        setUsers(data.data);
      },
      (err) => {
        console.log(`Status Code UL: ${err.response.status}`);
        setMustLogin(true);
      }
    );
  }, []);

  const handleToggleSidebar = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };

  return mustLogin ? (
    <Typography variant="h5">Please Login to View Users</Typography>
  ) : users.length === 0 ? (
    <p>Loading Users</p>
  ) : (
    <div>
      <List component="nav">
        {users.map((user) => (
          <div key={user._id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={`${user.first_name}`} src="#" />
              </ListItemAvatar>
              <ListItemText
                primary={(
                  <Link to={`/users/${user._id}`}>
                    {user.first_name} {user.last_name}
                  </Link>
                )}
                className="listItemText"
              />
              <Button onClick={() => handleToggleSidebar(user._id)}>
                {expandedUser === user._id ? (
                  <p>▲</p>
                ) : (
                  <p>▼</p>
                )}
              </Button>
            </ListItem>

            {expandedUser === user._id && <Sidebar user={user} />}

            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default UserList;
