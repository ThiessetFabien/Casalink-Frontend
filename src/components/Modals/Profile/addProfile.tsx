import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionSwitchProfileModal } from '../../../store/reducer/modal';
import { MemberStateI } from '../../../@types/memberStateI';
import { actionDeleteProfile } from '../../../store/thunks/deleteProfile';

interface AddProfileModalProps {
  onClose: () => void; // Callback function for closing the modal
}

function AddProfileModal({ onClose }: AddProfileModalProps) {
  const dispatch = useAppDispatch();
  const errorMessages = useAppSelector((state) => state.user.error);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add logic here to handle the form submission
    // For example, dispatch an action to add the new profile
    onClose(); // Close the modal after submission
  };

  return (
    <div className="profile_background">
      <div className="add_modal">
        <form onSubmit={handleSubmit}>
          {/* Add form fields for adding a new profile */}
          <h1 className="add_modal_title">Ajouter un nouveau profil</h1>
          {/* Example input field */}
          <input type="text" placeholder="Nom du profil" />
          {/* Example error message */}
          <span className="errorMessage">{errorMessages}</span>
          <button type="submit">Ajouter le profil</button>
          <button type="button" onClick={onClose}>
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProfileModal;
