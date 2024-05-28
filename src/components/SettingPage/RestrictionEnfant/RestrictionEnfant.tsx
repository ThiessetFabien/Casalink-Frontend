import { MemberStateI } from '../../../@types/memberStateI';

interface RestrictionPropsI {
  member: MemberStateI;
}

function RestrictionEnfant({ member }: RestrictionPropsI) {
  return (
    <div className="settingPage_restrictionDiv">
      <h2 className="settingPage_title">Restriction {member.name}</h2>
      <div className="settingPage_inputDiv">
        <label htmlFor="setting-modifTache" className="settingPage_label">
          Modifier une tâche
        </label>
        <input
          type="checkbox"
          id="setting-modifTache"
          className="settingPageDiv_checkbox"
        />
      </div>
      <div className="settingPage_inputDiv">
        <label htmlFor="setting-supTache" className="settingPage_label">
          Supprimer une tâche
        </label>
        <input
          type="checkbox"
          id="setting-supTache"
          className="settingPageDiv_checkbox"
        />
      </div>
    </div>
  );
}

export default RestrictionEnfant;
