import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      alert('Please fill out all form fields.');
      return;
    }
    
    // Simulate submission
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    // Hide message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-page container">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">Have questions? We would love to hear from you.</p>
      </div>

      <div className="contact-grid">
        {/* Left Column: Info details */}
        <div className="contact-info-panel">
          <h2>Get in Touch</h2>
          <p className="panel-desc">
            For questions about our furniture items, bulk ordering, customized layouts, or delivery tracking, contact us directly.
          </p>

          <div className="contact-details-list">
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <div>
                <h4>Office Location</h4>
                <p>123 Design District, Suite 500, Amsterdam, Benelux</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">📞</span>
              <div>
                <h4>Customer Support</h4>
                <p>+31 (20) 555-0199</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">✉️</span>
              <div>
                <h4>General Queries</h4>
                <p>support@ecom-furniture.com</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">⏰</span>
              <div>
                <h4>Operating Hours</h4>
                <p>Monday - Friday | 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interaction Form */}
        <div className="contact-form-panel">
          <h2>Send a Message</h2>
          
          {submitted && (
            <div className="alert alert-success">
              Thank you for contacting us! Your message has been sent successfully. We will get back to you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="contact-name">Full Name</label>
              <input
                type="text"
                id="contact-name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email Address</label>
              <input
                type="email"
                id="contact-email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                type="text"
                id="contact-subject"
                placeholder="How can we help?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                rows="5"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-submit-message">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
