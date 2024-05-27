import { FormEvent, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionSwitchProfileModal } from '../../../store/reducer/modal';
import { MemberStateI } from '../../../@types/memberStateI';

interface EditProfileModalProps {
  profile: MemberStateI;
}

function EditProfileModal({ profile }: EditProfileModalProps) {
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
    if (name === 'Adulte') {
      setIsAdultChecked(checked);
    }
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Modifier le profil de {updatedProfile.name}</h1>
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
          value={format(updatedProfile.birthdate, 'dd/MM/yyyy', { locale: fr })}
          onChange={handleChange}
          className="input_required"
          type="date"
          name="birthdate"
          id="birthdate"
          required
        />
      </div>
      <div className="profile_field">
        <label htmlFor="role">Type de profil</label>
        <input
          type="checkbox"
          name="Adulte"
          id="Adulte"
          value="adult"
          onChange={handleChange}
          className="input_checkbox_adult"
        />
        Adulte
        <input
          type="checkbox"
          name="Enfant"
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
            />
          </div>
        </>
      )}

      <span className="errorMessage">{errorMessages}</span>
      <button type="submit">Enregistrer les modifications</button>
    </form>
  );
}

export default EditProfileModal;
