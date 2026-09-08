/* ==========================================================================
   CASE STUDIES — content + renderer
   --------------------------------------------------------------------------
   One page (case-study.html) renders any study from ?p=<key>. Each entry
   below is plain data; the renderer at the bottom only draws the sections
   that entry actually defines, so a short exploration and a full flagship
   study share the same template without either looking padded or clipped.
   ========================================================================== */

const CASE_STUDIES = {

/* ── 01 ─────────────────────────────────────────────────────────────── */
'bfsi-risk': {
  num: '01', title: 'BFSI Risk Intelligence', kicker: 'Case Study · Lending & Risk Platform',
  tagline: 'Four risk models behind one interface a credit officer can actually defend to a customer.',
  a: '#8b5cf6', b: '#3b82f6',
  role: 'Product Design + ML Engineering', tools: 'Figma · Python · Scikit-learn · Streamlit',
  timeline: 'Jan – Feb 2026', cover: 'assets/covers/bfsi-risk.svg',
  links: [
    { label: 'Open live app ↗', href: 'https://gupta-financial-risk-management.streamlit.app', primary: true },
    { label: 'View on GitHub ↗', href: 'https://github.com/Gupta-027/BFSI_RISK_ANALYSIS_' }
  ],

  overview: 'A risk platform for banks, NBFCs and fintechs covering four decisions that share a shape but not an audience: credit risk, fraud detection, churn prediction and collection prioritisation. I built the models and designed the interface that makes their output usable by the person who has to act on it.',
  problem: 'A model that outputs "0.83" is not a product. The credit officer using it has to explain a decline to a real applicant, the fraud analyst has seconds to decide, and the collections agent needs a call list, not a probability. The same underlying score had to become four different interfaces without four different systems.',

  audience: {
    intro: 'Four operator roles use the platform. They share the data and share almost nothing else — a finding that came out of mapping each role\'s actual decision moment rather than assuming a generic "risk user".',
    personas: [
      {
        role: 'The Credit Officer',
        context: 'Reviews loan applications and has to justify the outcome — to the applicant, and to an auditor months later.',
        goals: ['Reach a defensible decision quickly', 'Explain a decline in plain language'],
        needs: ['The factors that drove the score, ranked', 'A clear approve / review / decline band, not a bare number'],
        painPoints: ['A score with no reasoning is unusable in a conversation with a customer', 'Regulatory review demands a paper trail the model rarely provides']
      },
      {
        role: 'The Fraud Analyst',
        context: 'Watches transactions in near real time and decides allow, step up to OTP, or block.',
        goals: ['Catch fraud without freezing legitimate customers'],
        needs: ['Recall surfaced as prominently as precision', 'An action, not just a probability'],
        painPoints: ['At 5% fraud prevalence, an accuracy figure looks excellent and means nothing', 'Every false positive is a real customer blocked at a checkout']
      }
    ]
  },

  needs: [
    { title: 'Explainability', text: 'Every score has to arrive with the factors behind it, ordered by contribution and worded for a customer conversation.' },
    { title: 'Honest metrics', text: 'On an imbalanced problem the interface must lead with precision, recall and ROC-AUC — never accuracy.' },
    { title: 'Decision, not probability', text: 'Each module ends in an action the operator can take: approve, step up, retain, prioritise.' },
    { title: 'One system, four views', text: 'Shared pipeline and shared components, but a first screen tuned to each role.' }
  ],

  painPoints: [
    { problem: 'Accuracy flatters a useless model', why: 'With roughly 5% fraud, a model that predicts "not fraud" every time scores 95% accuracy and catches nothing.', implication: 'Accuracy was removed from the interface entirely. Precision, recall and ROC-AUC are the headline figures, with the confusion matrix one click away.' },
    { problem: 'A bare score cannot be defended', why: 'A credit officer declining an application needs to say why, in words the applicant understands and an auditor accepts.', implication: 'Every prediction renders a ranked factor panel — repayment history, debt-to-income, utilisation, account age — with each factor\'s contribution shown as a proportional bar.' },
    { problem: 'Four modules risk becoming four products', why: 'Separate tools would fragment the mental model and quadruple the maintenance.', implication: 'One shell, one component set, one preprocessing pipeline; the module tab changes the framing, not the language.' }
  ],

  chains: [
    { need: 'Operators must justify automated decisions to people and to auditors.', insight: 'Explanation is not a feature bolted onto a score — it is the primary content of the screen.', decision: 'The factor panel occupies the largest region of the layout; the score itself is a supporting figure beside it.' },
    { need: 'The fraud class is severely imbalanced.', insight: 'Presenting accuracy would actively mislead the person making the call.', decision: 'Balanced class weights in the model, and an interface that reports only the metrics that survive imbalance.' },
    { need: 'Each of four roles needs a different first screen.', insight: 'The difference is framing and default view, not underlying data.', decision: 'A shared component library with per-module defaults, so switching tabs re-frames rather than re-loads.' }
  ],

  userFlow: ['Upload or enter application', 'Model scores', 'Factors explained', 'Decision band', 'Action taken'],

  process: [
    { h: 'Frame', p: 'Mapped the four decision moments and wrote down what each operator must be able to say out loud after seeing the screen.' },
    { h: 'Engineer', p: 'Built the preprocessing pipeline — missing-value imputation, categorical encoding, outlier removal, feature scaling — shared across all four modules.' },
    { h: 'Benchmark', p: 'Compared Logistic Regression against Random Forest per module, selecting on F1 rather than accuracy, and handled the 5% fraud imbalance with balanced class weights.' },
    { h: 'Design', p: 'Built the interface around the explanation panel, then arranged the score, band and action around it.' }
  ],

  stats: [
    { v: '0.94', l: 'ROC-AUC on the credit module' },
    { v: '5%', l: 'Fraud class prevalence, handled with balanced weights' },
    { v: '4', l: 'Risk modules on one shared pipeline' }
  ],

  contribution: ['Problem framing and role mapping', 'Preprocessing pipeline', 'Model selection and evaluation', 'Interface design', 'Explainability panel', 'Streamlit implementation'],
  outcome: 'A working platform where each of four risk decisions ends in an action an operator can take and defend. The design contribution that mattered most was not visual — it was deciding which number the interface refuses to show.',
  quote: { text: 'The hardest design decision on this project was removing a metric. Accuracy made the model look better and the operator worse.', cite: 'On designing for an imbalanced class' }
},

/* ── 02 ─────────────────────────────────────────────────────────────── */
'yatraai': {
  num: '02', title: 'YatraAI', kicker: 'Case Study · Group Travel Intelligence',
  tagline: 'Group travel planning where the least happy person in the group is the one the system optimises for.',
  a: '#22d3ee', b: '#6366f1',
  role: 'Product Design + Engineering', tools: 'Figma · FastAPI · OR-Tools · pgvector · Next.js',
  timeline: 'Nov – Dec 2024 · Hackathon winner, Apr 2026', cover: 'assets/covers/yatraai.svg',
  links: [
    { label: 'Open live demo ↗', href: 'https://yatraai-chi.vercel.app', primary: true },
    { label: 'View on GitHub ↗', href: 'https://github.com/Gupta-027/YatraAI-' }
  ],

  overview: 'A trip planner for groups. It builds a day itinerary that respects travel time, opening hours and everyone\'s stated preferences, and answers questions about the destination from a cited knowledge base. It won the April cohort hackathon.',
  problem: 'Group trip planning fails in a specific way: the loudest preference wins, or the group averages itself into a compromise nobody wanted. Averaging is the intuitive default and it is exactly wrong — it optimises the mean while quietly abandoning whoever is furthest from it.',

  audience: {
    intro: 'The product has one user group with two conflicting jobs: someone has to plan, and everyone has to be happy with the plan.',
    personas: [
      {
        role: 'The Group Organiser',
        context: 'The person who volunteered — collecting preferences, arguing about timings, and absorbing the blame when the day runs late.',
        goals: ['Produce a plan the group actually agrees to', 'Stop being the bottleneck'],
        needs: ['A schedule that respects real travel time', 'Evidence the plan is fair, so it survives group scrutiny'],
        painPoints: ['Endless message threads that never converge', 'Being personally blamed for a plan that overran']
      },
      {
        role: 'The Quiet Traveller',
        context: 'Has preferences, states them once, and then watches the plan drift away from them.',
        goals: ['Have at least some of the day match what they asked for'],
        needs: ['Confidence that a stated preference was actually weighed'],
        painPoints: ['Group consensus reliably means "the assertive people\'s plan"']
      }
    ]
  },

  needs: [
    { title: 'Fairness you can see', text: 'The interface has to show how the least satisfied member is doing, or fairness is just a claim.' },
    { title: 'Realistic timing', text: 'A plan that ignores travel time between stops is fiction the group discovers at 3pm.' },
    { title: 'Grounded answers', text: 'The assistant must cite its sources, and say nothing when it has nothing.' },
    { title: 'One legible day', text: 'The output is a timeline a person can read at a glance, not a JSON blob of coordinates.' }
  ],

  painPoints: [
    { problem: 'Averaging preferences hides the unhappy member', why: 'A high mean satisfaction can sit on top of one person scoring near zero, and the interface would never reveal it.', implication: 'Benchmarked five aggregation methods and chose an iterative fair selector. It raised the least-satisfied member from 0.481 to 0.522 and narrowed the spread from 0.172 to 0.115.' },
    { problem: 'Greedy routing produces plans that overrun', why: 'Picking the nearest next stop repeatedly ignores time windows and compounds error across the day.', implication: 'Modelled the day as a prize-collecting TSP with time windows in OR-Tools CP-SAT — 57% less travel distance and 43% less travel time than the greedy baseline, with zero constraint violations.' },
    { problem: 'A travel assistant that invents places is worse than none', why: 'A confident hallucinated restaurant sends a group somewhere that does not exist.', implication: 'Hybrid retrieval — dense pgvector plus BM25, fused with Reciprocal Rank Fusion and a feature-based reranker — and an explicit abstention path when the knowledge base cannot answer.' }
  ],

  chains: [
    { need: 'Every group member needs their preferences to count.', insight: 'Optimising the average is the mechanism that silences the minority.', decision: 'Optimise the minimum instead, and surface that minimum in the interface as the headline fairness number.' },
    { need: 'The plan has to survive contact with a real day.', insight: 'Time windows and travel buffers are constraints, not preferences.', decision: 'A CP-SAT constraint model rather than a heuristic — so a returned plan is feasible by construction.' },
    { need: 'Travellers need to trust what the assistant tells them.', insight: 'Trust comes from visible sourcing and visible limits.', decision: 'Every answer carries citations; when retrieval fails, the assistant says so rather than generating.' }
  ],

  userFlow: ['Group states preferences', 'Constraints solved', 'Fair plan proposed', 'Ask the assistant', 'Day runs'],

  process: [
    { h: 'Research', p: 'Mapped how groups actually plan today — the message thread, the drift, the quiet abandonment — and identified averaging as the root failure.' },
    { h: 'Model', p: 'Built the day as a prize-collecting TSP with time windows in OR-Tools CP-SAT, so infeasible plans cannot be returned.' },
    { h: 'Ground', p: 'Built a hybrid RAG assistant over a cited knowledge base with dense retrieval, BM25, RRF and a reranker.' },
    { h: 'Benchmark', p: 'Evaluated on 34 questions and five aggregation strategies, then designed the interface around the numbers that mattered.' }
  ],

  stats: [
    { v: '0.903', l: 'Top-1 retrieval accuracy' },
    { v: '0.952', l: 'Mean reciprocal rank' },
    { v: '0.995', l: 'Faithfulness score' },
    { v: '1.000', l: 'Abstention accuracy — never guesses' },
    { v: '−57%', l: 'Travel distance vs greedy baseline' },
    { v: '−43%', l: 'Travel time vs greedy baseline' }
  ],

  contribution: ['Problem framing', 'Fairness model selection', 'Constraint model (CP-SAT)', 'Hybrid RAG pipeline', 'Evaluation benchmark', 'Interface design'],
  outcome: 'Winner of the April cohort hackathon. The judged differentiator was not the model stack — it was that the product optimises for the least satisfied traveller and shows you that it did.',
  quote: { text: 'Optimising the average is how you build something that works for a group and fails for a person.', cite: 'On group preference aggregation' }
},

/* ── 03 ─────────────────────────────────────────────────────────────── */
'vidyapeeth360': {
  num: '03', title: 'Vidyapeeth360', kicker: 'Case Study · AI-Native School ERP',
  tagline: 'One platform, four audiences — and a different first screen for each of them.',
  a: '#3b82f6', b: '#f97316',
  role: 'Product Design + Systems Design', tools: 'Figma · FigJam · PostgreSQL · API design',
  timeline: 'HelpRevX · 2026', cover: 'assets/covers/vidyapeeth360.svg',
  live: { label: 'Visit Vidyapeeth360 ↗', href: 'https://vidyapeeth360.com' },

  overview: 'An end-to-end K-12 school ERP covering admissions, fees, attendance, communication and reporting. I designed the product structure and specified its AI capabilities alongside the database architecture and API contracts.',
  problem: 'A school ERP has four audiences with almost nothing in common. A principal wants aggregate health, a teacher wants today\'s class, a parent wants one child, a student wants their own timetable. Building one dashboard for all four produces a screen that serves none of them.',

  audience: {
    intro: 'Four roles, each with a different unit of attention — the institution, the class, the child, the self. That difference drove the entire information architecture.',
    personas: [
      {
        role: 'The Principal / Owner',
        context: 'Accountable for the institution, checking in between meetings on whatever device is nearest.',
        goals: ['See institutional health in seconds', 'Spot the exception before it becomes a problem'],
        needs: ['Aggregate metrics first — attendance, collections, admissions', 'Drill-down only when something looks wrong'],
        painPoints: ['Reports that require assembly before they answer anything', 'Numbers scattered across five different screens']
      },
      {
        role: 'The Teacher',
        context: 'Between classes, on a phone, with a few minutes.',
        goals: ['Mark attendance and move on'],
        needs: ['Today\'s classes as the landing screen', 'Attendance marking in under a minute'],
        painPoints: ['Admin-first software that buries the daily task under configuration']
      },
      {
        role: 'The Parent',
        context: 'Cares about one child and nothing else in the system.',
        goals: ['Know fees, attendance and announcements without asking the school'],
        needs: ['A mobile-first view scoped to their child alone'],
        painPoints: ['Having to phone the office for information the system already holds']
      }
    ]
  },

  needs: [
    { title: 'Role-shaped landing', text: 'The first screen answers the question that role actually arrived with.' },
    { title: 'Mobile as default', text: 'Parents and teachers are rarely at a desk; the phone view is the primary one, not a fallback.' },
    { title: 'Ask, don\'t navigate', text: 'For the long tail of questions, natural language beats a menu tree five levels deep.' },
    { title: 'Data model that holds', text: 'Multi-campus, role-based access and an academic calendar have to be in the schema from day one.' }
  ],

  painPoints: [
    { problem: 'One dashboard for four roles serves none', why: 'A screen that shows a principal\'s aggregates and a parent\'s child detail is cluttered for both.', implication: 'Four distinct landing views over one data model, with role-based access enforced at the API rather than hidden in the UI.' },
    { problem: 'The long tail of questions cannot be navigated to', why: 'Every question a user might ask becomes another menu item, and the menu becomes the problem.', implication: 'Specified Aira, a natural-language assistant scoped to the asker\'s permissions — so a principal and a parent asking the same question get correctly different answers.' },
    { problem: 'Retrofitting multi-campus is expensive', why: 'Institutions grow, and a single-campus schema forces a rewrite exactly when the customer is most valuable.', implication: 'Campus as a first-class entity in the data model from the first specification.' }
  ],

  chains: [
    { need: 'Four roles need four different first screens.', insight: 'The difference is the unit of attention, not the underlying data.', decision: 'One schema and API, four landing views — role resolved server-side so the interface never has to hide what it fetched.' },
    { need: 'Users ask questions no menu anticipates.', insight: 'Natural language is the right interface for the long tail, but only if it respects permissions.', decision: 'Aira answers within the asker\'s access scope, so the same question returns correctly different answers per role.' }
  ],

  userFlow: ['Sign in', 'Role resolved', 'Role-shaped dashboard', 'Act or ask Aira', 'Done'],

  process: [
    { h: 'Map', p: 'Mapped each role\'s day in FigJam and wrote the single question each arrives with. Those four questions became the four landing screens.' },
    { h: 'Structure', p: 'Designed the information architecture across admissions, fees, attendance, communication and reporting, scoped per role.' },
    { h: 'Specify', p: 'Wrote the database architecture and API specification alongside the designs, so structure and interface were decided together rather than in sequence.' },
    { h: 'Extend', p: 'Specified the AI layer — intelligent search, predictive student insights and workflow automation — as permission-aware from the start.' }
  ],

  cardsHeading: 'System decisions',
  cards: [
    { h: 'Role-based views', p: 'Four landing screens over one data model, with access enforced in the API.' },
    { h: 'Mobile-first', p: 'Parent and teacher journeys designed on the phone frame first, then widened.' },
    { h: 'Aira assistant', p: 'Natural-language answers scoped to the asker\'s permissions.' },
    { h: 'Multi-campus schema', p: 'Campus modelled as a first-class entity so growth is not a rewrite.' }
  ],

  contribution: ['Information architecture', 'Role-based journey design', 'Database architecture', 'API specification', 'AI capability specification'],
  outcome: 'A specified, structured K-12 ERP where the design work and the data model were decided together — which is what made four genuinely different role views affordable rather than four separate products.',
  quote: { text: 'Designing the schema and the screens in the same week is what made four different first screens cheap instead of expensive.', cite: 'On designing structure and interface together' }
},

/* ── 04 ─────────────────────────────────────────────────────────────── */
'aayiq': {
  num: '04', title: 'aayiq', kicker: 'Case Study · Omnichannel Customer Experience',
  tagline: 'The interesting design problem was not the AI reply. It was the moment the AI gives up.',
  a: '#a855f7', b: '#ec4899',
  role: 'Applied AI Engineering + Interaction Design', tools: 'Claude · NestJS · PostgreSQL · Prisma · Redis',
  timeline: 'HelpRevX · 2026 – present', cover: 'assets/covers/aayiq.svg',
  live: { label: 'Visit HelpRevX ↗', href: 'https://www.helprevx.com/' },

  overview: 'An AI-powered customer experience platform spanning WhatsApp, WebChat, Email, SMS and Voice. I built the LLM workflows behind intent classification, knowledge retrieval, automated replies and escalation to a human agent — which meant designing what happens at each of those moments, not just what the model returns.',
  problem: 'Most AI support experiences fail at the handoff. The bot loops, the customer repeats themselves, and when a human finally arrives they ask for the account number that was given three messages ago. The escalation is where trust is won or lost, and it is usually the least designed part of the system.',

  audience: {
    intro: 'Two people meet at the handoff, and the design has to work for both simultaneously.',
    personas: [
      {
        role: 'The Customer',
        context: 'Messaging on whichever channel was closest to hand, usually about something that has already gone wrong.',
        goals: ['Get the thing resolved', 'Not repeat themselves'],
        needs: ['A fast answer when the AI genuinely knows', 'A visible, dignified route to a human when it does not'],
        painPoints: ['Bot loops with no exit', 'Re-explaining the entire problem to the human who picks up']
      },
      {
        role: 'The Support Agent',
        context: 'Picking up a conversation mid-flight, several open at once.',
        goals: ['Resolve without re-interviewing the customer'],
        needs: ['Full transcript, detected intent, and why the AI escalated', 'Confidence signals, so they know what to double-check'],
        painPoints: ['Inheriting a conversation with no context', 'Having to undo something the AI told the customer incorrectly']
      }
    ]
  },

  needs: [
    { title: 'Know when to stop', text: 'The system needs an explicit confidence threshold below which it hands over rather than guessing again.' },
    { title: 'Carry the context', text: 'Everything the customer already said travels with the handoff automatically.' },
    { title: 'Channel-consistent', text: 'The same conversation logic across five channels with very different affordances.' },
    { title: 'Visible, not silent', text: 'The customer should see the handover happen and know a person is coming.' }
  ],

  painPoints: [
    { problem: 'The bot loop with no exit', why: 'When a model cannot answer, retrying produces the same failure and burns the customer\'s patience.', implication: 'A confidence threshold plus a repeat-question detector triggers escalation automatically — the customer never has to find the magic words to reach a human.' },
    { problem: 'The human arrives with no context', why: 'Handing over a conversation without state forces the customer to start again, which is when they give up.', implication: 'The full transcript, the detected intent and the reason for escalation transfer with the conversation, so the agent opens with an answer rather than a question.' },
    { problem: 'Five channels, five behaviours', why: 'Voice, SMS and WhatsApp have very different constraints, and per-channel logic drifts apart over time.', implication: 'One workflow layer with channel-specific rendering, so the reasoning is shared and only the presentation differs.' }
  ],

  chains: [
    { need: 'Customers need a reliable way out of an AI conversation.', insight: 'The exit must be automatic, because a frustrated customer will not hunt for it.', decision: 'Escalation triggers on low confidence and on repeated questions, not on a keyword the customer has to know.' },
    { need: 'Agents need to arrive informed.', insight: 'Context transfer is what makes a handoff feel like continuity instead of abandonment.', decision: 'Transcript, intent and escalation reason move with the conversation as structured state.' },
    { need: 'Behaviour must stay consistent across five channels.', insight: 'Shared reasoning, separate rendering.', decision: 'A single workflow orchestration layer in NestJS with per-channel adapters.' }
  ],

  userFlow: ['Customer messages', 'Intent classified', 'Knowledge retrieved', 'AI replies or escalates', 'Agent resolves'],

  process: [
    { h: 'Classify', p: 'Built intent classification with Claude so the routing decision is made once, at the top, rather than re-derived at each step.' },
    { h: 'Retrieve', p: 'Wired knowledge retrieval into the reply path so answers are grounded in the customer\'s own knowledge base.' },
    { h: 'Orchestrate', p: 'Built the backend in NestJS with PostgreSQL, Prisma and Redis for message routing and workflow state across all five channels.' },
    { h: 'Hand over', p: 'Designed the escalation moment itself — the trigger, what the customer sees, and the state the agent inherits.' }
  ],

  cardsHeading: 'Handoff design',
  cards: [
    { h: 'Automatic trigger', p: 'Low confidence or a repeated question escalates without the customer asking.' },
    { h: 'Named handover', p: 'The customer sees who is taking over, not a silent switch.' },
    { h: 'Context transfer', p: 'Transcript, intent and reason move with the conversation.' },
    { h: 'No repeat questions', p: 'The agent opens with what they already know, not a fresh interview.' }
  ],

  contribution: ['LLM workflow design', 'Intent classification', 'Knowledge retrieval', 'Escalation logic and interaction design', 'Backend services (NestJS, PostgreSQL, Prisma, Redis)'],
  outcome: 'A five-channel platform where the AI\'s limits are part of the designed experience rather than a failure state. The handoff is the feature.',
  quote: { text: 'A customer should feel passed to a human, not abandoned by a bot. That distinction is entirely a design decision.', cite: 'On designing AI escalation' }
},

/* ── 05 ─────────────────────────────────────────────────────────────── */
'sleuth': {
  num: '05', title: 'Sleuth', kicker: 'Case Study · Multi-Agent Research Console',
  tagline: 'Making nine agents thinking at once legible to one person waiting on an answer.',
  a: '#f59e0b', b: '#6366f1',
  role: 'Product Design + Engineering', tools: 'Figma · LangGraph · FastAPI · Next.js',
  timeline: '2026', cover: 'assets/covers/sleuth.svg',
  live: { label: 'View on GitHub ↗', href: 'https://github.com/Gupta-027' },

  overview: 'An autonomous multi-agent system that investigates companies, products, industries and markets, and produces consultant-grade reports with citations, SWOT analysis, competitive landscapes and market sizing. Nine specialised agents in LangGraph, a streaming FastAPI layer, and a Next.js console.',
  problem: 'Multi-agent systems create a specific interface problem: the work is genuinely parallel and genuinely slow, but the user experiences it as a spinner. Hide the process and a three-minute wait feels broken; show all of it and you have a debug log, not a product.',

  audience: {
    intro: 'One user, waiting, with a decision on the other side of the wait.',
    personas: [
      {
        role: 'The Analyst',
        context: 'Needs a defensible briefing on a company or market, and would otherwise spend a day assembling it by hand.',
        goals: ['Get a citable briefing faster than doing it manually', 'Trust it enough to put their name on it'],
        needs: ['Visible progress that reads as work, not as hanging', 'Citations attached to every claim', 'Partial output early rather than everything at the end'],
        painPoints: ['A long opaque wait feels like a failure', 'A report with no sources cannot be forwarded to anyone senior']
      }
    ]
  },

  needs: [
    { title: 'Legible parallelism', text: 'Nine concurrent agents shown as a structure a person can read, not nine log streams.' },
    { title: 'Progressive output', text: 'The report builds visibly as sections complete instead of appearing at the end.' },
    { title: 'Citations by default', text: 'Every claim carries its source, because an uncited briefing is unusable.' },
    { title: 'Honest state', text: 'Done, running and waiting are distinguishable at a glance.' }
  ],

  painPoints: [
    { problem: 'A long wait with no signal reads as broken', why: 'Users abandon at roughly the point a spinner stops feeling like progress, which is well before a nine-agent run completes.', implication: 'An agent graph showing each node\'s state — complete, running, queued — so the wait is legible as work being done.' },
    { problem: 'Showing everything produces a debug log', why: 'Raw agent traces are the wrong abstraction for someone who wants a briefing.', implication: 'Three states per node and nothing more; the detail is available on demand but never the default view.' },
    { problem: 'An uncited report cannot be forwarded', why: 'The analyst\'s reputation is attached to what they pass on.', implication: 'Citations stream in alongside the prose and are counted in the header, so sourcing is visible before the report is finished.' }
  ],

  chains: [
    { need: 'The user needs to believe the system is working.', insight: 'Progress is only reassuring if it maps to something meaningful.', decision: 'Show the agent graph with per-node state rather than a percentage that means nothing.' },
    { need: 'The user wants the answer, not the process.', insight: 'Transparency and noise are separated by the level of abstraction, not the amount shown.', decision: 'Three states per agent; the streaming report is the primary surface, the graph is the reassurance.' }
  ],

  userFlow: ['Enter a subject', 'Agents fan out', 'Sections stream in', 'Citations attach', 'Report complete'],

  process: [
    { h: 'Orchestrate', p: 'Built nine specialised agents in LangGraph with an explicit dependency structure rather than a flat fan-out.' },
    { h: 'Stream', p: 'Exposed the run over a streaming FastAPI layer so the console can render partial state as it arrives.' },
    { h: 'Visualise', p: 'Designed the agent graph as the waiting-state surface, with exactly three legible node states.' },
    { h: 'Compose', p: 'Built the Next.js console so the report assembles progressively with citations attached as they resolve.' }
  ],

  contribution: ['Agent orchestration design', 'Streaming architecture', 'Waiting-state design', 'Console UI', 'Citation surfacing'],
  outcome: 'A research console where a three-minute multi-agent run feels like watching work happen rather than waiting for a page to load.',
  quote: { text: 'The design problem in agentic products is rarely the output. It is the three minutes before the output exists.', cite: 'On designing for agent latency' }
},

/* ── Explorations ───────────────────────────────────────────────────── */
'novaretail': {
  num: '—', title: 'AI Business Intelligence', kicker: 'Exploration · Decision Support Platform',
  tagline: 'An end-to-end analytics and decision-support platform, built as a consulting engagement for an omnichannel European retailer.',
  a: '#8b5cf6', b: '#22d3ee',
  role: 'Analysis + Dashboard Design', tools: 'Python · SQL · Power BI · LLM analytics',
  timeline: '2026', cover: 'assets/covers/novaretail.svg',

  overview: 'A sixteen-stage engagement for NovaRetail Analytics, a fictional omnichannel retailer — running from business understanding through data engineering, SQL analysis, statistics, machine learning and LLM analytics to a backend API, dashboard, reporting and deployment.',
  problem: 'Analytics projects usually stop at the model. The gap between "the model is accurate" and "someone changed a decision because of it" is where most of the value is lost, and it is almost entirely an interface problem.',
  needs: [
    { title: 'Business framing first', text: 'The engagement opens with the business problem, not the dataset.' },
    { title: 'A traceable chain', text: 'Every recommendation should be followable back to the data that produced it.' },
    { title: 'Decisions, not dashboards', text: 'The final surface proposes actions, not just charts.' }
  ],
  process: [
    { h: 'Understand', p: 'Business context and stakeholder questions defined before any data was touched.' },
    { h: 'Engineer', p: 'Database design, pipelines and SQL analysis to get from raw exports to a queryable model.' },
    { h: 'Model', p: 'Exploratory and statistical analysis, then machine learning and LLM-assisted analytics.' },
    { h: 'Deliver', p: 'A backend API, dashboard, reporting layer, tests and deployment — the parts that make analysis usable.' }
  ],
  contribution: ['Business framing', 'Data engineering', 'SQL and statistical analysis', 'ML and LLM analytics', 'Dashboard design', 'API and deployment'],
  outcome: 'A full pipeline from business question to a dashboard that recommends an action — with each of the sixteen stages documented so the reasoning is auditable end to end.'
},

'rag-policy': {
  num: '—', title: 'RAG Policy Assistant', kicker: 'Exploration · Grounded Retrieval',
  tagline: 'A locked, company-specific policy assistant that cites every answer and refuses to guess.',
  a: '#22d3ee', b: '#8b5cf6',
  role: 'Design + Engineering', tools: 'Python · Vector search · LLM',
  timeline: '2026', cover: 'assets/covers/rag-policy.svg',

  overview: 'A password-locked retrieval-augmented generation app. Public policy documents are uploaded ahead of a session, and questions are answered live — grounded, cited and resistant to hallucination. Locked when not in use, so nobody can drain the API budget.',
  problem: 'A policy assistant that sounds confident and is wrong is worse than no assistant. Anyone reading the answer has to be able to check it in seconds, which makes citation a primary interface element rather than a footnote.',
  needs: [
    { title: 'Citation as content', text: 'Sources sit next to the answer, not below the fold.' },
    { title: 'Visible abstention', text: 'When retrieval finds nothing relevant, the app says so.' },
    { title: 'Cost control', text: 'A lock screen so an idle deployment cannot be abused.' }
  ],
  process: [
    { h: 'Ground', p: 'Retrieval over uploaded documents only — no answers from parametric memory.' },
    { h: 'Cite', p: 'Every answer renders its source chunks as inline, clickable references.' },
    { h: 'Abstain', p: 'A relevance floor below which the assistant declines rather than generates.' },
    { h: 'Lock', p: 'Passcode gating so the deployment is inert between sessions.' }
  ],
  contribution: ['RAG pipeline', 'Citation interface', 'Abstention design', 'Access control'],
  outcome: 'A demo-ready assistant where the most important design decision is what it does when it does not know.'
},

'coca-cola': {
  num: '—', title: 'Coca-Cola India', kicker: 'Exploration · Strategic Business Assessment',
  tagline: 'A board-level strategic assessment written for a CEO and board audience.',
  a: '#ef4444', b: '#f59e0b',
  role: 'Business Analysis', tools: 'Market research · Competitive analysis · Reporting',
  timeline: 'July 2026', cover: 'assets/covers/coca-cola.svg',

  overview: 'A complete strategic assessment of Coca-Cola India prepared for a CEO, board and executive leadership audience — market position, competitive landscape, SWOT and strategic options, with integrity checks across the analysis.',
  problem: 'Executive audiences read for decisions, not for completeness. Structuring the same research for a board rather than an analyst changes the order of everything and cuts most of it.',
  needs: [
    { title: 'Decision-led structure', text: 'The recommendation comes first; the evidence supports it rather than building to it.' },
    { title: 'Defensible claims', text: 'Every assertion traceable to a source that survives scrutiny.' },
    { title: 'Scannable at board pace', text: 'Readable in the minutes an executive actually has.' }
  ],
  process: [
    { h: 'Research', p: 'Market position, category dynamics and competitive landscape.' },
    { h: 'Analyse', p: 'SWOT and strategic option framing against the business context.' },
    { h: 'Verify', p: 'Integrity checks across the analysis before the deck was considered complete.' },
    { h: 'Present', p: 'Structured for a board reading order rather than a research reading order.' }
  ],
  contribution: ['Market and competitive research', 'SWOT and strategic options', 'Executive reporting'],
  outcome: 'A complete engagement, QA-checked, structured for the audience that had to act on it.'
},

'crude-oil': {
  num: '—', title: 'Crude Oil Futures', kicker: 'Exploration · Market Research',
  tagline: 'Term structure research on crude oil futures, and what the curve implies for the physical market.',
  a: '#f59e0b', b: '#6366f1',
  role: 'Research + Data Visualisation', tools: 'Python · Market data · Presentation design',
  timeline: '2026', cover: 'assets/covers/crude-oil.svg',

  overview: 'Research into crude oil futures — the shape of the forward curve, what backwardation and contango imply about physical supply, and how that reads against spot market conditions.',
  problem: 'Term structure is a genuinely visual idea that is almost always presented as a table. The shape of the curve carries the entire insight, and a table hides it.',
  needs: [
    { title: 'Shape over numbers', text: 'The curve is the finding; the interface should lead with it.' },
    { title: 'Comparison built in', text: 'Current curve against a reference, so the deviation is the visible thing.' },
    { title: 'Plain-language reading', text: 'What backwardation means for someone who is not a commodities trader.' }
  ],
  process: [
    { h: 'Gather', p: 'Assembled forward curve data across contract months.' },
    { h: 'Visualise', p: 'Plotted current against reference curves so the divergence is what the eye lands on.' },
    { h: 'Interpret', p: 'Translated curve shape into physical market implications in plain language.' }
  ],
  contribution: ['Market research', 'Data visualisation', 'Presentation design'],
  outcome: 'A research piece where the chart carries the argument and the text explains it, rather than the other way around.'
}

};

