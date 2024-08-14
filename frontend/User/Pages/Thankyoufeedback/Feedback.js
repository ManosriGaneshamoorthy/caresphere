import React, { useState } from 'react';
import './Feedback.css';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../Assets/image.png';
const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleRatingChange = (rate) => {
    setRating(rate);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleContactInfoChange = (event) => {
    setContactInfo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can send feedback to a server or database
    console.log(`Rating: ${rating}, Feedback: ${feedback}, Contact Info: ${contactInfo}`);
    
    // Show confirmation modal
    setShowModal(true);

    // Reset form
    setRating(0);
    setFeedback('');
    setContactInfo('');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <nav style={{
  backgroundColor: 'black',
  padding: '0.5rem 1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
}}>
  <div style={{
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff',
    display: 'flex',
    alignItems: 'center'
  }}>
    <img src={logo} alt="Logo" style={{
      width: '30px',
      height: '30px',
      marginRight: '8px'
    }} />
    <span>CARESPHERE</span>
  </div>
  <ul style={{
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    borderBottom: 'none',
    border: 'none',
    textDecoration: 'none'
  }}>
    <li style={{ marginRight: '20px' }}><Link to="/" style={{
      color: '#fff',
      textDecoration: 'none',
      fontSize: '16px',
      transition: 'color 0.2s ease',
      borderBottom: 'none'
    }}>Home</Link></li>
    <li style={{ marginRight: '20px' }}><Link to="/doctors" style={{
      color: '#fff',
      textDecoration: 'none',
      fontSize: '16px',
      transition: 'color 0.2s ease',
      borderBottom: 'none'
    }}>Doctors</Link></li>
    <li style={{ marginRight: '20px' }}><Link to="/appointments" style={{
      color: '#fff',
      textDecoration: 'none',
      fontSize: '16px',
      transition: 'color 0.2s ease',
      borderBottom: 'none'
    }}>Appointments</Link></li>
    <li style={{ marginRight: '20px' }}><Link to="/about" style={{
      color: '#fff',
      textDecoration: 'none',
      fontSize: '16px',
      transition: 'color 0.2s ease',
      borderBottom: 'none'
    }}>About</Link></li>
    <li><Link to="/emergency" style={{
      backgroundColor: '#ff0000',
      color: '#fff',
      padding: '8px 16px',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
      border: 'none'
    }}>Emergency</Link></li>
    <li><Link to="/login" style={{
      color: '#fff',
      textDecoration: 'none',
      fontSize: '16px',
      transition: 'color 0.2s ease',
      borderBottom: 'none'
    }}>Login</Link></li>
  </ul>
</nav>
    <div className="feedback-container">
      <h2>We Value Your Feedback</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="feedback-section">
          <h3>Rate Your Experience</h3>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => handleRatingChange(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    size={30}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>
        </div>

        <div className="feedback-section">
          <h3>Tell Us About Your Experience</h3>
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Share your thoughts about our website..."
          />
        </div>

        <div className="feedback-section">
          <h3>Contact Information (Optional)</h3>
          <input
            type="text"
            value={contactInfo}
            onChange={handleContactInfoChange}
            placeholder="Your email or phone number"
          />
        </div>

        <button type="submit">Submit Feedback</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Thank You for Your Feedback!</h3>
            <p>Your feedback has been submitted successfully.</p>
            <Link to ="/">
            <button onClick={closeModal} className="close-modal-btn">Close</button>
            </Link>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Feedback;