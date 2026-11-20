// All proposal content lives here, so copy can be edited without touching the UI.

export const project = {
  title: 'Transportation Management System',
  short: 'TMS',
  subtitle: 'Proposed 6-Month Development & Delivery Plan',
  objective:
    "Design, develop, test and deploy a centralized Transportation Management System to support the client's freight brokerage operations and approximately 100–200 employees.",
  scope:
    'The system will include Brokerage, Operations, Accounts Receivable, Accounts Payable, Administration and Compliance modules, with integrations for Highway and QuickBooks and a Flutter mobile app that lets carriers share their live location while a load is in transit.',
}

export const stats = [
  { value: '6', label: 'Months to go-live' },
  { value: '6', label: 'Business modules' },
  { value: '2', label: 'Integrations' },
  { value: '1', label: 'Carrier mobile app' },
]

export const modules = [
  { name: 'Administration', month: 1, desc: 'Users, departments, roles, permissions and secure login.' },
  { name: 'Brokerage', month: 2, desc: 'Loads, rates, carrier assignment and rate confirmations.' },
  { name: 'Operations', month: 2, desc: 'OTR and drayage loads, dispatch, tracking and documents.' },
  { name: 'Accounts Receivable', month: 3, desc: 'Invoicing, payments, credit control, aging and collections.' },
  { name: 'Accounts Payable', month: 3, desc: 'Carrier invoices, variance checks, approvals and remittance.' },
  { name: 'Compliance', month: 4, desc: 'Carrier onboarding, MC/USDOT, insurance and expiry alerts.' },
]

export const integrations = [
  { name: 'Highway', desc: 'Carrier verification during onboarding and compliance review.' },
  { name: 'QuickBooks', desc: 'Customer invoice and carrier bill synchronization.' },
]

export const phases = [
  { name: 'Development', months: [1, 2, 3, 4], desc: 'Build every agreed module and integration.' },
  { name: 'Testing & Fixes', months: [5, 6], desc: 'QA, UAT, defect resolution and go-live.' },
]

