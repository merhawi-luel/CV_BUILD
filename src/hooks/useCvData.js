import { useState } from "react";
import { emptyCvData } from "../data/initialCvData";

export function useCvData() {
  const [cvData, setCvData] = useState(emptyCvData);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [name]: value },
    }));
  };

  const addEducation = () => {
    setCvData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now(), school: "", degree: "", field: "", from: "", to: "" },
      ],
    }));
  };

  const removeEducation = (id) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((entry) => entry.id !== id),
    }));
  };

  const handleEducationChange = (id, e) => {
    const { name, value } = e.target;
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((entry) =>
        entry.id === id ? { ...entry, [name]: value } : entry
      ),
    }));
  };

  const addExperience = () => {
    setCvData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: Date.now(), company: "", role: "", from: "", to: "", description: "" },
      ],
    }));
  };

  const removeExperience = (id) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((entry) => entry.id !== id),
    }));
  };

  const handleExperienceChange = (id, e) => {
    const { name, value } = e.target;
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((entry) =>
        entry.id === id ? { ...entry, [name]: value } : entry
      ),
    }));
  };

  const addSkill = (skill) => {
    if (!skill.trim()) return;
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill.trim()],
    }));
  };

  const removeSkill = (skillToRemove) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  return {
    cvData,
    handlePersonalChange,
    addEducation,
    removeEducation,
    handleEducationChange,
    addExperience,
    removeExperience,
    handleExperienceChange,
    addSkill,
    removeSkill,
  };
}