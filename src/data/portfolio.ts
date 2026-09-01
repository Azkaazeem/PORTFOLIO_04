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
import cvPdf from "@/assets/azka_azeem_simple_cv.pdf";

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
  { name: "CSS3", category: "Styling", logo: logo("css") },
  { name: "JavaScript", category: "Language", logo: logo("javascript") },
  { name: "Git", category: "Tooling", logo: logo("git") },
  { name: "GitHub", category: "Tooling", logo: logo("github") },
  { name: "Canva", category: "Design", logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><g fill="%23e63946"><path d="M59.39.152c-.484.051-1.995.23-3.328.387-5.374.613-11.468 2.227-16.816 4.48C19.891 13.106 5.324 30.849 1.305 51.2.359 56.04.129 58.418.129 64c0 7.195.715 12.16 2.61 18.434 6.195 20.53 22.323 36.632 42.906 42.851 6.195 1.871 11.187 2.586 18.355 2.586 7.195 0 12.16-.715 18.434-2.61 20.53-6.195 36.632-22.323 42.851-42.906 1.871-6.195 2.586-11.187 2.586-18.355 0-3.047-.152-6.527-.332-7.809-2.074-14.796-8.168-27.238-18.328-37.402C99.07 8.703 86.68 2.586 72.19.512c-1.996-.282-11.238-.54-12.8-.36zm-20.863 40.32c1.36.41 1.996.794 2.918 1.715 1.793 1.82 2.203 2.817 2.203 5.555 0 2.051-.078 2.434-.691 3.508-1.18 1.996-3.918 3.84-5.812 3.89-1.333.028-1.278-.562.18-2.097 1.945-2.023 2.226-2.79 2.226-5.813-.024-2.917-.383-3.914-1.739-4.734-1.128-.691-2.355-.64-4.148.203-4.66 2.23-9.703 9.653-11.672 17.258-2.613 10.137 2.02 18.25 9.649 16.867 2.226-.41 6.425-2.558 8.246-4.25 1.508-1.379 1.508-1.406 1.66-3.12.336-3.587 2.867-7.169 6.25-8.833 1.558-.77 1.945-.844 4.043-.844 1.996 0 2.457.102 3.43.637 3.097 1.77 2.457 5.89-.895 5.89-1.945 0-2.945-1-1.535-1.534 1.383-.512.867-2.434-.742-2.868-1.895-.488-4.047.793-5.403 3.25-1.64 2.97-1.715 6.504-.156 8.114 1.512 1.613 3.406.336 4.867-3.329.766-1.867 1.867-2.867 3.149-2.867 1.125 0 1.332.692.843 2.793-.718 3.25-.23 4.094 1.793 3.098.664-.309 1.766-1.023 2.43-1.535l1.254-1 .848-4.43c.922-4.965 1.277-5.633 3.172-5.988 1.82-.336 2.23.562 1.562 3.402l-.36 1.59 1.333-1.36c3.148-3.226 7.015-4.812 8.347-3.48.715.715.637 1.613-.386 4.785-.485 1.512-1.153 3.895-1.457 5.25-.461 2.047-.489 2.535-.23 2.868.82.972 3.327-.028 5.554-2.204l1.305-1.277.156-2.844c.152-3.277.457-4.453 1.328-5.504.82-.972 2.305-1.687 3.098-1.484.793.207.793.973.078 3.227-1 3.097-.895 10.238.129 10.238.41 0 2.507-2.2 3.84-4.043l.996-1.36-.793-.816c-1.383-1.46-1.715-2.406-1.715-4.789 0-1.738.129-2.379.562-3.227.719-1.328 1.844-2.3 3.176-2.687 1.406-.434 3.148.281 3.863 1.562.719 1.305.54 4.223-.383 6.223l-.664 1.457h.895c1.23 0 1.715-.305 3.918-2.379 1.152-1.101 2.484-2.05 3.48-2.511 3.918-1.84 8.528-.895 9.293 1.921.64 2.254-.765 3.84-3.226 3.66-1.766-.128-2.098-.59-1.074-1.456 1.843-1.54 0-3.508-2.637-2.793-1.434.386-3.047 1.996-3.89 3.867-1.692 3.738-.794 8.14 1.636 8.14.973 0 2.691-1.921 3.355-3.789.793-2.152 2.457-3.507 3.711-3.02.692.255.743.946.309 3.122-.488 2.383-.563 4.61-.18 5.633.153.382.614 1.101 1.051 1.586.816.921.844 1.254.152 1.691-.332.23-.77.129-1.843-.46-1.485-.77-2.766-2.153-3.227-3.458l-.281-.766-1.024.766c-.59.41-1.511.871-2.047 1.023-2.125.563-4.738-.894-5.964-3.351-.489-.95-.641-3.738-.282-4.813.204-.59.204-.59-.617-.18-.433.231-1.355.485-2.07.563-1.18.13-1.36.258-2.535 1.742-1.664 2.07-4.61 4.864-5.813 5.454-2.558 1.277-3.402.918-4.07-1.72l-.461-1.765-1.102.973c-1.406 1.23-4.222 2.715-5.836 3.074-1.535.332-3.175-.156-3.84-1.18-.995-1.535-.663-4.785.922-9.164 1.176-3.25.333-3.3-2.636-.203-2.203 2.328-3.149 3.992-3.762 6.578-.64 2.688-1.41 3.66-3.148 4.07-1.051.231-1.54-.41-1.332-1.816l.152-1.129-.973.668c-1.383.946-3.125 1.817-4.328 2.149-1.203.332-2.789-.024-3.172-.692-.691-1.175-.691-1.175-1.765-.332-2.332 1.895-5.66 1.356-7.348-1.152l-.54-.793-1.687 1.562c-4.867 4.454-10.957 6.45-15.464 5.067-5.735-1.738-8.907-6.656-8.856-13.746.024-7.117 3.172-14.617 8.473-20.172 2.996-3.125 5.812-4.969 8.68-5.66 2.07-.512 3.328-.485 5.296.129zm0 0"/><path d="M90.418 58.676c-.563.562-.356 2.816.36 4.25.359.742.742 1.332.87 1.332.102 0 .332-.59.512-1.309.64-2.66-.512-5.504-1.742-4.273zm0 0"/></g></svg>` },
  { name: "Photoshop", category: "Design", logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="%23e63946" d="M22.666 1.6C10.133 1.6 0 11.734 0 24.268v79.464C0 116.266 10.133 126.4 22.666 126.4h82.668c12.533 0 22.666-10.134 22.666-22.668V24.268C128 11.734 117.867 1.6 105.334 1.6H22.666zm23.201 31.734c4.373 0 8 .532 10.986 1.652A19.05 19.05 0 0 1 64 39.361a16.976 16.976 0 0 1 3.894 6.079c.8 2.24 1.225 4.533 1.225 6.933 0 4.587-1.066 8.373-3.2 11.36-2.132 2.986-5.118 5.227-8.585 6.507-3.627 1.334-7.627 1.813-12 1.813-1.28 0-2.135 0-2.668-.053-.533-.053-1.28-.053-2.293-.053v17.12c.053.373-.213.694-.586.747H29.44c-.426 0-.638-.215-.638-.695V34.24c0-.373.16-.588.533-.588.907 0 1.76 0 2.986-.052 1.28-.054 2.613-.052 4.053-.106 1.44-.053 2.987-.054 4.64-.107 1.654-.054 3.254-.053 4.854-.053zm1.19 10.504a18.68 18.68 0 0 0-.817.002c-1.386 0-2.613.001-3.627.055-1.066-.054-1.812-.001-2.185.052v17.92c.746.054 1.438.106 2.078.106h2.828c2.08 0 4.16-.32 6.133-.96 1.707-.48 3.2-1.494 4.373-2.827 1.12-1.334 1.654-3.146 1.654-5.493a8.776 8.776 0 0 0-1.226-4.746c-.907-1.386-2.188-2.454-3.735-3.04-1.727-.7-3.576-1.033-5.476-1.07zm44.73 2.723c2.187 0 4.427.158 6.613.478 1.6.213 3.146.642 4.586 1.229.214.053.427.265.533.478.054.213.108.427.108.64v8.694a.655.655 0 0 1-.266.533c-.48.107-.747.107-.96 0-1.6-.853-3.308-1.439-5.122-1.812-1.973-.427-3.946-.695-5.972-.695-1.067-.054-2.188.108-3.201.374-.694.16-1.28.534-1.653 1.067-.266.427-.426.96-.426 1.44s.214.96.534 1.386c.48.587 1.119 1.068 1.812 1.442a48.8 48.8 0 0 0 3.787 1.757c2.88.96 5.653 2.295 8.213 3.895 1.76 1.12 3.2 2.614 4.213 4.427a11.509 11.509 0 0 1 1.228 5.493 12.412 12.412 0 0 1-2.082 7.093 13.362 13.362 0 0 1-5.972 4.746c-2.614 1.12-5.814 1.707-9.654 1.707-2.454 0-4.852-.213-7.252-.693a21.51 21.51 0 0 1-5.44-1.707c-.373-.213-.641-.587-.588-1.014V78.24c0-.16.053-.374.213-.48.16-.107.32-.052.48.054a22.83 22.83 0 0 0 6.614 2.614c2.027.533 4.161.799 6.295.799 2.026 0 3.466-.267 4.426-.747.853-.373 1.439-1.28 1.439-2.24 0-.746-.426-1.441-1.28-2.135-.853-.693-2.613-1.492-5.226-2.505a32.638 32.638 0 0 1-7.574-3.84 13.81 13.81 0 0 1-4.053-4.533 11.44 11.44 0 0 1-1.226-5.44c0-2.293.639-4.48 1.812-6.453 1.333-2.133 3.308-3.84 5.602-4.906 2.506-1.28 5.652-1.867 9.44-1.867z"/></svg>` },
  { name: "Illustrator", category: "Design", logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 128 128"><path fill="%23e63946" d="M105.33 1.6H22.67A22.64 22.64 0 0 0 0 24.27v79.46a22.64 22.64 0 0 0 22.67 22.67h82.66A22.64 22.64 0 0 0 128 103.73V24.27A22.64 22.64 0 0 0 105.33 1.6Zm-27.09 88H67.09a.82.82 0 0 1-.85-.59l-4.37-12.74H42L38 88.8a.93.93 0 0 1-1 .75H27c-.58 0-.74-.32-.58-1l17.1-49.4c.16-.54.32-1.12.53-1.76a18.14 18.14 0 0 0 .32-3.47.54.54 0 0 1 .43-.59h13.81c.43 0 .64.16.7.43l19.46 54.93c.16.59 0 .86-.53.86Zm18.4-.6c0 .59-.21.85-.69.85H85.49a.75.75 0 0 1-.8-.85V47.89c0-.53.22-.74.7-.74H96c.48 0 .69.26.69.74Zm-1.12-48.2a6.3 6.3 0 0 1-4.85 1.87 6.61 6.61 0 0 1-4.75-1.87 6.87 6.87 0 0 1-1.81-4.91A6.23 6.23 0 0 1 86 31.15a6.8 6.8 0 0 1 4.74-1.87 6.4 6.4 0 0 1 4.86 1.87 6.75 6.75 0 0 1 1.76 4.74 6.76 6.76 0 0 1-1.84 4.91ZM58.67 65.44H45.12c.8-2.24 1.6-4.75 2.35-7.47s1.65-5.33 2.45-7.89a64.65 64.65 0 0 0 1.81-6.88h.11c.37 1.28.75 2.67 1.17 4.16s.91 3.09 1.44 4.75 1 3.25 1.55 4.9 1 3.15 1.44 4.59.91 2.72 1.23 3.84Z"/></svg>` },
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
  email: "azkaazeem804@gmail.com",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/azkaazeem/" },
    { name: "GitHub", url: "https://github.com/Azkaazeem" },
    { name: "Reddit", url: "https://www.reddit.com/user/Azkaazeem804/" },
  ],
};

export const cvUrl = cvPdf;
