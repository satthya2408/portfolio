/** Portfolio copy — Satthya Jeevaa. Facts from the Google Doc, written in simple words. */
const IMG = "assets/images";

window.PORTFOLIO = {
  name: "Satthya Jeevaa",
  role: "Digital Marketing Strategist",
  location: "Chennai, Tamil Nadu",
  practice: "Gen'Z Digital Marketing",
  email: "satthya2408@gmail.com",
  linkedin: "",
  instagram: "https://www.instagram.com/genz.digital.marketing/",
  resumeUrl: "#",
  resumePdf: "#",
  imageCredit: "Photos from Unsplash",

  images: {
    hero: `${IMG}/hero.jpg`,
    philosophy: `${IMG}/philosophy.jpg`,
    video: `${IMG}/video.jpg`,
    about: `${IMG}/about.jpg`,
    fallback: `${IMG}/hero.jpg`,
  },

  home: {
    kicker: "Strategy · Content · Results",
    title: "SATTHYA JEEVAA",
    roleLine: "Digital marketing strategist",
    headline: "I help brands turn ideas into content, ads, and real results.",
    subhead:
      "Campaigns, videos, and experiments for shops, products, and B2B teams — shown through work I actually shipped.",
  },

  philosophy: {
    title: "From idea to result",
    paragraphs: [
      "Marketing does not start with a perfect plan. It starts with questions. Then we try, watch, and improve.",
      "I help a business say the right thing, show it on the right channels, and see how people respond.",
    ],
  },

  whatIDo: {
    intro: "Four things I do on most projects.",
    items: [
      {
        title: "Ideas",
        desc: "Find the message, the hook, and the story before we film or post.",
        image: `${IMG}/tile-strategy.jpg`,
      },
      {
        title: "Content",
        desc: "Write reels, scripts, posts, and product stories people can follow.",
        image: `${IMG}/tile-content.jpg`,
      },
      {
        title: "Ads",
        desc: "Run Meta, Google, and WhatsApp ads. Track cost and quality of leads.",
        image: `${IMG}/tile-paid.jpg`,
      },
      {
        title: "Follow-up",
        desc: "Set up WhatsApp, LinkedIn, and CRM so enquiries don’t get lost.",
        image: `${IMG}/tile-outreach.jpg`,
      },
    ],
  },

  /** GIF previews in assets/gifs/ (10s loops; full MP4s in assets/videos/) */
  showcaseReels: [
    { gif: "assets/gifs/reel-1.gif" },
    { gif: "assets/gifs/reel-2.gif" },
    { gif: "assets/gifs/reel-3.gif" },
    { gif: "assets/gifs/reel-4.gif" },
    { gif: "assets/gifs/reel-5.gif" },
    { gif: "assets/gifs/reel-6.gif" },
  ],

  performance3d: [
    { label: "SV Plymart leads", value: 416, unit: "enquiries", color: "#e8a87c", change: "+231%" },
    { label: "Murali RO chats", value: 580, unit: "WhatsApp", color: "#7eb8da", change: "+42%" },
    { label: "Guhan Meta chats", value: 87, unit: "enquiries", color: "#a8d5a2", change: "+18%" },
    { label: "SV Instagram growth", value: 520, unit: "followers", color: "#d4a5e8", change: "+289%" },
  ],

  marketAnalysis: {
    pair: "ENGAGEMENT · LEADS",
    period: "12-week view",
    trendLabel: "Combined campaign volume",
    weeks: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
    trend: [48, 62, 78, 96, 124, 158, 198, 248, 302, 358, 412, 478],
  },

  projects: [
    {
      id: "sv-plymart",
      title: "SV Plymart",
      category: "Full digital marketing",
      duration: "3 months",
      image: `${IMG}/project-sv.jpg`,
      tags: ["Strategy", "Content", "Video", "Ads"],
      role: "I handled strategy, scripts, shoots, ads, and reporting.",
      summary: "Content, video, and ads for a ply store — from idea to leads.",
      paragraphs: [
        "For three months I planned content, ran Meta ads, managed Google Business, shot live videos, and made AI-assisted videos.",
        "I wrote scripts, planned shots, coordinated the team, and checked results on each channel.",
        "The ads brought 416 product enquiries. Average cost was ₹30.24 per lead. The best campaign brought 312 leads at ₹17.83 each. Instagram grew from 180 to about 700 followers.",
      ],
      metrics: [
        { value: "416", label: "Product enquiries" },
        { value: "₹30.24", label: "Cost per lead" },
        { value: "₹17.83", label: "Best campaign cost" },
        { value: "180 → 700", label: "Instagram growth" },
      ],
      link: "#",
    },
    {
      id: "murali-ro",
      title: "Murali RO Systems",
      category: "Social + WhatsApp",
      duration: "2 months",
      image: `${IMG}/project-murali.jpg`,
      tags: ["Content", "Video", "Ads", "Outreach"],
      role: "I built the social presence and used reels to start WhatsApp chats.",
      summary: "Product reels that turned views into WhatsApp conversations.",
      paragraphs: [
        "In two months I set up the brand’s social pages and used product reels to start customer chats on WhatsApp.",
        "The campaigns started 580 WhatsApp conversations at ₹8.24 each on average. The best reel started 542 chats at ₹6.79 each.",
      ],
      metrics: [
        { value: "580", label: "WhatsApp chats" },
        { value: "₹8.24", label: "Cost per chat" },
        { value: "₹6.79", label: "Best reel cost" },
      ],
      link: "#",
    },
    {
      id: "shree-guhan",
      title: "Shree Guhan Engineering",
      category: "B2B leads + CRM",
      duration: "Short project",
      image: `${IMG}/project-guhan.jpg`,
      tags: ["Strategy", "Ads", "Outreach"],
      role: "I ran Meta message ads, set up CRM, and sent WhatsApp updates.",
      summary: "B2B ads and follow-up for a construction engineering firm.",
      paragraphs: [
        "This was a short B2B project for a construction engineering company. I ran Meta message ads, organised the CRM, and handled WhatsApp communication.",
        "We got 87 Meta message enquiries. I set up Zoho Bigin for the pipeline and tasks. AiSensy was used to update about 10,000 existing contacts about services and expo news.",
      ],
      metrics: [
        { value: "87", label: "Meta enquiries" },
        { value: "10,000", label: "Contacts reached" },
      ],
      link: "#",
    },
    {
      id: "smart-connections",
      title: "Smart Connections",
      category: "Product + LinkedIn",
      duration: "3 months",
      image: `${IMG}/project-smart.jpg`,
      tags: ["Content", "Video", "Outreach"],
      role: "I explained the product clearly and reached buyers on LinkedIn.",
      summary: "Clear product story and LinkedIn outreach for an NFC brand.",
      paragraphs: [
        "This was a three-month project for a Cayman-based NFC product company.",
        "I worked on how the product was explained, wrote blogs and social posts, made AI-assisted product videos, and reached people on LinkedIn Sales Navigator. The goal was simple: make the offer easy to understand everywhere.",
      ],
      metrics: [
        { value: "3 months", label: "Project length" },
        { value: "Blogs + video", label: "Content mix" },
        { value: "LinkedIn", label: "B2B outreach" },
      ],
      link: "#",
    },
  ],

  workSection: {
    featuredTitle: "Our Work",
    featuredLead: "Four projects with a clear story and numbers we could check.",
  },

  areasTitle: "How I help",
  areasOfWork: [
    {
      title: "Research",
      text: "Learn the goal, audience, competitors, and what the brand already says.",
    },
    {
      title: "Content",
      text: "Write posts, reel scripts, storyboards, and product messages.",
    },
    {
      title: "Production",
      text: "Plan live and AI videos. Work with editors, designers, and shooters.",
    },
    {
      title: "Campaigns",
      text: "Run ads and organic posts on Meta, Google, YouTube, LinkedIn, WhatsApp, and Google Business.",
    },
    {
      title: "Analytics",
      text: "Watch YouTube, ads, and social data. See what to keep and what to change.",
    },
    {
      title: "Follow-up",
      text: "Use Zoho Bigin, AiSensy, and LinkedIn so leads get a reply.",
    },
  ],

  industries: {
    title: "Industries",
    body: "I have worked in construction, manufacturing, real estate, interiors, retail, fashion, tech, and local services.",
    clients:
      "Clients include SV Plymart, Murali RO Systems, Shree Guhan Engineering, Smart Connections, Alexa Interiors, Vamanan Estates, Vikaa Housing, Khaviya Enterprises, Suchi Frictions, Jeevaa Fashion, and Speedy Die Makers.",
    cta: "Want the full list of videos and ads? Open a project above, or write to me.",
  },

  clientsList: [
    "SV Plymart",
    "Murali RO Systems",
    "Shree Guhan Engineering",
    "Smart Connections",
    "Alexa Interiors",
    "Vamanan Estates",
    "Vikaa Housing",
    "Khaviya Enterprises",
    "Suchi Frictions",
    "Jeevaa Fashion",
    "Speedy Die Makers",
  ],

  videoPortfolio: {
    title: "Video",
    body: "Live shoots, edits, and AI videos for social, YouTube, products, and ads — from script to publish.",
  },

  channels: [
    {
      title: "Google Ads",
      text: "Plan keywords, run campaigns, and review reports.",
      image: `${IMG}/channel-google.jpg`,
    },
    {
      title: "YouTube",
      text: "Upload videos, write titles, and check views, watch time, and traffic.",
      image: `${IMG}/channel-youtube.jpg`,
    },
    {
      title: "LinkedIn",
      text: "Write posts and reach buyers with Sales Navigator — used on Smart Connections.",
      image: `${IMG}/channel-linkedin.jpg`,
    },
  ],

  processTitle: "Six simple steps",
  process: [
    { step: "01", title: "Understand", text: "Learn the business, people, goal, and limits." },
    { step: "02", title: "Plan", text: "Choose the message, channels, and campaign shape." },
    { step: "03", title: "Create", text: "Make scripts, ads, videos, posts, or follow-up flows." },
    { step: "04", title: "Ship", text: "Work with the client and specialists to go live." },
    { step: "05", title: "Watch", text: "See how people react and what the ads cost." },
    { step: "06", title: "Improve", text: "Keep what worked. Change what didn’t." },
  ],

  msme: {
    title: "My practice",
    paragraphs: [
      "I started as a freelancer. The work grew into Gen'Z Digital Marketing, now a registered MSME.",
      "That is the name I use for client work, collaborators, and delivery.",
    ],
  },

  toolsTitle: "Tools I use",
  toolGroups: [
    {
      title: "Ads",
      items: "Meta Ads Manager · Meta Business Suite · Google Ads · Keyword Planner · Google Business",
    },
    {
      title: "Channels",
      items: "YouTube Studio · YouTube Analytics · LinkedIn · Sales Navigator",
    },
    { title: "CRM", items: "Zoho Bigin · AiSensy" },
    {
      title: "Content",
      items: "Excel · Canva · Notion · AI writing and video tools",
    },
  ],

  resume: {
    body: "A short record of strategy, content, ads, follow-up, and project work.",
  },

  about: {
    contextTitle: "About me",
    context: [
      "I learned digital marketing on my own and took freelance jobs. There was no big plan at first. One project led to the next. The work later became Gen'Z Digital Marketing.",
      "I have worked with more than 13 B2B and consumer brands. Some needed a new content direction. Some needed their first digital presence. Some needed a clearer product story.",
      "My job often spans the full path: research, scripts, shoots, ads, client updates, and reports. People see one brand — not separate teams.",
    ],
    approachTitle: "How I think",
    approach: [
      "I start with the goal, the audience, and what the business can actually keep doing.",
      "A creative idea still needs a purpose. An ad needs a follow-up. A content plan should match real capacity. Numbers then show what people responded to.",
      "Not every problem needs more content. Sometimes we first find what is missing.",
    ],
  },

  contact: {
    intro: "For jobs, projects, or a quick hello — email is best.",
    opportunities: {
      title: "Jobs",
      body: "Open to digital marketing, growth, content, and product marketing roles.",
    },
    projects: {
      title: "Projects",
      body: "Happy to talk about campaigns, content, ads, or video production.",
    },
  },
};
