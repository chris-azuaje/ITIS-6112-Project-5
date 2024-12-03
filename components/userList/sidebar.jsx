import React from 'react';
import axios from 'axios';
import './Sidebar.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activityList: '',
          };   
    }
    
    componentDidMount() {
        this.fetchActivityList();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.reloadSidebar !== this.props.reloadSidebar) {
            this.fetchActivityList();
        }
    }

    fetchActivityList() {
        axios.get('/activityList')
            .then((result) => {
                this.setState({
                    activityList: result.data,
                });

                console.log(this.state.activityList);
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    render() {
      const {user} = this.props;
      const activityList = Array.isArray(this.state.activityList)
      ? this.state.activityList.reduce((acc, activity) => {
          const { user_id, description } = activity;

          if (acc[user_id]) {
            acc[user_id].push(description);
          } else {
            acc[user_id] = [description];
          }

          return acc;
        }, {})
      : {};

      const userActivities = activityList[user._id] || [];

      return userActivities.length > 0 ? (
        <div>
          {userActivities.map((description, index) => {
            if (description.includes('added photo')) {
              const match = description.match(/added photo (.+)/);
  
              if (match && match[1]) {
                const photoFileName = match[1];
  
                return (
                  <ul key={index}>
                    <li>
                      {description}
                      <br />
                      <img
                        src={`/images/${photoFileName}`}
                        alt={photoFileName}
                        className="img-thumbnail"
                      />
                    </li>
                  </ul>
                );
              }
            }
  
            return (
              <ul key={index}>
                <li>{description}</li>
              </ul>
            );
          })}
        </div>
      ) : (
        <div>Nothing to render</div>
      );
    }
  }
  
export default Sidebar;
