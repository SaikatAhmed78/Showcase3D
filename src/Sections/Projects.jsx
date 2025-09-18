import { myProjects } from "../constants";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import CanvasLoader from "../Components/CanvasLoader";
import DemoComputer from "../Components/DemoComputer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const totalProjects = myProjects.length;

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const switchProject = (dir) => {
    setActiveIndex((prev) => {
      if (dir === "back") {
        return prev === 0 ? totalProjects - 1 : prev - 1;
      } else {
        return prev === totalProjects - 1 ? 0 : prev + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      `.fadeInText`,
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.inOut" }
    );
  }, [activeIndex]);

  const project = myProjects[activeIndex];

  return (
    <section id="work" className="c-space my-20">
      <p className="head-text">Featured Projects</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0">
            <img
              className="w-full h-96 object-cover rounded-xl"
              src={project?.spotlight}
              alt="project preview"
            />
          </div>

          <div
            className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
            style={project?.logoStyle}
          >
            <img
              className="w-10 h-10 shadow-sm"
              src={project?.logo}
              alt="brand logo"
            />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold fadeInText">
              {project.title}
            </p>
            <p className="fadeInText">{project.desc}</p>
            <p className="fadeInText">{project.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {project.tags.map((tag, ind) => (
                <div key={ind} className="tech-logo">
                  <img src={tag.path} alt="tech icon" />
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              <p>View Project</p>
              <img
                src="/assets/arrow-up.png"
                alt="go to site"
                className="w-3 h-3"
              />
            </a>
          </div>

          {/* navigation controls */}
          <div className="flex justify-between items-center mt-7">
            <button className="arrow-btn" onClick={() => switchProject("back")}>
              <img src="/assets/left-arrow.png" alt="previous project" />
            </button>

            <button className="arrow-btn" onClick={() => switchProject("next")}>
              <img
                src="/assets/right-arrow.png"
                alt="next project"
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>

        {/* 3D preview area */}
        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />

            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={project.texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Projects;
