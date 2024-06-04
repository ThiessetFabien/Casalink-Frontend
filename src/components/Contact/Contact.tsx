import React, { useState } from 'react';
import './Contact.scss';
import axios from 'axios';

function Contact() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const serviceId = import.meta.env.VITE_APP_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_email: email,
        subject,
        message,
      },
    };

    axios
      .post('https://api.emailjs.com/api/v1.0/email/send', data)
      .then((res) => {
        console.log(res.data);
        setEmail('');
        setSubject('');
        setMessage('');
        setStatusMessage('Votre message a bien été envoyé.');
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setStatusMessage('Une erreur est survenue, veuillez réessayer.');
      });
  };

  return (
    <div>
      <div className="contact">
        <h1>Contact</h1>
        <div className="contact_presentation">
          <h2 className="contact_presentation_title">
            Des questions sans réponses ? Nous sommes là pour y répondre.
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
          {statusMessage && <p className="status_message">{statusMessage}</p>}
          <form onSubmit={sendEmail}>
            <h1>Nous contacter</h1>

            <div className="contact_modal_field">
              <input
                className="input_required"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="contact_modal_field">
              <input
                className="input_required"
                type="text"
                name="subject"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <label htmlFor="subject">Objet</label>
            </div>
            <div className="contact_modal_field">
              <textarea
                className="input_required"
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
