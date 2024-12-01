import React from "react";
import { Typography, Grid, Divider } from "@mui/material";
import Favorite from "./favorite";
import axios from "axios";

/**
 * Define Favorites
 */
class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [], //should be array of objects, each with _id, date_time and file_name
    };
    console.log("favorites");
    this.refreshCards = this.refreshCards.bind(this);
    this.refreshCards();
  }

  refreshCards = () => {
    //get favorites
    axios
      .get(`/getFavorites`)
      .then((response) => {
        this.setState({ favorites: response.data });
        console.log("{ favorites: response.data }:", {
          favorites: response.data,
        });
        console.log("getFavorites succeeded");
      })
      .catch(() => this.setState({ favorites: [] }));
  };

  render() {
    return (
      <Grid container justify="space-evenly" alignItems="flex-start">
        <Grid item xs={12}>
          <Typography variant="h2" sx={{ fontSize: "40px" }}>
            Your favorite photos
          </Typography>
          <br />
        </Grid>
        <div className="favoritesPhotoContainer">
          {this.state.favorites.length === 0 ? (
            <p>No favorites found</p>
          ) : (
            <>
              {this.state.favorites.map((photo) => (
                <Favorite
                  refreshCards={this.refreshCards}
                  photo={photo}
                  key={photo._id}
                />
              ))}
            </>
          )}
        </div>
      </Grid>
    );
  }
}

export default Favorites;
