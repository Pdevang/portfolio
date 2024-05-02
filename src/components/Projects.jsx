import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Tutor-Student One-on-One Session Platform",
    description: `Integrated a calendar system allowing users to schedule, view, and manage one-onone sessions efficiently.
      
      Secured API endpoints with authentication and
authorization mechanisms such as JSON Web Tokens
(JWT) or OAuth`,
  },
  {
    title: "Salon Management System",
    description: `Developed a modern and intuitive salon management software using React.js, tailored for salons, beauty parlors, and nail art studios to streamline their operations and enhance customer experience.
    
    Calendar Leveraged React libraries to seamlessly integrate salon schedules and appointments with a centralized calendar for easy viewing and management.`,
  },
  {
    title: "3D Product Customization App",
    description: `  Developed a fully functional 3D product customization application using React.js and Three.js 

    Implemented features such as color customization, texture mapping, and real-time preview of user-selected options`,
  },
  {
    title: "Restaurants enquiry admin panel",
    description: `Integrated authentication and authorization features to secure the admin panel, allowing only authorized users to access and manage the system
    
    Collaborated with backend developers to define API endpoints and ensure seamless integration between the admin panel frontend and backend services.
    `,
  },
  {
    title: "gameing admin panel",

    description: `Created a visually appealing loader animation using reactloading-skeleton like React Spinners to provide feedback to users while data is being fetched
    
    Integrated the loader component seamlessly into existing admin panel screens and layouts, ensuring consistency in design and user interface.
`,
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        // onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      {/* <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      /> */}
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, 0.8, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, 0.1, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
