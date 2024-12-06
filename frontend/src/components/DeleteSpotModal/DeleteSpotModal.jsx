import React from 'react'
import "./DeleteSpotModal.css"
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';

function DeleteSpotModal({ spot }) {

  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteSpot(spot.id)); // Deletes the spot
    closeModal(); // Close the modal after deletion
  };

  const handleCancel = async () => {
    closeModal();
  }

  return (
    <div className='modal-container'>
      <h1>Confirm Delete</h1>
      
      <div className='h4-container'>
        <h4>Are you sure you want to remove this spot from the listings?</h4>
      </div>

      
      <div className="action-buttons">
        <button onClick={handleDelete} className='yes'>Yes (Delete Spot)</button>
        <button onClick={handleCancel} className='no'>No (Keep Spot)</button>
      </div>
    </div>
  )
}

export default DeleteSpotModal;
