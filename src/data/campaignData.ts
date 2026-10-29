/**
 * ============================================================================
 * 🗳️ LEAD PARTYLIST - OFFICIAL CAMPAIGN CONFIGURATION & ROSTER
 * ============================================================================
 */

export interface Candidate {
  id: string;
  ballotNumber: number;
  name: string;
  nickname: string;
  position: string;
  category: 'Executive Council' | 'Councilors' | 'Representatives';
  courseYear: string;
  tagline: string;
  advocacy: string;
  photoUrl?: string;
  pubmatLocation: string;
}

export interface PlatformPillar {
  letter: 'L' | 'E' | 'A' | 'D';
  keyword: string;
  title: string;
  summary: string;
  initiatives: string[];
}

export interface CampaignSettings {
  partylistName: string;
  partylistAcronym: string;
  subTitle: string;
  tagline: string;
  officialHashtags: string[];
  schoolName: string;
  councilName: string;
  electionDate: string;
  votingPortalUrl: string;
  pubmatBannerSrc: string;
  jingleAudioSrc: string;
  schoolLogoSrc: string;
  secLogoSrc: string;
  schoolLogoPng?: string;
  secLogoPng?: string;
  contactEmail: string;
}

export const CAMPAIGN_SETTINGS: CampaignSettings = {
  partylistName: "LEAD PARTYLIST",
  partylistAcronym: "Leaders Engaged in Action and Dedication",
  subTitle: "Student Executive Council Elections 2026",
  tagline: "Driven by Purpose, United for Student Progress",
  officialHashtags: ["#VoteLEAD", "#LeadersInAction", "#LEAD2026", "#SubokAtTapat"],
  schoolName: "CVE Colleges Inc.",
  councilName: "Student Executive Council (SEC)",
  electionDate: "2026-11-20T08:00:00",
  votingPortalUrl: "#sample-ballot",
  
  pubmatBannerSrc: "/assets/aistudio/Messenger_creation_1481687400577797_60971d88.jpeg",
  jingleAudioSrc: "/assets/campaign-jingle.mp3",
  schoolLogoSrc: "/assets/school-logo-transparent.png",
  secLogoSrc: "/assets/sec-logo-transparent.png",
  schoolLogoPng: "/assets/school-logo-transparent.png",
  secLogoPng: "/assets/sec-logo-transparent.png",
  contactEmail: "leadpartylist.sec@gmail.com",
};

/**
 * 👥 OFFICIAL LEAD PARTYLIST SLATE (16 CANDIDATES)
 */
