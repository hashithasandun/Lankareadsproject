import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';
import './AuthorRequest.css';
import { API_BASE_URL } from '../../apiConfig';

const AuthorRequestPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    booksWritten: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/author-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          booksWritten: Number(formData.booksWritten)
        })
      });

      const contentType = response.headers.get('content-type') || '';
      let data = {};

      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = text ? { message: text } : {};
      }

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        contactNumber: '',
        email: '',
        booksWritten: '',
        message: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header />
      <section className="author-request-page">
        <div className="author-request-container">
          {!submitted ? (
            <div className="author-request-card">
              <div className="author-request-header">
                <span className="author-request-badge">Author Application</span>
                <h2>Become an Author</h2>
                <p>Please fill in the details below so we can review your author request.</p>
              </div>
              <form onSubmit={handleSubmit} className="author-request-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="contactNumber">Phone Number</label>
                  <input id="contactNumber" type="text" name="contactNumber" placeholder="Enter your phone number" value={formData.contactNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" type="email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="booksWritten">How many books have you written?</label>
                  <input id="booksWritten" type="number" min="0" name="booksWritten" placeholder="Example: 3" value={formData.booksWritten} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Tell us about yourself</label>
                  <textarea id="message" name="message" rows="4" placeholder="Share a short introduction about your writing experience" value={formData.message} onChange={handleChange} />
                </div>
                {error && <p className="author-request-error">{error}</p>}
                <button type="submit" className="submit-btn">Submit Request</button>
              </form>
            </div>
          ) : (
            <div className="author-success-card">
              <h3>Your message went to the admin panel</h3>
              <p>Your request has been received successfully. Once approved, we will contact you as soon as possible.</p>
              <button className="submit-btn" onClick={() => navigate('/')}>Okay</button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AuthorRequestPage;
