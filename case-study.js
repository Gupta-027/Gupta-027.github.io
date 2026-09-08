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
  num: '02', title: 'BFSI Risk Intelligence', kicker: 'Case Study · Lending & Risk Platform',
  tagline: 'Four risk models behind one interface a credit officer can actually defend to a customer.',
  a: '#8b5cf6', b: '#3b82f6',
  role: 'Product Design + ML Engineering', tools: 'Figma · Python · Scikit-learn · Streamlit',
  timeline: 'Jan – Feb 2026', cover: 'assets/covers/bfsi-risk.jpg',
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

  screensHeading: 'The platform, as shipped.',
  screens: [
    { src: 'assets/screens/bfsi-risk-2.jpg', wide: true,
      alt: 'Credit Risk Prediction — applicant form on the left, prediction result on the right: 90% confidence, low risk, recommended action approve, with the factors the model weighed',
      caption: '<b>Credit risk, with the reasoning attached.</b> The applicant form on the left; on the right the result as a decision rather than a number — a confidence bar, the risk band, a recommended action — and beneath it the factors the model weighed: loan amount, duration, savings, checking balance, job stability and housing. That last block is what a credit officer reads aloud to an applicant.' },
    { src: 'assets/screens/bfsi-risk-3.jpg',
      alt: 'Fraud Detection — transaction inputs including amount, hour, balances and merchant risk score; result: 0% fraud probability, safe, allow transaction',
      caption: '<b>Fraud, framed as an action.</b> Amount, hour, balance change, merchant risk and the behavioural flags — device change, location change, failed attempts. The output is one of three actions: allow, verify with an OTP, or block.' },
    { src: 'assets/screens/bfsi-risk-4.jpg',
      alt: 'Model Information — one card per module listing business use case, input features, output, evaluation metric and why it matters',
      caption: '<b>Model information, written for the operator.</b> One card per module: the business decision it supports, the inputs, the output, the metric it is judged on — precision and recall, F1, ROC-AUC — and why that metric was chosen. Accuracy is deliberately absent.' },
    { src: 'assets/screens/bfsi-risk-1.jpg', wide: true,
      alt: 'BFSI Risk Intelligence Platform home — four risk modules: credit risk, fraud detection, customer churn, loan collection risk',
      caption: '<b>One shell, four modules.</b> The home screen names each risk decision and what it returns — a lending decision, a transaction action, a retention strategy, a collection priority — so an operator lands on the module that matches their job rather than a generic dashboard.' }
  ],

  contribution: ['Problem framing and role mapping', 'Preprocessing pipeline', 'Model selection and evaluation', 'Interface design', 'Explainability panel', 'Streamlit implementation'],
  outcome: 'A working platform where each of four risk decisions ends in an action an operator can take and defend. The design contribution that mattered most was not visual — it was deciding which number the interface refuses to show.',
  quote: { text: 'The hardest design decision on this project was removing a metric. Accuracy made the model look better and the operator worse.', cite: 'On designing for an imbalanced class' }
},

/* ── 02 ─────────────────────────────────────────────────────────────── */
'yatraai': {
  num: '07', title: 'YatraAI', kicker: 'Case Study · Group Travel Intelligence',
  tagline: 'Group travel planning where the least happy person in the group is the one the system optimises for.',
  a: '#22d3ee', b: '#6366f1',
  role: 'Product Design + Engineering', tools: 'Figma · FastAPI · OR-Tools · pgvector · Next.js',
  timeline: 'Nov – Dec 2024 · Hackathon winner, Apr 2026', cover: 'assets/covers/yatraai.jpg',
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

  screens: [
    { src: 'assets/screens/yatraai-1.jpg', wide: true,
      alt: 'YatraAI landing page — "Group itineraries that are fair, explainable and feasible" with headline metrics',
      caption: '<b>The promise, with the evidence under it.</b> The landing frame states what the product does — fair, explainable, feasible group itineraries — and immediately shows the numbers behind the claim: 57% less travel than a greedy baseline, 0.95 MRR on the assistant, 1.00 abstention accuracy, and the passing test count.' },
    { src: 'assets/screens/yatraai-2.jpg', wide: true,
      alt: 'YatraAI — "How a plan gets built" pipeline of five stages, the destinations grid and the trust rules',
      caption: '<b>How a plan gets built.</b> Five stages — data, rank, solve, validate, narrate — shown in order, with the language model deliberately last: it explains a plan the solver has already validated rather than inventing one. Beneath it, the destination cards and the rules the interface commits to: answers are cited or withheld, and nothing is shown that wasn\'t verified.' }
  ],

  contribution: ['Problem framing', 'Fairness model selection', 'Constraint model (CP-SAT)', 'Hybrid RAG pipeline', 'Evaluation benchmark', 'Interface design'],
  outcome: 'Winner of the April cohort hackathon. The judged differentiator was not the model stack — it was that the product optimises for the least satisfied traveller and shows you that it did.',
  quote: { text: 'Optimising the average is how you build something that works for a group and fails for a person.', cite: 'On group preference aggregation' }
},

