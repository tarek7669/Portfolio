import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

export default function Certifications() {
  const certifications = [
    {
      title: "Building AI Browser Agents",
      issuer: "DeepLarning.AI",
      date: "2025",
      url: "https://learn.deeplearning.ai/accomplishments/049f306c-8bbd-4cd1-908b-c51d8b005557?usp=sharing",
    },
    {
      title: "Serverless Agentic Workflows with Amazon Bedrock",
      issuer: "DeeLearning.AI",
      date: "2025",
      url: "https://learn.deeplearning.ai/accomplishments/411c6ef0-a38f-40a2-9d3f-119996668ee7?usp=sharing",
    },
    {
      title: "LangChain for LLM Application Development",
      issuer: "DeeLearning.AI",
      date: "2025",
      url: "https://learn.deeplearning.ai/accomplishments/6db0175c-3d63-4d75-b93a-11692a8fe17e?usp=sharing",
    },
    {
      title: "Machine Learning Modeling Pipelines in Production",
      issuer: "Coursera",
      date: "2024",
      url: "https://coursera.org/share/1c2ceb500b64599ce4d89e9ce3f0413c",
    },
    {
      title: "Machine Learning Data Lifecycle in Production",
      issuer: "Coursera",
      date: "2023",
      url: "https://coursera.org/share/56757ec6847e22cfcf3800f6d30cfa4f",
    },
    {
      title: "Machine Learning in Production",
      issuer: "Coursera",
      date: "2023",
      url: "https://coursera.org/share/06e753010791875e8807104d386adaaf",
    },
    {
      title: "Generative AI with Large Language Models",
      issuer: "Coursera",
      date: "2023",
      url: "https://coursera.org/share/f788bc5d2dd6af0d3d64068a0fbfc5d4",
    },
    {
      title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
      issuer: "Coursera",
      date: "2023",
      url: "https://coursera.org/share/56757ec6847e22cfcf3800f6d30cfa4f",
    },
    {
      title: "Natural Language Processing with Classification and Vector Spaces",
      issuer: "Coursera",
      date: "2022",
      url: "https://coursera.org/share/3126578ecce87f91687b6d379a763081",
    },
    {
      title: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
      issuer: "Coursera",
      date: "2022",
      url: "https://coursera.org/share/1f7a333de72a9f0c743107bcd364eda9",
    },
  ]

  return (
    <div>
      <h1 className="text-3xl mb-6">Certifications</h1>
      <p className="text-xl mb-8">
        Here are some of my professional certifications.
      </p>

      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <Card key={index} className="border-[#191919]">
            <CardHeader>
              <div className="flex justify-between items-start">
                {/* <CardTitle>{cert.title}</CardTitle> */}
                <Link href={cert.url} target="_blank" className="flex items-center text-sm hover:underline">
                {/* <Github className="mr-1 h-4 w-4" /> */}
                <CardTitle>{cert.title}</CardTitle>
                </Link>
                <Badge className="bg-[#191919] text-[#e6e6e6] flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {cert.date}
                </Badge>
              </div>
              <CardDescription className="text-[#191919] opacity-80">Issued by {cert.issuer}</CardDescription>
            </CardHeader>
            {/* <CardContent>
              <a href={cert.url}>Certificate</a>
            </CardContent> */}
          </Card>
        ))}
      </div>
    </div>
  )
}
