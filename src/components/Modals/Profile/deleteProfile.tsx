import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionSwitchProfileModal } from '../../../store/reducer/modal';
import { MemberStateI } from '../../../@types/memberStateI';
import { actionDeleteProfile } from '../../../store/thunks/changeProfile';

interface DeleteProfileModalProps {
  profile: MemberStateI;
  closeModal: () => void;
}

function DeleteProfileModal({ profile, closeModal }: DeleteProfileModalProps) {
  const dispatch = useAppDispatch();
  const errorMessages = useAppSelector((state) => state.user.error);

  const handleDelete = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultAction = await dispatch(actionDeleteProfile(profile.id));
    if (actionDeleteProfile.fulfilled.match(resultAction)) {
      dispatch(actionSwitchProfileModal());
    }
  };

  return (
    <div className="profile_background">
      <div className="delete_modal">
        <form onSubmit={handleDelete}>
          <h1 className="delete_modal_title">
            Supprimer le profil de {profile.name}
          </h1>
          <p className='delete_modal_subtitle'>Êtes-vous sûr de vouloir supprimer ce profil ?</p>
          <span className="errorMessage">{errorMessages}</span>
          <div className="delete_modal_profile_containerButton">
            <button type="submit">Supprimer le profil</button>
            <button type="button" onClick={() => closeModal()}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteProfileModal;
