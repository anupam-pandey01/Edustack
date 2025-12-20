import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About EduStack</h1>
      </section>

      <section className="about-section">
        <p>
          EduStack is a <strong>100% free learning platform</strong> built to
          empower students, professionals, and lifelong learners. Our goal is
          to make quality education accessible to everyone—without any cost.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          We believe education should not be limited by money or location.
          EduStack helps learners gain practical skills and confidence to build
          a better future.
        </p>
      </section>

      <section className="about-section">
        <h2>Why Choose EduStack?</h2>
        <ul className="benefits">
          <li>🎓 100% Free Courses with no hidden charges</li>
          <li>📊 Track your progress and earn completion badges</li>
          <li>🌍 Learn anytime, anywhere on any device</li>
          <li>⭐ Courses trusted and loved by learners</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Our Community</h2>
        <p>
          EduStack is more than a platform—it’s a growing community of learners
          who support each other. Thousands of students are already learning
          and growing together.
        </p>
      </section>

      <section className="about-footer">
        <h3>Start Learning Today</h3>
        <p>
          Build skills that matter, at your own pace, without paying anything.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
