import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import HackerRoom from "../Components/HackerRoom";
import { Suspense } from "react";
import CanvasLoader from "../Components/CanvasLoader";
import { Leva } from "leva";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants";
import Target from "../Components/Target";
import ReactLogo from "../Components/ReactLogo";
import Rings from "../Components/Rings";
import Cube from "../Components/Cube";
import HeroCamera from "../Components/HeroCamera";
import Button from "../Components/Button";

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  // // Leva Controls for HackerRoom
  // const { scale, position, rotation } = useControls("HackerRoom", {
  //   scale: {
  //     value: sizes.deskScale,
  //     min: 0.01,
  //     max: 5,
  //     step: 0.01,
  //   },
  //   position: {
  //     value: sizes.deskPosition,
  //     step: 0.1,
  //   },
  //   rotation: {
  //     value: [0.1, -Math.PI, 0],
  //     step: 0.1,
  //   },
  // });

  return (
    <section id="home" className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-2xl text-xl font-medium text-white text-center font-generalsans">
          Hey there, I am Saikat Ahmed <span className="waving-hand">👋</span>
        </p>

        <p className="hero_tag text-gray_gradient">Building Products & Brand</p>
      </div>

      {/* Hero Three Js Start */}
      <div className="w-full h-full absolute inset-0">
        {/* Leva panel visible */}
        <Leva hidden/>

        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 50]} />

            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                scale={0.004}
                position={[0, -4, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
            </HeroCamera>

            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Rings position={sizes.ringPosition} />
              <Cube position={sizes.cubePosition} />
            </group>

            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>
      {/* Hero Three Js End */}

      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#about" className="w-fit">
          <Button
            name="Let's work together"
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-96"
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;
