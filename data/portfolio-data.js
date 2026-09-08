/* Knowledge base for the portfolio assistant (chatbot.js). Plain data —
   edit freely. Each topic has trigger keywords and the answer to give. */
window.PORTFOLIO_KB = {
  name: 'Gupta Prasad Adhikari',
  greeting: "Hi — I'm Gupta's portfolio assistant. I can walk you through his projects, background, skills or how to get in touch. What would you like to know?",
  chips: ['His projects', 'BFSI Risk platform', 'AI design work', 'Background', 'Contact'],
  fallback: "I'm not sure about that one. Try asking about his <strong>projects</strong>, <strong>skills</strong>, <strong>experience</strong>, <strong>education</strong>, or how to <strong>contact</strong> him.",

  topics: [
    {
      keys: ['project', 'work', 'portfolio', 'case stud', 'built', 'made'],
      answer: "Five flagship case studies: <strong>BFSI Risk Intelligence</strong> (lending risk with explainable scoring), <strong>YatraAI</strong> (fair group travel planning — hackathon winner), <strong>Vidyapeeth360</strong> (AI-native school ERP), <strong>aayiq</strong> (omnichannel CX with AI-to-human handoff) and <strong>Sleuth</strong> (multi-agent research console). Plus four research explorations. Each has a full write-up under <a href='index.html#work'>Work</a>."
    },
    {
      keys: ['bfsi', 'risk', 'credit', 'fraud', 'lending', 'fintech', 'bank', 'churn', 'collection'],
      answer: "<strong>BFSI Risk Intelligence</strong> covers four lending-risk decisions — credit, fraud, churn and collections — on one shared pipeline. The design centres on an explainability panel so a credit officer can defend a decision to a customer, and it reports precision, recall and ROC-AUC rather than accuracy (which flatters a useless model on a 5% fraud class). <a href='https://gupta-financial-risk-management.streamlit.app' target='_blank' rel='noopener'>Open the live app ↗</a> · <a href='case-study.html?p=bfsi-risk'>Read the case study</a>."
    },
    {
      keys: ['yatra', 'travel', 'trip', 'itinerary', 'hackathon', 'group', 'fair'],
      answer: "<strong>YatraAI</strong> is a group travel planner that optimises for the least-satisfied member instead of the average — it raised that person's score from 0.481 to 0.522 and cut travel time 43% with a constraint solver. Its RAG assistant scores 0.995 faithfulness and never guesses. It won the April cohort hackathon. <a href='https://yatraai-chi.vercel.app' target='_blank' rel='noopener'>Open the live demo ↗</a> · <a href='case-study.html?p=yatraai'>Read the case study</a>."
    },
    {
      keys: ['vidyapeeth', 'school', 'erp', 'education', 'k-12', 'aira'],
      answer: "<strong>Vidyapeeth360</strong> is a K-12 school ERP at HelpRevX. Gupta designed the complete website UI from wireframes to shipped screens, created the logos for both Vidyapeeth360 and HelpRevX (one shared brand system), designed the school registration and onboarding flow, and built the information architecture, database design and API spec. The core idea: four audiences (principal, teacher, parent, student) get four different first screens over one data model. <a href='https://vidyapeeth360.com' target='_blank' rel='noopener'>See the live site ↗</a>. <a href='case-study.html?p=vidyapeeth360'>Read the case study</a>."
    },
    {
      keys: ['aayiq', 'omnichannel', 'customer', 'support', 'whatsapp', 'handoff', 'escalat', 'chat'],
      answer: "<strong>aayiq</strong> is HelpRevX's omnichannel CX platform across WhatsApp, WebChat, Email, SMS and Voice. Gupta built the LLM workflows for intent classification, retrieval and escalation — and designed the handoff moment so a customer feels passed to a human, not abandoned by a bot. <a href='case-study.html?p=aayiq'>Read the case study</a>."
    },
    {
      keys: ['sleuth', 'agent', 'multi-agent', 'langgraph', 'research', 'detective'],
      answer: "<strong>Sleuth</strong> is a nine-agent research system (LangGraph + FastAPI + Next.js) that produces cited briefings. The design problem was making a three-minute parallel run legible — an agent graph with exactly three node states, and a report that streams in with citations. <a href='case-study.html?p=sleuth'>Read the case study</a>."
    },
    {
      keys: ['ai', 'llm', 'claude', 'rag', 'explain', 'trust', 'model'],
      answer: "Gupta's focus is <strong>AI as a design material</strong> — how a model explains itself, signals uncertainty, and hands control back to a person. That shows up as the explainability panel in BFSI, the abstention path in YatraAI, the handoff design in aayiq, and the agent graph in Sleuth. He builds the LLM workflows as well as designing the interface around them."
    },
    {
      keys: ['skill', 'tool', 'stack', 'figma', 'tech', 'language', 'python', 'react', 'code'],
      answer: "<strong>Design:</strong> Figma, FigJam, wireframing, prototyping, design systems, developer hand-off.<br><strong>Build:</strong> TypeScript, JavaScript, Python, React/Next.js, FastAPI, NestJS, PostgreSQL, pgvector, Prisma, Redis.<br><strong>AI/ML:</strong> LLMs, RAG, prompt engineering, embeddings, hybrid retrieval, scikit-learn, model evaluation.<br><strong>Other:</strong> Docker, Git, OR-Tools, Power BI, SQL."
    },
    {
      keys: ['experience', 'intern', 'helprevx', 'job', 'role', 'company'],
      answer: "Gupta is an <strong>Applied AI Engineer Intern — Product &amp; UI/UX at HelpRevX</strong> (May 2026 – present). On Vidyapeeth360 he designed the complete website UI from wireframes to shipped screens, created the logos for both Vidyapeeth360 and HelpRevX, and designed the school onboarding flow; on aayiq he designed the AI-to-human handoff. Alongside that: winner of the April cohort hackathon with YatraAI, Secretary of AXIOM (Mathematics Club, 500+ participant events) and President of LEO Club at NIT Rourkela."
    },
    {
      keys: ['education', 'college', 'university', 'nit', 'rourkela', 'degree', 'study', 'cgpa'],
      answer: "B.Tech in <strong>Industrial Design Engineering</strong> at <strong>NIT Rourkela</strong> (Sept 2023 – May 2027 expected, CGPA 7.30). Coursework: UI/UX design principles, human-centred design, interaction design, wireframing and prototyping, user research and design thinking — with machine learning, statistics, DSA and databases alongside."
    },
    {
      keys: ['leetcode', 'dsa', 'algorithm', 'competitive', 'problem'],
      answer: "<strong>LeetCode:</strong> 1,605 contest rating (top 23.6% globally, 12 contests), 462 problems solved — 167 easy, 247 medium, 48 hard — 719 submissions in the past year with an 81-day max streak, mostly in Python and SQL. It's the habit behind knowing what a design costs to build. <a href='https://leetcode.com/u/Gupta_Prasad_Adhikari/' target='_blank' rel='noopener'>Open the profile ↗</a>."
    },
    {
      keys: ['contact', 'email', 'reach', 'hire', 'touch', 'linkedin', 'github', 'phone'],
      answer: "Email <a href='mailto:guptaprasadadhikari@gmail.com'>guptaprasadadhikari@gmail.com</a>, or find him on <a href='https://www.linkedin.com/in/gupta-prasad-adhikari-75779a290/' target='_blank' rel='noopener'>LinkedIn</a>, <a href='https://github.com/Gupta-027' target='_blank' rel='noopener'>GitHub</a> or <a href='https://leetcode.com/u/Gupta_Prasad_Adhikari/' target='_blank' rel='noopener'>LeetCode</a>. There's a downloadable resume in the <a href='index.html#contact'>Contact</a> section. He's looking for product and UX design roles where AI is part of the interface."
    },
    {
      keys: ['about', 'who', 'background', 'yourself', 'himself', 'bio'],
      answer: "Gupta Prasad Adhikari is a UI/UX and product designer from Rourkela, India, studying Industrial Design at NIT Rourkela and working as an Applied AI Engineer Intern at HelpRevX. He designs AI-powered products end to end — research, interface, and the code that ships them."
    },
    {
      keys: ['process', 'approach', 'method', 'how do'],
      answer: "Four steps: <strong>Discover</strong> (talk to users, map the journey), <strong>Design</strong> (wireframes, then a system with all the states), <strong>Build</strong> (prototype in code so it can be tested), <strong>Measure</strong> (instrument it and let usage decide the next pass)."
    },
    {
      keys: ['hello', 'hi', 'hey', 'thanks', 'thank'],
      answer: "Hello! Ask me anything about Gupta's projects, skills or background."
    }
  ]
};
