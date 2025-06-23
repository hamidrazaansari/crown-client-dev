import logo from '../assets/image/logo without tagline.jpg'
import { Link } from 'react-router-dom';

const AboutCompany = () => {
  return (
    <div className="about-company-section pt-4">
    <div className="container ">
      <div className="breadcrumb">
        <p>
          <Link href="/">HOME</Link>
          <span> / </span>{" "}
          <Link href="/about" className="ms-2">
            About Us
          </Link>{" "}
        </p>
      </div>
      <div className="row about-company">
        <div className="col-lg-4 center-in-mobile">
          <img src={logo} alt="crown logo" />
        </div>
        <div className="col-lg-8">
          {/* <h2>KNOW US BETTER</h2> */}
          <p>Crown is a leading manufacturer of High-Pressure Laminates (HPL) and compact panels, delivering innovative, high-performance surfacing solutions for global markets. With decades of expertise, we specialize in crafting durable, stylish, and sustainable laminates designed to elevate interiors and exteriors alike.</p>
          <p>Our state-of-the-art manufacturing facilities in India, equipped with 10+ advanced production lines, produce a vast range of laminates, including decorative, interior, and exterior compact panels. From timeless wood grains to contemporary stone and abstract designs, our diverse portfolio caters to architects, designers, builders, and businesses worldwide.</p>
          <p>At Crown, quality is our foundation. We adhere to international standards like EN, CE, NEMA, and FSC, ensuring our products meet stringent performance, safety, and environmental benchmarks. Our laminates are scratch-resistant, impact-resistant, UV-stable, and moisture-proof, making them ideal for high-traffic commercial spaces, residential interiors, and exterior cladding applications.</p>
          <p>With a strong presence in Europe, the USA, and Australia, we empower businesses with top-grade Indian HPL laminates that offer unmatched durability, aesthetic appeal, and easy maintenance. Our commitment to sustainability drives us to use eco-friendly production processes, minimizing environmental impact while maximizing product lifespan.</p>
          <p>At Crown, we don’t just manufacture laminates—we craft surfaces that inspire. Whether you are designing a luxury home, a commercial workspace, or a striking façade, our premium laminates deliver lasting beauty and performance.</p>
          <p>Elevate Your Spaces with Innovation & Quality.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutCompany;
