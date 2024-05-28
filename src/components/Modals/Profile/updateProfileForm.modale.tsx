import { FormEvent, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionSwitchProfileModal } from '../../../store/reducer/modal';
import { MemberStateI } from '../../../@types/memberStateI';
import { actionUpdateProfile } from '../../../store/thunks/changeProfile';

interface EditProfileModalProps {
  profile: MemberStateI;
  closeModal: () => void;
}

function EditProfileModal({ profile, closeModal }: EditProfileModalProps) {
  const dispatch = useAppDispatch();
  const [updatedProfile, setUpdatedProfile] = useState(profile);
  const errorMessages = useAppSelector((state) => state.user.error);
  const [isAdultChecked, setIsAdultChecked] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultAction = await dispatch(actionUpdateProfile(updatedProfile));
    if (actionUpdateProfile.fulfilled.match(resultAction))
      dispatch(actionSwitchProfileModal());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'role') {
      setIsAdultChecked(value === 'adult');
      if (value === 'child') {
        // Reset additional fields when switching to child
        setUpdatedProfile((prevProfile) => ({
          ...prevProfile,
          email: '',
          pin: '',
          [name]: value,
        }));
      } else {
        setUpdatedProfile((prevProfile) => ({
          ...prevProfile,
          [name]: value,
        }));
      }
    } else {
      setUpdatedProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  return (
    <div className="profile_background">
      <div className="update_modal">
        <form onSubmit={handleSubmit}>
          <h1 className='update_modal_title'>Modifier le profil de {updatedProfile.name}</h1>
          <div className="profile_field">
            <label htmlFor="name">Nom</label>
            <input
              value={updatedProfile.name}
              onChange={handleChange}
              className="input_required"
              type="text"
              name="name"
              id="name"
              required
            />
          </div>
          <div className="profile_field">
            <label htmlFor="birthdate">Date de naissance</label>
            <input
              value={updatedProfile.birthdate}
              onChange={handleChange}
              className="input_required"
              type="date"
              name="birthdate"
              id="birthdate"
              placeholder={updatedProfile.birthdate || 'jj/mm/aaaa'}
              required
            />
          </div>
          <div className="profile_field">
            <label htmlFor="role">Type de profil</label>
            <input
              type="radio"
              name="role"
              id="Adulte"
              value="adult"
              onChange={handleChange}
              className="input_checkbox_adult"
            />
            Adulte
            <input
              type="radio"
              name="role"
              id="Enfant"
              value="child"
              onChange={handleChange}
              className="input_checkbox_child"
            />
            Enfant
          </div>
          {isAdultChecked && (
            <>
              <div className="profile_field">
                <label htmlFor="email">Email</label>
                <input
                  value={updatedProfile.email}
                  onChange={handleChange}
                  className="input_email"
                  type="email"
                  name="email"
                  id="email"
                  placeholder={profile.email || 'Entrer votre email'}
                />
              </div>
              <div className="profile_field">
                <label htmlFor="pin">Code Pin</label>
                <input
                  value={updatedProfile.pin}
                  onChange={handleChange}
                  className="input_pin"
                  type="number"
                  name="pin"
                  id="pin"
                  placeholder={profile.pin || 'Entrer votre code pin'}
                  required
                />
              </div>
            </>
          )}

          <span className="errorMessage">{errorMessages}</span>
          <div className="update_modal_profile_containerButton">
            <button type="submit">Enregistrer les modifications</button>
            <button type="button" onClick={() => closeModal()}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
