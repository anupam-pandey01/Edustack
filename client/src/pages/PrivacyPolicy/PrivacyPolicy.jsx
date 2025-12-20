import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <section className="privacy-hero">
        <h1>Privacy Policy</h1>
        <p>Last updated: June 2025</p>
      </section>

      <section className="privacy-section">
        <p>
          At <strong>EduStack</strong>, your privacy is important to us. This
          Privacy Policy explains how we collect, use, and protect your
          information when you use our platform.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>Personal details such as name and email address</li>
          <li>Account and course progress data</li>
          <li>Usage data to improve our platform experience</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide and improve our learning services</li>
          <li>To track course progress and achievements</li>
          <li>To communicate updates and important information</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>Data Protection</h2>
        <p>
          We use reasonable security measures to protect your personal data.
          However, no method of transmission over the internet is 100% secure.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Third-Party Services</h2>
        <p>
          EduStack may use trusted third-party services for analytics or hosting.
          These services have their own privacy policies and practices.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal
          information. You may contact us for any privacy-related concerns.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page.
        </p>
      </section>

      <section className="privacy-footer">
        <p>
          If you have any questions about this Privacy Policy, contact us at  
          <strong> pandeyanupam180@gmail.com</strong>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