export const months = [
  {
    n: 1,
    phase: 'Development',
    title: 'Technical Foundation & Master Data',
    short: 'Foundation',
    objective: 'Establish the application architecture and foundational business modules.',
    deliverable: 'Technical foundation, users, roles, customers and carriers',
    groups: [
      {
        name: 'Development Activities',
        items: [
          'Finalize Product Requirements Document (PRD) and Technical Requirements Document (TRD).',
          'Finalize database architecture and application structure.',
          'Set up React, Vite, TypeScript and Ant Design frontend.',
          'Set up Node.js, NestJS and TypeScript backend.',
          'Configure PostgreSQL and Prisma ORM.',
          'Implement authentication and secure login.',
          'Develop role-based access control (RBAC).',
          'Implement user, department, role and permission management.',
          'Develop customer management.',
          'Develop carrier management.',
          'Implement customer and carrier master records.',
        ],
      },
      {
        name: 'DevOps – AWS Environment Setup',
        devops: true,
        items: [
          'Set up AWS account structure, IAM roles and least-privilege access.',
          'Provision VPC, subnets and security groups.',
          'Provision development, staging and production environments on AWS.',
          'Set up Amazon RDS for PostgreSQL and Amazon ElastiCache for Redis.',
          'Set up Amazon S3 buckets for document storage.',
          'Define all infrastructure as code with Terraform.',
          'Build the GitHub Actions CI pipeline: lint, test, build and push Docker images to Amazon ECR.',
          'Automatic deployment to the development environment on every merge.',
          'Centralized application logging with Amazon CloudWatch.',
        ],
      },
    ],
    milestone: 'Working application foundation with authentication, permissions, customer and carrier management.',
  },
  {
    n: 2,
    phase: 'Development',
    title: 'Core Brokerage & Operations',
    short: 'Brokerage',
    objective: 'Develop the primary freight brokerage workflows.',
    deliverable: 'Brokerage, OTR, drayage, dispatch and documents',
    groups: [
      {
        name: 'Development Activities',
        items: [
          'Load creation and management.',
          'OTR load management.',
          'Drayage load management.',
          'Pickup and delivery locations.',
          'Container, terminal and chassis information.',
          'Customer and carrier rate management.',
          'Carrier assignment.',
          'Customer and carrier rate confirmations.',
          'Dispatch management.',
          'Shipment status and milestone tracking.',
          'Accessorial charge management.',
          'Load notes, activity history and communication records.',
          'Document upload and management.',
          'BOL, POD and gate ticket handling.',
        ],
      },
      {
        name: 'DevOps – Deployment Cycle',
        devops: true,
        items: [
          'Automated deployment to staging with an approval gate.',
          'Automated database migrations (Prisma) in the pipeline.',
          'Containerized backend deployment on Amazon ECS (Fargate).',
          'Frontend hosting on Amazon S3 and CloudFront.',
          'Secrets and credentials management with AWS Secrets Manager.',
          'Environment-specific configuration for dev, staging and production.',
        ],
      },
    ],
    milestone: 'Functional end-to-end load management and brokerage operations.',
  },
  {
    n: 3,
    phase: 'Development',
    title: 'Accounts Receivable & Accounts Payable',
    short: 'Accounting',
    objective: 'Develop the complete financial workflows for customer billing and carrier payments.',
    deliverable: 'Accounts Receivable, Accounts Payable and carrier app foundation',
    groups: [
      {
        name: 'Accounts Receivable (AR)',
        items: [
          'Customer invoice generation.',
          'Invoice approval and delivery.',
          'Customer payment tracking.',
          'Partial payments and deductions.',
          'Credit limits and credit holds.',
          'Invoice aging and Statements of Account.',
          'Collections and follow-up tracking.',
        ],
      },
      {
        name: 'Accounts Payable (AP)',
        items: [
          'Carrier invoice management.',
          'Carrier invoice and rate confirmation comparison.',
          'Duplicate invoice and variance checks.',
          'Carrier bill approvals.',
          'Payment tracking and remittance records.',
        ],
      },
      {
        name: 'Carrier Mobile App (Flutter) – Foundation',
        mobile: true,
        items: [
          'Flutter app setup for Android and iOS.',
          'Carrier login and secure authentication.',
          'Assigned loads list and load details.',
          'Background GPS location service.',
          'Location tracking API and storage in the TMS.',
        ],
      },
      {
        name: 'DevOps – Monitoring & Security',
        devops: true,
        items: [
          'Application metrics, dashboards and alarms in Amazon CloudWatch.',
          'Automated database backups and point-in-time recovery.',
          'SSL certificates (AWS Certificate Manager) and custom domains (Route 53).',
          'AWS WAF and infrastructure security hardening.',
          'Dependency and container vulnerability scanning in CI.',
        ],
      },
    ],
    milestone: 'Functional AR and AP workflows, from customer invoicing to carrier payment.',
  },
  {
    n: 4,
    phase: 'Development',
    title: 'Compliance, Integrations, Reporting & Carrier App',
    short: 'Compliance',
    objective: 'Complete the compliance workflows, connect external systems and deliver reporting.',
    deliverable: 'Compliance, Highway, QuickBooks, reporting and carrier app live tracking',
    groups: [
      {
        name: 'Compliance',
        items: [
          'Carrier onboarding and verification.',
          'MC/USDOT information.',
          'Insurance and authority tracking.',
          'Document expiry alerts.',
          'Compliance approvals and holds.',
          'Compliance review history.',
        ],
      },
      {
        name: 'Integrations',
        items: [
          'Highway carrier verification integration.',
          'QuickBooks customer invoice synchronization.',
          'QuickBooks carrier bill synchronization.',
          'Integration status and error handling.',
        ],
      },
      {
        name: 'Reporting',
        items: [
          'Brokerage operational reports.',
          'AR and AP reports.',
          'Compliance reports.',
          'Management dashboard.',
          'Revenue and gross profit reporting.',
          'Excel and PDF exports.',
        ],
      },
      {
        name: 'Carrier Mobile App (Flutter) – Live Tracking',
        mobile: true,
        items: [
          'Live location sharing while a load is In Transit, started and stopped automatically by load status.',
          'Load status updates from the app: picked up, in transit and delivered.',
          'POD and document photo upload from the app.',
          'Push notifications for new load assignments and updates.',
          'Live map of in-transit loads for dispatch and operations in the TMS.',
          'Location history (route trail) on each load.',
          'Battery-efficient tracking with offline location queueing.',
        ],
      },
      {
        name: 'DevOps – Production Readiness',
        devops: true,
        items: [
          'Deployment of background workers for BullMQ jobs and integrations.',
          'Auto scaling policies for application and worker services.',
          'Production environment provisioning and hardening.',
          'Documented rollback procedure for every release.',
        ],
      },
    ],
    milestone: 'All agreed business modules, integrations and the carrier mobile app feature-complete.',
  },
  {
    n: 5,
    phase: 'Testing & Fixes',
    title: 'System Testing & Defect Resolution',
    short: 'Testing',
    objective: 'Test the complete application end to end and resolve the defects found.',
    deliverable: 'Full QA cycle, defect resolution and stabilization',
    groups: [
      {
        name: 'Quality Assurance',
        items: [
          'Functional testing of all modules.',
          'API and integration testing.',
          'Role and permission testing.',
          'Financial calculation validation.',
          'Database transaction and data integrity testing.',
          'Security testing.',
          'Performance and concurrent-user testing.',
          'Regression testing.',
          'Carrier app testing on Android and iOS devices.',
          'GPS accuracy, background tracking and battery testing.',
        ],
      },
      {
        name: 'Defect Resolution & Stabilization',
        items: [
          'Bug identification, prioritization and resolution.',
          'Re-testing of resolved defects.',
          'Performance tuning and optimization.',
          'Highway and QuickBooks integration hardening.',
        ],
      },
      {
        name: 'DevOps – Test Environment Support',
        devops: true,
        items: [
          'Dedicated load-testing environment on AWS.',
          'Performance monitoring and right-sizing of AWS resources.',
          'Backup restore and disaster recovery drill.',
          'Fast fix-and-redeploy cycle to staging for defect verification.',
        ],
      },
    ],
    milestone: 'Stable, system-tested application ready for client UAT.',
  },
  {
    n: 6,
    phase: 'Testing & Fixes',
    title: 'UAT, Fixes & Production Delivery',
    short: 'Go-live',
    objective: 'Validate the application with the client, apply final fixes and deploy to production.',
    deliverable: 'UAT, refinements, production deployment and app store release',
    groups: [
      {
        name: 'Client UAT & Improvements',
        items: [
          'Client demonstrations and user acceptance testing.',
          'Feedback collection and agreed refinements.',
          'Resolution of identified defects.',
          'Workflow validation with department representatives.',
          'Final integration validation.',
          'Final regression testing.',
          'Carrier app pilot with selected carriers.',
        ],
      },
      {
        name: 'Production Deployment',
        items: [
          'Production infrastructure configuration.',
          'Data migration, where included in the approved scope.',
          'Production deployment.',
          'Carrier app release on Google Play Store and Apple App Store.',
          'User training and documentation.',
          'Final handover and go-live support.',
        ],
      },
      {
        name: 'DevOps – Production Release',
        devops: true,
        items: [
          'Production deployment pipeline with manual approval.',
          'Rolling deployments with automatic health checks and rollback.',
          'Go-live monitoring, alerting and on-call support.',
          'AWS cost monitoring and budget alerts.',
          'Infrastructure and deployment runbook handover.',
        ],
      },
    ],
    milestone: 'Production-ready TMS delivered to the client.',
  },
]

