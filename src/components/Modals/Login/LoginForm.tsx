function LoginForm() {
  return (
    <form>
      <h1>Conexion</h1>
      <div className="loginField">
        <input
          className="input_required"
          type="text"
          name="username"
          id="username"
          required
        />
        <label htmlFor="username">Nom d'utilisateur</label>
      </div>
      <div className="loginField">
        <input
          className="input_required"
          type="password"
          name="password"
          id="password"
          required
        />
        <label htmlFor="password">Mot de passe</label>
      </div>
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default LoginForm;
