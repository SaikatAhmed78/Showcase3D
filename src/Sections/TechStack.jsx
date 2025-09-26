"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CanvasLoader from "../Components/CanvasLoader"; 

const techs = [
  {
    name: "MongoDB",
    icon: "/textures/MongoDB.png",
    tagline: "Data made scalable",
  },
  {
    name: "Express.js",
    icon: "/textures/Express.png",
    tagline: "Backend logic simplified",
  },
  {
    name: "React",
    icon: "/textures/React.png",
    tagline: "Crafting dynamic UIs",
  },
  {
    name: "Node.js",
    icon: "/textures/Node.js.png",
    tagline: "Event-driven power",
  },
  {
    name: "Next.js",
    icon: "/textures/Next.js.png",
    tagline: "Fullstack reimagined",
  },
  {
    name: "TypeScript",
    icon: "/textures/TypeScript.png",
    tagline: "Safety with speed",
  },
  {
    name: "Firebase",
    icon: "/textures/Firebase.png",
    tagline: "Realtime & auth",
  },
  {
    name: "GitHub",
    icon: "/textures/GitHub.png",
    tagline: "Collaboration that scales",
  },
];

// === CodeShowcase component ===
const highlight = (line) => {
  
  const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let out = esc(line)
   
    .replace(/(\/\/.*$)/g, '<span class="text-gray-500">$1</span>')
   
    .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-amber-400">$1</span>')
  
    .replace(
      /\b(import|from|const|let|var|function|return|export|await|async|new)\b/g,
      '<span class="text-cyan-400">$1</span>'
    )
  
    .replace(
      /(&lt;\/?[A-Za-z0-9-]+&gt;)/g,
      '<span class="text-violet-400">$1</span>'
    );
  return out;
};

const CodeShowcase = ({ snippets = [] }) => {
 
  const [display, setDisplay] = useState("");
  const [caret, setCaret] = useState(true);
  const snippetIndexRef = useRef(0);
  const lineIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const revealedLinesRef = useRef([]); 
  const typingSpeed = 28; 
  const pauseBetweenLines = 500;
  const pauseBetweenSnippets = 1200;

  useEffect(() => {
    let mounted = true;
    const caretTimer = setInterval(() => setCaret((c) => !c), 500);

    const typeLoop = async () => {
      while (mounted) {
        const snippet = snippets[snippetIndexRef.current];
        const lines = snippet.split("\n");
      
        lineIndexRef.current = 0;
        charIndexRef.current = 0;
        revealedLinesRef.current = [];
        isDeletingRef.current = false;

        while (lineIndexRef.current < lines.length && mounted) {
          const rawLine = lines[lineIndexRef.current];
          const targetHTML = highlight(rawLine);

          let visibleChars = "";
         
          while (charIndexRef.current <= rawLine.length && mounted) {
            visibleChars = rawLine.slice(0, charIndexRef.current);
          
            const currentHTML =
              revealedLinesRef.current.join("<br/>") +
              (revealedLinesRef.current.length ? "<br/>" : "") +
              highlight(visibleChars);
            setDisplay(currentHTML);
            await new Promise((r) => setTimeout(r, typingSpeed));
            charIndexRef.current += 1;
          }
          
          revealedLinesRef.current.push(highlight(rawLine));
        
          charIndexRef.current = 0;
          lineIndexRef.current += 1;
          await new Promise((r) => setTimeout(r, pauseBetweenLines));
        }

     
        await new Promise((r) => setTimeout(r, pauseBetweenSnippets));

       
        for (
          let i = revealedLinesRef.current.length - 1;
          i >= 0 && mounted;
          i--
        ) {
          const l = revealedLinesRef.current[i];
          // remove last line
          revealedLinesRef.current.pop();
          setDisplay(revealedLinesRef.current.join("<br/>"));
          await new Promise((r) => setTimeout(r, 120));
        }

     
        snippetIndexRef.current =
          (snippetIndexRef.current + 1) % snippets.length;
      }
    };

    typeLoop();

    return () => {
      mounted = false;
      clearInterval(caretTimer);
    };
  }, [snippets]);

  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="relative w-full max-w-[680px]">
        <div
          className="rounded-2xl border border-black-300 bg-gradient-to-b from-black-200/60 to-black-100/30 p-5 shadow-2xl
                      backdrop-blur-md overflow-hidden"
        >
          {/* top small header like code editor tabs */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-3 rounded-full bg-red-400" />
            <div className="w-10 h-3 rounded-full bg-yellow-400" />
            <div className="w-10 h-3 rounded-full bg-green-400" />
            <div className="ml-auto text-sm text-gray-400">App.jsx</div>
          </div>

          {/* code area */}
          <pre
            aria-hidden={false}
            className="text-sm leading-6 font-mono max-h-[380px] overflow-hidden"
            style={{ whiteSpace: "pre-wrap" }}
          >
            <code
              className="block text-gray-200"
              dangerouslySetInnerHTML={{
                __html:
                  display +
                  (caret
                    ? '<span class="inline-block ml-1 bg-gray-200 w-[8px] h-[18px] align-bottom animate-pulse"></span>'
                    : ""),
              }}
            />
          </pre>
        </div>

        {/* little floating shimmer & blurred "lantern" elements for depth */}
        <div className="pointer-events-none">
          <div className="absolute -left-6 -top-6 w-32 h-32 rounded-full blur-3xl opacity-10 bg-cyan-500"></div>
          <div className="absolute -right-6 bottom-6 w-44 h-44 rounded-full blur-3xl opacity-8 bg-violet-500"></div>
        </div>
      </div>
    </div>
  );
};

