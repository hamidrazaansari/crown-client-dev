import GlobalPresent from '../assets/image/global.png'


const GlobeComponent = () => {
  return (
    <div className="globeSection">
      <div className="container">
        <h2>Global presence</h2>
        <div className="globeImageContainer">
          <img src={GlobalPresent} alt="globe image" />
        </div>
        <div className="gloabFooterInfo">
          <h3>Are you ready to explore our wonderful laminates</h3>
          <p>we are always working hard and trying to make the best for you</p>
        </div>
      </div>
    </div>
  );
};

export default GlobeComponent;