/* ── 03 ─────────────────────────────────────────────────────────────── */
'vidyapeeth360': {
  num: '01', title: 'Vidyapeeth360', kicker: 'Case Study · AI-Native School ERP',
  tagline: 'One platform, four audiences — and a different first screen for each of them.',
  a: '#3b82f6', b: '#f97316',
  role: 'UI/UX Design · Brand · Information Architecture', tools: 'Figma · FigJam · PostgreSQL · API design',
  timeline: 'HelpRevX · 2026', cover: 'assets/covers/vidyapeeth360.jpg',
  links: [
    { label: 'Visit the live site ↗', href: 'https://vidyapeeth360.com', primary: true }
  ],

  overview: 'An end-to-end K-12 school ERP covering admissions, fees, attendance, communication and reporting. I designed the complete website UI from wireframes to shipped screens, created the logos for both Vidyapeeth360 and HelpRevX so the two products share one brand system, designed the school registration and onboarding flow, and built the product\'s information architecture — alongside its database architecture and API contracts.',
  problem: 'A school ERP has four audiences with almost nothing in common. A principal wants aggregate health, a teacher wants today\'s class, a parent wants one child, a student wants their own timetable. Building one dashboard for all four produces a screen that serves none of them. And before any of that, a school has to get set up at all — onboarding friction was the single biggest reason schools refused to adopt an ERP in the first place.',

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
    { h: 'Brand', p: 'Designed the Vidyapeeth360 logo and, alongside it, the HelpRevX mark — one visual system across the company and the product, tested on dark, light and compact surfaces.' },
    { h: 'Design', p: 'Wireframed the website, then took it to high-fidelity screens and shipped it: hero, modules, product preview, pricing, and a self-serve trial flow.' },
    { h: 'Onboard', p: 'Wireframed and designed the end-to-end school registration and onboarding flow, cutting the time a school needs to get set up — the friction that had been losing customers before they saw the product.' },
    { h: 'Specify', p: 'Wrote the database architecture and API specification alongside the designs, and specified the AI layer — search, predictive insights, automation — as permission-aware from the start.' }
  ],

  cardsHeading: 'Design decisions',
  cards: [
    { h: 'One brand system', p: 'Vidyapeeth360 and HelpRevX logos designed together — orange and blue, shared geometry, one family.' },
    { h: 'Onboarding first', p: 'A school registers and goes live in minutes, because setup friction was the reason schools said no.' },
    { h: 'Role-based views', p: 'Four landing screens over one data model, with access enforced in the API.' },
    { h: 'Mobile-first', p: 'Parent and teacher journeys designed on the phone frame first, then widened.' },
    { h: 'Aira assistant', p: 'Natural-language answers scoped to the asker\'s permissions.' },
    { h: 'Multi-campus schema', p: 'Campus modelled as a first-class entity so growth is not a rewrite.' }
  ],

  screensHeading: 'Live site, and the brand it carries.',
  screens: [
    { src: 'assets/screens/vidyapeeth360-1.jpg', wide: true,
      alt: 'Vidyapeeth360 live website hero — "The connected school ERP. AI, governed by people."',
      caption: '<b>The live site.</b> The hero as shipped — the product claim, the trial and demo actions, and the plan-transparency line under them that answers the cost question before a school has to ask it.' },
    { src: 'assets/screens/helprevx-brand.jpg', wide: true,
      alt: 'HelpRevX brand direction board — logo mark, wordmark, colour system and applications on cards and a mug',
      caption: '<b>Brand direction.</b> The HelpRevX mark and wordmark with its colour system and applications — designed alongside the Vidyapeeth360 logo so the company and its product read as one family.' },
    { src: 'assets/screens/vidyapeeth360-2.jpg',
      alt: 'Vidyapeeth360 website — closing illustration section',
      caption: '<b>The closing scene.</b> The illustrated section that carries the page from the module list into the final call to action.' },
    { src: 'assets/screens/helprevx-colours.jpg',
      alt: 'HelpRevX colour system — five named roles with hex values',
      caption: '<b>Colour system.</b> Five named roles with exact values, so every surface and accent on both products resolves to a defined token.' },
    { src: 'assets/screens/vidyapeeth360-3.jpg',
      alt: 'Vidyapeeth360 logo — mark and wordmark',
      caption: '<b>The logo.</b> Mark and wordmark, drawn in the same family as the HelpRevX identity.' },
    { src: 'assets/screens/vidyapeeth360-4.jpg',
      alt: 'Vidyapeeth360 website — Aira AI assistant section',
      caption: '<b>Aira.</b> The assistant section — fee, attendance and academic questions answered in place, scoped to who is asking.' },
    { src: 'assets/screens/vidyapeeth360-5.jpg',
      alt: 'Vidyapeeth360 website — mobile access section',
      caption: '<b>Mobile access.</b> Parents, students, teachers and owners, each with their own view.' },
    { src: 'assets/screens/vidyapeeth360-6.jpg',
      alt: 'Vidyapeeth360 website — why us section',
      caption: '<b>Built for Indian institutions.</b> Multi-campus, role-based access, every device.' },
    { src: 'assets/screens/vidyapeeth360-7.jpg', wide: true,
      alt: 'Vidyapeeth360 — self-serve school registration form',
      caption: '<b>Onboarding.</b> The self-serve registration flow — a school signs up and goes live in minutes, which is the friction that had been losing customers.' }
  ],

  contribution: ['Website UI — wireframes to shipped screens', 'Vidyapeeth360 and HelpRevX logos', 'School registration and onboarding flow', 'Information architecture', 'Role-based journey design', 'Database architecture and API specification', 'AI capability specification'],
  outcome: 'A live product: the Vidyapeeth360 website is shipped and the brand it carries is one I designed. Underneath it, a structured K-12 ERP where the design work and the data model were decided together — which is what made four genuinely different role views affordable rather than four separate products.',
  quote: { text: 'Designing the schema and the screens in the same week is what made four different first screens cheap instead of expensive.', cite: 'On designing structure and interface together' }
},

