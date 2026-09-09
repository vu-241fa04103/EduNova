// Comprehensive Multi-Department Engineering Mock Data for EduNova

export const engineeringDepartments = [
  {
    id: "ai_ds",
    name: "Artificial Intelligence & Data Science",
    shortName: "AI & Data Science",
    icon: "Brain",
    color: "from-indigo-600 to-purple-600",
    subjects: [
      "Machine Learning",
      "Deep Learning",
      "Statistics & Probability",
      "Natural Language Processing",
      "Computer Vision",
      "Python for Data Science"
    ]
  },
  {
    id: "cse",
    name: "Computer Science & Engineering",
    shortName: "CSE / IT",
    icon: "Code",
    color: "from-blue-600 to-cyan-600",
    subjects: [
      "Data Structures & Algorithms",
      "Database Management Systems (DBMS)",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
      "Cloud Computing & DevOps"
    ]
  },
  {
    id: "ece",
    name: "Electronics & Communication Engineering",
    shortName: "ECE",
    icon: "Cpu",
    color: "from-violet-600 to-fuchsia-600",
    subjects: [
      "Embedded Systems & Microcontrollers",
      "VLSI Design & Verilog",
      "Digital Signal Processing (DSP)",
      "Analog & Digital Communication",
      "Signals and Systems",
      "Internet of Things (IoT)"
    ]
  },
  {
    id: "eee",
    name: "Electrical & Electronics Engineering",
    shortName: "EEE",
    icon: "Zap",
    color: "from-amber-600 to-yellow-600",
    subjects: [
      "Power Systems & Grid Transmission",
      "Control Systems Engineering",
      "Electric Vehicles & Battery Tech",
      "Power Electronics & Drives",
      "Electrical Machines (AC/DC)",
      "Renewable Energy Systems"
    ]
  },
  {
    id: "mech",
    name: "Mechanical Engineering",
    shortName: "Mechanical",
    icon: "Wrench",
    color: "from-orange-600 to-red-600",
    subjects: [
      "Thermodynamics & Heat Engines",
      "Fluid Mechanics & Hydraulics",
      "Strength of Materials",
      "CAD/CAM 3D Design",
      "Robotics & Mechatronics",
      "Manufacturing Technology"
    ]
  },
  {
    id: "civil",
    name: "Civil Engineering",
    shortName: "Civil",
    icon: "Building",
    color: "from-emerald-600 to-teal-600",
    subjects: [
      "Structural Analysis & Mechanics",
      "Geotechnical & Soil Mechanics",
      "Surveying & Remote Sensing (GIS)",
      "Concrete Technology",
      "Transportation Engineering",
      "Environmental & Water Resource Eng"
    ]
  },
  {
    id: "core_fe",
    name: "First Year Engineering Core",
    shortName: "1st Year Core",
    icon: "BookOpen",
    color: "from-slate-700 to-slate-900",
    subjects: [
      "Engineering Mathematics (Calculus & Linear Algebra)",
      "Engineering Physics & Semiconductor Physics",
      "Basic Electrical & Electronics (BEE)",
      "Problem Solving & Python Programming",
      "Engineering Graphics & Design",
      "Environmental Science & Ethics"
    ]
  }
];

export const initialUserData = {
  name: "Student",
  email: "student@edunova.edu",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  department: "ai_ds",
  course: "B.Tech in Artificial Intelligence & Data Science",
  college: "Smart India Hackathon 2026 Finalist Team",
  selectedInterests: ["Machine Learning", "Statistics & Probability", "Python for Data Science"],
  overallProgress: 78,
  completedLessons: 12,
  totalLessons: 16,
  averageQuizScore: 85,
  streakDays: 5,
  targetGoal: "Machine Learning Engineer",
  preferredLanguage: "en"
};