export const CANDIDATE_ROSTER: Candidate[] = [
  // =================== EXECUTIVE COUNCIL ===================
  {
    id: "pres",
    ballotNumber: 1,
    name: "Shine Vizagar",
    nickname: "Shine",
    position: "President",
    category: "Executive Council",
    courseYear: "Student Leader · Executive Slate",
    tagline: "Illuminating Student Governance with Compassion, Vision, and Action",
    advocacy: "Student Rights, Open Governance & Campus Modernization",
    photoUrl: "/assets/aistudio/vizagar_bbd26e64.JPG",
    pubmatLocation: "Center Row (Focal Leader)",
  },
  {
    id: "vp",
    ballotNumber: 2,
    name: "Kyle Airon P. Laroza",
    nickname: "Kyle",
    position: "Vice-President",
    category: "Executive Council",
    courseYear: "Student Leader · Executive Slate",
    tagline: "Bridging Every Department, Championing Every Student Voice",
    advocacy: "Inter-College Unity & Student Organization Empowerment",
    photoUrl: "/assets/aistudio/laroza_1aafc6c6.JPG",
    pubmatLocation: "Top Row (Executive Slate)",
  },
  {
    id: "sec",
    ballotNumber: 3,
    name: "Sharie Llame",
    nickname: "Sharie",
    position: "Secretary",
    category: "Executive Council",
    courseYear: "Student Leader · Executive Slate",
    tagline: "Systematic Records, Prompt Transcripts, Transparent Communications",
    advocacy: "Digital Documentation & Open Records Access",
    photoUrl: "/assets/aistudio/llame_54e9c915.JPG",
    pubmatLocation: "Executive Core",
  },
  {
    id: "treas",
    ballotNumber: 4,
    name: "Angel Norie Rose C. Patotoy",
    nickname: "Angel",
    position: "Treasurer",
    category: "Executive Council",
    courseYear: "Student Leader · Executive Slate",
    tagline: "Every Piso Accounted, Every Fund Maximized for the Student Body",
    advocacy: "Fiscal Transparency & Student Emergency Support",
    photoUrl: "/assets/aistudio/patotoy_7995c918.JPG",
    pubmatLocation: "Executive Core",
  },
  {
    id: "aud",
    ballotNumber: 5,
    name: "Lea Mae Cabile",
    nickname: "Lea",
    position: "Auditor",
    category: "Executive Council",
    courseYear: "Student Leader · Executive Slate",
    tagline: "Uncompromising Integrity, Diligent Scrutiny, Honest Service",
    advocacy: "Checks and Balances in Student Governance",
    photoUrl: "/assets/aistudio/cabile_53f36087.JPG",
    pubmatLocation: "Executive Core",
  },

  // =================== COUNCILORS ===================
  {
    id: "counc-1",
    ballotNumber: 6,
    name: "Gabriel L. Gunio",
    nickname: "Gabriel",
    position: "Councilor",
    category: "Councilors",
    courseYear: "Student Councilor Slate",
    tagline: "Action-Driven Service, Tireless Dedication for All Students",
    advocacy: "Campus Facilities & Student Services Improvement",
    photoUrl: "/assets/aistudio/gunio_3569f146.JPG",
    pubmatLocation: "Councilor Slate",
  },
  {
    id: "counc-2",
    ballotNumber: 7,
    name: "Tony Alkuino",
    nickname: "Tony",
    position: "Councilor",
    category: "Councilors",
    courseYear: "Student Councilor Slate",
    tagline: "A Voice That Listens, Hands That Work, Leadership That Cares",
    advocacy: "Student Welfare & Organization Collaboration",
    photoUrl: "/assets/aistudio/alkuino_cb09287a.JPG",
    pubmatLocation: "Councilor Slate",
  },
  {
    id: "counc-3",
    ballotNumber: 8,
    name: "Ylonah Gene Atienza",
    nickname: "Ylonah",
    position: "Councilor",
    category: "Councilors",
    courseYear: "Student Councilor Slate",
    tagline: "Empowering Creative Potential, Championing Student Inclusivity",
    advocacy: "Arts, Culture & Gender-Inclusive Safe Spaces",
    photoUrl: "/assets/aistudio/atienza_d763134a.JPG",
    pubmatLocation: "Councilor Slate",
  },
  {
    id: "counc-4",
    ballotNumber: 9,
    name: "Sheina Glorioso",
    nickname: "Sheina",
    position: "Councilor",
    category: "Councilors",
    courseYear: "Student Councilor Slate",
    tagline: "Genuine Dedication to Academic Excellence and Student Rights",
    advocacy: "Academic Freedom, Fair Grading Appeals & Student Handbooks",
    photoUrl: "/assets/aistudio/glorioso_c63a47db.JPG",
    pubmatLocation: "Councilor Slate",
  },
  {
    id: "counc-5",
    ballotNumber: 10,
    name: "John Paul Roqueza",
    nickname: "JP",
    position: "Councilor",
    category: "Councilors",
    courseYear: "Student Councilor Slate",
    tagline: "Leading with Energy, Uniting Students in Positive Action",
    advocacy: "Sports Development, Intramurals & Healthy Campus Lifestyles",
    photoUrl: "/assets/aistudio/roqueza_a4292900.JPG",
    pubmatLocation: "Councilor Slate",
  },
  {
    id: "counc-6",
    ballotNumber: 11,
    name: "Charles R. Lustares",
    nickname: "Charles",
    position: "Councilor",
    category: "Councilors",
    courseYear: "Student Councilor Slate",
    tagline: "Building Bridges, Fostering Innovation in Student Projects",
    advocacy: "Technology, Innovation & Student Entrepreneurship",
    photoUrl: "/assets/aistudio/lustares_ebd1e1ae.JPG",
    pubmatLocation: "Councilor Slate",
  },
  {
    id: "counc-7",
    ballotNumber: 12,
    name: "Deserie Aragon",
    nickname: "Deserie",
    position: "Councilor",
    category: "Councilors",
    courseYear: "Student Councilor Slate",
    tagline: "Dedicated Heart for Community Outreach and Student Unity",
    advocacy: "Community Outreaches, Civic Engagement & Environmental Drives",
    photoUrl: "/assets/aistudio/aragon_b31225e2.JPG",
    pubmatLocation: "Councilor Slate",
  },

  // =================== REPRESENTATIVES ===================
  {
    id: "rep-1",
    ballotNumber: 13,
    name: "Juliene Margarette M. Tuazon",
    nickname: "Juliene",
    position: "1st Year Representative",
    category: "Representatives",
    courseYear: "1st Year Council Representative",
    tagline: "Guiding Freshmen with Care, Welcoming the Future of Our College",
    advocacy: "Freshman Onboarding & Campus Integration",
    photoUrl: "/assets/aistudio/tuazon_cbab3feb.JPG",
    pubmatLocation: "Representative Row",
  },
  {
    id: "rep-2",
    ballotNumber: 14,
    name: "Bea Catherine C. De Aro",
    nickname: "Bea",
    position: "2nd Year Representative",
    category: "Representatives",
    courseYear: "2nd Year Council Representative",
    tagline: "Strengthening Sophomore Bonds, Elevating Student Potential",
    advocacy: "Sophomore Academic Support & Career Roadmaps",
    photoUrl: "/assets/aistudio/de_aro_6d70efa2.JPG",
    pubmatLocation: "Representative Row",
  },
  {
    id: "rep-3",
    ballotNumber: 15,
    name: "Shamira Mae C. Thomas",
    nickname: "Shamira",
    position: "3rd Year Representative",
    category: "Representatives",
    courseYear: "3rd Year Council Representative",
    tagline: "Paving the Way for Practicum Success and Solid Preparation",
    advocacy: "Pre-OJT Readiness, Internships & Industry Partnerships",
    photoUrl: "/assets/aistudio/thomas_b3901431.JPG",
    pubmatLocation: "Representative Row",
  },
  {
    id: "rep-4",
    ballotNumber: 16,
    name: "Mark Vista",
    nickname: "Mark",
    position: "4th Year Representative",
    category: "Representatives",
    courseYear: "4th Year Council Representative",
    tagline: "Championing Graduating Seniors Towards Career and Board Exam Triumph",
    advocacy: "Graduation Clearances, Board Exam Support & Career Expos",
    photoUrl: "/assets/aistudio/vista_25546854.JPG",
    pubmatLocation: "Representative Row",
  }
];

