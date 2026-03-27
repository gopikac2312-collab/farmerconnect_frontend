import React from "react";
import "./Services.css";


const services = [
  {
    title: "Organic Farming Support",
    image: "/images/organic.jpg",
  },
  {
    title: "Smart Irrigation Setup",
    image: "/images/irrigation.jpg",
  },
  {
    title: "Farmer Training Program",
    image: "/images/training.jpg",
  },
];

function Services() {
  return (
    <section className="services-section">
      <h2 className="services-title">Farmer Services</h2>

      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
            />
            <div className="service-content">
              <h3>{service.title}</h3>
              <button className="learn-btn">Learn More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