export const stack = [
  { layer: 'Frontend', tech: 'React.js, Vite, TypeScript' },
  { layer: 'UI Framework', tech: 'Ant Design' },
  { layer: 'Backend', tech: 'Node.js, NestJS, TypeScript' },
  { layer: 'Database', tech: 'PostgreSQL' },
  { layer: 'ORM', tech: 'Prisma' },
  { layer: 'Cache & Background Processing', tech: 'Redis and BullMQ' },
  { layer: 'Document Storage', tech: 'Amazon S3' },
  { layer: 'Hosting', tech: 'AWS – ECS Fargate, RDS, CloudFront' },
  { layer: 'CI/CD', tech: 'GitHub Actions + Amazon ECR' },
  { layer: 'Infrastructure as Code', tech: 'Terraform' },
  { layer: 'Monitoring & Logging', tech: 'Amazon CloudWatch' },
  { layer: 'Secrets', tech: 'AWS Secrets Manager' },
  { layer: 'Mobile App', tech: 'Flutter (Android & iOS)' },
  { layer: 'Maps & Location', tech: 'Google Maps Platform' },
  { layer: 'Push Notifications', tech: 'Firebase Cloud Messaging' },
]

export const approach = [
  { title: 'Iterative & modular', text: 'Development will follow an iterative and modular approach.' },
  { title: 'Module demos', text: 'Each module will be demonstrated to the client upon completion.' },
  { title: 'DevOps from day one', text: 'AWS environments and the automated deployment pipeline are built in Month 1 and extended every month, so every feature ships through the same tested release path.' },
  { title: 'Continuous testing', text: 'Functional and integration testing will be conducted continuously throughout development.' },
  { title: 'Early feedback', text: 'Client feedback will be incorporated during development to minimize late-stage changes.' },
  { title: 'Dedicated testing period', text: 'The final two months are reserved for comprehensive QA, UAT, defect resolution and production deployment.' },
]

