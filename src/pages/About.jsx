import NavBar from "../components/NavBar";
import AboutCompany from "../components/AboutCompany";
import OurHeritage from "../components/OurHeritage";
import Vison from "../components/Vison";
import { FaArrowRight } from "react-icons/fa";
import GlobeComponent from "../components/GlobeComponent";
import OtherPageFooter from "../components/OtherPageFooter";
import AboutVideo from '../assets/video/gallery-video.mp4'

function About() {
  return (
    <div>
      <NavBar />
      <AboutCompany />
      <OurHeritage />
      {/* <Vison /> */}

      {/* 🔹 Crown Specialize Section */}
      <div class="crownSection">
      <video
                  className="about-page-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={AboutVideo}
                  type="video/webm"
                >
                </video>
      </div>

      {/* 🔹 Why Crown Laminates Section */}
      <div className="crowLaminationSection">
        <div className="container">
          <div className="row w-100">
            <div className="col-lg-4 text-center text-lg-start">
              <h1>Why Crown Laminates?</h1>
            </div>
            <div className="col-lg-8">
              <div className="row w-100">
                {[
                  { title: "7 + HPL VERTICALS" },
                  { title: "6 + SIZES"},
                  { title: "1200 + DECORS" },
                  { title: "120 + TRENDY TEXTURES" },
                  { title: "500 +SATISFIED BUYERS"},
                  { title: "5 GLOBAL WAREHOUSE WITH READY STOCK AVAILABLE" }
                ].map((item, index) => (
                  <div className="col-lg-4 col-md-6 col-6" key={index}>
                    <div className="crownBox">
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <GlobeComponent /> */}
      <OtherPageFooter />
    </div>
  );
}

export default About;
