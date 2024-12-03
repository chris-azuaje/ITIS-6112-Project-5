import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardMedia,
  CardHeader,
  Button
} from "@mui/material";
import "./Favorite.css";
import axios from "axios";

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalEnabled: false,
    };
  }

  handleDeleteFavorite = (event) => {
    event.preventDefault();
    axios
      .get(`/deleteFavorite/${this.props.photo._id}`)
      .then(() => {
        this.props.refreshCards();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  handleClose = () => {
    this.setState({ modalEnabled: false });
  };

  handleOpen = () => {
    this.setState({ modalEnabled: true });
  };

  render() {
    return (
      <div>
        <Card id="card-fav" style={{ backgroundColor: "#F0F8FF" }}>
          <CardHeader
            id="card-fav-header"
            action={
              (
							<Button variant="contained" size="small" onClick={(event) => this.handleDeleteFavorite(event)}>
								Remove from favorites
							</Button>
							)
            }
          />
          <CardMedia
            component="img"
            className="cardMedia"
            image={`/images/${this.props.photo.file_name}`}
            onClick={this.handleOpen}
          />
        </Card>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.modalEnabled}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {this.props.photo.date_time}
          </DialogTitle>
          <DialogContent>
            <img
              className="modal-image"
              src={`/images/${this.props.photo.file_name}`}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default Favorite;