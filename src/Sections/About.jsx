import Globe from "react-globe.gl";
import Button from "../Components/Button";
import { useState } from "react";

const About = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("shaikatahmed78@gmail.com");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800); 
  };

  return (
    <section id="about" className="c-space my-24">
      
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-6">

        {/* Intro */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              className="w-full sm:h-[276px] object-contain"
              src="assets/grid1.png"
              alt="developer-intro"
            />
            <div>
              <p className="grid-headtext">Hey, I’m Saikat Ahmed</p>
              <p className="grid-subtext">
                Crafting digital experiences that are functional and engaging.
                Building software feels like shaping ideas into reality.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src="assets/gridcopy.png"
              alt="tech-stack"
              className="w-full sm:h-[276px] object-contain"
            />
            <div>
              <p className="grid-headtext">Tech Toolbox</p>
              <p className="grid-subtext">
                From JavaScript to modern frameworks, my toolkit evolves with
                every project, ensuring scalable and efficient solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Globe */}
        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0,0,0,0)"
                showAtmosphere={true}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[
                  {
                    lat: 23.685,
                    lng: 90.3563,
                    text: "Saikat Ahmed",
                    color: "#00FFAE",
                    size: 18,
                  },
                ]}
              />
            </div>

            <div>
              <p className="grid-headtext">
                Comfortable across time zones & cultures
              </p>
              <p className="grid-subtext">
                I work from Bangladesh but love collaborating worldwide.
              </p>
              <Button name="Let’s Talk" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        {/* Passion */}
        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img
              src="assets/grid3.png"
              alt="coding-passion"
              className="w-full sm:h-[266px] object-contain"
            />
            <div>
              <p className="grid-headtext">Why I Code</p>
              <p className="grid-subtext">
                Coding to me is problem-solving with creativity. It’s more than
                a career—it’s a playground where ideas come alive.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="contact-grid"
              className="w-full md:h-[126px] sm:h-[276px] object-cover sm:object-top"
            />
            <div className="space-y-2">
              <p className="grid-subtext text-center">Reach Out</p>
              <div className="copy-container" onClick={copyEmail}>
                <img
                  src={copied ? "assets/tick.svg" : "assets/copy.svg"}
                  alt="copy-icon"
                />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  shaikatahmed78@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
