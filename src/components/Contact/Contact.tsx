import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionSendContactForm } from '../../store/thunks/contactForm';
import './Contact.scss';

function Contact() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const dispatch = useDispatch();

  const sendEmail = async (event) => {
    event.preventDefault();
    try {
      const resultAction = await dispatch(
        actionSendContactForm({ email, subject, message })
      );
      if (actionSendContactForm.fulfilled.match(resultAction)) {
        setStatusMessage(resultAction.payload);
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatusMessage(resultAction.payload);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setStatusMessage('Une erreur est survenue, veuillez réessayer.');
    }
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
          {statusMessage && <p className="status_message">{statusMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Contact;
