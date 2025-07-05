"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useChatbot } from "@/components/chatbotContext"

export default function Projects() {
  const [isChatOpen, setIsChatOpen] = useState(false); // State to control chat visibility
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { openChatbot } = useChatbot();

  const CATEGORY_COLORS = {
    LLM: "text-purple-600",         // Purple
    "ML Systems": "text-green-600", // Green
    CV: "text-amber-600",          // Amber
    Robotics: "text-blue-600",    // Blue
  };

  const CATEGORY_DOT_CLASSES = {
    LLM: "bg-purple-600",
    "ML Systems": "bg-green-600",
    CV: "bg-amber-600",
    Robotics: "bg-blue-600",
  };

  const projects = [
    {
      title: "AI Research Assistant",
      description: "Intelligent assistant for answering research questions based on scientific papers using retrieval and generation.",
      technologies: ["AWS", "Docker", "Faiss", "HuggingFace", "LLM"],
      demo: "https://ai-research-assist.streamlit.app/",
      github: "https://github.com/tarek7669/ai_research_assistant",
      category: "LLM",
    },
    {
      title: "My Clone",
      description: "Personalized chatbot capable of contextual conversations powered by document retrieval.",
      technologies: ["LLM", "RAG", "ChromaDB", "LangChain", "OpenAI API"],
      demo: "#",
      category: "LLM",
    },
    {
      title: "Customer Support AI Agent",
      description: "Automated support agent for resolving customer queries with knowledge-based responses.",
      technologies: ["LangChain", "JSON", "RAG", "OpenAI API", "ChromaDB"],
      github: "https://github.com/tarek7669/Customer-Support-AI-Chatbot",
      category: "LLM",
    },
    {
      title: "RagBot",
      description: "Domain-aware AI chatbot with retrieval-augmented responses from custom datasets.",
      technologies: ["LangChain", "RAG", "chromaDB", "HuggingFace", "LLM"],
      github: "https://github.com/tarek7669/RAGBot",
      category: "LLM",
    },
    {
      title: "Movies Recommender",
      description: "System for suggesting movies based on user preferences and historical data.",
      technologies: ["Pandas", "Flask", "Numpy", "K-Fold", "Collaborative Filtering"],
      github: "https://github.com/tarek7669/Movie-Recommendation-System",
      category: "ML Systems",
    },
    {
      title: "Credit Card Approval Model",
      description: "Prediction model for assessing the likelihood of credit card approval.",
      technologies: ["Pandas", "Numpy", "Scikit", "Git", "K-Fold", "Classification"],
      github: "https://github.com/tarek7669/Credit-Card-Approval",
      category: "ML Systems",
    },
    {
      title: "Boston Housing Proce Prediction",
      description: "Estimation tool for predicting housing prices based on multiple features.",
      technologies: ["Python", "Scikit-learn", "SVM", "Pandas", "NumPy"],
      github: "https://github.com/tarek7669/Boston-Housing-Price-Prediction",
      category: "ML Systems",
    },
    {
      title: "Safe Intelligent Transportation",
      description: "Real-time detection system for traffic events and potential road hazards.",
      technologies: ["Python", "OpenCV", "PyTorch", "YOLOv8", "RNN", "Git", "Streamlit"],
      github: "https://github.com/tarek7669/traffic-accident-detection",
      category: "ML Systems",
    },
    {
      title: "Signature Detection",
      description: "System for identifying and verifying handwritten signatures in scanned documents.",
      technologies: ["Siamese Architecture", "YOLOv5", "Numpy", "TensorFlow", "OpenCV"],
      github: "https://github.com/tarek7669/Signature-Detection-YOLO",
      category: "CV",
    },
    {
      title: "Face Verification",
      description: "Matching system for verifying identity through facial features.",
      technologies: ["OpenCV", "Numpy", "TensorFlow", "YOLOv5", "Siamese Architecture"],
      github: "https://github.com/tarek7669/Face-Verification",
      category: "CV",
    },
    {
      title: "Maze Runner",
      description: "Autonomous robot navigation in a simulated maze environment.",
      technologies: ["ROS", "Linux", "Gazebo", "TurtleBot3", "Git", "OpenCV", "SLAM"],
      github: "https://github.com/tarek7669/maze_runner",
      category: "Robotics",
    },
    {
      title: "Lunar Lander",
      description: "Reinforcement learning agent for controlling a lunar lander in a simulated environment.",
      technologies: ["DQN", "OpenAI Gym", "TensorFlow", "Reinforcement Learning"],
      github: "https://github.com/tarek7669/Lunar-Lander",
      category: "Robotics",
    },
  ]

  const filteredProjects = selectedCategory
  ? projects.filter((project) => project.category === selectedCategory)
  : projects;

  return (
    <div>
      <h1 className="text-3xl mb-6">Projects</h1>
      <p className="text-xl mb-8">
        Here are some of the projects I've worked on.
      </p>

      <div className="mb-6 flex flex-wrap gap-3">
        {Object.keys(CATEGORY_DOT_CLASSES).map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(isSelected ? null : category)} // Toggle filter
              className={`flex items-center gap-2 px-3 py-1 rounded-xl border text-sm font-medium shadow-sm transition 
                ${isSelected ? "bg-white border-black text-black" : "bg-gray-100 border-black/10 text-gray-700"}`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${CATEGORY_DOT_CLASSES[category as keyof typeof CATEGORY_DOT_CLASSES]}`}></span>
              {category}
            </button>
          );
        })}

        <button
          onClick={() => setSelectedCategory(null)}
          className={`flex items-center gap-2 px-3 py-1 rounded-xl border text-sm font-medium shadow-sm transition 
            ${selectedCategory === null ? "bg-white border-black text-black" : "bg-gray-100 border-black/10 text-gray-700"}`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-400"></span>
          All
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <Card key={index} className="border-[#191919]">
            <CardHeader>
              <CardTitle className={`${CATEGORY_COLORS[project.category as keyof typeof CATEGORY_COLORS]}`}>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[#191919] opacity-80 mb-4">{project.description}</CardDescription>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <Badge key={i} className="bg-[#191919] text-[#e6e6e6]">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="flex gap-4">
            { project.github && (
              <Link href={project.github} target="_blank" className="flex items-center text-sm hover:underline">
                <Github className="mr-1 h-4 w-4" />
                GitHub
              </Link>
            )}
            { project.demo && project.title === "My Clone" && (
              <button
                onClick={openChatbot}
                className="flex items-center text-sm hover:underline"
              >
                <ExternalLink className="mr-1 h-4 w-4" />
                Live Demo
              </button>
            )}{ project.demo && project.title !== "My Clone" && (
              <Link href={project.demo} target="_blank" className="flex items-center text-sm hover:underline">
                <ExternalLink className="mr-1 h-4 w-4" />
                Live Demo
              </Link>
            )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