/* ── 04 ─────────────────────────────────────────────────────────────── */
'aayiq': {
  num: '09', title: 'aayiq', kicker: 'Case Study · Omnichannel Customer Experience',
  tagline: 'The interesting design problem was not the AI reply. It was the moment the AI gives up.',
  a: '#a855f7', b: '#ec4899',
  role: 'Applied AI Engineering + Interaction Design', tools: 'Claude · NestJS · PostgreSQL · Prisma · Redis',
  timeline: 'HelpRevX · 2026 – present', cover: 'assets/covers/aayiq.jpg',
  links: [
    { label: 'Visit HelpRevX ↗', href: 'https://www.helprevx.com/', primary: true }
  ],
  screensHeading: 'The platform, as presented.',
  screens: [
    { src: 'assets/screens/aayiq-2.jpg', wide: true,
      alt: 'HelpRevX — "AI that drives every business to grow faster" with product dashboard cards',
      caption: '<b>The platform pitch.</b> An AI CRM that thinks, voice agents and WhatsApp in one place — the omnichannel surface that aayiq\'s intent, retrieval and escalation workflows run behind.' },
    { src: 'assets/screens/aayiq-1.jpg',
      alt: 'HelpRevX website opening frame in the brand orange and blue',
      caption: '<b>The company behind it.</b> The opening frame of helprevx.com, in the orange and blue of the HelpRevX mark I designed.' },
    { src: 'assets/screens/aayiq-3.jpg',
      alt: 'HelpRevX — "AI software built for how Indian businesses actually operate" with four principle cards',
      caption: '<b>Product principles.</b> AI-native from day one, built for India\'s operating layer, vertical products on a shared spine, trust-ready systems — the constraints the handoff design had to honour.' }
  ],

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
  num: '08', title: 'Sleuth', kicker: 'Case Study · Multi-Agent Research Console',
  tagline: 'Making nine agents thinking at once legible to one person waiting on an answer.',
  a: '#f59e0b', b: '#6366f1',
  role: 'Product Design + Engineering', tools: 'Figma · LangGraph · FastAPI · Next.js',
  timeline: '2026', cover: 'assets/covers/sleuth.jpg',
  links: [
    { label: 'View on GitHub ↗', href: 'https://github.com/Gupta-027', primary: true }
  ],
  screensHeading: 'The console, as designed.',
  screens: [
    { src: 'assets/screens/sleuth-1.jpg', wide: true,
      alt: 'Sleuth console concept — agent rail on the left, streaming report with citations in the centre, sources on the right',
      caption: '<b>Console concept.</b> Nine agents and their state in the left rail, the report filling in section by section with a citation on every claim, the sources it drew on at the right — and a guardrail that holds back anything without a matching source until the fact-checker clears it.' }
  ],

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

/* ── 03 ─────────────────────────────────────────────────────────────── */
'campus-event-ai': {
  num: '03', title: 'Campus Event AI', kicker: 'Case Study · Campus Event Discovery Platform',
  tagline: 'Campus events arrive from everywhere — notices, WhatsApp groups, Instagram stories, posters on a wall. This case study designs one personalised feed instead.',
  a: '#6d5efc', b: '#f97316',
  role: 'UX Research · UI/UX Design', tools: 'Figma · FigJam · Figma Make', timeline: 'Self-directed · NIT Rourkela · 2026',
  credit: 'Case study with Sahil Das (NIT Rourkela)',
  cover: 'assets/covers/campus-event-ai.jpg',
  links: [
    { label: 'Open the interactive prototype ↗', href: 'https://diary-menu-14033607.figma.site', primary: true },
    { label: 'Full case study ↗', href: 'https://buffer-layout-94586591.figma.site' }
  ],
  statusNote: 'Design-only: a completed UX case study and a high-fidelity interactive prototype. The product itself has not been built.',

  overview: 'A personalised event-discovery platform for NIT Rourkela students. Official institute events live on the college website; club and student events are pushed through WhatsApp and Instagram. Nobody should have to check both — so the design pulls every source into one feed, ranked by each student\'s interests and behaviour, with reminders that don\'t depend on remembering a poster.',
  problem: 'Students don\'t miss events because events aren\'t announced. They miss them because the announcement is scattered across five channels, none of which is personal, and by the time the right person sees it the registration has closed. The problem is delivery, not supply: the relevant event has to reach the relevant student while there is still time to act.',

  audience: {
    intro: 'Research came from lived campus experience plus targeted interviews — students, a club organiser, observation of how announcements actually travel on WhatsApp and Instagram. The clearest finding: the same student is often both an event-goer and an event-poster, and both run into the same discovery problem from opposite ends.',
    personas: [
      {
        role: 'Arjun — Campus Student',
        context: '"Help me find upcoming events I actually care about without searching through WhatsApp all the time."',
        goals: ['Discover events that match his interests', 'Know about an event before registration closes', 'Save events and be reminded later'],
        needs: ['Event information in one place, not in old posters and scrolled-past messages', 'The full venue name, not an abbreviation a newer student can\'t place'],
        painPoints: ['Finds out too late, or not at all', 'Forgets the timing and can\'t find the original poster again', 'Can\'t tell quickly whether an event is relevant to him']
      },
      {
        role: 'Riya — Student and Club Organiser',
        context: '"Help my event reach students who are genuinely interested in the topic instead of depending on repeated promotion." The same account in a different role — not a separate one.',
        goals: ['Post complete event information easily', 'Reach students who actually care', 'Raise registrations without spamming every channel'],
        needs: ['A straightforward way to capture and categorise a complete event'],
        painPoints: ['Registrations stay low despite promotion', 'Re-shares the same poster across WhatsApp, Instagram and noticeboards because someone always misses it']
      }
    ]
  },

  needs: [
    { title: 'Personalised discovery', text: 'Events surfaced by interest, so nobody has to check every channel every day.' },
    { title: 'Timely surfacing', text: 'Find the event while there is still time to register — not after the deadline.' },
    { title: 'Memory support', text: 'Save or register, then get reminded automatically instead of relying on memory.' },
    { title: 'Clear venues', text: 'Show exactly where an event is, in full, not an internal abbreviation.' }
  ],

  painPoints: [
    { problem: 'Event information is fragmented', why: 'Announcements are spread across WhatsApp, Instagram, posters, event groups, friends and official pages, with no single place to check.', implication: 'Official institute events and student-posted events aggregated into one personalised feed, each labelled by source.' },
    { problem: 'Discovery is passive and often too late', why: 'Students stumble across announcements rather than search, so a relevant event can be found after registration has closed.', implication: 'Upcoming events prioritised, with registration deadlines surfaced prominently in the feed.' },
    { problem: 'Registering doesn\'t mean remembering', why: 'A student who registered can still forget the date, time or venue — and can\'t find the poster again.', implication: 'Automatic reminders before an event, for saved and registered events alike.' },
    { problem: 'Not every event has the same registration', why: 'The first wireframe assumed a single "Register Now" button. Research turned up four distinct registration situations.', implication: 'A dynamic registration state — None, Offline, Online, External — each surfacing the correct next action.' }
  ],

  chains: [
    { need: 'Announcements are scattered across channels.', insight: 'Students miss relevant events, or discover them too late.', decision: 'A personalised home feed that surfaces relevant events before they\'re missed.' },
    { need: 'Students want relevant events; organisers want relevant students.', insight: 'Relevance matters more than volume — a flat list of everything serves neither side.', decision: 'One "All upcoming events" list replaced by "Recommended for you" and "Upcoming this week".' },
    { need: 'Registration works differently for different events.', insight: 'A single button would be wrong for three of the four cases.', decision: 'Four registration states, each with its own action.' }
  ],

  userFlow: ['Discover', 'Evaluate', 'Save / Register', 'Remember', 'Attend'],

  process: [
    { h: 'Research', p: 'Interviewed students and a club organiser, observed the campus environment, and traced how event announcements actually move through WhatsApp and Instagram.' },
    { h: 'Define', p: 'Personas, an empathy map and a journey map, resolved into one problem statement: students need a reliable, personalised, timely way to discover events that match their interests.' },
    { h: 'Architect', p: 'Information architecture and flows for both sides of the same account — discovering and posting — over one data model that combines official and student-posted events.' },
    { h: 'Wireframe and test-plan', p: 'Low-fidelity wireframes in Figma and a scenario-based usability test plan with a think-aloud protocol, covering discovery, registration clarity, saving, reminders and venue information.' },
    { h: 'Iterate on evidence', p: 'Two wireframes changed directly because of research: the single register button became four states, and the flat event list became relevance-ranked sections.' },
    { h: 'High-fidelity prototype', p: 'Landing page, onboarding, personalised feed, event details, search, calendar and the event-posting flow, built as an interactive Figma Make prototype.' }
  ],

  cardsHeading: 'Key features',
  cards: [
    { h: 'Personalised feed', p: 'AI-ranked upcoming events with interest filters and a plain-language reason for each recommendation.' },
    { h: 'Unified sources', p: 'Official institute events and student-posted events in one feed, each labelled by source.' },
    { h: 'Dynamic registration', p: 'None, Offline, Online, External — each surfacing the right next action instead of one generic button.' },
    { h: 'Smart reminders', p: 'Saved and registered events get reminders automatically, whether or not registration was required.' },
    { h: 'Post an event', p: 'A five-step flow — basics, details, registration, organiser, preview — with AI-suggested categories the organiser can still edit.' }
  ],

  screensHeading: 'The prototype.',
  screens: [
    { src: 'assets/screens/campus-event-ai-1.jpg', wide: true, alt: 'Campus Event AI — personalised home feed', caption: '<b>Home.</b> A feed led by "For you" recommendations, with an upcoming-deadlines alert so nothing closes unnoticed.' },
    { src: 'assets/screens/campus-event-ai-2.jpg', alt: 'Campus Event AI — event details page', caption: '<b>Event details.</b> Venue in full, format, eligibility and the registration state together on one page.' },
    { src: 'assets/screens/campus-event-ai-3.jpg', alt: 'Campus Event AI — discover and search', caption: '<b>Discover.</b> Full-text search with category filters and Recommended / Upcoming / Closing-soon sorting.' },
    { src: 'assets/screens/campus-event-ai-4.jpg', alt: 'Campus Event AI — post an event form', caption: '<b>Post an event.</b> Step one of the five-step organiser flow.' },
    { src: 'assets/screens/campus-event-ai-5.jpg', alt: 'Campus Event AI — calendar view', caption: '<b>Calendar.</b> Every event and deadline for the month, colour-coded and expandable by day.' }
  ],

  contribution: ['UX research and synthesis', 'Personas, empathy map, journey map', 'Information architecture and user flows', 'Low-fidelity wireframes and a usability-test plan', 'High-fidelity interactive prototype'],
  outcome: 'A completed UX case study and a high-fidelity interactive prototype — not a shipped product. Usability testing and development are the next steps.',
  quote: { text: 'Students don\'t need more event announcements. They need the right events surfaced at the right time.', cite: 'Core research insight' }
},

/* ── 04 ─────────────────────────────────────────────────────────────── */
'helprevx': {
  num: '04', title: 'HelpRevX', kicker: 'Case Study · Brand Identity System',
  tagline: 'A mark that has to say AI, growth and trust at once — and survive as a favicon, a dark slide and a business card.',
  a: '#2c5ff9', b: '#ff4102',
  role: 'Brand & Visual Design', tools: 'Figma', timeline: 'HelpRevX · 2026',
  credit: 'With Sahil Das — HelpRevX design team',
  cover: 'assets/covers/helprevx.jpg',
  links: [
    { label: 'Visit HelpRevX ↗', href: 'https://www.helprevx.com/', primary: true }
  ],

  overview: 'HelpRevX builds AI products for customer support, automation and growth. Its identity had to establish a recognisable, flexible mark before the wider brand system grew around it — and it had to sit in the same family as Vidyapeeth360, the school ERP it ships. I designed the HelpRevX mark alongside the Vidyapeeth360 logo so the company and its product share one system: the same geometry, one four-colour palette, and rules for light, dark and compact use.',
  problem: 'The mark needed to carry three ideas — AI and technology, business growth, trust — and hold up as a full lockup, a standalone icon and a compact app icon, on light and on dark. Most AI brands solve this with a generic gradient and a geometric glyph. That default was the thing to avoid.',

  audience: {
    intro: 'This project\'s audience is the identity\'s audience: the businesses HelpRevX sells to, and the internal team that has to apply the brand consistently across a company site, a product, decks and cards.',
    personas: [
      {
        role: 'HelpRevX\'s business audience',
        context: 'Companies evaluating an AI support and growth platform — the identity has to earn attention before the product does.',
        goals: ['Recognise HelpRevX as a credible AI and growth-technology company', 'Trust the brand enough to evaluate the product'],
        needs: ['A mark that signals technology, growth and trust at once', 'Consistent presentation across every touchpoint'],
        painPoints: ['AI companies look interchangeable — a sharp glyph and a generic gradient', 'A logo that only works as a hero graphic breaks the moment it becomes a favicon']
      }
    ]
  },

  needs: [
    { title: 'Technology signal', text: 'Reads as modern and AI-relevant at a glance.' },
    { title: 'Growth energy', text: 'Colour and form feel forward-moving, not static.' },
    { title: 'Trust', text: 'Geometry that feels deliberate and balanced.' },
    { title: 'Scalability', text: 'Survives a favicon, a social avatar, a dark slide and a printed card equally.' }
  ],

  painPoints: [
    { problem: 'AI brands look interchangeable', why: 'A single gradient and a geometric icon is the default look for AI start-ups, so it doesn\'t make HelpRevX feel like HelpRevX.', implication: 'A distinctive four-colour system — blue, orange, yellow, green — around a circular H mark, with a defined role for each colour.' },
    { problem: 'Marks that only work at hero size', why: 'Real usage is mostly small: favicons, avatars, app icons, not full-width lockups.', implication: 'The icon was tested standalone and compact from the start, not as an afterthought.' },
    { problem: 'Two products, two looks', why: 'HelpRevX and Vidyapeeth360 would have read as unrelated companies.', implication: 'Both logos designed together with shared geometry and palette logic, so the product is visibly the company\'s.' }
  ],

  chains: [
    { need: 'Signal AI credibility to a business audience.', insight: 'A generic gradient reads as decoration, not conviction.', decision: 'A circular mark with a considered four-colour system, tested on dark and light before finalising.' },
    { need: 'Survive far below hero size.', insight: 'Most touchpoints are small — the icon has to stand alone.', decision: 'A standalone icon finalised alongside the full lockup.' },
    { need: 'Make the product look like the company\'s.', insight: 'Consistency is cheaper to design in than to retrofit.', decision: 'The Vidyapeeth360 logo drawn in the same family, same palette rules.' }
  ],

  process: [
    { h: 'Direction', p: 'Four ideas to design against: AI and technology, business growth, trust, and a modern professional character.' },
    { h: 'Explore', p: 'Logo variations, colour tuning and layout studies in Figma, reviewing symbol and wordmark combinations side by side.' },
    { h: 'Systemise', p: 'A four-colour identity built around a circular symbol and a clear wordmark, with a named role and exact value for each colour and a brand gradient for hero surfaces.' },
    { h: 'Test', p: 'The mark on dark and light backgrounds and in compact formats — favicon, avatar, card, mug — to confirm it holds beyond a presentation board.' }
  ],

  cardsHeading: 'Colour roles',
  cards: [
    { h: 'Primary Brand Blue · #2c5ff9', p: 'Trust, technology, stability — the base of every surface.' },
    { h: 'Vibrant Orange · #ff4102', p: 'Energy, revolution, action — the accent that moves.' },
    { h: 'Warm Yellow · #ffb000', p: 'Optimism and creativity, used sparingly.' },
    { h: 'Growth Green · #3eb771', p: 'Help, freshness, balance — the note that keeps the palette human.' },
    { h: 'Deep Blue · #2e0373', p: 'Modernity and premium contrast for dark surfaces.' },
    { h: 'Brand gradient', p: 'Blue → orange → yellow → green, reserved for hero sections, banners and onboarding; never under body text.' }
  ],

  screensHeading: 'The system.',
  screens: [
    { src: 'assets/screens/helprevx-brand.jpg', wide: true, alt: 'HelpRevX brand direction board — mark, wordmark, colour table, gradient, cards and mug', caption: '<b>Final direction.</b> Mark and wordmark, the colour table with roles and values, the brand gradient, and applications on cards and a mug.' },
    { src: 'assets/screens/helprevx-colours.jpg', alt: 'HelpRevX colour system table', caption: '<b>Colour system.</b> Five named roles with exact values, so every surface resolves to a defined token.' },
    { src: 'assets/screens/helprevx-1.jpg', alt: 'HelpRevX mark tested across black, dark and full-colour variations', caption: '<b>Format exploration.</b> The mark across black, dark and full-colour treatments.' },
    { src: 'assets/screens/helprevx-2.jpg', alt: 'HelpRevX standalone icon mark', caption: '<b>Icon mark.</b> The standalone symbol, tested at compact and favicon scale.' },
    { src: 'assets/screens/helprevx-3.jpg', alt: 'HelpRevX full lockup on a light background', caption: '<b>Full lockup, light.</b> Icon and wordmark together on white.' }
  ],

  contribution: ['Logo mark and wordmark', 'Four-colour system with defined roles', 'Brand gradient and usage rules', 'Applications across dark, light and compact formats', 'Vidyapeeth360 logo in the same family'],
  outcome: 'A scalable first direction for the HelpRevX identity — now carried by the company site and shared with Vidyapeeth360 — that can grow into a broader system across product, communication and marketing.',
  quote: { text: 'A logo that only works at hero size is a poster, not an identity.', cite: 'On testing the mark small first' }
},

/* ── 05 ─────────────────────────────────────────────────────────────── */
'healthpulse': {
  num: '05', title: 'HealthPulse', kicker: 'Case Study · Fitness Mobile App',
  tagline: 'Fitness tracking, AI coaching, nutrition and sleep in one mobile product — designed to stay readable when attention is lowest.',
  a: '#22c55e', b: '#3b82f6',
  role: 'UI/UX Design', tools: 'Figma', timeline: 'Industry project · 2026',
  credit: 'Case study with Sahil Das (1stop.ai industry project)',
  cover: 'assets/covers/healthpulse.jpg',
  links: [
    { label: 'Open the Figma prototype ↗', href: 'https://www.figma.com/proto/CeN7dDfT8hcLvVoxc4stW7/Fitness-app?node-id=1-2&t=NucdH87rw0pPbLWD-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1', primary: true }
  ],

  overview: 'HealthPulse folds fitness tracking, AI coaching, nutrition logging and sleep analytics into one mobile product — a data-rich alternative to a step counter, for health-conscious people roughly 22 to 45. Thirteen screens on a token-based dark system, with a documented interaction spec.',
  problem: 'A fitness app has to make progress legible at a glance, stay usable mid-workout when attention and precision are both low, and serve very different people — the competitive athlete and the total beginner — through the same screens.',

  audience: {
    intro: 'The product brief names four kinds of user, each pulling the app toward a different priority.',
    personas: [
      { role: 'The Athlete', context: 'Active gym-goer, 25–35, tracks workouts daily.', goals: ['Stay on a structured routine'], needs: ['Structured plans', 'Live metrics during a session'], painPoints: ['Losing pace or progress mid-workout without a live view'] },
      { role: 'The Optimiser', context: 'Tracks sleep and HRV, wants to understand recovery.', goals: ['Understand recovery, not just effort'], needs: ['Detailed analytics', 'Insights, not raw numbers'], painPoints: ['Data without interpretation is hard to act on'] },
      { role: 'The Beginner', context: 'Starting out, needs motivation more than features.', goals: ['Build a consistent habit'], needs: ['Guided onboarding', 'Streaks'], painPoints: ['A feature-dense first screen is discouraging'] },
      { role: 'The Wellness Seeker', context: 'Cares about stress, sleep and nutrition over performance.', goals: ['See health as a whole'], needs: ['A holistic score', 'Recommendations across sleep, nutrition and stress'], painPoints: ['Most fitness apps treat sleep and nutrition as secondary'] }
    ]
  },

  needs: [
    { title: 'Glanceability', text: 'A full day — steps, heart rate, sleep, water, calories — readable in one look.' },
    { title: 'Motivation', text: 'Progress that feels visible and rewarded, not merely logged.' },
    { title: 'Guidance', text: 'Meets people at very different fitness levels where they are.' },
    { title: 'Calm under pressure', text: 'Mid-workout, the screen stays legible with minimal attention.' }
  ],

  painPoints: [
    { problem: 'Four personas, one home screen', why: 'The Athlete wants live metrics; the Wellness Seeker wants a holistic score. One dashboard has to serve both without favouring either.', implication: 'A bento-grid dashboard shows steps, heart rate, sleep, water and calories side by side, so every persona\'s priority metric is visible without navigating.' },
    { problem: 'Attention is low mid-workout', why: 'The user is looking at the exercise, not the phone.', implication: 'The active-workout screen uses a large countdown, a simple rep counter and a live heart-rate feed — nothing that has to be read.' },
    { problem: 'A beginner can be lost on day one', why: 'The Beginner needs motivation, not a wall of options.', implication: 'Onboarding opens with a short animated preview of three headline metrics before asking for anything; a streak counter reinforces the habit early.' }
  ],

  chains: [
    { need: 'See the whole day without digging.', insight: 'Five competing metrics need one visual language, not five widget styles.', decision: 'Uniform bento cards for steps, heart rate, sleep, water and calories.' },
    { need: 'Motivate a beginner from the first screen.', insight: 'The first screen decides whether the app feels approachable.', decision: 'Three animated metric rings before any setup.' },
    { need: 'Stay legible mid-workout.', insight: 'Readable at a glance, not read carefully.', decision: 'Large timer, simple rep counter, live heart rate — no dense text.' }
  ],

  userFlow: ['Onboard', 'Plan a workout', 'Train', 'Reflect and track'],

  process: [
    { h: 'Personas', p: 'Four user types — the Athlete, the Optimiser, the Beginner, the Wellness Seeker — each pulling the product a slightly different way.' },
    { h: 'Core loop', p: 'Onboarding → dashboard → workout → active session → completion wireframed first; nutrition, sleep and coaching added as supporting screens.' },
    { h: 'Dashboard', p: 'A bento-grid home — steps, heart rate, sleep, water, calories and a daily AI insight — so a full day reads in one glance.' },
    { h: 'System', p: 'A reusable dark-mode component library and an interaction spec — transitions, ring progress, typing-dot AI responses — for hand-off.' }
  ],

  cardsHeading: 'Key features',
  cards: [
    { h: 'Dashboard', p: 'A bento grid of health metrics, a daily AI insight card and a streak counter.' },
    { h: 'Active workout', p: 'Countdown timer, rep counter and an animated live heart-rate feed.' },
    { h: 'AI coach', p: 'A chat with filterable topics — general, workout, nutrition, sleep, recovery.' },
    { h: 'Sleep and nutrition', p: 'Sleep-stage breakdown and a macro-tracked logger with quick-add meals.' }
  ],

  galleryCols: 4,
  screensHeading: 'The screens.',
  screens: [
    { src: 'assets/screens/healthpulse-1.jpg', alt: 'HealthPulse — onboarding', caption: '<b>Onboarding.</b> Goals set up before the first session.' },
    { src: 'assets/screens/healthpulse-2.jpg', alt: 'HealthPulse — sleep tracking', caption: '<b>Sleep.</b> Deep, light, REM and awake time.' },
    { src: 'assets/screens/healthpulse-3.jpg', alt: 'HealthPulse — nutrition tracking', caption: '<b>Nutrition.</b> Macros with quick-add meals.' },
    { src: 'assets/screens/healthpulse-4.jpg', alt: 'HealthPulse — progress trends', caption: '<b>Progress.</b> Trends across every tracked metric.' }
  ],

  contribution: ['Persona mapping', 'Core-flow design', 'Bento-grid dashboard', 'Component library', 'Interaction spec'],
  outcome: 'A complete high-fidelity Figma prototype — thirteen screens, a token-based dark system and a documented interaction spec.',
  quote: { text: 'Mid-workout, anything that has to be read is a design failure.', cite: 'On the active-session screen' }
},

/* ── 06 ─────────────────────────────────────────────────────────────── */
'nexus-ai': {
  num: '06', title: 'Nexus AI', kicker: 'Case Study · AI Platform Dashboard',
  tagline: 'A developer dashboard for an AI API platform — usage, models, keys and team in one calm, data-dense interface.',
  a: '#22d3ee', b: '#6366f1',
  role: 'UI/UX Design', tools: 'Figma', timeline: 'Industry project · 2026',
  credit: 'Case study with Sahil Das (1stop.ai industry project)',
  cover: 'assets/covers/nexus-ai.jpg',
  links: [
    { label: 'Open the Figma prototype ↗', href: 'https://www.figma.com/proto/0yUj5Y35NkNUyKN02YCJEh/Untitled?node-id=3-2&t=p6REn8GLBAXU8wuW-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=7%3A46', primary: true }
  ],

  overview: 'A dashboard concept for developers, ML engineers and platform teams building on an AI API: real-time usage, model management, API keys and team activity in one place. Five core views on a token-based dark system.',
  problem: 'A platform like this surfaces a lot of state at once — revenue, live traffic, model performance, team activity — for several kinds of user. Without deliberate structure it becomes a wall of panels nobody can read quickly. It needed hierarchy before it needed decoration.',

  audience: {
    intro: 'Four groups use the same dashboard, each with a different primary task.',
    personas: [
      { role: 'The Developer', context: 'Individual API consumer, the most frequent user.', goals: ['Keep the integration healthy day to day'], needs: ['Usage, keys and logs', 'A KPI overview on login', 'A live call feed for debugging'], painPoints: ['Key hygiene slips without a clear rotate/revoke flow'] },
      { role: 'The Team Lead', context: 'Engineering manager watching cost and growth.', goals: ['Track team usage and cost'], needs: ['Team usage, cost controls, model performance'], painPoints: ['Cost data scattered across views'] },
      { role: 'The Data Analyst', context: 'Focused on the numbers behind the product.', goals: ['Understand revenue, query volume and conversion'], needs: ['Trend charts over a selectable range'], painPoints: ['Raw numbers without trend context are slow to act on'] },
      { role: 'The Admin', context: 'Keeps access and billing under control.', goals: ['Manage users, roles and billing'], needs: ['Centralised user management and settings'], painPoints: ['Permissions buried instead of centralised'] }
    ]
  },

  needs: [
    { title: 'Glanceability', text: 'Revenue, users, queries and conversion readable in the first two seconds.' },
    { title: 'One-click access', text: 'Every persona\'s core task — logs, keys, models, team — one click away.' },
    { title: 'Trust in the data', text: 'Live and near-live data that visibly feels current.' },
    { title: 'Deliberate control', text: 'Rotating a key is fast but never accidental.' }
  ],

  painPoints: [
    { problem: 'Too much state, no hierarchy', why: 'Revenue, traffic, model performance and team activity competing at once is unreadable.', implication: 'Navigation and page structure first — Analytics, Models, API, Team — before any styling.' },
    { problem: 'Security actions must stay deliberate', why: 'A mistaken key action is costly, but developers still need to act fast.', implication: 'Inline copy, rotate and revoke per row, with scoped permissions set explicitly at creation.' },
    { problem: 'Four personas on one shell', why: 'A developer\'s daily dashboard and an admin\'s occasional settings visit are different jobs.', implication: 'A collapsible sidebar keeps daily sections close and admin areas reachable but quiet.' }
  ],

  chains: [
    { need: 'Different primary views of one dashboard.', insight: 'A fixed layout makes every persona wade through someone else\'s screens.', decision: 'A collapsible sidebar grouped into Analytics, Models, API and Team.' },
    { need: 'Assess platform health on login.', insight: 'The first screen should answer "is everything OK?"', decision: 'Four KPI cards that count up on load, backed by a live API feed.' },
    { need: 'Fast but deliberate key actions.', insight: 'One click to reach, never a silent one.', decision: 'Inline actions with explicit scoped permissions.' }
  ],

  userFlow: ['Log in', 'Scan the overview', 'Explore models and analytics', 'Manage keys or team'],

  process: [
    { h: 'Personas', p: 'The individual developer, the team lead, the data analyst and the platform admin — each needing a different primary view.' },
    { h: 'Structure', p: 'The navigation shell wireframed first — a collapsible sidebar grouped into Analytics, Models, API and Team — so every task sat one click away.' },
    { h: 'System', p: 'A token-based dark UI: cyan and violet accents, semantic colour for success, warning and error, reusable card and table components.' },
    { h: 'Screens', p: 'Five high-fidelity views and an interaction spec — count-up KPIs, sidebar collapse, card hover, scroll reveal — for hand-off.' }
  ],

  cardsHeading: 'Key features',
  cards: [
    { h: 'Overview', p: 'Four KPI cards — revenue, users, queries, conversion — with a count-up, beside a live API feed.' },
    { h: 'Model hub', p: 'Model cards with status badges for active, beta and deprecated.' },
    { h: 'API keys', p: 'A key table with inline copy, rotate and revoke, and scoped permissions on creation.' },
    { h: 'Command palette', p: 'Keyboard-first navigation to any page or action.' }
  ],

  screensHeading: 'The views.',
  screens: [
    { src: 'assets/screens/nexus-ai-1.jpg', alt: 'Nexus AI — analytics view', caption: '<b>Analytics.</b> Usage trends, latency and error rate in one filterable view.' },
    { src: 'assets/screens/nexus-ai-2.jpg', alt: 'Nexus AI — model hub', caption: '<b>Model hub.</b> Every model, its status and its usage at a glance.' },
    { src: 'assets/screens/nexus-ai-3.jpg', alt: 'Nexus AI — API keys', caption: '<b>API keys.</b> Scoped permissions with inline copy, rotate and revoke.' },
    { src: 'assets/screens/nexus-ai-4.jpg', alt: 'Nexus AI — team view', caption: '<b>Team.</b> Members, roles and recent activity.' }
  ],

  contribution: ['Persona and IA definition', 'Navigation structure', 'Token-based design system', 'High-fidelity screens', 'Interaction spec'],
  outcome: 'A complete high-fidelity Figma prototype — five core views, a token-based system and a documented interaction spec — showing that a data-dense developer product can still feel calm.',
  quote: { text: 'Hierarchy first. If the structure is right, the dashboard can afford to be quiet.', cite: 'On designing for four personas at once' }
},

/* ── Explorations ───────────────────────────────────────────────────── */
'novaretail': {
  num: '—', title: 'AI Business Intelligence', kicker: 'Exploration · Decision Support Platform',
  tagline: 'An end-to-end analytics and decision-support platform, built as a consulting engagement for an omnichannel European retailer.',
  a: '#8b5cf6', b: '#22d3ee',
  role: 'Analysis + Dashboard Design', tools: 'Python · SQL · Power BI · LLM analytics',
  timeline: '2026', cover: 'assets/covers/novaretail.jpg',

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
  timeline: '2026', cover: 'assets/covers/rag-policy.jpg',

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
  timeline: 'July 2026', cover: 'assets/covers/coca-cola.jpg',

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
  timeline: '2026', cover: 'assets/covers/crude-oil.jpg',

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
const CS_ORDER = ['vidyapeeth360', 'bfsi-risk', 'campus-event-ai', 'helprevx', 'healthpulse', 'nexus-ai',
                  'yatraai', 'sleuth', 'aayiq',
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
        ${cs.credit ? `<div><dt>Credit</dt><dd>${e(cs.credit)}</dd></div>` : ''}
      </dl>
      ${cs.statusNote ? `<p class="csp__note">${e(cs.statusNote)}</p>` : ''}
      ${(() => {
        const links = cs.links || (cs.live ? [cs.live] : []);
        if (!links.length) return '';
        return `<div class="csp__links">${links.map((l) =>
          `<a class="btn ${l.primary ? 'btn--fill' : 'btn--out'}" href="${e(l.href)}" target="_blank" rel="noopener noreferrer">${e(l.label)}</a>`
        ).join('')}</div>`;
      })()}
    </header>

    <figure class="csp__shot">
      <img src="${e(cs.cover)}" alt="${e(cs.title)} — cover" width="1600" height="1000" fetchpriority="high" />
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

  /* ── Screens — real product frames, each opening in the shared lightbox ── */
  if (cs.screens && cs.screens.length) out.push(sec('Screens', `
      <h2 class="csp__h">${e(cs.screensHeading || 'The product, as shipped.')}</h2>
      <div class="csp__gallery csp__gallery--${cs.galleryCols || (cs.screens.length > 1 ? 2 : 1)}">
        ${cs.screens.map((s) => `
        <figure class="csp__fig${s.wide ? ' csp__fig--wide' : ''}">
          <button type="button" class="csp__zoom" data-lightbox="${e(s.src)}" data-lightbox-alt="${e(s.alt)}" aria-label="Enlarge: ${e(s.alt)}">
            <img src="${e(s.src)}" alt="${e(s.alt)}" loading="lazy" decoding="async" />
          </button>
          ${s.caption ? `<figcaption>${s.caption}</figcaption>` : ''}
        </figure>`).join('')}
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
