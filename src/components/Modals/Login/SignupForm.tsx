import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

interface SignupFormProps {
  email: string;
  password: string;
  passwordConfirm: string;
  street: string;
  postalCode: number;
  country: string;
  changeField: (name: 'emailSignin' | 'passwordSignin', value: string) => void;
}
function SignupForm({
  email,
  password,
  passwordConfirm,
  street,
  postalCode,
  country,
  changeField,
}: SignupFormProps) {
  const dispatch = useAppDispatch();

  const errorMessages = useAppSelector((state) => state.user.error);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultAction = await dispatch(actionCheckLogin());
    if (actionCheckLogin.fulfilled.match(resultAction))
      dispatch(actionSwitchLoginModal());
  };
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
        <label htmlFor="username">Nom d&apos;utilisateur</label>
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
        <label htmlFor="furtherInfos">Complément d&apos;adresse</label>
      </div>
      <button type="submit">S&apos;inscrire</button>
    </form>
  );
}

export default SignupForm;