/**
 * 🌟 L.E.A.D. 4-PILLAR PLATFORM MATRIX
 */
export const PLATFORM_PILLARS: PlatformPillar[] = [
  {
    letter: "L",
    keyword: "Leadership",
    title: "Leadership with Integrity and Accountability",
    summary: "Governance built on absolute transparency, published liquidation reports, open council meetings, and consultative student bodies.",
    initiatives: [
      "Open-Book Governance: Public liquidation reports published after events.",
      "Monthly Town Halls: Direct dialogue between council officers and class representatives.",
      "Student Ombudsman Desk: Objective resolution of student concerns and administrative hurdles."
    ]
  },
  {
    letter: "E",
    keyword: "Empowerment",
    title: "Empowerment & Student Rights Protection",
    summary: "Defending student welfare, promoting mental health safety nets, upholding gender inclusivity, and championing campus democracy.",
    initiatives: [
      "Safe Space Hotline & confidential mental wellness peer support desks.",
      "Strict enforcement of Student Handbook rights, fair grading review appeals, and due process.",
      "Full subsidization and logistical backing for student-led academic clubs and creative societies."
    ]
  },
  {
    letter: "A",
    keyword: "Action",
    title: "Action-Driven Campus Services & Facilities",
    summary: "Tangible improvements in campus life: faster Wi-Fi advocacy, modern laboratory apparatus, clean restrooms, and reliable study spaces.",
    initiatives: [
      "Campus Facility Audit: Regular monitoring of water dispensers, restrooms, and air conditioning.",
      "Digital Student Portal: Online reservation for SEC sound systems, sports gear, and study pods.",
      "OJT & Career Highway: Direct linkages with Quezon and Manila corporate recruiters for internships."
    ]
  },
  {
    letter: "D",
    keyword: "Dedication",
    title: "Dedication to Inclusive Student Life & Culture",
    summary: "Fostering school pride, vibrant intramurals, artistic expos, community charity missions, and support for all student demographics.",
    initiatives: [
      "Annual Inter-College Sports & Esports Festival with live-streamed matches.",
      "Student Entrepreneur Bazaar: Free promotion and stalls for student-owned business startups.",
      "Disaster Relief & Civic Outreach: Mobilizing quick aid drives in solidarity with affected communities."
    ]
  }
];
