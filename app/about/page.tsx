export default function About() {
  return (
    <div>
      <h1 className="text-3xl mb-6">About Me</h1>
      <p className="text-xl mb-4" style={{ color: "#191919da" }}>
      Hey, I’m Tarek Ashraf, and I’m from Cairo, Egypt. I’ve always been fascinated by how things work and how ideas can turn into something real. 
      That curiosity led me to study Computer and Information Science at Ain Shams University, but more than just a degree, 
      it gave me a way to explore my passion for problem-solving and creativity. I believe that growth comes from constantly learning, taking on challenges, 
      and pushing beyond comfort zones.
      </p>
      <p className="text-xl mb-4" style={{ color: "#191919da" }}>
      I’m passionate about innovation, building meaningful things, and surrounding myself with people who are just as driven and curious. 
      I love the feeling of figuring things out, improving every day, and working toward something bigger than myself. 
      Right now, I’m looking for opportunities where I can learn, contribute, and grow, while doing work that excites and challenges me.
      </p>

      <h2 className="text-2xl mt-8 mb-4">Skills</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Machine Learning</li>
        <li>Deep Learning</li>
        <li>Natural Language Processing</li>
        <li>Computer Vision</li>
        <li>Data Science</li>
      </ul>

      {/* <h2 className="text-2xl mt-8 mb-4">Experience</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl">Co-Founder & CTO @ Parajob</h3>
          <p className="text-sm">2020 - Present</p>
          <p className="mt-2">Description of your role and responsibilities at Parajob.</p>
        </div>

        <div>
          <h3 className="text-xl">ML Engineer @ Previous Company</h3>
          <p className="text-sm">2018 - 2020</p>
          <p className="mt-2">Description of your role and responsibilities at your previous company.</p>
        </div>
      </div> */}
    </div>
  )
}
