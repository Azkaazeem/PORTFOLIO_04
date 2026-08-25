// Single source of truth for all portfolio content.
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import certImage from "@/assets/cert-placeholder.jpg";

export const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Certifications", id: "certifications" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export const bioParagraphs = [
  "I'm Azka Azeem. I'm 14 years old and recently completed Class 8. I'm a MERN Stack Developer, Prompt Engineer, and Graphic Designer. I enjoy learning new things, building projects, and exploring different areas of technology.",
  "I have experience with HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, and other web development tools. I also work with Prompt Engineering and enjoy exploring how AI can be used to make projects more useful and creative.",
  "Along with development and AI, I have skills in Graphic Designing and experience with tools like Canva and Photoshop. I also know how to use Microsoft Word and Excel.",
  "Currently, I'm also learning AI & Data Science and improving my knowledge step by step. I'm also learning Freelancing so I can understand how to work with real clients, manage projects, and turn my skills into real work.",
  "I'm always trying to learn something new and improve through practice and personal projects. I'm open to job opportunities, internships, freelance work, and collaborations where I can use my skills, gain experience, and learn more.",
];

export const skillNames = [
  "NoSQL",
  "SQL",
  "MongoDB",
  "Mongoose",
  "Node.js",
  "Express.js",
  "Redux.js",
  "React.js",
  "Supabase",
  "Tailwind CSS",
  "Bootstrap",
  "EJS",
  "HTML",
  "CSS",
  "JavaScript",
  "ES5",
  "ES6",
  "Vibe Coding",
  "Canva",
  "Mockup Design",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Microsoft Office",
];

// Logos come from simpleicons CDN, tinted with the brand red.
const logo = (slug: string) => `https://cdn.simpleicons.org/${slug}/e63946`;

export type Skill = { name: string; category: string; logo: string };

export const skills: Skill[] = [
  { name: "MongoDB", category: "Database", logo: logo("mongodb") },
  { name: "Mongoose", category: "Database", logo: logo("mongodb") },
  { name: "PostgreSQL", category: "SQL", logo: logo("postgresql") },
  { name: "Node.js", category: "Backend", logo: logo("nodedotjs") },
  { name: "Express.js", category: "Backend", logo: logo("express") },
  { name: "React.js", category: "Frontend", logo: logo("react") },
  { name: "Redux", category: "State", logo: logo("redux") },
  { name: "Supabase", category: "Backend", logo: logo("supabase") },
  { name: "Tailwind CSS", category: "Styling", logo: logo("tailwindcss") },
  { name: "Bootstrap", category: "Styling", logo: logo("bootstrap") },
  { name: "EJS", category: "Templating", logo: logo("javascript") },
  { name: "HTML5", category: "Markup", logo: logo("html5") },
  { name: "CSS3", category: "Styling", logo: logo("css3") },
  { name: "JavaScript", category: "Language", logo: logo("javascript") },
  { name: "Git", category: "Tooling", logo: logo("git") },
  { name: "GitHub", category: "Tooling", logo: logo("github") },
  { name: "Canva", category: "Design", logo: logo("canva") },
  { name: "Photoshop", category: "Design", logo: logo("adobephotoshop") },
  { name: "Illustrator", category: "Design", logo: logo("adobeillustrator") },
  { name: "Figma", category: "Design", logo: logo("figma") },
];

export type Certification = {
  title: string;
  issuer: string;
  image: string;
};

export const certifications: Certification[] = [
  { title: "Introduction to Modern AI", issuer: "Cisco Networking Academy", image: certImage },
  { title: "JavaScript Essentials 1", issuer: "Cisco Networking Academy", image: certImage },
  { title: "JavaScript Essentials 2", issuer: "Cisco Networking Academy", image: certImage },
  { title: "CSS Essentials", issuer: "Web Development Course", image: certImage },
  { title: "HTML & Web Development", issuer: "Web Development Course", image: certImage },
  { title: "Certificate of Appreciation", issuer: "Academy Recognition", image: certImage },
  { title: "Training Completion", issuer: "Development Training Program", image: certImage },
  { title: "Prompt Engineering Basics", issuer: "Online Learning", image: certImage },
  { title: "Graphic Design Fundamentals", issuer: "Design Course", image: certImage },
];

export type Project = {
  name: string;
  tech: string;
  image: string;
  url: string;
};

export const projects: Project[] = [
  { name: "ShopSphere", tech: "MERN · E-Commerce", image: project1, url: "#projects" },
  { name: "TaskFlow", tech: "React · Redux · Node", image: project2, url: "#projects" },
  { name: "Azka's Agent", tech: "AI · Prompt Engineering", image: project3, url: "#projects" },
  { name: "Design Studio", tech: "Canva · Photoshop", image: project4, url: "#projects" },
  { name: "WeatherLog", tech: "React · API · Charts", image: project5, url: "#projects" },
];

export const contact = {
  address: "Karachi, Pakistan",
  phone: "+92 XXX XXXXXXX",
  email: "hello@example.com",
  socials: [
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "GitHub", url: "https://github.com" },
    { name: "Instagram", url: "https://instagram.com" },
  ],
};

export const cvUrl = "/azka-azeem-cv.pdf";
