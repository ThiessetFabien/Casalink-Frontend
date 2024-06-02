import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { MemberStateI } from '../../../@types/memberStateI';
import actionSwitchRestriction from '../../../store/thunks/checkChildren';
import { useAppSelector } from '../../../hooks/redux';
import { actionUpdateRole } from '../../../store/thunks/changeProfile';
import { actionChangeRole } from '../../../store/reducer/profile';
import './RestrictionEnfant.scss';

interface RestrictionPropsI {
  member: MemberStateI;
}

function RestrictionEnfant({ member }: RestrictionPropsI) {
  const dispatch = useDispatch();

  const role = useAppSelector((state) => {
    const foundMember = state.profile.members.find((m) => m.id === member.id);
    return foundMember ? foundMember.role : 'child';
  });

  const isLoading = useAppSelector((state) => {
    return state.profile.isLoading;
  });

  const handleCheckboxChange = () => {
    const newRole = role === 'child' ? 'adult' : 'child';
    dispatch(actionUpdateRole({ memberId: member.id, role: newRole }));
    dispatch(actionChangeRole({ memberId: member.id, role: newRole }));
  };

  return (
    <div className="settingPage_enfantDiv">
      <label
        htmlFor={`setting-modifTache-${member.id}`}
        className="settingPage_enfantDiv_label"
      >
        {member.name}
      </label>
      <input
        type="checkbox"
        id={`setting-modifTache-${member.id}`}
        className="settingPage_enfantDiv_input"
        checked={role === 'child'}
        onChange={handleCheckboxChange}
      />
    </div>
  );
}

export default RestrictionEnfant;
