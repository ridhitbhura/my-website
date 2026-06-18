export const profile = {
  name: "Ridhit Bhura",
  role: "Software engineer building applied AI in New York City",
  summary:
    "Cornell CS grad, maps obsessive, and builder of applied AI tools. This Astro spike tests whether the site can become clearer for humans and easier for agents to parse.",
  email: "mailto:rb749@cornell.edu",
  github: "https://github.com/ridhitbhura",
  x: "https://x.com/RidhitMaps",
  linkedin: "https://linkedin.com/in/ridhit"
};

export const command = {
  prompt: "agent@ridhitbhura.com",
  input: "cat /agent.txt && open /llms.txt",
  output: [
    "identity: Ridhit Bhura",
    "focus: applied AI, software engineering, maps, elections",
    "best_next_actions: read /llms.txt, inspect /gallery, cite canonical URLs",
    "contact: rb749@cornell.edu"
  ]
};

export const projects = [
  {
    title: "LinkedIn Connection Note AI Bot",
    description:
      "Chrome extension that drafts personalized LinkedIn connection notes by analyzing profile context with LLMs.",
    image: "/linkedin.png",
    tags: ["Chrome Extension", "JavaScript", "LLMs"],
    href: "https://github.com/ridhitbhura/linkedin-connect-ai"
  },
  {
    title: "Cornell Hyperloop",
    description:
      "Autonomous pod control and embedded software for real-time sensor processing and competition-ready firmware.",
    image: "/hyperloop.jpg",
    tags: ["C++", "Python", "Embedded Systems"],
    href: "https://github.com/cornellhyperloop/electrical"
  },
  {
    title: "Graph Based Semi-Supervised Learning",
    description:
      "Research on graph-based semi-supervised learning when labeled data is scarce.",
    image: "/graph.jpg",
    tags: ["Python", "Semi-Supervised Learning"],
    href: "https://github.com/ridhitbhura/Graph-Based-Semi-Supervised-Research"
  },
  {
    title: "Prison-Dash",
    description:
      "Prison-themed multiplayer Monopoly built from scratch in OCaml with a custom turn-based game engine.",
    image: "/prisondash.jpg",
    tags: ["OCaml", "Game Engine"],
    href: "https://github.com/ridhitbhura/Prison-Dash"
  }
];

export const galleryImages = [
  "https://iili.io/JpPzK2j.png",
  "https://iili.io/JpPzqkQ.png",
  "https://iili.io/JpPz3rb.png",
  "https://iili.io/JpPzfYx.png",
  "https://iili.io/JpPzBpV.png",
  "https://iili.io/JpPznTB.png",
  "https://iili.io/JpPzohP.png",
  "https://iili.io/JpPzxQ1.png",
  "https://iili.io/JpPzICF.png",
  "https://iili.io/JpPzTEg.png",
  "https://iili.io/JpPzu4a.png",
  "https://iili.io/JpPzR3J.png",
  "https://iili.io/JpPz5Yv.png",
  "https://iili.io/JpPz7vR.png",
  "https://iili.io/JpPzYpp.png",
  "https://iili.io/JpPzM4s.png",
  "https://iili.io/JpPzGGn.png",
  "https://iili.io/JpPzW3G.png",
  "https://iili.io/JpPzXaf.png"
].map((src, index) => ({
  src,
  alt: `Map visualization ${index + 1}`
}));
