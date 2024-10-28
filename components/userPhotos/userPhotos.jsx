import React, { useState, useEffect } from 'react';
import { Typography, Button, Checkbox } from '@mui/material';
import { Link, useParams, useHistory } from 'react-router-dom';
// import FetchModel from '../../lib/fetchModelData';
import './userPhotos.css'; // Change this if you create a specific CSS for user photos
import axios from 'axios';

function UserPhotos() {
  const { userId, photoIndex } = useParams();
  const [photos, setPhotos] = useState([]);
  const [, setAdvancedFeaturesEnabled] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/photosOfUser/${userId}`)
      .then((response) => {
        const userPhotos = response.data;
        setPhotos(userPhotos);

        if (photoIndex) {
          setAdvancedFeaturesEnabled(true);
          setCurrentPhotoIndex(parseInt(photoIndex, 10));
        }
      })
      .catch((error) => {
        console.error('Error fetching user photos:', error);
      });
  }, [userId, photoIndex]);

  // Show advanced features
  const handleCheckboxChange = () => {
    setShowAdvancedFeatures(!showAdvancedFeatures);
  };

  // Go back to user details
  const handleGoBack = () => {
    history.push(`/users/${userId}`);
  };

  // Advanced features next photo
  const handleNextPhoto = () => {
    if (currentPhotoIndex < photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  // Advanced features previous photo
  const handlePreviousPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  // If user has no photos, "loading" otherwise display photos and comments
  return photos.length === 0 ? (
    <p>Loading...</p>
  ) : (
    // Photos header section
    <div className='user-photos-container'>
      <div className='user-photos-header'>
        <Typography variant='h2' sx={{ fontSize: '40px' }}>
          Photos
        </Typography>
        <Button variant='contained' color='primary' onClick={handleGoBack}>
          Go back to user details
        </Button>
      </div>
      {/* Advanced features check box and buttons */}
      <Checkbox
        checked={showAdvancedFeatures}
        onChange={handleCheckboxChange}
        inputProps={{ 'aria-label': 'Show advanced features' }}
      />
      Show Advanced Features
      {showAdvancedFeatures && (
        <div className='photo-navigation'>
          <Button
            variant='outlined'
            color='primary'
            onClick={handlePreviousPhoto}
          >
            Previous
          </Button>
          <Button variant='outlined' color='primary' onClick={handleNextPhoto}>
            Next
          </Button>
        </div>
      )}
      {/* Advanced features checked layout */}
      {showAdvancedFeatures ? (
        <div className='photo'>
          <img
            src={`/images/${photos[currentPhotoIndex].file_name}`}
            alt={photos[currentPhotoIndex].file_name}
          />
          <p>Creation Date/Time: {photos[currentPhotoIndex].date_time}</p>

          {/* Comments in advanced view */}
          <Typography variant='h3' sx={{ fontSize: '38px' }}>
            Comments
          </Typography>
          {photos[currentPhotoIndex].comments &&
          photos[currentPhotoIndex].comments.length > 0 ? (
            <ul className='comments'>
              {photos[currentPhotoIndex].comments.map((comment) => (
                <li key={comment._id} className='comment'>
                  <p>Comment Date/Time: {comment.date_time}</p>
                  <p>
                    Comment by:{'  '}
                    <Link to={`/users/${comment.user._id}`}>
                      {`${comment.user.first_name} ${comment.user.last_name}`}
                    </Link>
                  </p>
                  <p>Comment: {comment.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant='body2'>No comments for this photo</Typography>
          )}
        </div>
      ) : (
        // Advanced features non-checked layout
        photos.map((photo, index) => (
          <div
            key={photo._id}
            className={`photo ${
              index === currentPhotoIndex ? 'visible' : 'hidden'
            }`}
          >
            <img src={`/images/${photo.file_name}`} alt={photo.file_name} />
            <p>
              <strong>Creation Date/Time: </strong>
              {photo.date_time}
            </p>

            {/* Comments in non-advanced view */}
            <Typography variant='h3' className='user-photos-comment-header'>
              Comments
            </Typography>
            {photo.comments && photo.comments.length > 0 ? (
              <ul className='comments'>
                {photo.comments.map((comment) => (
                  <li key={comment._id} className='comment'>
                    <p>
                      <strong>Comment Date/Time: </strong>
                      {comment.date_time}
                    </p>
                    <p>
                      <strong>Comment by: </strong>{' '}
                      <Link to={`/users/${comment.user._id}`}>
                        {`${comment.user.first_name} ${comment.user.last_name}`}
                      </Link>
                    </p>
                    <p>
                      <strong>Comment: </strong>
                      {comment.comment}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant='body2'>
                No comments for this photo
              </Typography>
            )}
          </div>
        ))
      )}
      {/* <div className='add-photos'>
        <Button variant='contained' color='primary'>
          Add Photo
        </Button>
        <input
          type='file'
          accept='image/*'
          ref={(domFileRef) => {
            this.uploadInput = domFileRef;
          }
          }
        />
      </div> */}
    </div>
  );
}

export default UserPhotos;
