export const emptyCvData = {
  personal: { name: "", email: "", phone: "", location: "", linkedin: "", github: "" },
  education: [],
  experience: [],
  skills: [],
};

export const exampleCvData = {
  personal: {
    name: "Eima Tesfaye",
    email: "eima@example.com",
    phone: "+251901234567",
    location: "Addis Ababa, Ethiopia",
    linkedin: "linkedin.com/in/eima",
    github: "github.com/eima",
  },
  education: [
    {
      id: "1",
      school: "Addis Ababa University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      from: "2020",
      to: "2024",
    },
  ],
  experience: [
    {
      id: "1",
      company: "Tech Solutions Inc.",
      role: "Software Engineer",
      from: "2024",
      to: "Present",
      description: "Built and maintained web applications using React and Node.js, collaborated with a small team on feature development and bug fixes.",
    },
  ],
  skills: ["JavaScript", "React", "Node.js"],
};