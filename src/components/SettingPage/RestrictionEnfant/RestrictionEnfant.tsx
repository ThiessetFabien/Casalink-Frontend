function RestrictionEnfant() {
  return (
    <div className="settingPage_restrictionDiv">
      <h2 className="settingPage_title">Restriction enfant x</h2>
      <label htmlFor="setting-modifTache" className="settingPage_label">
        Modifier une tâche
      </label>
      <input
        type="checkbox"
        id="setting-modifTache"
        className="settingPageDiv_checkbox"
      />
      <label htmlFor="setting-supTache" className="settingPage_label">
        Supprimer une tâche
      </label>
      <input
        type="checkbox"
        id="setting-supTache"
        className="settingPageDiv_checkbox"
      />
    </div>
  );
}

export default RestrictionEnfant;