export const assumptions = [
  { title: 'Scope sign-off before development', text: 'The client will approve the PRD, TRD and initial project scope before development begins.' },
  { title: 'Stakeholder availability', text: 'Client stakeholders will be available for regular reviews and timely feedback.' },
  { title: 'Integration access on day one', text: 'Highway and QuickBooks API access, credentials and documentation will be provided at the beginning of the project.' },
  { title: 'Business inputs during discovery', text: 'Required sample documents, business rules, invoice formats and approval workflows will be provided during discovery.' },
  { title: 'MVP scope only', text: 'The six-month timeline (four months of development and two months of testing and fixes) assumes delivery of the agreed MVP scope and does not include unapproved additional modules.' },
  { title: 'App store accounts', text: 'The client will provide Google Play and Apple App Store developer accounts for publishing the carrier app.' },
  { title: 'Formal change requests', text: 'Any major change in business requirements or additional functionality will be evaluated through a formal change request.' },
  { title: 'Go-live depends on UAT', text: 'Production rollout will be subject to successful UAT and resolution of critical defects.' },
]

export const commitment = {
  headline: 'Six months from project kickoff',
  condition:
    'subject to timely client approvals, availability of third-party integrations and adherence to the approved scope.',
  closing:
    "Our objective is to deliver a secure, reliable and scalable TMS that supports the client's current operations and provides a foundation for future growth.",
}

export const pricing = {
  amount: 1750000,
  currency: 'INR',
  label: 'Total development cost',
  summary: 'Covers the complete scope in this proposal, from kickoff to production go-live.',
  covers: [
    '4 months of development: 6 business modules',
    'Highway and QuickBooks integrations',
    'Carrier mobile app (Flutter) for Android and iOS with live GPS tracking',
    'Reporting, dashboard and Excel/PDF exports',
    'AWS environment setup and automated deployment pipeline',
    '2 months of testing, defect fixes and client UAT',
    'Production deployment, user training and documentation',
    'Final handover and go-live support',
  ],
  note: 'Additional modules or major requirement changes outside the approved scope will be quoted separately through a formal change request.',
}

export const mobileApp = {
  name: 'Carrier Mobile App',
  tech: 'Flutter · Android & iOS',
  desc: 'Carriers share their live location while a load is in transit, so dispatch and operations always know where every shipment is.',
  months: [3, 4],
  features: [
    'Assigned loads and load details',
    'Live GPS tracking while In Transit',
    'Status updates: picked up, in transit, delivered',
    'POD and document photo upload',
    'Push notifications for new loads',
    'Live map and route history in the TMS',
  ],
}