// Department-specific learning paths
export const departmentLearningPaths = {
  ai_ds: [
    {
      id: 1,
      title: "Python Basics & OOP",
      subject: "Python for Data Science",
      status: "completed",
      score: 95,
      duration: "4 hrs",
      summary: "Variables, loops, functions, OOP, and data structures.",
      topics: ["Syntax & Control Flow", "OOP Principles", "List Comprehensions", "Error Handling"]
    },
    {
      id: 2,
      title: "Applied Statistics",
      subject: "Statistics & Probability",
      status: "completed",
      score: 72,
      duration: "6 hrs",
      summary: "Distributions, hypothesis testing, mean, variance, and p-values.",
      topics: ["Normal Distribution", "Hypothesis Testing", "Correlation vs Causation"]
    },
    {
      id: 3,
      title: "Linear & Logistic Regression",
      subject: "Machine Learning",
      status: "completed",
      score: 88,
      duration: "5 hrs",
      summary: "Supervised modeling, cost functions, gradient descent, evaluation metrics.",
      topics: ["Ordinary Least Squares", "Sigmoid Activation", "MSE & Cross Entropy"]
    },
    {
      id: 4,
      title: "PCA (Principal Component Analysis)",
      subject: "Machine Learning",
      status: "recommended",
      recommendedReason: "Identified gap from your recent Quiz. Essential for high-dimensional data.",
      duration: "3 hrs",
      summary: "Dimensionality reduction, eigenvalues, eigenvectors, covariance matrix.",
      topics: ["Curse of Dimensionality", "Covariance Matrix", "Eigenvalues & Eigenvectors", "Variance Ratio"]
    },
    {
      id: 5,
      title: "Unsupervised Clustering & K-Means",
      subject: "Machine Learning",
      status: "locked",
      duration: "4 hrs",
      summary: "Centroids, elbow method, silhouette analysis, and hierarchical clustering.",
      topics: ["K-Means Algorithm", "Elbow Method", "DBSCAN", "Hierarchical Clustering"]
    },
    {
      id: 6,
      title: "End-to-End Deep Learning Capstone",
      subject: "Deep Learning",
      status: "locked",
      duration: "10 hrs",
      summary: "Building, training, and deploying a neural network pipeline.",
      topics: ["PyTorch Tensors", "CNNs for Vision", "Transformers Basics", "API Deployment"]
    }
  ],

  cse: [
    {
      id: 1,
      title: "C++ / Java & Object-Oriented Design",
      subject: "Data Structures & Algorithms",
      status: "completed",
      score: 92,
      duration: "5 hrs",
      summary: "Pointers, memory management, classes, inheritance, polymorphism.",
      topics: ["Pointers & References", "Polymorphism", "Templates", "Standard Template Library (STL)"]
    },
    {
      id: 2,
      title: "Linear & Non-Linear Data Structures",
      subject: "Data Structures & Algorithms",
      status: "completed",
      score: 85,
      duration: "7 hrs",
      summary: "Linked lists, stacks, queues, binary trees, and heap implementations.",
      topics: ["Binary Search Trees", "AVL Tree Rotations", "Graph Traversal (BFS/DFS)", "Heap Priority Queues"]
    },
    {
      id: 3,
      title: "Relational Database Design & SQL",
      subject: "Database Management Systems (DBMS)",
      status: "completed",
      score: 75,
      duration: "6 hrs",
      summary: "ER modeling, normalization (1NF to BCNF), complex SQL joins, indexing.",
      topics: ["SQL Joins & Group By", "Indexing & B-Trees", "ACID Transactions", "Concurrency Control"]
    },
    {
      id: 4,
      title: "Operating Systems & Concurrency",
      subject: "Operating Systems",
      status: "recommended",
      recommendedReason: "Core prerequisite for system design and high-performance computing.",
      duration: "5 hrs",
      summary: "Process scheduling, multithreading, semaphores, deadlock prevention, virtual memory.",
      topics: ["CPU Scheduling Algorithms", "Mutex & Semaphores", "Banker's Algorithm", "Paging & TLB"]
    },
    {
      id: 5,
      title: "Computer Networks & Sockets",
      subject: "Computer Networks",
      status: "locked",
      duration: "6 hrs",
      summary: "OSI and TCP/IP stack, routing protocols, DNS, TLS/SSL, socket programming.",
      topics: ["TCP 3-Way Handshake", "Subnetting & CIDR", "HTTP/HTTPS & DNS", "Socket I/O in Node/C++"]
    },
    {
      id: 6,
      title: "Scalable Cloud Microservices Capstone",
      subject: "Cloud Computing & DevOps",
      status: "locked",
      duration: "12 hrs",
      summary: "Building distributed microservices with Docker, Kubernetes, and REST APIs.",
      topics: ["Docker Containers", "Kubernetes Pods", "Load Balancing", "CI/CD Pipelines"]
    }
  ],

  ece: [
    {
      id: 1,
      title: "Electronic Devices & Circuit Theory",
      subject: "Signals and Systems",
      status: "completed",
      score: 90,
      duration: "5 hrs",
      summary: "PN junctions, BJT/MOSFET amplifiers, small-signal models, frequency response.",
      topics: ["Diode Characteristics", "MOSFET Biasing", "Op-Amp Configurations", "Bode Plots"]
    },
    {
      id: 2,
      title: "Digital Logic & Microprocessor Architecture",
      subject: "Embedded Systems & Microcontrollers",
      status: "completed",
      score: 84,
      duration: "6 hrs",
      summary: "K-Maps, flip-flops, finite state machines, 8051 & ARM Cortex-M architecture.",
      topics: ["Synchronous Sequential Circuits", "ARM Cortex Architecture", "Timers & Interrupts", "GPIO Programming"]
    },
    {
      id: 3,
      title: "Embedded C & Peripheral Protocols",
      subject: "Embedded Systems & Microcontrollers",
      status: "completed",
      score: 79,
      duration: "6 hrs",
      summary: "UART, SPI, I2C communication protocols and sensor interfacing.",
      topics: ["I2C Bus Protocol", "SPI High Speed Transfer", "UART Transceiver", "ADC Interfacing"]
    },
    {
      id: 4,
      title: "VLSI Design & Hardware Description (Verilog)",
      subject: "VLSI Design & Verilog",
      status: "recommended",
      recommendedReason: "Recommended focus: High-demand skill for semiconductor & chip design careers.",
      duration: "6 hrs",
      summary: "CMOS logic synthesis, Verilog modeling, timing closure, FPGA emulation.",
      topics: ["CMOS Inverter Sizing", "Verilog RTL Modeling", "Setup & Hold Slack", "FPGA Synthesis"]
    },
    {
      id: 5,
      title: "Digital Signal Processing (DSP) & Filters",
      subject: "Digital Signal Processing (DSP)",
      status: "locked",
      duration: "6 hrs",
      summary: "Z-Transforms, DFT/FFT algorithms, FIR/IIR digital filter design.",
      topics: ["Discrete Fourier Transform", "Fast Fourier Transform (FFT)", "FIR Filter Design", "Windowing Techniques"]
    },
    {
      id: 6,
      title: "Smart Edge IoT Device Capstone",
      subject: "Internet of Things (IoT)",
      status: "locked",
      duration: "10 hrs",
      summary: "Building an ESP32/STM32 wireless edge device with MQTT and cloud telemetry.",
      topics: ["ESP32 Firmware", "MQTT Protocol", "RTOS Task Scheduling", "Cloud Telemetry Dashboard"]
    }
  ],

  eee: [
    {
      id: 1,
      title: "Circuit Theory & Network Theorems",
      subject: "Electrical Machines (AC/DC)",
      status: "completed",
      score: 88,
      duration: "5 hrs",
      summary: "Thevenin, Norton, Superposition, transient response in RLC networks.",
      topics: ["Mesh & Nodal Analysis", "Network Theorems", "Transient Response", "Three-Phase Power"]
    },
    {
      id: 2,
      title: "Transformers & Induction Machines",
      subject: "Electrical Machines (AC/DC)",
      status: "completed",
      score: 82,
      duration: "6 hrs",
      summary: "Equivalent circuits of transformers, synchronous motors, 3-phase induction motors.",
      topics: ["Transformer Efficiency", "Torque-Speed Curves", "Synchronous Reactance", "Starting Methods"]
    },
    {
      id: 3,
      title: "Power Systems Transmission & Protection",
      subject: "Power Systems & Grid Transmission",
      status: "completed",
      score: 76,
      duration: "7 hrs",
      summary: "Overhead lines, load flow studies, symmetrical faults, protective relays.",
      topics: ["ABCD Parameters", "Gauss-Seidel Load Flow", "Circuit Breakers", "Relay Coordination"]
    },
    {
      id: 4,
      title: "Power Electronics & Inverter Topologies",
      subject: "Power Electronics & Drives",
      status: "recommended",
      recommendedReason: "Crucial for renewable energy systems and electric mobility.",
      duration: "5 hrs",
      summary: "SCRs, IGBTs, Buck/Boost DC-DC converters, PWM voltage source inverters.",
      topics: ["Buck-Boost Topologies", "Sinusoidal PWM Inverters", "Switching Losses", "Harmonic THD Analysis"]
    },
    {
      id: 5,
      title: "Modern Control Systems & State Space",
      subject: "Control Systems Engineering",
      status: "locked",
      duration: "6 hrs",
      summary: "Root locus, Nyquist stability, state-space representations, PID tuning.",
      topics: ["Bode & Nyquist Plots", "PID Controllers", "State Transition Matrix", "Controllability/Observability"]
    },
    {
      id: 6,
      title: "Electric Vehicle Battery & Powertrain Capstone",
      subject: "Electric Vehicles & Battery Tech",
      status: "locked",
      duration: "10 hrs",
      summary: "BMS architecture, motor drive controllers, regenerative braking simulations.",
      topics: ["Lithium-Ion BMS", "Field Oriented Control (FOC)", "Regenerative Braking", "Simulink Powertrain"]
    }
  ],

  mech: [
    {
      id: 1,
      title: "Engineering Mechanics & Statics",
      subject: "Strength of Materials",
      status: "completed",
      score: 91,
      duration: "5 hrs",
      summary: "Free-body diagrams, equilibrium equations, centroid, moment of inertia.",
      topics: ["FBD Formulations", "Truss Analysis", "Friction Mechanics", "Moment of Inertia"]
    },
    {
      id: 2,
      title: "Strength of Materials & Stresses",
      subject: "Strength of Materials",
      status: "completed",
      score: 83,
      duration: "6 hrs",
      summary: "Stress-strain curves, Mohr's circle, shear force and bending moment diagrams.",
      topics: ["SFD and BMD", "Torsion in Shafts", "Deflection of Beams", "Mohr's Circle of Stress"]
    },
    {
      id: 3,
      title: "Applied Thermodynamics & Cycles",
      subject: "Thermodynamics & Heat Engines",
      status: "completed",
      score: 78,
      duration: "6 hrs",
      summary: "1st and 2nd laws of thermodynamics, Carnot, Rankine, Otto, and Diesel cycles.",
      topics: ["Entropy Principles", "Rankine Vapor Cycle", "Refrigeration COP", "Combustion Thermodynamics"]
    },
    {
      id: 4,
      title: "Fluid Mechanics & Turbo-Machinery",
      subject: "Fluid Mechanics & Hydraulics",
      status: "recommended",
      recommendedReason: "Mastery needed for aerodynamic design and CFD simulations.",
      duration: "5 hrs",
      summary: "Bernoulli equation, Navier-Stokes, boundary layer theory, hydraulic turbines.",
      topics: ["Continuity & Momentum", "Boundary Layer Separation", "Pelton & Francis Turbines", "Pipe Losses (Darcy)"]
    },
    {
      id: 5,
      title: "Parametric CAD & Finite Element Analysis",
      subject: "CAD/CAM 3D Design",
      status: "locked",
      duration: "7 hrs",
      summary: "3D solid modeling, assembly constraints, structural FEA mesh generation.",
      topics: ["Parametric Sketching", "Assembly Constraints", "FEA Meshing", "Von-Mises Stress Analysis"]
    },
    {
      id: 6,
      title: "Robotic Manipulator & Mechatronics Capstone",
      subject: "Robotics & Mechatronics",
      status: "locked",
      duration: "10 hrs",
      summary: "Kinematics of robot arms, actuators, sensors, and micro-controller automation.",
      topics: ["Forward/Inverse Kinematics", "Servo Actuation", "PLC Automation", "ROS Simulation"]
    }
  ],

  civil: [
    {
      id: 1,
      title: "Engineering Surveying & Leveling",
      subject: "Surveying & Remote Sensing (GIS)",
      status: "completed",
      score: 93,
      duration: "5 hrs",
      summary: "Compass surveying, leveling, theodolite traverse, Total Station, GPS/GIS mapping.",
      topics: ["Contour Mapping", "Theodolite Traversing", "Total Station Operations", "GIS Coordinate Systems"]
    },
    {
      id: 2,
      title: "Structural Mechanics & Determinate Trusses",
      subject: "Structural Analysis & Mechanics",
      status: "completed",
      score: 84,
      duration: "6 hrs",
      summary: "Influence lines, determinate beams, method of joints/sections in roof trusses.",
      topics: ["Truss Equilibrium", "Influence Line Diagrams", "Strain Energy", "Deflection Theorems"]
    },
    {
      id: 3,
      title: "Concrete Technology & Mix Design",
      subject: "Concrete Technology",
      status: "completed",
      score: 80,
      duration: "5 hrs",
      summary: "Cement hydration, aggregate grading, admixtures, IS 10262 concrete mix design.",
      topics: ["Water-Cement Ratio", "Compressive Strength Tests", "Durability & Permeability", "IS Code Mix Design"]
    },
    {
      id: 4,
      title: "Geotechnical Engineering & Soil Mechanics",
      subject: "Geotechnical & Soil Mechanics",
      status: "recommended",
      recommendedReason: "Essential for foundation engineering and seismic stability.",
      duration: "6 hrs",
      summary: "Soil classification, effective stress, compaction, shear strength (Mohr-Coulomb).",
      topics: ["Atterberg Limits", "Permeability & Seepage", "Direct Shear Test", "Terzaghi Bearing Capacity"]
    },
    {
      id: 5,
      title: "Reinforced Concrete Design (RCC)",
      subject: "Structural Analysis & Mechanics",
      status: "locked",
      duration: "7 hrs",
      summary: "Limit state method for singly/doubly reinforced beams, columns, and footings.",
      topics: ["Limit State Design", "Flexural Reinforcement", "Shear & Development Length", "Isolated Footings"]
    },
    {
      id: 6,
      title: "Smart Green Building & BIM Capstone",
      subject: "Environmental & Water Resource Eng",
      status: "locked",
      duration: "10 hrs",
      summary: "Building Information Modeling (BIM), rainwater harvesting, and seismic retrofitting.",
      topics: ["Revit BIM Workflow", "Sustainable Materials", "LEED Certification", "Earthquake Resistant Frames"]
    }
  ],

  core_fe: [
    {
      id: 1,
      title: "Calculus & Multivariable Optimization",
      subject: "Engineering Mathematics (Calculus & Linear Algebra)",
      status: "completed",
      score: 89,
      duration: "6 hrs",
      summary: "Limits, partial derivatives, multiple integrals, vector calculus, Taylor series.",
      topics: ["Partial Differentiation", "Maxima & Minima", "Double & Triple Integrals", "Gradient, Divergence, Curl"]
    },
    {
      id: 2,
      title: "Linear Algebra & Differential Equations",
      subject: "Engineering Mathematics (Calculus & Linear Algebra)",
      status: "completed",
      score: 85,
      duration: "6 hrs",
      summary: "Matrix rank, eigenvalues, eigenvectors, ODEs of higher order.",
      topics: ["Matrix Decomposition", "Eigenvalues & Eigenvectors", "Second-order Linear ODEs", "Laplace Transforms"]
    },
    {
      id: 3,
      title: "Engineering Physics & Waves",
      subject: "Engineering Physics & Semiconductor Physics",
      status: "completed",
      score: 81,
      duration: "5 hrs",
      summary: "Wave optics, laser technology, fiber optics, quantum mechanics fundamentals.",
      topics: ["Interference & Diffraction", "Laser Physics", "Optical Fibers", "Schrödinger Wave Equation"]
    },
    {
      id: 4,
      title: "Problem Solving & Python Fundamentals",
      subject: "Problem Solving & Python Programming",
      status: "recommended",
      recommendedReason: "Core foundational skill for all engineering branches.",
      duration: "5 hrs",
      summary: "Flowcharts, modular logic, loops, lists, dictionaries, file I/O in Python.",
      topics: ["Algorithm Formulation", "Data Types & Iteration", "Functional Decomposition", "File Handling"]
    },
    {
      id: 5,
      title: "Basic Electrical & Electronics Engineering",
      subject: "Basic Electrical & Electronics (BEE)",
      status: "locked",
      duration: "6 hrs",
      summary: "Kirchhoff laws, AC circuits, diode rectifiers, basic digital gates.",
      topics: ["KVL & KCL", "AC Single Phase Circuits", "Diode Rectifiers", "Logic Gates"]
    },
    {
      id: 6,
      title: "First-Year Interdisciplinary Engineering Project",
      subject: "Engineering Graphics & Design",
      status: "locked",
      duration: "8 hrs",
      summary: "Hands-on group project combining programming, basic electronics, and prototyping.",
      topics: ["System Design", "Microcontroller Basics", "CAD Prototyping", "Technical Presentation"]
    }
  ]
};

