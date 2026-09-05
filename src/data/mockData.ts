import type { ProjectIdea, GenerateInput, ComplexityBreakdown } from '@/types';

const ideaTemplates: Record<string, Omit<ProjectIdea, 'id'>[]> = {
  'AI/ML': [
    {
      title: 'MediScan AI: Real-Time Disease Detection from Medical Imaging',
      tagline: 'See what doctors might miss — instantly.',
      problem: 'Rural clinics lack specialist radiologists, causing delayed diagnosis of critical conditions like pneumonia, tuberculosis, and fractures. Patients wait weeks for results that could save lives.',
      innovationScore: 9,
      techStack: {
        frontend: ['React', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Python FastAPI', 'Flask'],
        aiml: ['TensorFlow', 'PyTorch', 'CNN (ResNet50)', 'OpenCV'],
        hardware: ['GPU Server', 'Medical Scanner Interface'],
        database: ['PostgreSQL', 'Redis'],
      },
      coreFeatures: [
        'Upload X-ray/CT scan and get instant disease classification with confidence score',
        'Heatmap visualization highlighting affected regions using Grad-CAM',
        'Patient history tracking with secure medical records',
        'Multi-disease detection supporting 15+ conditions from a single scan',
        'Doctor review portal with AI-assisted second opinion system',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Dataset', description: 'Collect and preprocess medical imaging datasets (CheXpert, NIH Chest X-rays). Train baseline CNN models.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Build FastAPI backend with model inference endpoint. Create basic React frontend for image upload.', weeks: 'Weeks 4-6' },
        { phase: 'Phase 3: Core Build', description: 'Implement Grad-CAM visualization, patient management, multi-disease pipeline, and doctor portal.', weeks: 'Weeks 7-11' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Model accuracy validation, security audit, deploy on AWS with GPU instance, user testing with medical students.', weeks: 'Weeks 12-14' },
      ],
      whyImpress: 'Demonstrates deep learning expertise with real-world healthcare impact. Judges love projects that solve critical problems with measurable outcomes. Shows full-stack mastery from ML pipeline to production deployment — a rare combination that placement teams actively seek.',
      estimatedCost: '₹5,000-8,000 for cloud GPU (AWS/GCP), free datasets, open-source tools. Total: ~₹8,000',
      hardwareNeeded: 'GPU-enabled machine for training (or cloud GPU), standard laptop for development',
      futureEnhancements: [
        'Mobile app for field deployment in rural areas',
        'Integration with hospital PACS systems',
        'Federated learning across multiple hospitals for privacy-preserving model improvement',
        'Real-time video analysis for endoscopy assistance',
      ],
    },
    {
      title: 'SignBridge: Real-Time Sign Language to Speech Translator',
      tagline: 'Breaking silence between worlds.',
      problem: 'Over 70 million deaf individuals worldwide struggle to communicate with non-signers in daily life — at banks, hospitals, schools. Human interpreters are expensive and rarely available on demand.',
      innovationScore: 8,
      techStack: {
        frontend: ['React Native', 'Expo'],
        backend: ['Node.js', 'Express', 'Socket.io'],
        aiml: ['MediaPipe', 'LSTM', 'TensorFlow Lite', 'Gesture Recognition'],
        hardware: ['Smartphone Camera', 'Raspberry Pi (optional kiosk mode)'],
        database: ['Firebase Firestore'],
      },
      coreFeatures: [
        'Real-time hand gesture capture and sign language recognition at 30fps',
        'Instant translation to spoken audio using Web Speech API',
        'Two-way mode: converts speech to text for hearing-impaired users',
        'Supports Indian Sign Language (ISL) and American Sign Language (ASL)',
        'Conversation history with editable translations and learning mode',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Dataset', description: 'Study ISL/ASL gesture vocabularies. Collect gesture data using MediaPipe landmarks. Build initial dataset of 50+ signs.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Train LSTM model on gesture sequences. Build React Native app skeleton with camera feed.', weeks: 'Weeks 4-5' },
        { phase: 'Phase 3: Core Build', description: 'Implement real-time inference, speech synthesis, two-way communication, and conversation UI.', weeks: 'Weeks 6-9' },
        { phase: 'Phase 4: Testing & Deployment', description: 'User testing with deaf community, accuracy optimization, App Store/Play Store preparation.', weeks: 'Weeks 10-12' },
      ],
      whyImpress: 'Accessibility projects resonate deeply with judges and placement panels. Combines computer vision, NLP, and mobile development — showing versatility. The social impact angle makes it memorable and pitch-worthy, which is exactly what hackathon judges remember.',
      estimatedCost: '₹2,000-3,000 for cloud hosting. Smartphone for testing. Total: ~₹3,000',
      hardwareNeeded: 'Smartphone with camera, laptop for development',
      futureEnhancements: [
        'Wearable glove integration for more precise gesture capture',
        'Regional sign language support (20+ Indian regional sign languages)',
        'Offline mode with on-device TFLite model',
        'Integration with video calling platforms (Zoom, Google Meet)',
      ],
    },
    {
      title: 'CropGuard AI: Plant Disease Detection & Yield Prediction',
      tagline: 'Your pocket agronomist.',
      problem: 'Farmers lose 15-25% of crops to diseases they cannot identify early. Agricultural extension officers are sparse, and by the time experts arrive, damage is irreversible. Small farmers cannot afford consulting services.',
      innovationScore: 8,
      techStack: {
        frontend: ['Flutter', 'React Web Dashboard'],
        backend: ['Django REST Framework', 'Celery'],
        aiml: ['PyTorch', 'EfficientNet', 'Time Series Forecasting', 'OpenCV'],
        hardware: ['Smartphone Camera', 'IoT Soil Sensors (optional)'],
        database: ['PostgreSQL', 'InfluxDB'],
      },
      coreFeatures: [
        'Snap a photo of any crop leaf to identify 30+ diseases with treatment recommendations',
        'Yield prediction model based on weather, soil, and historical data',
        'Community disease outbreak map with real-time alerts for nearby farmers',
        'Offline-first design with on-device inference for low-connectivity areas',
        'Market price integration showing best time to sell crops',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Dataset', description: 'Collect PlantVillage dataset + local crop images. Study common regional diseases. Design data pipeline.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Train EfficientNet model. Build Flutter app with camera and offline inference using TFLite.', weeks: 'Weeks 4-6' },
        { phase: 'Phase 3: Core Build', description: 'Implement yield prediction, community map, market price API, and web dashboard for officials.', weeks: 'Weeks 7-11' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Field testing with farmers, model optimization for low-end phones, Play Store deployment.', weeks: 'Weeks 12-14' },
      ],
      whyImpress: 'Agriculture tech is a hot placement sector (AgriTech startups raised $2B+ in 2024). Shows end-to-end system thinking: mobile, ML, IoT, and data visualization. The offline-first approach demonstrates real-world engineering maturity that judges and recruiters both value highly.',
      estimatedCost: '₹3,000-5,000 for cloud + IoT sensors (optional). Total: ~₹5,000',
      hardwareNeeded: 'Smartphone, laptop, optional: ESP32 + soil moisture sensors (~₹500)',
      futureEnhancements: [
        'Drone integration for large-field aerial disease scanning',
        'Automated pesticide dosage recommendation based on disease severity',
        'Government scheme integration for subsidy alerts',
        'Voice-based interface in regional languages for illiterate farmers',
      ],
    },
  ],
  'Web Dev': [
    {
      title: 'DevMatch: AI-Powered Code Pair Programming Platform',
      tagline: 'Find your coding soulmate.',
      problem: 'Developers struggle to find quality pair-programming partners with complementary skills. Existing platforms focus on hiring, not real-time collaboration and learning. Solo developers miss the benefits of pair programming.',
      innovationScore: 8,
      techStack: {
        frontend: ['React', 'Monaco Editor', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Node.js', 'Socket.io', 'Redis'],
        aiml: ['OpenAI API', 'Code Embedding Similarity'],
        hardware: ['Standard Server'],
        database: ['PostgreSQL', 'Redis'],
      },
      coreFeatures: [
        'Real-time collaborative code editor with shared cursor and live syntax highlighting',
        'AI matching algorithm pairing developers by skill complementarity and project interests',
        'Built-in voice chat and video calling during sessions',
        'AI code reviewer providing suggestions during pair sessions',
        'Session recordings with AI-generated summary notes',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Design', description: 'Study collaborative editing (CRDT/OT algorithms). Design matching algorithm. Wireframe the UI.', weeks: 'Weeks 1-2' },
        { phase: 'Phase 2: Prototype', description: 'Build Monaco editor integration with Socket.io sync. Create basic matching and user profiles.', weeks: 'Weeks 3-5' },
        { phase: 'Phase 3: Core Build', description: 'Implement AI matching, voice/video, code review bot, session recording, and profiles.', weeks: 'Weeks 6-10' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Load testing for real-time sync, security audit, deploy on Vercel + Railway.', weeks: 'Weeks 11-12' },
      ],
      whyImpress: 'Real-time collaborative editing is technically impressive (CRDTs are hard). Shows deep WebSocket expertise and system design thinking. Placement teams at product companies love candidates who understand real-time systems and can build developer tools — it shows product empathy.',
      estimatedCost: '₹2,000-3,000 for cloud hosting. Total: ~₹3,000',
      hardwareNeeded: 'Laptop, internet connection',
      futureEnhancements: [
        'VS Code extension for in-editor pair matching',
        'AI-generated pair programming exercises and challenges',
        'Team mode for remote development squads',
        'Integration with GitHub for live PR review sessions',
      ],
    },
    {
      title: 'BlockDocs: Decentralized Document Verification System',
      tagline: 'Trust, but verify — automatically.',
      problem: 'Fake degrees and certificates cost companies billions in verification. Manual verification takes weeks. Students struggle to share verified credentials securely. Centralized databases are vulnerable to tampering.',
      innovationScore: 7,
      techStack: {
        frontend: ['React', 'Ethers.js', 'Tailwind CSS'],
        backend: ['Node.js', 'Express'],
        aiml: ['OCR (Tesseract)', 'Document Classification'],
        hardware: ['Standard Server'],
        database: ['PostgreSQL', 'IPFS'],
      },
      coreFeatures: [
        'Issue tamper-proof digital credentials on Ethereum testnet',
        'Instant verification by employers via QR code or document hash',
        'Student wallet to manage and share verified documents',
        'Institution dashboard for bulk certificate issuance',
        'Public verification page showing blockchain proof of authenticity',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Smart Contracts', description: 'Write and test Solidity smart contracts for credential issuance. Study IPFS for document storage.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Deploy contracts on Sepolia testnet. Build React frontend with wallet connection and document upload.', weeks: 'Weeks 4-6' },
        { phase: 'Phase 3: Core Build', description: 'Implement QR verification, institution dashboard, student wallet, and public verification pages.', weeks: 'Weeks 7-10' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Smart contract audit, gas optimization, frontend deployment, user testing with college admin.', weeks: 'Weeks 11-12' },
      ],
      whyImpress: 'Blockchain projects demonstrate understanding of distributed systems and cryptography — skills that are increasingly valuable. The credential verification use case is real and solves an actual problem colleges face. Shows you can bridge frontend, backend, and Web3 — a rare skill set.',
      estimatedCost: '₹1,000-2,000 for IPFS pinning service. Testnet is free. Total: ~₹2,000',
      hardwareNeeded: 'Laptop, MetaMask browser extension',
      futureEnhancements: [
        'Multi-chain support (Polygon, Arbitrum) for lower gas fees',
        'AI-powered document fraud detection before blockchain minting',
        'Integration with university ERP systems (SAP, Oracle)',
        'NFT-based achievement badges for extracurricular activities',
      ],
    },
    {
      title: 'StudySync: Collaborative Learning with AI Study Companion',
      tagline: 'Learn together, grow faster.',
      problem: 'Students study in isolation, missing the benefits of peer learning. Existing tools are either pure note-taking or pure video calls. There is no platform that combines real-time collaboration, AI tutoring, and progress tracking.',
      innovationScore: 7,
      techStack: {
        frontend: ['React', 'TipTap Editor', 'Tailwind CSS'],
        backend: ['Node.js', 'Socket.io', 'Bull Queue'],
        aiml: ['Gemini API', 'RAG Pipeline', 'Embeddings'],
        hardware: ['Standard Server'],
        database: ['PostgreSQL', 'Pinecone (Vector DB)'],
      },
      coreFeatures: [
        'Real-time collaborative whiteboard and note editor with conflict-free sync',
        'AI study companion that answers questions, generates quizzes, and summarizes notes',
        'Shared study rooms with pomodoro timer and focus music',
        'Spaced repetition flashcards auto-generated from study notes',
        'Progress analytics showing study streaks, topic mastery, and peer comparison',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Architecture', description: 'Study CRDT for collaborative editing. Design RAG pipeline for AI companion. Plan real-time architecture.', weeks: 'Weeks 1-2' },
        { phase: 'Phase 2: Prototype', description: 'Build TipTap collaborative editor. Set up Socket.io rooms. Integrate Gemini API for Q&A.', weeks: 'Weeks 3-5' },
        { phase: 'Phase 3: Core Build', description: 'Implement flashcard generation, spaced repetition, study rooms, analytics dashboard, and AI quiz generation.', weeks: 'Weeks 6-10' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Performance testing, accessibility audit, deploy, and beta test with classmates.', weeks: 'Weeks 11-12' },
      ],
      whyImpress: 'EdTech is a booming sector with massive placement opportunities. Combines real-time collaboration, AI, and data analytics — three high-demand skills. The RAG pipeline shows modern AI engineering, not just API calling. Judges see a product, not just a project.',
      estimatedCost: '₹2,000-4,000 for cloud + vector DB. Total: ~₹4,000',
      hardwareNeeded: 'Laptop, internet connection',
      futureEnhancements: [
        'Mobile app with offline study mode',
        'AI-generated study plans based on exam schedules and learning style',
        'Integration with LMS platforms (Moodle, Canvas)',
        'Gamification with study leagues and achievements',
      ],
    },
  ],
  'IoT': [
    {
      title: 'SmartCity Sense: IoT-Enabled Urban Infrastructure Monitor',
      tagline: 'The city that watches itself.',
      problem: 'Cities lose millions to undetected infrastructure failures — overflowing bins, broken streetlights, water leaks, and air quality spikes. Manual monitoring is reactive, slow, and expensive.',
      innovationScore: 9,
      techStack: {
        frontend: ['React', 'D3.js', 'Leaflet Maps'],
        backend: ['Node.js', 'MQTT Broker', 'InfluxDB'],
        aiml: ['Anomaly Detection', 'Predictive Maintenance'],
        hardware: ['ESP32', 'MQ Sensors', 'Ultrasonic Sensors', 'LoRaWAN Module'],
        database: ['InfluxDB', 'PostgreSQL'],
      },
      coreFeatures: [
        'Real-time air quality monitoring with MQ-135 sensors across city zones',
        'Smart waste management with ultrasonic fill-level sensors and route optimization',
        'Automatic streetlight control based on ambient light and motion detection',
        'City dashboard with live maps, alerts, and predictive maintenance warnings',
        'Citizen mobile app to report issues and view local environmental data',
      ],
      roadmap: [
        { phase: 'Phase 1: Hardware & Sensor Setup', description: 'Build ESP32 sensor nodes for air quality, waste bins, and streetlights. Configure LoRaWAN communication.', weeks: 'Weeks 1-4' },
        { phase: 'Phase 2: Prototype', description: 'Set up MQTT broker and InfluxDB. Build basic dashboard showing live sensor data on maps.', weeks: 'Weeks 5-7' },
        { phase: 'Phase 3: Core Build', description: 'Implement anomaly detection, route optimization, citizen app, and alert system.', weeks: 'Weeks 8-12' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Field deploy 5+ sensor nodes on campus, calibrate sensors, optimize power consumption, final demo.', weeks: 'Weeks 13-15' },
      ],
      whyImpress: 'Smart City is a government priority with ₹2 lakh crore budget. Shows hardware+software+AI integration — the full stack. IoT projects with real sensors demonstrate hands-on engineering that pure software projects cannot. Placement panels at core companies (Siemens, Bosch, Tata) specifically look for this.',
      estimatedCost: '₹8,000-12,000 for ESP32 boards, sensors, LoRaWAN modules, and PCB fabrication. Total: ~₹10,000',
      hardwareNeeded: '5x ESP32 (₹500 each), MQ-135 sensors (₹300 each), ultrasonic sensors (₹150 each), LoRaWAN modules (₹800 each), breadboards, jumper wires',
      futureEnhancements: [
        'Solar-powered sensor nodes for true deployment',
        'Edge AI on ESP32 for on-device anomaly detection',
        'Integration with city traffic management systems',
        'Citizen gamification: reward points for reporting verified issues',
      ],
    },
    {
      title: 'HealthBand: Wearable Vitals Monitor with Fall Detection',
      tagline: 'A guardian on your wrist.',
      problem: 'Elderly individuals living alone face high risk from falls and sudden health events. Existing wearables are expensive and do not alert caregivers in real-time. Critical minutes are lost between an event and help.',
      innovationScore: 8,
      techStack: {
        frontend: ['React Native', 'Expo'],
        backend: ['Node.js', 'Firebase Cloud Messaging'],
        aiml: ['Accelerometer Analysis', 'Heart Rate Anomaly Detection'],
        hardware: ['ESP32 + MPU6050', 'MAX30100 Pulse Sensor', 'Wearable Casing'],
        database: ['Firebase Firestore', 'InfluxDB'],
      },
      coreFeatures: [
        'Real-time heart rate and SpO2 monitoring with abnormal value detection',
        'Fall detection using accelerometer data with automatic caregiver SMS alert',
        'Geofencing alerts when patient leaves designated safe zones',
        'Caregiver dashboard with live vitals, history charts, and alert management',
        'Emergency SOS button with location sharing to emergency contacts',
      ],
      roadmap: [
        { phase: 'Phase 1: Hardware Design', description: 'Build wearable with ESP32, MPU6050 accelerometer, and MAX30100 pulse sensor. Design 3D-printed casing.', weeks: 'Weeks 1-4' },
        { phase: 'Phase 2: Prototype', description: 'Implement sensor data collection, Bluetooth to phone, and basic fall detection algorithm.', weeks: 'Weeks 5-7' },
        { phase: 'Phase 3: Core Build', description: 'Build caregiver app, alert system, geofencing, vitals dashboard, and SOS feature.', weeks: 'Weeks 8-12' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Wear testing, battery optimization, false positive reduction, final demo with elderly volunteer.', weeks: 'Weeks 13-14' },
      ],
      whyImpress: 'Healthcare IoT is a rapidly growing placement sector. Combines hardware, embedded programming, mobile development, and real-time alerts. The elderly care angle is emotionally compelling for demo pitches. Shows you can build a complete product, not just a project.',
      estimatedCost: '₹4,000-6,000 for ESP32, sensors, 3D-printed casing, and battery. Total: ~₹5,000',
      hardwareNeeded: 'ESP32 board (₹500), MPU6050 accelerometer (₹200), MAX30100 pulse sensor (₹300), LiPo battery (₹200), 3D-printed wristband casing (₹500)',
      futureEnhancements: [
        'Integration with hospital emergency systems',
        'AI-powered arrhythmia detection from ECG signal',
        'Multi-user support for care facilities',
        'Insurance integration for premium discounts based on health metrics',
      ],
    },
    {
      title: 'AgriSense: Smart Irrigation with Soil & Weather IoT Network',
      tagline: 'Every drop, perfectly placed.',
      problem: 'Indian farmers over-irrigate by 40% on average, wasting water and reducing crop yields. Traditional timer-based irrigation ignores real-time soil moisture, weather forecasts, and crop-specific water needs.',
      innovationScore: 7,
      techStack: {
        frontend: ['React', 'Chart.js'],
        backend: ['Python Flask', 'MQTT'],
        aiml: ['Soil Moisture Prediction', 'Weather API Integration'],
        hardware: ['ESP32', 'Soil Moisture Sensors', 'Water Pump Relay', 'DHT22'],
        database: ['InfluxDB', 'SQLite'],
      },
      coreFeatures: [
        'Soil moisture sensors across zones with real-time dashboard visualization',
        'Automated irrigation triggered by moisture thresholds and weather forecast',
        'Crop-specific watering schedules based on growth stage and crop type',
        'Water usage analytics with cost savings compared to traditional irrigation',
        'Mobile alerts for critical moisture levels and system malfunctions',
      ],
      roadmap: [
        { phase: 'Phase 1: Hardware Setup', description: 'Assemble ESP32 with soil moisture sensors, DHT22, and water pump relay. Calibrate sensors.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Build MQTT communication, Flask backend, and basic dashboard with live moisture data.', weeks: 'Weeks 4-6' },
        { phase: 'Phase 3: Core Build', description: 'Implement automated irrigation logic, weather API integration, crop schedules, and analytics.', weeks: 'Weeks 7-11' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Deploy in garden/potted plants, test water savings, optimize pump control, final demo.', weeks: 'Weeks 12-13' },
      ],
      whyImpress: 'Water conservation is a national priority (Jal Shakti mission). Demonstrates embedded systems + cloud + data analytics. Practical and demoable — judges can see water being saved in real-time. AgriTech companies (Cropin, DeHaat, Ninjacart) are actively hiring for exactly this skill set.',
      estimatedCost: '₹3,000-5,000 for ESP32, sensors, water pump, and tubing. Total: ~₹4,000',
      hardwareNeeded: 'ESP32 (₹500), capacitive soil moisture sensors x3 (₹300 each), DHT22 (₹250), mini water pump (₹200), relay module (₹150), tubing and connectors (₹300)',
      futureEnhancements: [
        'Solar-powered sensor nodes for field deployment',
        'Machine learning for yield prediction based on irrigation patterns',
        'Government weather service API integration for district-level forecasts',
        'Multi-language voice alerts for farmers',
      ],
    },
  ],
  'Cybersecurity': [
    {
      title: 'PhishNet: AI-Powered Phishing Detection Browser Extension',
      tagline: 'Hook the phishers before they hook you.',
      problem: 'Phishing attacks cause 80% of security breaches. Existing tools rely on URL blocklists that lag behind new attack domains. Users cannot distinguish sophisticated phishing sites from legitimate ones in real-time.',
      innovationScore: 8,
      techStack: {
        frontend: ['React', 'Chrome Extension API', 'Tailwind CSS'],
        backend: ['Python FastAPI', 'BeautifulSoup'],
        aiml: ['BERT', 'URL Feature Extraction', 'Random Forest'],
        hardware: ['Standard Server'],
        database: ['SQLite', 'ChromaDB'],
      },
      coreFeatures: [
        'Real-time URL analysis with ML model scoring phishing probability before page loads',
        'DOM content analysis detecting credential harvesting forms and fake login pages',
        'Visual warning overlay on suspicious pages with detailed risk breakdown',
        'Community reporting system where users flag new phishing sites',
        'Dashboard showing blocked attempts, threat categories, and browsing safety score',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Dataset', description: 'Collect phishing URL datasets (PhishTank, OpenPhish). Extract URL and DOM features. Train BERT classifier.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Build Chrome extension skeleton with content scripts. Create FastAPI inference endpoint. Test basic URL blocking.', weeks: 'Weeks 4-6' },
        { phase: 'Phase 3: Core Build', description: 'Implement DOM analysis, visual overlay, community reporting, and safety dashboard.', weeks: 'Weeks 7-10' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Test against 1000+ phishing URLs, false positive tuning, Chrome Web Store submission, demo.', weeks: 'Weeks 11-12' },
      ],
      whyImpress: 'Cybersecurity is the highest-paying placement domain. Shows ML applied to security — a niche but extremely valuable skill. Browser extensions are a unique platform that most students do not attempt. The community reporting feature shows product thinking beyond just the algorithm.',
      estimatedCost: '₹1,000-2,000 for cloud API hosting. Datasets are free. Total: ~₹2,000',
      hardwareNeeded: 'Laptop, Chrome browser',
      futureEnhancements: [
        'Email phishing detection integration for Gmail and Outlook',
        'Enterprise dashboard for organizations with team-wide threat analytics',
        'Zero-day phishing detection using LLM-based page content analysis',
        'Integration with password managers to prevent credential entry on phishing sites',
      ],
    },
    {
      title: 'SecureVote: Blockchain-Based Tamper-Proof Voting System',
      tagline: 'Democracy, cryptographically guaranteed.',
      problem: 'Electronic voting systems face trust issues due to potential tampering, lack of transparency, and no voter verifiability. Paper ballots are slow and costly. Citizens cannot verify their vote was counted correctly.',
      innovationScore: 9,
      techStack: {
        frontend: ['React', 'Ethers.js', 'Web3.js'],
        backend: ['Node.js', 'Express'],
        aiml: ['Face Recognition', 'Liveness Detection'],
        hardware: ['Webcam', 'Standard Server'],
        database: ['PostgreSQL', 'Ethereum Testnet'],
      },
      coreFeatures: [
        'Biometric voter verification using face recognition with liveness detection',
        'Blockchain-recorded votes with cryptographic receipts for voter verification',
        'Zero-knowledge proof system proving vote counted without revealing choice',
        'Real-time transparent vote tally visible to all stakeholders',
        'Admin dashboard for election setup, voter registration, and result certification',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Smart Contracts', description: 'Write Solidity voting contracts with ZKP compatibility. Study face recognition models for verification.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Deploy contracts on Sepolia testnet. Build React frontend with wallet connection and face capture.', weeks: 'Weeks 4-6' },
        { phase: 'Phase 3: Core Build', description: 'Implement ZKP verification, real-time tally, admin dashboard, and voter receipt system.', weeks: 'Weeks 7-11' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Security audit, gas optimization, mock election test, demo with 50+ voters.', weeks: 'Weeks 12-14' },
      ],
      whyImpress: 'Combines blockchain, biometrics, and cryptography — three advanced domains. E-voting is a national-level discussion topic, making it instantly relatable to judges. Shows understanding of zero-knowledge proofs, which is cutting-edge. Cybersecurity and government tech companies actively recruit this skill set.',
      estimatedCost: '₹1,000-2,000 for testnet gas (free) and cloud hosting. Total: ~₹2,000',
      hardwareNeeded: 'Laptop with webcam, MetaMask browser extension',
      futureEnhancements: [
        'Multi-factor biometric verification (face + voice)',
        'Mobile voting app with secure enclave integration',
        'Integration with national ID systems (Aadhaar) for voter registration',
        'Homomorphic encryption for fully private vote tallying',
      ],
    },
    {
      title: 'ThreatLens: SIEM Dashboard with AI Anomaly Detection',
      tagline: 'See the attack before it happens.',
      problem: 'Small organizations cannot afford enterprise SIEM tools (Splunk costs $50k+/year). They generate thousands of logs daily but lack tools to detect attack patterns. Security teams are overwhelmed by false positives.',
      innovationScore: 8,
      techStack: {
        frontend: ['React', 'Recharts', 'Tailwind CSS'],
        backend: ['Python FastAPI', 'Elasticsearch', 'Logstash'],
        aiml: ['Isolation Forest', 'Autoencoder', 'Log Classification'],
        hardware: ['Standard Server'],
        database: ['Elasticsearch', 'PostgreSQL'],
      },
      coreFeatures: [
        'Real-time log ingestion from multiple sources (syslog, file, API) with parsing',
        'AI anomaly detection flagging unusual access patterns and potential attacks',
        'Attack timeline visualization showing kill chain progression',
        'Automated alert classification reducing false positives by 70%',
        'Incident response playbook with one-click containment actions',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Architecture', description: 'Study SIEM architectures and log formats. Design ELK stack pipeline. Plan anomaly detection models.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Set up Elasticsearch + Logstash. Build FastAPI backend. Create basic dashboard with log search.', weeks: 'Weeks 4-6' },
        { phase: 'Phase 3: Core Build', description: 'Implement anomaly detection, attack timeline, alert classification, and incident playbooks.', weeks: 'Weeks 7-11' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Test with simulated attack logs, tune models, performance test, final demo.', weeks: 'Weeks 12-13' },
      ],
      whyImpress: 'SIEM tools are core to every cybersecurity placement role. Building one from scratch shows deep understanding of security operations. The AI anomaly detection adds modern ML to traditional security — a differentiator. Companies like Palo Alto, CrowdStrike, and Wipro cyber practice hire for exactly this.',
      estimatedCost: '₹3,000-5,000 for cloud server with sufficient RAM for Elasticsearch. Total: ~₹4,000',
      hardwareNeeded: 'Laptop, cloud server with 4GB+ RAM',
      futureEnhancements: [
        'Threat intelligence feed integration (OTX, VirusTotal)',
        'Automated incident response with SOAR playbooks',
        'Mobile app for on-call security analysts',
        'Compliance reporting for ISO 27001 and SOC 2',
      ],
    },
  ],
  'App Dev': [
    {
      title: 'FitJourney: AI Personal Trainer with Pose Correction',
      tagline: 'Your form, perfected.',
      problem: 'Gym memberships are expensive and personal trainers cost ₹3,000+/month. Home workout apps cannot tell if you are doing exercises correctly, leading to injuries and poor results. Beginners give up without guidance.',
      innovationScore: 8,
      techStack: {
        frontend: ['React Native', 'Expo', 'Reanimated'],
        backend: ['Node.js', 'Express'],
        aiml: ['MediaPipe Pose', 'BlazePose', 'Angle Calculations'],
        hardware: ['Smartphone Camera'],
        database: ['Firebase Firestore'],
      },
      coreFeatures: [
        'Real-time pose detection comparing user form to ideal exercise posture',
        'Voice coaching with real-time corrections ("lower your hips", "straighten back")',
        'Personalized workout plans adapting to progress, injuries, and goals',
        'Progress tracking with body measurement charts and workout streaks',
        'Social challenges with friends and community leaderboards',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Pose Model', description: 'Study BlazePose model. Define ideal joint angles for 10+ exercises. Build angle calculation pipeline.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Integrate MediaPipe in React Native. Build camera screen with skeleton overlay. Test basic exercise detection.', weeks: 'Weeks 4-6' },
        { phase: 'Phase 3: Core Build', description: 'Implement voice coaching, workout plans, progress tracking, and social features.', weeks: 'Weeks 7-10' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Test with 5+ exercises, calibrate form thresholds, optimize camera performance, Play Store deploy.', weeks: 'Weeks 11-12' },
      ],
      whyImpress: 'Health-tech is a massive placement sector (Cult.fit, HealthifyMe, GOQii). Real-time pose detection on mobile is technically impressive and demoable. Combines computer vision, mobile dev, and product design. The voice feedback feature makes the demo interactive and memorable for judges.',
      estimatedCost: '₹2,000-3,000 for cloud hosting and Firebase. Total: ~₹3,000',
      hardwareNeeded: 'Smartphone with camera, laptop for development',
      futureEnhancements: [
        'Wearable heart rate integration for effort-based coaching',
        'AI-generated nutrition plans based on workout intensity',
        'Group workout sessions with live form comparison',
        'Integration with fitness equipment (smart treadmills, bikes)',
      ],
    },
    {
      title: 'MoodMate: Mental Health Companion with Emotion AI',
      tagline: 'Your mind, understood.',
      problem: '1 in 4 students experiences mental health issues, but stigma and cost prevent seeking help. Existing apps are either journaling tools or expensive therapy platforms. There is no accessible, AI-powered first-line support.',
      innovationScore: 8,
      techStack: {
        frontend: ['React Native', 'Expo'],
        backend: ['Node.js', 'Express'],
        aiml: ['Gemini API', 'Sentiment Analysis', 'Emotion Detection'],
        hardware: ['Smartphone'],
        database: ['Firebase Firestore', 'Pinecone'],
      },
      coreFeatures: [
        'AI companion that listens, understands, and provides CBT-based coping strategies',
        'Mood tracking with emotion analysis from text and optional voice journaling',
        'Personalized meditation and breathing exercises based on emotional state',
        'Crisis detection with automatic escalation to emergency contacts or helplines',
        'Anonymous community support with AI-moderated peer conversations',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Design', description: 'Study CBT techniques and mental health app guidelines. Design conversation flows. Plan emotion analysis pipeline.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Build chat interface with Gemini API. Implement basic mood tracking and journaling.', weeks: 'Weeks 4-6' },
        { phase: 'Phase 3: Core Build', description: 'Add emotion analysis, meditation library, crisis detection, and community features.', weeks: 'Weeks 7-10' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Privacy audit, crisis detection accuracy testing, beta test with students, Play Store deploy.', weeks: 'Weeks 11-12' },
      ],
      whyImpress: 'Mental health is a trending social impact area that judges connect with emotionally. Shows responsible AI use with crisis detection — not just chatbot. The CBT integration demonstrates domain research beyond pure coding. Health-tech companies and startups are actively building in this space.',
      estimatedCost: '₹2,000-3,000 for cloud + AI API. Total: ~₹3,000',
      hardwareNeeded: 'Smartphone, laptop for development',
      futureEnhancements: [
        'Therapist matching and scheduling integration',
        'Wearable stress detection via heart rate variability',
        'Multi-language support for regional accessibility',
        'Family awareness module with consent-based mood sharing',
      ],
    },
    {
      title: 'SkillSwap: Peer-to-Peer Learning Marketplace',
      tagline: 'Teach what you know, learn what you don\'t.',
      problem: 'Students have skills they can teach but no platform to monetize them. Existing platforms are either formal courses or free YouTube. There is no easy way to find a peer tutor for a specific skill at an affordable price.',
      innovationScore: 7,
      techStack: {
        frontend: ['React Native', 'Expo'],
        backend: ['Node.js', 'Express', 'Socket.io'],
        aiml: ['Gemini API', 'Skill Matching'],
        hardware: ['Smartphone'],
        database: ['PostgreSQL', 'Redis'],
      },
      coreFeatures: [
        'Skill-based matching connecting learners with peer tutors nearby or online',
        'In-app video calls with screen sharing for coding and design sessions',
        'AI-powered skill assessment generating personalized learning paths',
        'Token-based payment system with no transaction fees between students',
        'Rating and review system with AI-flagged fake review detection',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Design', description: 'Study peer learning platforms. Design matching algorithm. Plan video call architecture.', weeks: 'Weeks 1-2' },
        { phase: 'Phase 2: Prototype', description: 'Build user profiles, skill listings, and basic matching. Implement WebRTC video calls.', weeks: 'Weeks 3-5' },
        { phase: 'Phase 3: Core Build', description: 'Add AI assessment, token payments, rating system, and learning paths.', weeks: 'Weeks 6-10' },
        { phase: 'Phase 4: Testing & Deployment', description: 'User testing with college students, payment flow testing, Play Store deploy.', weeks: 'Weeks 11-12' },
      ],
      whyImpress: 'Marketplace platforms show product and business thinking, not just coding. Real-time video calls demonstrate WebRTC expertise. The AI skill assessment adds a modern differentiator. EdTech and marketplace companies (Udemy, Unacademy, Urban Company) value this full-stack mobile experience.',
      estimatedCost: '₹2,000-3,000 for cloud hosting and TURN server. Total: ~₹3,000',
      hardwareNeeded: 'Smartphone, laptop for development',
      futureEnhancements: [
        'Group learning sessions with split payments',
        'AI-generated course material from session recordings',
        'Corporate training marketplace for upskilling employees',
        'Blockchain-verified skill certificates upon completion',
      ],
    },
  ],
  'Blockchain': [
    {
      title: 'ChainVote: Decentralized Governance for Student Organizations',
      tagline: 'Every vote, on-chain forever.',
      problem: 'Student body elections face accusations of manipulation, low transparency, and disputed results. Paper ballots are slow, and centralized digital voting is not trusted. Students cannot verify their votes were counted.',
      innovationScore: 8,
      techStack: {
        frontend: ['React', 'Ethers.js', 'Wagmi'],
        backend: ['Node.js', 'The Graph'],
        aiml: ['None'],
        hardware: ['Standard Server'],
        database: ['PostgreSQL', 'IPFS', 'Ethereum Testnet'],
      },
      coreFeatures: [
        'DAO-style proposal creation and voting on Ethereum testnet',
        'Token-weighted or equal voting configurable per election',
        'Transparent real-time results with blockchain-verified vote counts',
        'Voter anonymity via zero-knowledge proof commitments',
        'Proposal discussion forum with on-chain comment storage',
      ],
      roadmap: [
        { phase: 'Phase 1: Smart Contract Development', description: 'Write and test Solidity governance contracts (Governor pattern). Deploy on Sepolia testnet.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Build React frontend with wallet connection, proposal list, and voting interface.', weeks: 'Weeks 4-6' },
        { phase: 'Phase 3: Core Build', description: 'Implement ZKP voting, discussion forum, The Graph indexing, and admin dashboard.', weeks: 'Weeks 7-11' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Security audit, gas optimization, mock student election, demo.', weeks: 'Weeks 12-13' },
      ],
      whyImpress: 'DAOs are the hottest blockchain application area. Shows deep smart contract knowledge with the Governor pattern. The ZKP anonymity feature demonstrates advanced cryptography understanding. Web3 companies (Polygon, CoinDCX, Binance) actively recruit these skills for high packages.',
      estimatedCost: '₹1,000 for IPFS pinning. Testnet is free. Total: ~₹1,000',
      hardwareNeeded: 'Laptop, MetaMask browser extension',
      futureEnhancements: [
        'Multi-chain deployment (Polygon, Arbitrum) for gasless voting',
        'Mobile voting app with wallet abstraction',
        'Integration with student ID systems for voter eligibility',
        'Quadratic voting for fairer representation',
      ],
    },
    {
      title: 'MediChain: Blockchain Medical Records with Patient Control',
      tagline: 'Your health, your keys, your rules.',
      problem: 'Patient medical records are siloed across hospitals, lost during transfers, and controlled by institutions rather than patients. Data breaches expose sensitive health information. Patients cannot easily share records with new doctors.',
      innovationScore: 9,
      techStack: {
        frontend: ['React', 'Ethers.js', 'Tailwind CSS'],
        backend: ['Node.js', 'Express'],
        aiml: ['OCR', 'Document Classification'],
        hardware: ['Standard Server'],
        database: ['IPFS', 'Ethereum Testnet', 'PostgreSQL'],
      },
      coreFeatures: [
        'Patient-owned medical records stored on IPFS with blockchain access control',
        'Granular sharing: patient grants time-limited access to specific doctors',
        'Immutable audit trail showing who accessed records and when',
        'Emergency access mode for doctors with patient revocation capability',
        'Doctor portal for requesting and viewing patient-authorized records',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Architecture', description: 'Design IPFS + blockchain architecture. Write access control smart contracts. Study HL7/FHIR standards.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Deploy contracts on testnet. Build record upload to IPFS and basic patient dashboard.', weeks: 'Weeks 4-6' },
        { phase: 'Phase 3: Core Build', description: 'Implement granular sharing, audit trail, emergency access, and doctor portal.', weeks: 'Weeks 7-11' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Security audit, privacy compliance check, demo with simulated patient journey.', weeks: 'Weeks 12-14' },
      ],
      whyImpress: 'Healthcare + blockchain is a high-impact intersection that judges find compelling. Shows understanding of data sovereignty and access control — critical security concepts. IPFS + blockchain integration demonstrates distributed systems expertise. Health-tech and Web3 companies both value this combination.',
      estimatedCost: '₹2,000 for IPFS pinning and cloud hosting. Testnet is free. Total: ~₹2,000',
      hardwareNeeded: 'Laptop, MetaMask browser extension',
      futureEnhancements: [
        'Integration with hospital EHR systems via FHIR API',
        'AI-powered health insights from aggregated anonymized data',
        'Mobile app with biometric access control',
        'Insurance claim automation with smart contract triggers',
      ],
    },
    {
      title: 'NFTicket: Event Ticketing on Blockchain with Resale Protection',
      tagline: 'Real tickets, zero fakes, fair prices.',
      problem: 'Event ticketing suffers from counterfeits, scalper bots, and exorbitant resale prices. Fans cannot verify ticket authenticity. Event organizers lose revenue to secondary markets they cannot control.',
      innovationScore: 7,
      techStack: {
        frontend: ['React', 'Ethers.js', 'Wagmi'],
        backend: ['Node.js', 'Express'],
        aiml: ['QR Verification'],
        hardware: ['Smartphone', 'Standard Server'],
        database: ['PostgreSQL', 'Ethereum Testnet'],
      },
      coreFeatures: [
        'NFT-based event tickets with built-in authenticity verification',
        'Smart contract-enforced resale price caps preventing scalping',
        'QR code check-in system linked to on-chain ticket ownership',
        'Organizer dashboard for event creation, ticket minting, and analytics',
        'Secondary market with royalty payments to organizers on each resale',
      ],
      roadmap: [
        { phase: 'Phase 1: Smart Contract Development', description: 'Write ERC-721 ticket contracts with resale price caps. Deploy on Sepolia testnet.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Build React frontend with event browsing, ticket minting, and wallet integration.', weeks: 'Weeks 4-6' },
        { phase: 'Phase 3: Core Build', description: 'Implement QR check-in, organizer dashboard, secondary market, and royalty system.', weeks: 'Weeks 7-10' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Test with mock event, optimize gas, UI polish, demo with college event.', weeks: 'Weeks 11-12' },
      ],
      whyImpress: 'NFTs with real utility (not just art) show mature blockchain understanding. Solves a problem everyone has experienced — fake tickets and scalping. The smart contract resale caps demonstrate creative use of blockchain features. Web3 and event-tech companies are building exactly this kind of product.',
      estimatedCost: '₹1,000-2,000 for cloud hosting. Testnet is free. Total: ~₹2,000',
      hardwareNeeded: 'Laptop, smartphone for QR testing, MetaMask extension',
      futureEnhancements: [
        'POAP (Proof of Attendance) badges for event verification',
        'Dynamic pricing based on demand and time to event',
        'Integration with venue entry systems (RFID, biometric)',
        'Secondary market analytics for organizers to optimize pricing',
      ],
    },
  ],
  'Data Science': [
    {
      title: 'MarketMind: Stock Price Prediction with Sentiment Analysis',
      tagline: 'Read the market, read the mood.',
      problem: 'Retail investors make decisions based on limited data and gut feeling. Professional tools are expensive and complex. Social media sentiment moves markets but individual investors cannot track it in real-time.',
      innovationScore: 8,
      techStack: {
        frontend: ['React', 'Recharts', 'Tailwind CSS'],
        backend: ['Python FastAPI', 'Celery'],
        aiml: ['LSTM', 'FinBERT', 'Twitter API', 'News API'],
        hardware: ['GPU Server (optional)'],
        database: ['PostgreSQL', 'TimescaleDB'],
      },
      coreFeatures: [
        'Stock price prediction using LSTM models trained on 10 years of data',
        'Real-time sentiment analysis from Twitter, news, and Reddit feeds',
        'Combined signal dashboard blending price prediction with sentiment score',
        'Portfolio risk assessment with VaR and Sharpe ratio calculations',
        'Backtesting engine showing how strategies would have performed historically',
      ],
      roadmap: [
        { phase: 'Phase 1: Data Collection & Models', description: 'Collect stock data via yfinance. Build sentiment pipeline with FinBERT. Train LSTM price model.', weeks: 'Weeks 1-4' },
        { phase: 'Phase 2: Prototype', description: 'Build FastAPI backend with prediction endpoints. Create React dashboard with stock charts.', weeks: 'Weeks 5-7' },
        { phase: 'Phase 3: Core Build', description: 'Implement real-time sentiment, combined signals, portfolio risk, and backtesting engine.', weeks: 'Weeks 8-12' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Backtesting validation, model accuracy report, deploy, demo with live data.', weeks: 'Weeks 13-14' },
      ],
      whyImpress: 'FinTech is the highest-paying data science placement domain. Shows time series forecasting + NLP + full-stack — a powerful combination. The backtesting engine demonstrates rigorous ML validation, not just model training. Companies like Zerodha, Groww, and hedge funds hire for exactly this profile.',
      estimatedCost: '₹3,000-5,000 for cloud GPU and API costs. Total: ~₹4,000',
      hardwareNeeded: 'Laptop, GPU recommended for LSTM training (or cloud GPU)',
      futureEnhancements: [
        'Real-time trading signals with broker API integration',
        'Multi-asset portfolio optimization using Modern Portfolio Theory',
        'Alternative data: satellite imagery, credit card transactions',
        'Explainable AI showing which factors drove each prediction',
      ],
    },
    {
      title: 'TrafficFlow: Smart Traffic Management with Computer Vision',
      tagline: 'Green lights that think.',
      problem: 'Indian cities lose ₹1.5 lakh crore annually to traffic congestion. Fixed-timer traffic signals ignore real-time traffic density, causing unnecessary waiting at empty intersections while other roads overflow.',
      innovationScore: 9,
      techStack: {
        frontend: ['React', 'Leaflet Maps', 'Recharts'],
        backend: ['Python FastAPI', 'OpenCV'],
        aiml: ['YOLOv8', 'Vehicle Counting', 'Density Estimation'],
        hardware: ['Raspberry Pi', 'USB Camera', 'Optional: ESP32 relay'],
        database: ['PostgreSQL', 'InfluxDB'],
      },
      coreFeatures: [
        'Real-time vehicle detection and counting from traffic camera feeds',
        'Dynamic signal timing adjustment based on lane-wise traffic density',
        'Emergency vehicle detection with automatic green corridor activation',
        'Traffic flow heatmap across city showing congestion patterns',
        'Historical traffic analytics for urban planning recommendations',
      ],
      roadmap: [
        { phase: 'Phase 1: Model & Data', description: 'Train YOLOv8 on vehicle detection dataset. Collect traffic video samples. Design density estimation algorithm.', weeks: 'Weeks 1-4' },
        { phase: 'Phase 2: Prototype', description: 'Build vehicle counting pipeline with OpenCV. Create FastAPI backend and basic dashboard.', weeks: 'Weeks 5-7' },
        { phase: 'Phase 3: Core Build', description: 'Implement dynamic signal timing, emergency vehicle detection, heatmap, and analytics.', weeks: 'Weeks 8-12' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Test with traffic videos, optimize for Raspberry Pi, simulate intersection, demo.', weeks: 'Weeks 13-14' },
      ],
      whyImpress: 'Smart traffic is a visible, relatable problem that judges immediately understand. Shows real-time computer vision on edge hardware — technically challenging. The emergency vehicle detection adds a safety dimension. Companies like Siemens, IBM, and city tech startups actively recruit this profile.',
      estimatedCost: '₹5,000-8,000 for Raspberry Pi, camera, and relay. Total: ~₹6,000',
      hardwareNeeded: 'Raspberry Pi 4 (₹3,500), USB camera (₹1,000), relay module (₹300), LED traffic signals for demo (₹500)',
      futureEnhancements: [
        'Multi-camera intersection coverage with fused detection',
        'Reinforcement learning for optimal signal timing policies',
        'Integration with Google Maps for city-wide traffic routing',
        'Pedestrian detection with adaptive crossing signals',
      ],
    },
    {
      title: 'CustomerInsight: E-Commerce Churn Prediction & Recommendation Engine',
      tagline: 'Know your customer before they leave.',
      problem: 'E-commerce businesses lose 25% of customers to churn they could not predict. Generic recommendations miss individual preferences. Small businesses cannot afford enterprise recommendation systems.',
      innovationScore: 7,
      techStack: {
        frontend: ['React', 'Recharts', 'Tailwind CSS'],
        backend: ['Python FastAPI', 'Apache Spark'],
        aiml: ['XGBoost', 'Collaborative Filtering', 'K-Means Clustering'],
        hardware: ['Standard Server'],
        database: ['PostgreSQL', 'Redis'],
      },
      coreFeatures: [
        'Churn prediction model scoring each customer on a 0-100 risk scale',
        'Hybrid recommendation engine combining collaborative and content filtering',
        'Customer segmentation with RFM analysis and behavioral clustering',
        'Marketing campaign simulator showing predicted churn reduction per strategy',
        'Real-time dashboard with key metrics: CLV, churn rate, recommendation CTR',
      ],
      roadmap: [
        { phase: 'Phase 1: Data & Models', description: 'Use e-commerce dataset (Olist or Kaggle). Train XGBoost churn model. Build collaborative filtering recommender.', weeks: 'Weeks 1-3' },
        { phase: 'Phase 2: Prototype', description: 'Build FastAPI backend with prediction endpoints. Create React dashboard with customer list and recommendations.', weeks: 'Weeks 4-6' },
        { phase: 'Phase 3: Core Build', description: 'Implement segmentation, campaign simulator, real-time dashboard, and recommendation API.', weeks: 'Weeks 7-10' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Model accuracy validation, A/B test simulation, deploy, demo with sample data.', weeks: 'Weeks 11-12' },
      ],
      whyImpress: 'Every e-commerce company needs churn prediction and recommendations — direct placement relevance. Shows the full data science pipeline: EDA, modeling, deployment, and business impact. The campaign simulator bridges technical and business thinking. Amazon, Flipkart, and Myntra hire for this exact skill set.',
      estimatedCost: '₹2,000-3,000 for cloud hosting. Datasets are free. Total: ~₹3,000',
      hardwareNeeded: 'Laptop, internet connection',
      futureEnhancements: [
        'Real-time streaming with Apache Kafka for live churn scoring',
        'NLP on customer reviews for sentiment-based recommendations',
        'A/B testing framework for recommendation strategy comparison',
        'Multi-armed bandit for optimizing recommendation exploration',
      ],
    },
  ],
  'AR/VR': [
    {
      title: 'ARChemist: Interactive Chemistry Lab in Augmented Reality',
      tagline: 'Mix molecules, not mess.',
      problem: 'Chemistry labs are expensive, dangerous, and inaccessible to many students. Virtual lab simulations are 2D and lack the spatial understanding of real experiments. Students cannot safely explore dangerous reactions.',
      innovationScore: 9,
      techStack: {
        frontend: ['React', 'Three.js', 'AR.js'],
        backend: ['Node.js', 'Express'],
        aiml: ['Molecular Visualization', 'Reaction Simulation'],
        hardware: ['Smartphone with ARCore/ARKit', 'Webcam fallback'],
        database: ['PostgreSQL'],
      },
      coreFeatures: [
        'AR molecule visualization with 3D ball-and-stick models on any surface',
        'Interactive virtual chemistry lab with 50+ safe-to-simulate experiments',
        'Real-time reaction simulation showing molecular changes and energy graphs',
        'Step-by-step guided experiments with voice narration and safety warnings',
        'Quiz mode where students build molecules to match chemical formulas',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & 3D Models', description: 'Build 3D molecule models in Three.js. Study AR.js for web-based AR. Design experiment library.', weeks: 'Weeks 1-4' },
        { phase: 'Phase 2: Prototype', description: 'Implement AR molecule placement on surfaces. Build basic experiment interface with molecule selection.', weeks: 'Weeks 5-7' },
        { phase: 'Phase 3: Core Build', description: 'Add reaction simulation, guided experiments, voice narration, and quiz mode.', weeks: 'Weeks 8-12' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Test AR tracking on multiple devices, optimize 3D rendering, user test with chemistry students.', weeks: 'Weeks 13-14' },
      ],
      whyImpress: 'AR in education is a rapidly growing field with strong placement opportunities. Shows 3D graphics, AR, and domain knowledge (chemistry) — a unique combination. The safety angle (simulating dangerous experiments) is compelling. Companies like Meta, Google, and EdTech startups are investing heavily in AR learning.',
      estimatedCost: '₹1,000-2,000 for cloud hosting. AR.js and Three.js are free. Total: ~₹2,000',
      hardwareNeeded: 'ARCore/ARKit compatible smartphone, laptop for development',
      futureEnhancements: [
        'VR mode for fully immersive lab experience with Meta Quest',
        'Multiplayer lab sessions with collaborative experiments',
        'AI-powered experiment suggestion based on learning goals',
        'Integration with school curricula and teacher dashboards',
      ],
    },
    {
      title: 'ArchVizAR: Walk Through Your Future Home in AR',
      tagline: 'See it before you build it.',
      problem: 'Homebuyers and architects struggle to visualize 2D floor plans in 3D. Clients cannot understand spatial relationships from blueprints. Changes after construction are expensive — visualization errors cost lakhs.',
      innovationScore: 8,
      techStack: {
        frontend: ['React', 'Three.js', 'Model-viewer'],
        backend: ['Node.js', 'Express'],
        aiml: ['None'],
        hardware: ['Smartphone with ARCore', 'Webcam fallback'],
        database: ['PostgreSQL'],
      },
      coreFeatures: [
        'Upload 2D floor plan and generate 3D AR model on any flat surface',
        'Walk through the virtual home at real-world scale using AR',
        'Interactive furniture placement with drag-and-drop in AR space',
        'Material and color customization for walls, floors, and furniture',
        'Save and share AR walkthroughs with clients via web link',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & 3D Pipeline', description: 'Build floor plan to 3D model conversion pipeline. Study AR placement and scaling. Design furniture library.', weeks: 'Weeks 1-4' },
        { phase: 'Phase 2: Prototype', description: 'Implement AR model placement on surfaces. Build basic walkthrough with movement controls.', weeks: 'Weeks 5-7' },
        { phase: 'Phase 3: Core Build', description: 'Add furniture placement, material customization, and sharing system.', weeks: 'Weeks 8-11' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Test AR tracking, optimize 3D model sizes, user test with architecture students, demo.', weeks: 'Weeks 12-13' },
      ],
      whyImpress: 'PropTech is a booming sector (NoBroker, SquareYards, Clicbrics). AR for real estate has direct commercial application. Shows 3D graphics, AR, and practical product thinking. The floor plan to 3D pipeline is technically interesting and demoable. Judges can immediately see the business value.',
      estimatedCost: '₹2,000-3,000 for cloud hosting and 3D model assets. Total: ~₹3,000',
      hardwareNeeded: 'ARCore-compatible smartphone, laptop for development',
      futureEnhancements: [
        'VR mode with Meta Quest for full immersive walkthroughs',
        'AI-powered interior design suggestions based on room dimensions',
        'Integration with CAD software (AutoCAD, SketchUp) for professional use',
        'Real-time collaboration between architect and client in shared AR space',
      ],
    },
    {
      title: 'SkillAR: Learn Physical Skills with AR Coaching',
      tagline: 'See the perfect form, overlay your own.',
      problem: 'Learning physical skills (sports, music, crafts) requires in-person coaching that is expensive and inaccessible. Video tutorials lack spatial context. Beginners cannot compare their form to expert demonstrations in real-time.',
      innovationScore: 8,
      techStack: {
        frontend: ['React', 'Three.js', 'AR.js', 'MediaPipe'],
        backend: ['Node.js', 'Express'],
        aiml: ['Pose Comparison', 'Gesture Matching'],
        hardware: ['Smartphone with ARCore/ARKit'],
        database: ['Firebase Firestore'],
      },
      coreFeatures: [
        'AR overlay of expert movement on user\'s real-time camera feed',
        'Side-by-side comparison with skeleton alignment scoring',
        'Step-by-step skill breakdown for complex movements (golf swing, dance, yoga)',
        'Progress tracking with skill mastery levels and achievement badges',
        'Community challenge mode comparing AR skill performances with friends',
      ],
      roadmap: [
        { phase: 'Phase 1: Research & Pipeline', description: 'Study pose detection and AR overlay. Build expert movement recording pipeline. Design comparison algorithm.', weeks: 'Weeks 1-4' },
        { phase: 'Phase 2: Prototype', description: 'Implement MediaPipe pose detection and AR overlay. Build basic comparison screen with alignment score.', weeks: 'Weeks 5-7' },
        { phase: 'Phase 3: Core Build', description: 'Add skill breakdowns, progress tracking, and community challenges.', weeks: 'Weeks 8-11' },
        { phase: 'Phase 4: Testing & Deployment', description: 'Test with 3+ skills (yoga, dance, sports), optimize pose detection, demo.', weeks: 'Weeks 12-13' },
      ],
      whyImpress: 'AR + pose detection is a cutting-edge combination. Solves a real learning problem with spatial computing. The community challenge feature adds virality and product thinking. Companies building AR fitness (Meta, Niantic, fitness startups) are actively recruiting. Judges can try it live during demo.',
      estimatedCost: '₹2,000-3,000 for cloud hosting. Total: ~₹2,000',
      hardwareNeeded: 'ARCore/ARKit compatible smartphone, laptop for development',
      futureEnhancements: [
        'VR mode with hand tracking for detailed skill analysis',
        'AI-generated personalized practice routines based on weak points',
        'Professional coach marketplace with live AR sessions',
        'Esports training mode for gaming skill improvement',
      ],
    },
  ],
};

function generateId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

function computeComplexity(idea: ProjectIdea): ComplexityBreakdown {
  const f = idea.techStack.frontend.length;
  const b = idea.techStack.backend.length;
  const a = idea.techStack.aiml.length;
  const h = idea.techStack.hardware.length;
  const d = idea.techStack.database.length;
  const total = f + b + a + h + d || 1;
  return {
    frontend: Math.round((f / total) * 100),
    backend: Math.round((b / total) * 100),
    aiml: Math.round((a / total) * 100),
    hardware: Math.round((h / total) * 100),
    database: Math.round((d / total) * 100),
    total,
  };
}

export function generateMockIdeas(input: GenerateInput): ProjectIdea[] {
  const selectedInterests = input.interests.length > 0 ? input.interests : ['AI/ML'];
  const ideas: ProjectIdea[] = [];

  const usedInterests = new Set<string>();

  for (const interest of selectedInterests.slice(0, 3)) {
    const templates = ideaTemplates[interest];
    if (!templates || templates.length === 0) continue;

    let templateIndex = 0;
    if (!usedInterests.has(interest)) {
      usedInterests.add(interest);
    } else {
      templateIndex = Math.min(usedInterests.size, templates.length - 1);
    }

    const template = templates[templateIndex % templates.length];
    const idea = { ...template, id: generateId() };
    idea.complexity = computeComplexity(idea);
    ideas.push(idea);
  }

  while (ideas.length < 3) {
    const allInterests = Object.keys(ideaTemplates);
    const randomInterest = allInterests[Math.floor(Math.random() * allInterests.length)];
    const templates = ideaTemplates[randomInterest];
    const template = templates[ideas.length % templates.length];
    const idea = { ...template, id: generateId() };
    idea.complexity = computeComplexity(idea);
    ideas.push(idea);
  }

  return ideas.slice(0, 3);
}

export const trendingIdeas = [
  { title: 'AI Interview Coach', domain: 'AI/ML', trend: 'Hot', icon: 'FileText', branch: 'CSE', interests: ['AI/ML'], skills: 'Python, TensorFlow, NLP', projectType: 'Major', difficulty: 'Advanced' },
  { title: 'Blockchain Supply Chain Tracker', domain: 'Blockchain', trend: 'Rising', icon: 'Link', branch: 'CSE', interests: ['Blockchain'], skills: 'Solidity, React, Node.js', projectType: 'Major', difficulty: 'Intermediate' },
  { title: 'Smart Traffic Signal System', domain: 'IoT', trend: 'Hot', icon: 'TrafficCone', branch: 'ECE', interests: ['IoT'], skills: 'Python, OpenCV, ESP32', projectType: 'Major', difficulty: 'Advanced' },
  { title: 'Mental Health Chatbot', domain: 'App Dev', trend: 'Rising', icon: 'Heart', branch: 'IT', interests: ['App Dev', 'AI/ML'], skills: 'React Native, Python, NLP', projectType: 'Mini', difficulty: 'Beginner' },
  { title: 'Deepfake Detection Tool', domain: 'Cybersecurity', trend: 'Hot', icon: 'Shield', branch: 'CSE', interests: ['Cybersecurity', 'AI/ML'], skills: 'Python, PyTorch, OpenCV', projectType: 'Major', difficulty: 'Advanced' },
  { title: 'AR Interior Design Visualizer', domain: 'AR/VR', trend: 'Rising', icon: 'Box', branch: 'CSE', interests: ['AR/VR'], skills: 'React, Three.js, AR.js', projectType: 'Startup Idea', difficulty: 'Intermediate' },
];
