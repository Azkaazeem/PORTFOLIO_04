import cert1 from "@/assets/Certificates/1.jpg";
import cert2 from "@/assets/Certificates/2.jpg";
import cert3 from "@/assets/Certificates/3.jpg";
import cert4 from "@/assets/Certificates/4.jpg";
import cert5 from "@/assets/Certificates/5.jpg";
import cert6 from "@/assets/Certificates/6.jpg";

import proj1 from "@/assets/Projects/01- Zakora.png";
import proj2 from "@/assets/Projects/02- WanderLust.png";
import proj3 from "@/assets/Projects/03- Fix My Area.png";
import proj4 from "@/assets/Projects/04- SMIT Hub.png";
import proj5 from "@/assets/Projects/05- Expense Tracker.png";
import proj6 from "@/assets/Projects/06- Task Manager.png";
import proj7 from "@/assets/Projects/07- Authentication & Authorization.png";
import proj8 from "@/assets/Projects/08- Synth.png";
import proj9 from "@/assets/Projects/09- Imtiaz Clone.png";
import proj10 from "@/assets/Projects/10- Pet Accessories.png";

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
const logo = (slug: string) => `https://cdn.simpleicons.org/${slug}/e63946?v=2`;

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
  { title: "Techno Kids (Batch-6)", issuer: "Saylani Mass Training Programme", image: cert1 },
  { title: "Introduction to Modern AI", issuer: "Cisco Networking Academy", image: cert2 },
  { title: "HTML Essentials", issuer: "Cisco Networking Academy", image: cert6 },
  { title: "CSS Essentials", issuer: "Cisco Networking Academy", image: cert5 },
  { title: "JavaScript Essentials 1", issuer: "Cisco Networking Academy", image: cert4 },
  { title: "JavaScript Essentials 2", issuer: "Cisco Networking Academy", image: cert3 },
];

export type Project = {
  name: string;
  tech: string;
  image: string;
  url: string;
  github: string;
};

export const projects: Project[] = [
  { name: "Zakora Social", tech: "Social Media App", image: proj1, url: "https://social-media-app-frontend-sand.vercel.app/", github: "https://github.com/Azkaazeem/SOCIAL_MEDIA_APP_FRONTEND" },
  { name: "WanderLust", tech: "Travel Listings", image: proj2, url: "https://delta-project-chmye3djs-azka-azeems-projects.vercel.app/listings", github: "https://github.com/Azkaazeem/DELTA_PROJECT" },
  { name: "Fix my area for PK", tech: "Community Platform", image: proj3, url: "https://fix-my-area-for-pk-xsl7.vercel.app/", github: "https://github.com/Azkaazeem/Fix-My-Area-For-PK" },
  { name: "SMIT Hub", tech: "Hackathon Project", image: proj4, url: "https://module-03-hackathon.vercel.app/", github: "https://github.com/Azkaazeem/MODULE03_HACKATHON" },
  { name: "Expense Tracker", tech: "Finance Tracker", image: proj5, url: "https://frontend-last-assignment.vercel.app/", github: "https://github.com/Azkaazeem/FRONTEND_LAST_ASSIGNMENT" },
  { name: "Task Manager", tech: "Trello Clone", image: proj6, url: "https://trello-application-one.vercel.app/", github: "https://github.com/Azkaazeem/Trello-Application" },
  { name: "Complete Auth", tech: "Authentication System", image: proj7, url: "https://complete-ten-classes-practice-memb.vercel.app/signin", github: "https://github.com/Azkaazeem/COMPLETE_TEN_CLASSES_PRACTICE" },
  { name: "Synth", tech: "Web App", image: proj8, url: "https://synth-tawny.vercel.app/", github: "https://github.com/Azkaazeem/SYNTH" },
  { name: "Imtiaz Store Clone", tech: "E-Commerce", image: proj9, url: "https://azkaazeem.github.io/Imtiaz-Store-clone-website/", github: "https://github.com/Azkaazeem/Imtiaz-Store-clone-website" },
  { name: "Pet Accessories Store", tech: "E-Commerce", image: proj10, url: "https://azkaazeem.github.io/Pet-Accessories-Store-/", github: "https://github.com/Azkaazeem/Pet-Accessories-Store-" },
];

export const contact = {
  address: "Karachi, Pakistan",
  email: "azkaazeem@example.com",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/azkaazeem/" },
    { name: "GitHub", url: "https://github.com/Azkaazeem" },
    { name: "Reddit", url: "https://www.reddit.com/user/Azkaazeem804/" },
  ],
};

export const cvUrl = "/azka-azeem-cv.pdf";