// === Main TechStack component combining CodeShowcase + Right cards ===
const TechStack = () => {

  const snippets = [
    `// life of Saikat Ahmed ✨
const day = ["Pray", "Eat", "Code", "Sleep"];
for (let i = 0; i < Infinity; i++) {
  console.log(day[i % day.length]);
}`,

    `// productivity hack 🧠
function focus(mode){
  return mode === "Deep Work" ? "🚀" : "🐌";
}
console.log(focus("Deep Work"));`,

    `// developer fuel ☕
const fuel = ["Tea", "Coffee", "Water"];
const energy = fuel.map(f => f + " → Code");
console.log(energy);`,

    `// dream big, build bigger 🌍
const goals = {
  shortTerm: "Master MERN + Next.js",
  longTerm: "Create impact with code",
};
console.log("Future →", goals);`,

    `// balance is key ⚖️
const balance = ["Work", "Learn", "Faith", "Rest"];
console.log(balance.join(" | "));`,
  ];







  return (
    <section id="stack" className="c-space my-32">
      <h2 className="head-text ">
        Cutting-Edge Development Toolkit
      </h2>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 mt-16 items-center">
        {/* Left: Code Showcase */}
        <div className="h-[600px] rounded-2xl bg-black-200 border border-black-300 shadow-2xl overflow-hidden flex items-center justify-center">
          <Suspense fallback={<CanvasLoader />}>
            <CodeShowcase snippets={snippets} />
          </Suspense>
        </div>

        {/* Right Cards) */}
        <motion.div
          className="grid sm:grid-cols-2 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {techs.map((tech, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="group relative rounded-xl border border-black-300 
                        bg-gradient-to-br from-black-200/70 to-black-100/30 
                        p-6 shadow-lg overflow-hidden 
                        hover:shadow-cyan-500/40 
                        transition-all duration-500 
                        backdrop-blur-xl"
            >
              <div
                className="absolute inset-0 rounded-xl 
                              bg-gradient-to-tr from-cyan-500/10 to-purple-600/10 
                              opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500"
              ></div>

              <div className="relative flex items-center gap-4">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-12 h-12 drop-shadow-[0_0_12px_rgba(0,255,255,0.6)]
                             group-hover:scale-110 transition-transform duration-300"
                />
                <p className="text-lg font-semibold text-white">{tech.name}</p>
              </div>

              <p className="mt-4 text-gray-400 text-sm relative z-10 italic">
                {tech.tagline}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
