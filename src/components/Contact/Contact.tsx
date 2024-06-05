import './Contact.scss';

function Contact() {
  return (
    <div>
      <div className="contact">
        <h1>Contact</h1>
        <div className="contact_presentation">
          <h2 className="contact_presentation_title">
            Des questions sans réponses ? Une intérogation particulière ? Nous
            sommes la pour y répondre.
          </h2>
          <p className="contact_presentation_text">
            CasaLink est une application web conçue pour simplifier la gestion
            des emplois du temps, des tâches domestiques et des événements au
            sein d&apos;un foyer. Elle vise à améliorer la coordination et la
            communication entre les membres d&apos;un même foyer en offrant une
            plateforme centralisée pour organiser et partager des informations
            importantes.
          </p>
        </div>
        <div className="contact_modal">
          <form action="">
            <h1>Nous contacter</h1>

            <div className="contact_modal_field">
              <input
                className="input_required"
                type="email"
                name="email"
                id="email"
                required
              />
              <label htmlFor="username">Email</label>
            </div>
            <div className="contact_modal_field">
              <input
                className="input_required"
                type="text"
                name="username"
                id="username"
                required
              />
              <label htmlFor="username">Objet</label>
            </div>
            <div className="contact_modal_field">
              <textarea
                className="input_required"
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
    </div>
  );
}

export default Contact;
