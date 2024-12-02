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
        axios.get('/activityList').then((result)=>{
            this.setState({
                activityList: result.data
            });

            console.log(this.state.activityList);
        }).catch(err=>{console.log(err);});
    }
    render() {

    return this.state.activityList ? 
    (
      <div>
        {this.state.activityList.map((activity) => {
          if (activity.description.includes("added photo")) {
            const match = activity.description.match(/added photo (.+)/);
            
            if (match && match[1]) {
              const photoFileName = match[1];

              return (
                <ul key={activity.description}>
                  <li>
                    {activity.description}
                    <br />
                    <img
                      src={`/images/${photoFileName}`}
                      alt={photoFileName}
                      className='img-thumbnail'
                    />
                  </li>
                </ul>
              );
            }
          }

          return (
            <ul key={activity.description}>
              <li>{activity.description}</li>
            </ul>
          );
        })}
      </div>
     ) : ( <div>Nothing to render</div>);
    }
}

export default Sidebar;