// Department-specific career roles
export const departmentCareers = {
  ai_ds: [
    {
      id: "ml-engineer",
      title: "Machine Learning Engineer",
      icon: "Bot",
      matchPercentage: 87,
      avgSalary: "₹12 - 24 LPA",
      badge: "Top Fit",
      description: "Builds, optimizes, and deploys predictive and generative AI models into production.",
      acquiredSkills: ["Python Programming", "Linear & Logistic Regression", "Model Evaluation"],
      missingSkills: ["PCA & Dimensionality Reduction", "Deep Learning / PyTorch", "MLOps & Docker"],
      actionPlan: "Focus next on PCA and Unsupervised Learning, then proceed with PyTorch neural networks."
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      icon: "BarChart",
      matchPercentage: 80,
      avgSalary: "₹10 - 20 LPA",
      badge: "In Demand",
      description: "Extracts deep strategic insights and builds statistical forecasting algorithms.",
      acquiredSkills: ["Statistical Distributions", "Python Data Science", "Data Cleaning"],
      missingSkills: ["Hypothesis Testing", "Time Series Forecasting", "A/B Testing"],
      actionPlan: "Deepen applied hypothesis testing and visualization frameworks."
    }
  ],

  cse: [
    {
      id: "software-engineer",
      title: "Software Development Engineer (SDE)",
      icon: "Code",
      matchPercentage: 88,
      avgSalary: "₹12 - 26 LPA",
      badge: "Top Fit",
      description: "Develops high-throughput backend services, distributed systems, and scalable APIs.",
      acquiredSkills: ["C++ / Java", "OOP Principles", "Data Structures Basics"],
      missingSkills: ["Advanced Graph Algorithms", "Operating System Concurrency", "System Design"],
      actionPlan: "Master dynamic programming, tree traversals, and multi-threaded system design."
    },
    {
      id: "cloud-devops",
      title: "Cloud & DevOps Architect",
      icon: "Server",
      matchPercentage: 79,
      avgSalary: "₹10 - 22 LPA",
      badge: "High Growth",
      description: "Architects containerized microservices and automated CI/CD cloud infrastructures.",
      acquiredSkills: ["Operating Systems", "Networking Fundamentals"],
      missingSkills: ["Docker & Kubernetes", "Terraform / Infrastructure as Code", "AWS/GCP Cloud"],
      actionPlan: "Practice containerizing Node/Java services and configuring Kubernetes ingress."
    }
  ],

  ece: [
    {
      id: "vlsi-engineer",
      title: "VLSI / ASIC Design Engineer",
      icon: "Cpu",
      matchPercentage: 86,
      avgSalary: "₹11 - 25 LPA",
      badge: "Semiconductor Boom",
      description: "Designs, synthesizes, and verifies modern silicon chip architectures.",
      acquiredSkills: ["Digital Logic Design", "Finite State Machines", "CMOS Fundamentals"],
      missingSkills: ["Verilog / SystemVerilog RTL", "Static Timing Analysis (STA)", "UVM Verification"],
      actionPlan: "Complete RTL synthesis and timing closure modules on FPGA targets."
    },
    {
      id: "embedded-iot",
      title: "Embedded Systems & Firmware Engineer",
      icon: "Radio",
      matchPercentage: 82,
      avgSalary: "₹9 - 18 LPA",
      badge: "Hardware & IoT",
      description: "Writes low-level drivers, RTOS kernels, and communication protocol stacks.",
      acquiredSkills: ["C Programming", "Microcontroller GPIOs", "UART/SPI"],
      missingSkills: ["FreeRTOS Scheduling", "I2C Sensor Integration", "Low Power Modes"],
      actionPlan: "Build an RTOS-based telemetry application using ARM Cortex-M."
    }
  ],

  eee: [
    {
      id: "ev-powertrain",
      title: "EV Powertrain & BMS Engineer",
      icon: "Zap",
      matchPercentage: 85,
      avgSalary: "₹10 - 20 LPA",
      badge: "Electric Mobility",
      description: "Designs motor drive controllers, inverters, and battery management systems.",
      acquiredSkills: ["Circuit Analysis", "Electrical Machines Basics"],
      missingSkills: ["Power Electronics PWM Inverters", "BMS State of Charge (SoC)", "CAN Bus"],
      actionPlan: "Simulate DC-DC buck-boost converters and lithium battery protection circuits."
    },
    {
      id: "power-grid",
      title: "Smart Grid & Renewable Energy Engineer",
      icon: "Sun",
      matchPercentage: 78,
      avgSalary: "₹8 - 16 LPA",
      badge: "Clean Energy",
      description: "Manages modern grid transmission, solar-wind integration, and substation protection.",
      acquiredSkills: ["Three Phase Systems", "Transformer Operation"],
      missingSkills: ["SCADA Systems", "Load Flow Analysis", "Grid Inverter Synchronization"],
      actionPlan: "Practice Gauss-Seidel load flow calculations and protective relay settings."
    }
  ],

  mech: [
    {
      id: "robotics-engineer",
      title: "Robotics & Automation Engineer",
      icon: "Bot",
      matchPercentage: 86,
      avgSalary: "₹10 - 22 LPA",
      badge: "Industry 4.0",
      description: "Designs robotic arms, kinematics, autonomous mobile robots (AMRs), and PLC automation.",
      acquiredSkills: ["Engineering Statics", "Solid Modeling Basics"],
      missingSkills: ["Forward/Inverse Kinematics", "ROS (Robot Operating System)", "Actuator Control"],
      actionPlan: "Study 6-DOF robot arm kinematics and integrate servo motors with microcontrollers."
    },
    {
      id: "thermal-cad",
      title: "Thermal & Product Design Engineer (CAD/CFD)",
      icon: "Wrench",
      matchPercentage: 81,
      avgSalary: "₹8 - 18 LPA",
      badge: "Core Engineering",
      description: "Engineers aerodynamic components, thermal dissipation systems, and mechanical assemblies.",
      acquiredSkills: ["Thermodynamic Cycles", "Strength of Materials"],
      missingSkills: ["ANSYS Fluent CFD", "Parametric 3D Assembly", "GD&T Tolerancing"],
      actionPlan: "Conduct CFD airflow simulations and refine 3D parametric CAD modeling."
    }
  ],

  civil: [
    {
      id: "structural-engineer",
      title: "Structural Design Engineer",
      icon: "Building",
      matchPercentage: 87,
      avgSalary: "₹8 - 18 LPA",
      badge: "Infrastructure",
      description: "Designs earthquake-resistant RCC structures, steel bridges, and skyscraper frames.",
      acquiredSkills: ["Truss Analysis", "Concrete Mix Design"],
      missingSkills: ["STAAD.Pro / ETABS", "Limit State RCC Beams", "Seismic Code Compliance"],
      actionPlan: "Practice reinforced concrete limit state design and 3D frame simulations."
    },
    {
      id: "geotech-bim",
      title: "BIM & Geotechnical Consultant",
      icon: "Map",
      matchPercentage: 79,
      avgSalary: "₹7 - 15 LPA",
      badge: "Digital Civil",
      description: "Leads digital construction modeling, site soil investigation, and deep foundations.",
      acquiredSkills: ["Surveying & GIS", "Soil Classification"],
      missingSkills: ["Revit BIM Workflows", "Pile Foundation Design", "Slope Stability"],
      actionPlan: "Master Revit architectural BIM and deep foundation bearing capacity."
    }
  ],

  core_fe: [
    {
      id: "junior-software-fellow",
      title: "Foundational Tech & Engineering Analyst",
      icon: "BookOpen",
      matchPercentage: 90,
      avgSalary: "₹6 - 12 LPA",
      badge: "First Year Track",
      description: "Builds problem-solving acumen, mathematical modeling, and coding fundamentals.",
      acquiredSkills: ["Calculus", "Basic Python", "Engineering Physics"],
      missingSkills: ["Object-Oriented Design", "Hardware Prototyping", "Department Specialization"],
      actionPlan: "Choose a branch specialization track (CSE, ECE, Mech, Civil) and build mini-projects."
    }
  ]
};