/* Order drives the "next project" link at the foot of each study. */
const CS_ORDER = ['bfsi-risk', 'yatraai', 'vidyapeeth360', 'aayiq', 'sleuth',
                  'novaretail', 'rag-policy', 'coca-cola', 'crude-oil'];


/* ══════════════════════════════════════════════════════════════════════
   RENDERER
   Only the sections a study actually defines are drawn, so short
   explorations and full flagship studies share one template.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  const root = document.getElementById('cspRoot');
  if (!root) return;

  const e = (s) => String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const key = new URLSearchParams(location.search).get('p');
  const cs = CASE_STUDIES[key];

  if (!cs) {
    root.innerHTML = `
      <div class="csp__wrap csp__miss">
        <h1>That case study isn't here.</h1>
        <p>The link may be out of date. Everything I've written up is listed on the work section of the homepage.</p>
        <a class="btn btn--fill" href="index.html#work">Back to selected work
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>`;
    return;
  }

  document.title = `${cs.title} — Case Study — Gupta Prasad Adhikari`;
  document.querySelector('meta[name="description"]')
    ?.setAttribute('content', `${cs.title}: ${cs.tagline}`);
  root.style.setProperty('--a', cs.a);
  root.style.setProperty('--b', cs.b);

  const sec = (k, inner) => `<section class="csp__sec">
      <p class="csp__k">${e(k)}</p>${inner}</section>`;

  const out = [];

  /* ── Hero ── */
  out.push(`
  <div class="csp__wrap">
    <header class="csp__hero">
      <a class="csp__back" href="index.html#work">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
        All work
      </a>
      <p class="csp__kicker">${e(cs.kicker)}</p>
      <h1 class="csp__t">${e(cs.title)}</h1>
      <p class="csp__tag">${e(cs.tagline)}</p>
      <dl class="csp__meta">
        <div><dt>Role</dt><dd>${e(cs.role)}</dd></div>
        <div><dt>Tools</dt><dd>${e(cs.tools)}</dd></div>
        <div><dt>Timeline</dt><dd>${e(cs.timeline)}</dd></div>
      </dl>
      ${(() => {
        const links = cs.links || (cs.live ? [cs.live] : []);
        if (!links.length) return '';
        return `<div class="csp__links">${links.map((l) =>
          `<a class="btn ${l.primary ? 'btn--fill' : 'btn--out'}" href="${e(l.href)}" target="_blank" rel="noopener noreferrer">${e(l.label)}</a>`
        ).join('')}</div>`;
      })()}
    </header>

    <figure class="csp__shot">
      <img src="${e(cs.cover)}" alt="${e(cs.title)} — interface concept" width="1600" height="1000" fetchpriority="high" />
    </figure>`);

  /* ── Overview / problem ── */
  if (cs.overview) out.push(sec('Overview', `<p class="csp__p">${e(cs.overview)}</p>`));
  if (cs.problem)  out.push(sec('The problem', `
      <h2 class="csp__h">What made this hard.</h2>
      <p class="csp__p">${e(cs.problem)}</p>`));

  /* ── Audience ── */
  if (cs.audience) out.push(sec('Who it\'s for', `
      <p class="csp__p">${e(cs.audience.intro)}</p>
      <div style="margin-top:2rem">
        ${cs.audience.personas.map((p) => `
        <article class="csp__persona">
          <h4>${e(p.role)}</h4>
          <p>${e(p.context)}</p>
          <div class="csp__pcols">
            ${[['Goals', p.goals], ['Needs', p.needs], ['Pain points', p.painPoints]]
              .filter(([, arr]) => arr && arr.length)
              .map(([h, arr]) => `<div><h5>${h}</h5><ul>${arr.map((i) => `<li>${e(i)}</li>`).join('')}</ul></div>`)
              .join('')}
          </div>
        </article>`).join('')}
      </div>`));

  /* ── Needs ── */
  if (cs.needs) out.push(sec('What it had to do', `
      <div class="csp__grid">
        ${cs.needs.map((n) => `<div class="csp__card"><h4>${e(n.title)}</h4><p>${e(n.text)}</p></div>`).join('')}
      </div>`));

  /* ── Pain points ── */
  if (cs.painPoints) out.push(sec('Problems worth solving', `
      <div class="csp__grid csp__grid--n">
        ${cs.painPoints.map((p) => `
        <div class="csp__card csp__card--n">
          <h4>${e(p.problem)}</h4>
          <p>${e(p.why)}</p>
          <p style="margin-top:.85rem;color:var(--acc-3)">${e(p.implication)}</p>
        </div>`).join('')}
      </div>`));

  /* ── Chains ── */
  if (cs.chains) out.push(sec('Need → insight → decision', `
      <h2 class="csp__h">How each decision was reached.</h2>
      <div class="csp__chain">
        ${cs.chains.map((c) => `
        <div class="csp__link">
          <div><h5>Need</h5><p>${e(c.need)}</p></div>
          <div><h5>Insight</h5><p>${e(c.insight)}</p></div>
          <div><h5>Decision</h5><p>${e(c.decision)}</p></div>
        </div>`).join('')}
      </div>`));

  /* ── Flow ── */
  if (cs.userFlow) out.push(sec('User flow', `
      <ul class="csp__flow">${cs.userFlow.map((s) => `<li>${e(s)}</li>`).join('')}</ul>`));

  /* ── Process ── */
  if (cs.process) out.push(sec('Process', `
      <div class="csp__grid csp__grid--n">
        ${cs.process.map((p) => `<div class="csp__card csp__card--n"><h4>${e(p.h)}</h4><p>${e(p.p)}</p></div>`).join('')}
      </div>`));

  /* ── Extra card block ── */
  if (cs.cards) out.push(sec(cs.cardsHeading || 'Decisions', `
      <div class="csp__grid">
        ${cs.cards.map((c) => `<div class="csp__card"><h4>${e(c.h)}</h4><p>${e(c.p)}</p></div>`).join('')}
      </div>`));

  /* ── Stats ── */
  if (cs.stats) out.push(sec('Results', `
      <div class="csp__stats">
        ${cs.stats.map((s) => `<div class="csp__stat"><b>${e(s.v)}</b><span>${e(s.l)}</span></div>`).join('')}
      </div>`));

  /* ── Contribution + outcome ── */
  if (cs.contribution) out.push(sec('What I did', `
      <ul class="csp__list">${cs.contribution.map((c) => `<li>${e(c)}</li>`).join('')}</ul>
      ${cs.outcome ? `<p class="csp__p" style="margin-top:2rem">${e(cs.outcome)}</p>` : ''}`));

  /* ── Quote ── */
  if (cs.quote) out.push(`<section class="csp__sec">
      <blockquote class="csp__quote">
        <p>“${e(cs.quote.text)}”</p>
        <cite>${e(cs.quote.cite)}</cite>
      </blockquote>
    </section>`);

  /* ── Next ── */
  const i = CS_ORDER.indexOf(key);
  const nextKey = CS_ORDER[(i + 1) % CS_ORDER.length];
  const next = CASE_STUDIES[nextKey];
  if (next) out.push(`
    <a class="csp__next" href="case-study.html?p=${e(nextKey)}">
      <div>
        <p>Next project</p>
        <h3>${e(next.title)}</h3>
      </div>
      <span class="btn btn--fill">Read it
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </span>
    </a>`);

  out.push(`</div>`);
  root.innerHTML = out.join('');
})();
