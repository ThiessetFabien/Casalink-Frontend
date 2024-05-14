import './Contact.scss';

function Contact() {
  return (
    <div className="Contact_background">
      <div className="Contact_modal">
        <form action="">
          <h1>Nous contacter</h1>

          <div className="Contact_field">
            <input
              className="input_required"
              type="email"
              name="email"
              id="email"
              required
            />
            <label htmlFor="username">Email</label>
          </div>
          <div className="Contact_field">
            <input
              className="input_required"
              type="text"
              name="username"
              id="username"
              required
            />
            <label htmlFor="username">Objet</label>
          </div>
          <div className="Contact_field">
            <input
              className="input_required"
              type="text"
              name="message"
              id="message"
              required
            />
            <label htmlFor="message">Message</label>
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
