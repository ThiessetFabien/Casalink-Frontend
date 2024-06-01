import { MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import RestrictionEnfant from './RestrictionEnfant/RestrictionEnfant';
import './SettingPage.scss';
import actionGetMembers from '../../store/thunks/checkProfile';
import actionSwitchRestriction from '../../store/thunks/checkChildren';
import actionChangeIsChecked from '../../store/reducer/profile';

function SettingPage() {
  const dispatch = useDispatch();
  const accountId = useAppSelector((state) => state.user.id);
  // console.log('je suis accountId', accountId);
  const members = useAppSelector((state) => state.profile.members);
  // const childMembers = useAppSelector((state) => state.profile.members)

  useEffect(() => {
    if (accountId) {
      dispatch(actionGetMembers({ id: accountId }));
    }
  }, [dispatch, accountId]);

  return (
    <div className="settingPage">
      <div className="settingPage_notifDiv">
        <h2 className="settingPage_title">Notification</h2>
        <label htmlFor="setting-notif" className="settingPage_label">
          Activer les notifications
        </label>
        <input
          type="checkbox"
          id="setting-notif"
          className="settingPageDiv_checkbox"
        />
      </div>
      <div className="settingPage_restrictionDiv">
        <h2>Restrictions</h2>
        <h3 className="settingPage_restrictionDiv_subtitle">
          Cochez les profils qui seront limités en droit
        </h3>
        {members.map((member) => (
          <RestrictionEnfant key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default SettingPage;