// Department-specific quiz question banks
export const departmentQuizzes = {
  ai_ds: [
    {
      id: 1,
      topic: "PCA",
      question: "Which mathematical technique is primarily used for linear dimensionality reduction in machine learning?",
      options: [
        "Linear Regression",
        "Principal Component Analysis (PCA)",
        "Decision Trees",
        "Naive Bayes"
      ],
      correctAnswer: 1,
      explanation: "PCA reduces the dimensionality of datasets while preserving as much variance as possible by finding orthogonal eigenvectors."
    },
    {
      id: 2,
      topic: "Classification",
      question: "Which evaluation metric is best suited for an imbalanced classification dataset?",
      options: [
        "Accuracy",
        "F1-Score / PR-AUC",
        "Mean Squared Error",
        "R-Squared"
      ],
      correctAnswer: 1,
      explanation: "When classes are severely imbalanced, standard accuracy is misleading. F1-Score (harmonic mean of Precision & Recall) provides a balanced picture."
    },
    {
      id: 3,
      topic: "PCA",
      question: "In PCA, what do the eigenvectors of the covariance matrix represent?",
      options: [
        "The directions of maximum variance (Principal Components)",
        "The magnitude of reconstruction error",
        "The classification boundaries",
        "The learning rate of the model"
      ],
      correctAnswer: 0,
      explanation: "Eigenvectors point in the directions of maximum variance in the feature space, while eigenvalues indicate the magnitude of variance in those directions."
    },
    {
      id: 4,
      topic: "Clustering",
      question: "What is the common technique used to determine the optimal number of clusters (K) in K-Means?",
      options: [
        "Backpropagation",
        "Elbow Method / Silhouette Analysis",
        "L1 Regularization",
        "Dropout"
      ],
      correctAnswer: 1,
      explanation: "The Elbow method plots inertia (WCSS) against K values to find the point where inertia decrease flattens out, indicating the optimal K."
    },
    {
      id: 5,
      topic: "Regression",
      question: "What type of regularization adds a penalty equal to the sum of the absolute values of the coefficients (L1 penalty)?",
      options: [
        "Ridge Regression",
        "Lasso Regression",
        "ElasticNet",
        "Polynomial Regression"
      ],
      correctAnswer: 1,
      explanation: "Lasso (L1) creates sparse models by driving less important feature weights strictly to zero, effectively acting as feature selection."
    },
    {
      id: 6,
      topic: "Clustering",
      question: "Is K-Means clustering a supervised or unsupervised learning algorithm?",
      options: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Reinforcement Learning",
        "Semi-Supervised Learning"
      ],
      correctAnswer: 1,
      explanation: "K-Means works strictly on unlabeled input features without target output labels, discovering natural groupings within the data."
    }
  ],

  cse: [
    {
      id: 1,
      topic: "Data Structures",
      question: "What is the worst-case time complexity of searching in an unbalanced Binary Search Tree (BST)?",
      options: ["O(log N)", "O(1)", "O(N)", "O(N log N)"],
      correctAnswer: 2,
      explanation: "In an unbalanced BST (skewed tree), search degrades to traversing a linked list, taking O(N) time."
    },
    {
      id: 2,
      topic: "Operating Systems",
      question: "Which of the following conditions is NOT required for a system deadlock to occur?",
      options: ["Mutual Exclusion", "Hold and Wait", "Preemption allowed", "Circular Wait"],
      correctAnswer: 2,
      explanation: "For deadlock, non-preemption is required. If preemption is allowed, resources can be taken away to break the deadlock."
    },
    {
      id: 3,
      topic: "DBMS",
      question: "Which normal form eliminates partial functional dependency on the primary key?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correctAnswer: 1,
      explanation: "2NF requires the table to be in 1NF and guarantees that all non-key attributes are fully functionally dependent on the primary key."
    },
    {
      id: 4,
      topic: "Computer Networks",
      question: "At which layer of the OSI model does the TCP protocol operate?",
      options: ["Network Layer", "Transport Layer", "Data Link Layer", "Session Layer"],
      correctAnswer: 1,
      explanation: "TCP and UDP are Transport Layer (Layer 4) protocols responsible for end-to-end communication."
    },
    {
      id: 5,
      topic: "Algorithms",
      question: "Which algorithmic paradigm does Dijkstra's shortest path algorithm use?",
      options: ["Divide and Conquer", "Dynamic Programming", "Greedy Approach", "Backtracking"],
      correctAnswer: 2,
      explanation: "Dijkstra's algorithm greedily chooses the unvisited vertex with the minimum tentative distance at each step."
    }
  ],

  ece: [
    {
      id: 1,
      topic: "Microcontrollers",
      question: "Which communication protocol uses two bidirectional lines called SDA and SCL?",
      options: ["SPI", "UART", "I2C (Inter-Integrated Circuit)", "CAN"],
      correctAnswer: 2,
      explanation: "I2C requires only two lines: Serial Data (SDA) and Serial Clock (SCL) with pull-up resistors."
    },
    {
      id: 2,
      topic: "VLSI Design",
      question: "In CMOS technology, what type of transistors constitute the pull-up network?",
      options: ["NMOS", "PMOS", "BJT", "JFET"],
      correctAnswer: 1,
      explanation: "In static CMOS gates, the pull-up network connected to VDD consists of PMOS transistors, which pass a strong logic 1."
    },
    {
      id: 3,
      topic: "Signals & Systems",
      question: "What is the Nyquist sampling rate for a signal with maximum frequency component of 4 kHz?",
      options: ["2 kHz", "4 kHz", "8 kHz", "16 kHz"],
      correctAnswer: 2,
      explanation: "Nyquist rate is twice the highest frequency: fs >= 2 * fmax = 2 * 4 kHz = 8 kHz to prevent aliasing."
    },
    {
      id: 4,
      topic: "Embedded Systems",
      question: "What is the primary purpose of a Watchdog Timer (WDT) in microcontrollers?",
      options: [
        "To measure real-time clock time",
        "To reset the system if software hangs or crashes",
        "To control PWM frequency",
        "To communicate with external EEPROM"
      ],
      correctAnswer: 1,
      explanation: "A Watchdog Timer automatically resets the microcontroller if firmware fails to refresh it within a timeout period."
    }
  ],

  mech: [
    {
      id: 1,
      topic: "Thermodynamics",
      question: "Which ideal thermodynamic cycle has the highest theoretical thermal efficiency between two given temperatures?",
      options: ["Otto Cycle", "Rankine Cycle", "Carnot Cycle", "Diesel Cycle"],
      correctAnswer: 2,
      explanation: "According to Carnot's theorem, no heat engine operating between two heat reservoirs can be more efficient than a Carnot engine."
    },
    {
      id: 2,
      topic: "Strength of Materials",
      question: "In a pure bending beam, where is the bending stress zero?",
      options: ["At top extreme fiber", "At bottom extreme fiber", "Along the Neutral Axis", "At the supports only"],
      correctAnswer: 2,
      explanation: "Along the neutral axis of the cross-section, the fibers undergo neither elongation nor compression, so normal bending stress is zero."
    },
    {
      id: 3,
      topic: "Fluid Mechanics",
      question: "Bernoulli's equation is a mathematical formulation of which conservation law for flowing fluids?",
      options: ["Conservation of Mass", "Conservation of Momentum", "Conservation of Energy", "Conservation of Angular Momentum"],
      correctAnswer: 2,
      explanation: "Bernoulli's equation represents the conservation of mechanical energy along a streamline in steady, frictionless, incompressible flow."
    }
  ],

  civil: [
    {
      id: 1,
      topic: "Structural Analysis",
      question: "What is the bending moment at the free end of a cantilever beam carrying any distributed load?",
      options: ["Maximum", "Zero", "WL/2", "Infinite"],
      correctAnswer: 1,
      explanation: "At an unrestrained free end, there is no internal resistance to rotation or moment, so the bending moment is strictly zero."
    },
    {
      id: 2,
      topic: "Concrete Tech",
      question: "What is the standard test method used on-site to measure the workability and consistency of fresh concrete?",
      options: ["Vicat Needle Test", "Slump Cone Test", "Core Cutter Test", "Direct Tensile Test"],
      correctAnswer: 1,
      explanation: "The slump test using a metallic slump cone measures workability and fluidity before placement."
    },
    {
      id: 3,
      topic: "Soil Mechanics",
      question: "Which soil classification boundary separates the plastic state from the liquid state?",
      options: ["Plastic Limit (PL)", "Liquid Limit (LL)", "Shrinkage Limit (SL)", "Void Ratio"],
      correctAnswer: 1,
      explanation: "The Liquid Limit (LL) defined by Casagrande's apparatus is the moisture content where soil transitions from plastic to viscous fluid behavior."
    }
  ],

  eee: [
    {
      id: 1,
      topic: "Power Systems",
      question: "Why is electrical power transmitted over long distances using extra high voltage (EHV)?",
      options: [
        "To increase current flow",
        "To reduce line I²R power losses and minimize conductor thickness",
        "To make transformers smaller",
        "To eliminate the need for insulators"
      ],
      correctAnswer: 1,
      explanation: "Transmitting at high voltage lowers the required transmission current, drastically reducing resistive I²R heat losses."
    },
    {
      id: 2,
      topic: "Electrical Machines",
      question: "What is the rotor speed relative to synchronous stator magnetic speed in a three-phase induction motor under normal motoring?",
      options: ["Strictly equal to synchronous speed", "Slightly less than synchronous speed (Slip > 0)", "Twice synchronous speed", "Zero"],
      correctAnswer: 1,
      explanation: "Induction motors require a non-zero slip (rotor rotating slightly slower than the stator field) to induce rotor EMF and generate torque."
    }
  ],

  core_fe: [
    {
      id: 1,
      topic: "Mathematics",
      question: "What is the determinant of an identity matrix of size 3x3?",
      options: ["0", "1", "3", "-1"],
      correctAnswer: 1,
      explanation: "The determinant of any identity matrix of any order is always equal to 1."
    },
    {
      id: 2,
      topic: "Python Core",
      question: "Which of the following data types in Python is IMMUTABLE?",
      options: ["List", "Dictionary", "Tuple", "Set"],
      correctAnswer: 2,
      explanation: "Tuples and strings in Python are immutable; once created, their elements cannot be modified in-place."
    }
  ]
};

