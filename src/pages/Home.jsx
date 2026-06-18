
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection if needed
import Slider from "react-slick";
import {
  FaSeedling,
  FaTractor,
  FaUsers,
  FaStar,
  FaLeaf,
  FaShoppingBasket,
  FaShieldAlt,
  FaHandsHelping,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Create a new review object from the feedback state values
    const newReview = {
      id: Date.now(),
      name: feedback.name,
      email: feedback.email,
      feedback: feedback.message, // Map 'message' from form to 'feedback' key
      date: new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }),
      rating: 5
    };

    // 2. Save it to localStorage so the Reviews page can load it
    const existingReviews = JSON.parse(localStorage.getItem("customReviews")) || [];
    const updatedReviews = [newReview, ...existingReviews];
    localStorage.setItem("customReviews", JSON.stringify(updatedReviews));

    alert("Thank you for your feedback! 🌱");

    // 3. Clear form state
    setFeedback({ name: "", email: "", message: "" });

    // 4. Redirect to the Reviews page to see it live
    navigate("/reviews");
  };

  /* ================= FARM PRODUCTS ================= */
  const products = [
    { id: 1, name: "Fresh Tomatoes", img: "/images/Tomato.jpg" },
    { id: 2, name: "Organic Wheat", img: "/images/wheat.jpg" },
    { id: 3, name: "vegetables", img: "/images/vegetables.jpg" },
    { id: 4, name: "Rice Grains", img: "/images/Rice.jpg" },
    { id: 5, name: "Apples", img: "/images/Apple.jpg" },
  ];

  /* ================= FARM PACKAGES ================= */
  const packages = [
    { id: 1, title: "Organic Farming Support", img: "/images/organic-farming-support.jpg" },
    { id: 2, title: "Smart Irrigation Setup", img: "/images/smart-irrigation-setup.jpg" },
    { id: 3, title: "Farmer Training Program", img: "/images/farmer-training-program.jpg" },
  ];

  /* ================= FARM EXPERTS ================= */
  const experts = [
    { id: 1, name: "Dr. Arun Singh", img: "/images/soil.jpg.jpg", specialty: "Soil & Crop Expert" },
    { id: 2, name: "Meena Joshi", img: "/images/organic.jpg.png", specialty: "Organic Farming" },
    { id: 3, name: "Rahul Verma", img: "/images/agri.jpg.avif", specialty: "Agri Technology" },
  ];

  /* ================= SLIDER SETTINGS ================= */
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <span className="hero-badge">🌾 Farmer-first platform</span>
            <h1>
              Connecting <br />
              <span className="hero-highlight">Farmers & Buyers</span> <br />
              Directly
            </h1>
            <p>
              Sell fresh produce without middlemen. FarmerConnect gives farmers
              fair prices, modern tools, and expert guidance to grow sustainably.
            </p>
            <div className="hero-cta-group">
              <Link to="/buyer-product" className="hero-btn-primary">
                Explore Products
              </Link>
              <Link to="/about" className="hero-btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT US ================= */}
      <section id="about" className="about-section">
        <h2>About FarmerConnect</h2>
        <p>
          FarmerConnect is a digital platform that connects farmers directly with buyers,
          eliminating middlemen and ensuring fair prices. We empower farmers with modern
          tools, expert guidance, and a trusted marketplace.
        </p>

        <div className="about-features">
          <div className="about-card">
            <FaLeaf size={40} color="#2e7d32" />
            <h4>Sustainable Farming</h4>
          </div>

          <div className="about-card">
            <FaUsers size={40} color="#2e7d32" />
            <h4>Farmer Community</h4>
          </div>

          <div className="about-card">
            <FaShieldAlt size={40} color="#2e7d32" />
            <h4>Trusted Platform</h4>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features-section" data-aos="fade-up">
        <h2>Why FarmerConnect?</h2>
        <div className="features-grid">
          <div className="feature-card"><FaSeedling size={50} /><h3>Fresh Produce</h3></div>
          <div className="feature-card"><FaTractor size={50} /><h3>Farmer Empowerment</h3></div>
          <div className="feature-card"><FaUsers size={50} /><h3>Direct Buyers</h3></div>
          <div className="feature-card"><FaStar size={50} /><h3>Trusted Platform</h3></div>
          <div className="feature-card"><FaShoppingBasket size={50} /><h3>Easy Selling</h3></div>
          <div className="feature-card"><FaShieldAlt size={50} /><h3>Secure Payments</h3></div>
          <div className="feature-card"><FaHandsHelping size={50} /><h3>24/7 Support</h3></div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section id="products" className="destinations-section" data-aos="fade-up">
        <h2>Fresh Farm Products</h2>
        <Slider {...sliderSettings} className="carousel-slider">
          {products.map((p) => (
            <div className="destination-card" key={p.id}>
              <img src={p.img} alt={p.name} />
              <div className="destination-info">
                <h3>{p.name}</h3>
                <div className="destination-buttons">
                  <Link to="/buyerproductdetails" className="btn-view">View</Link>
                  <Link to={"/payment"} className="btn-book">Buy Now</Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ================= PACKAGES ================= */}
      <section className="packages-section" data-aos="fade-up">
        <h2>Farmer Services</h2>
        <Slider {...sliderSettings} className="carousel-slider">
          {packages.map((pkg) => (
            <div className="package-card" key={pkg.id}>
              <img src={pkg.img} alt={pkg.title} />
              <div className="package-info">
                <h3>{pkg.title}</h3>
                <Link to={`/services/${pkg.id}`} className="btn-book">Learn More</Link>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials">
        <h2>What Farmers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>FarmerConnect helped me sell crops directly at better prices.</p>
            <h4>Ramesh Kumar</h4>
            <div className="testimonial-stars">★★★★★</div>
          </div>

          <div className="testimonial-card">
            <p>No middlemen, transparent pricing. Highly recommended.</p>
            <h4>Anita Sharma</h4>
            <div className="testimonial-stars">★★★★★</div>
          </div>

          <div className="testimonial-card">
            <p>Very useful platform for farmers and buyers.</p>
            <h4>Suresh Patel</h4>
            <div className="testimonial-stars">★★★★★</div>
          </div>
        </div>
      </section>

      {/* ================= FEEDBACK ================= */}
       <section className="feedback-section">
        <h2>We Value Your Feedback</h2>
        <p>Help FarmerConnect grow better 🌱 Share your thoughts, suggestions, or experience with us.</p>
        
        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            name="name" // Added name attribute for handleChange mapping
            placeholder="Your Name"
            value={feedback.name} // Changed to feedback.name
            onChange={handleChange} // Changed to handleChange
            required
          />
          <input
            type="email"
            name="email" // Added name attribute for handleChange mapping
            placeholder="Your Email"
            value={feedback.email} // Changed to feedback.email
            onChange={handleChange} // Changed to handleChange
            required
          />
          <textarea
            name="message" // Added name attribute for handleChange mapping
            placeholder="Your Feedback"
            value={feedback.message} // Changed to feedback.message
            onChange={handleChange} // Changed to handleChange
            rows="5"
            required
          />
          <button type="submit" className="feedback-btn">
            Submit Feedback
          </button>
        </form>
      </section>

      {/* ================= EXPERTS ================= */}
      <section className="guides-section" data-aos="fade-up">
        <h2>Our Agriculture Experts</h2>
        <div className="guides-grid">
          {experts.map((e) => (
            <div className="guide-card" key={e.id}>
              <img src={e.img} alt={e.name} />
              <h3>{e.name}</h3>
              <p>{e.specialty}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <h4>MENU</h4>
            <a href="/">Home</a>
            <a href="/market">Market</a>
            <a href="/converter">Crop Converter</a>
          </div>

          <div className="footer-col">
            <h4>ABOUT</h4>
            <a href="/about">Our Company</a>
            <a href="/team">Our People</a>
            <a href="/faq">FAQ's</a>
          </div>

          <div className="footer-col">
            <h4>LEGAL</h4>
            <a href="/terms">Terms & Conditions</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/cookies">Cookies Policy</a>
          </div>

          <div className="footer-col">
            <h4>CONTACT US</h4>
            <p>📞 +351 964 300 963</p>
            <p>✉ info@agrimp.com</p>

            <div className="footer-social">
              <FaFacebookF />
              <FaInstagram />
              <FaLinkedinIn />
              <FaTwitter />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;