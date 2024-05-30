import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import RestrictionEnfant from './RestrictionEnfant/RestrictionEnfant';
import './SettingPage.scss';
import actionGetMembers from '../../store/thunks/checkProfile';

function SettingPage() {
  const dispatch = useDispatch();
  const accountId = useAppSelector((state) => state.user.id);
  const members = useAppSelector((state) => state.profile.members);
  // const childMembers = useAppSelector((state) => state.profile.members)

  useEffect(() => {
    if (accountId) {
      dispatch(actionGetMembers({ id: accountId }));
    }
    console.log(members);
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
      {/* <RestrictionEnfant key={member.id} member={member} /> */}
    </div>
  );
}

export default SettingPage;
