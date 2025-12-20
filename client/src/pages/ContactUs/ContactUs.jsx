import React from "react";
import "./ContactUs.css";
import { FaGithub } from "react-icons/fa";


const ContactUs = () => {
  return (
    <div className="contact-container">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you</p>
      </section>

      <section className="contact-info">
        <p>
          Have questions, feedback, or suggestions?  
          Reach out to us and we’ll get back to you as soon as possible.
        </p>
      </section>

      {/* <section className="contact-form-section">
        <form className="contact-form">
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </section> */}

      <section className="contact-footer">
        <p>
          📧 Email: <strong>pandeyanupam180@gmail.com</strong>
        </p>
        <p>
          🌐 Learn Without Limits — EduStack
        </p>
      </section>
    </div>
  );
};

export default ContactUs;
