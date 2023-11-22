import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './MapComponent.scss';

const MapComponent = ({ onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
        <IconButton className="close-button" onClick={onClose}>
          <CloseIcon />
        </IconButton>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d844.8274362686301!2d-75.48518543492274!3d5.032026352968189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNcKwMDEnNTUuMyJOIDc1wrAyOScwNi4zIlc!5e1!3m2!1ses!2sco!4v1700667014515!5m2!1ses!2sco"
            width="600"
            height="450"
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    );
  };
  
export default MapComponent;