export const subjectAnalytics = [
  { id: "core1", name: "Domain Core I", score: 90, status: "Strong", color: "from-emerald-500 to-teal-600", trend: "+5%" },
  { id: "core2", name: "Domain Core II", score: 80, status: "Good", color: "from-indigo-500 to-blue-600", trend: "+8%" },
  { id: "maths", name: "Engineering Mathematics", score: 72, status: "Average", color: "from-amber-500 to-orange-500", trend: "+2%" },
  { id: "special", name: "Specialized Track", score: 65, status: "Needs Improvement", color: "from-rose-500 to-red-600", trend: "-3%", isWeak: true },
];

export const getLocalizedWelcome = (lang = 'en', name = 'Student') => {
  const studentName = name?.trim() || 'Student';
  if (lang === 'te') return `శుభోదయం, ${studentName} 👋`;
  if (lang === 'hi') return `शुभ प्रभात, ${studentName} 👋`;
  return `Good Morning, ${studentName} 👋`;
};

export const multilingualTranslations = {
  en: {
    welcome: "Good Morning 👋",
    subtitle: "Ready to continue your engineering journey? Here is your personalized plan for today.",
    askAiPlaceholder: "Ask me anything about your engineering subjects... (e.g. Explain Bernoulli's theorem or PCA)",
    askButton: "Ask AI Tutor",
    voiceBtn: "Voice Input",
    listening: "Listening...",
    recommendationTitle: "Personalized Engineering Recommendation",
    startQuiz: "Take Adaptive Quiz",
    continueLearning: "Continue Learning →",
    weakAreaNotice: "Targeted Gap Detected: Complete prerequisite review before advancing."
  },
  te: {
    welcome: "శుభోదయం 👋",
    subtitle: "మీ ఇంజనీరింగ్ ప్రయాణాన్ని కొనసాగించడానికి సిద్ధంగా ఉన్నారా? మీ రోజువారీ ప్రణాళిక ఇక్కడ ఉంది.",
    askAiPlaceholder: "మీ ఇంజనీరింగ్ సబ్జెక్టుల గురించి ఏదైనా సందేహం అడగండి...",
    askButton: "AI ట్యూటర్‌ని అడగండి",
    voiceBtn: "వాయిస్ ఇన్పుట్",
    listening: "వింటున్నాను...",
    recommendationTitle: "వ్యక్తిగతీకరించిన ఇంజనీరింగ్ సిఫార్సు",
    startQuiz: "క్విజ్ ప్రారంభించండి",
    continueLearning: "నేర్చుకోవడం కొనసాగించండి →",
    weakAreaNotice: "పరిశీలించాల్సిన విభాగం: తదుపరి అంశానికి వెళ్లేముందు బేసిక్స్ సమీక్షించండి."
  },
  hi: {
    welcome: "शुभ प्रभात 👋",
    subtitle: "क्या आप अपनी इंजीनियरिंग यात्रा जारी रखने के लिए तैयार हैं? यह आज की आपकी व्यक्तिगत योजना है।",
    askAiPlaceholder: "अपने इंजीनियरिंग विषयों के बारे में कुछ भी पूछें...",
    askButton: "AI ट्यूटर से पूछें",
    voiceBtn: "वॉयस इनपुट",
    listening: "सुन रहा हूँ...",
    recommendationTitle: "व्यक्तिगत इंजीनियरिंग अनुशंसा",
    startQuiz: "क्विज़ शुरू करें",
    continueLearning: "सीखना जारी रखें →",
    weakAreaNotice: "कमज़ोर क्षेत्र की पहचान: आगे बढ़ने से पहले बुनियादी बातों का अभ्यास करें।"
  }
};
