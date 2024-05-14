function SignupForm() {
  return (
    <form>
      <h1>Inscription</h1>
      <div className="login_field">
        <input
          className="input_required"
          type="text"
          name="username"
          id="username"
          required
        />
        <label htmlFor="username">Nom d'utilisateur</label>
      </div>
      <div className="login_field">
        <input
          className="input_required"
          type="password"
          name="password"
          id="password"
          required
        />
        <label htmlFor="password">Mot de passe</label>
      </div>
      <div className="login_field">
        <input
          className="input_required"
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          required
        />
        <label htmlFor="passwordConfirm">Confirmation</label>
      </div>
      <div className="login_field">
        <input
          className="input_required"
          type="email"
          name="email"
          id="email"
          required
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="login_field">
        <input
          className="input_required"
          type="street"
          name="street"
          id="street"
          required
        />
        <label htmlFor="street">Rue</label>
      </div>
      <div className="login_field">
        <input
          className="input_required"
          type="number"
          name="postalCode"
          id="postalCode"
          required
        />
        <label htmlFor="postalCode">Code postal</label>
      </div>
      <div className="login_field">
        <input
          className="input_required"
          type="country"
          name="country"
          id="country"
          required
        />
        <label htmlFor="country">Pays</label>
      </div>
      <div className="login_field">
        <input type="furtherInfos" name="furtherInfos" id="furtherInfos" />
        <label htmlFor="furtherInfos">Complément d'adresse</label>
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default SignupForm;
