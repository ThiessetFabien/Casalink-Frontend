import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionSwitchProfileModal } from '../../../store/reducer/modal';
import { MemberStateI } from '../../../@types/memberStateI';
import { actionAddProfile } from '../../../store/thunks/changeProfile';
import actionGetMembers from '../../../store/thunks/checkProfile';
import './addProfile.scss';

interface AddProfileModalProps {
  onClose: () => void;
}

function AddProfileModal({ onClose }: AddProfileModalProps) {
  const dispatch = useAppDispatch();
  const errorMessages = useAppSelector((state) => state.user.error);

  const accountId = useAppSelector((state) => state.user.id);

  // Add state for new profile data
  const [newProfile, setNewProfile] = useState<
    Omit<MemberStateI, 'id' | 'created_at' | 'updated_at' | 'score' | 'task'>
  >({
    name: '',
    birthdate: '',
    image: '',
    role: 'child', // Default role is child
    email: '',
    pin: '',
    tasks: [],
  });

  // State to check if the role is adult
  const [isAdultChecked, setIsAdultChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Si le champ de date est modifié, on le formate correctement
    if (name === 'birthdate') {
      // Transformer la date au format jj/mm/aaaa en jj-mm-aaaa
      const formattedDate = value.replace(/\//g, '-');
      setNewProfile((prevProfile) => ({
        ...prevProfile,
        [name]: formattedDate,
      }));
    } else {
      setNewProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
    if (name === 'role') {
      setIsAdultChecked(value === 'adult');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultAction = await dispatch(actionAddProfile(newProfile));
    if (actionAddProfile.fulfilled.match(resultAction)) {
      dispatch(actionSwitchProfileModal());
      dispatch(actionGetMembers({ id: accountId }));
      onClose();
    }
  };

  return (
    <div className="add_background">
      <div className="add_modal">
        <form onSubmit={handleSubmit}>
          <h1 className="add_modal_title">Ajouter un nouveau profil</h1>
          <div className="profile_field">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              className="input_required"
              id="name"
              name="name"
              value={newProfile.name}
              onChange={handleChange}
              required
              placeholder="Nom du profil"
            />
          </div>
          <div className="profile_field">
            <label htmlFor="birthdate">Date de naissance</label>
            <input
              className="input_required"
              type="date"
              name="birthdate"
              id="birthdate"
              value={newProfile.birthdate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="profile_field">
            <label htmlFor="role">Type de profil</label>
            <div className="profile_field_role">
              <input
                type="radio"
                name="role"
                id="Adulte"
                value="adult"
                onChange={handleChange}
                checked={newProfile.role === 'adult'}
                className="input_checkbox_adult"
              />
              <span className="input_checkbox_adult_title">Adulte</span>
              <input
                type="radio"
                name="role"
                id="Enfant"
                value="child"
                onChange={handleChange}
                checked={newProfile.role === 'child'}
                className="input_checkbox_child"
              />
              <span className="input_checkbox_child_title">Enfant</span>
            </div>
          </div>
          {isAdultChecked && (
            <>
              <div className="profile_field">
                <label htmlFor="email">Email</label>
                <input
                  className="input_email"
                  type="email"
                  name="email"
                  id="email"
                  value={newProfile.email}
                  onChange={handleChange}
                  placeholder="martin.l@gmail.com"
                />
              </div>
              <div className="profile_field">
                <label htmlFor="pin">Code Pin</label>
                <input
                  className="input_pin"
                  type="password"
                  name="pin"
                  value={newProfile.pin}
                  onChange={handleChange}
                  placeholder="0000"
                  required
                />
              </div>
            </>
          )}
          <span className="errorMessage">{errorMessages}</span>
          <button type="submit">Ajouter le profil</button>
          <button type="button" onClick={() => onClose()}>
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProfileModal;
