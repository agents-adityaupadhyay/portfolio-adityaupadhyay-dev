/*
  Portfolio content lives here.
  Edit, add, remove or reorder items and the page updates itself.

  Projects:   set demo, repo and video links per project ("" hides the button).
              impact: one measurable result, shown as a highlighted line ("" hides it).
              featured: true makes the card twice as wide on large screens.
  Videos:     set youtubeId to the part after "v=" in a YouTube link
              (https://www.youtube.com/watch?v=XXXXXXXXXXX). Videos without one are
              hidden, and the whole Videos section is hidden if none have one.
  Any section whose list is empty is hidden along with its nav link.
  Links:      your social profiles and email.
*/

window.PORTFOLIO = {
  links: {
    email: "hello@adityaupadhyay.dev",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    youtube: "https://www.youtube.com/"
  },

  categories: {
    integration: "Integration",
    ai: "AI agents",
    platform: "Platform"
  },

  projects: [
    {
      title: "Tidewater",
      category: "integration",
      year: "2026",
      client: "Port logistics operator",
      summary: "Every container had a story spread across six systems that never spoke. Tidewater stitched them into one live timeline, so a planner can answer \"where is it?\" in seconds instead of three phone calls.",
      impact: "Container status lookup: three phone calls → seconds",
      featured: true,
      stack: ["Kafka", "Java", "REST", "Event sourcing"],
      demo: "", repo: "", video: ""
    },
    {
      title: "Lantern",
      category: "ai",
      year: "2026",
      client: "SaaS support team",
      summary: "An AI agent that reads runbooks, past tickets and logs, then drafts the fix before an engineer opens the ticket. Humans approve, Lantern learns which answers stuck.",
      impact: "",
      featured: true,
      stack: ["Python", "LLM agents", "RAG", "Postgres"],
      demo: "", repo: "", video: ""
    },
    {
      title: "Switchyard",
      category: "integration",
      year: "2025",
      client: "Regional telecom carrier",
      summary: "Billing, CRM and provisioning each had their own idea of a customer. Switchyard gave them one canonical contract and a routing layer that new channels plug into in days, not quarters.",
      impact: "New channel onboarding: quarters → days",
      featured: true,
      stack: ["TIBCO BWCE", "SOAP", "Canonical model", "XSD"],
      demo: "", repo: "", video: ""
    },
    {
      title: "Ledgerline",
      category: "platform",
      year: "2025",
      client: "Retail chain, 400 stores",
      summary: "A reconciliation engine that matches point of sale, warehouse and finance records overnight and flags only the mismatches worth a human look.",
      stack: ["Java", "Spring Batch", "Oracle", "Docker"],
      demo: "", repo: "", video: ""
    },
    {
      title: "Fieldnote",
      category: "ai",
      year: "2024",
      client: "Utilities field services",
      summary: "Technicians talk, Fieldnote writes. A voice to ticket agent that turns a two minute site recap into a structured work order, parts list included.",
      stack: ["Speech to text", "LLM agents", "TypeScript"],
      demo: "", repo: "", video: ""
    },
    {
      title: "Keystone",
      category: "platform",
      year: "2024",
      client: "Internal platform team",
      summary: "A drop-in observability kit: one logging format, trace IDs that survive every hop, and dashboards that answer the 2 a.m. question before anyone asks it.",
      stack: ["OpenTelemetry", "Grafana", "Java", "Maven"],
      demo: "", repo: "", video: ""
    }
  ],

  experience: [
    {
      when: "2024 to Present",
      role: "Forward Deployed Engineer",
      org: "[Company name], Integration and AI",
      points: [
        "Embedded with enterprise customers to design and ship integration platforms end to end.",
        "Introduced a layered service pattern and canonical data model now used as the team default.",
        "Built AI agents that cut first response time for operations teams."
      ]
    },
    {
      when: "2021 to 2024",
      role: "Integration Engineer",
      org: "[Company name], Middleware",
      points: [
        "Delivered high volume service integrations across billing, CRM and network platforms.",
        "Created a shared logging library adopted across every service the team owned."
      ]
    },
    {
      when: "2021",
      role: "B.Tech, Computer Science",
      org: "[University name]",
      points: []
    }
  ],

  writing: {
    articles: [
      { date: "Sep 2026", title: "The first week on site is worth more than the next ten", blurb: "Why I spend day one listening, and the four questions that always find the real bottleneck.", read: "7 min", href: "#" },
      { date: "Jul 2026", title: "One contract to rule them all", blurb: "Designing a canonical data model that three stubborn systems will actually agree to.", read: "9 min", href: "#" },
      { date: "May 2026", title: "Agents need runbooks too", blurb: "What an AI support agent taught me about writing documentation for humans.", read: "6 min", href: "#" }
    ],
    blogs: [
      { date: "Aug 2026", title: "Notes from a container yard at 5 a.m.", blurb: "Building Tidewater taught me that the best spec is standing next to the person who will use it.", read: "5 min", href: "#" },
      { date: "Jun 2026", title: "Shipping on a Friday, on purpose", blurb: "A small case for boring deploys and the rituals that make them boring.", read: "4 min", href: "#" },
      { date: "Mar 2026", title: "The integration engineer's reading list", blurb: "Twelve books and papers that changed how I connect systems.", read: "6 min", href: "#" }
    ],
    tutorials: [
      { date: "Sep 2026", title: "Build a retrieval agent over your runbooks in an afternoon", blurb: "Python, a vector store and a little discipline about chunking.", read: "14 min", href: "#" },
      { date: "Jun 2026", title: "A shared logging library in Java, step by step", blurb: "Package it with Maven, add trace IDs, and reuse it in every service.", read: "11 min", href: "#" },
      { date: "Apr 2026", title: "Event sourcing for people who just want it to work", blurb: "From an empty Kafka topic to a replayable timeline you can trust.", read: "16 min", href: "#" }
    ]
  },

  videos: [
    { title: "Tidewater: one container, six systems, one timeline", tag: "Demo", duration: "12:40", blurb: "Follow a single shipment from gate-in to vessel across every system it touches.", youtubeId: "" },
    { title: "Lantern drafts a fix before the ticket is read", tag: "Demo", duration: "08:15", blurb: "A live run of the support agent on a real-world style incident.", youtubeId: "" },
    { title: "Canonical data models, explained on a whiteboard", tag: "Tutorial", duration: "18:02", blurb: "How to get three systems to agree on what a customer is.", youtubeId: "" },
    { title: "Shared logging in Java from scratch", tag: "Tutorial", duration: "21:30", blurb: "Build, package and roll out one logger across a fleet of services.", youtubeId: "" }
  ],

  repos: [
    { name: "keystone-observe", desc: "Drop-in logging and tracing kit for Java services.", lang: "Java", color: "#B07219", href: "#" },
    { name: "lantern-agent", desc: "Runbook-aware support agent with a human approval loop.", lang: "Python", color: "#3572A5", href: "#" },
    { name: "switchyard-patterns", desc: "Reference templates for layered integration services.", lang: "XSD", color: "#6B6E76", href: "#" },
    { name: "fieldnote", desc: "Voice notes in, structured work orders out.", lang: "TypeScript", color: "#3178C6", href: "#" }
  ]
};
