# Fringe Online Booking System

A full-stack ticket booking system for Adelaide Fringe 2025, supporting both admin and public portals, with backend integrations for MySQL, Redis, Swagger documentation, and more.

---

## 📁 Project Structure

```
# Fringe Online Booking System

A full-stack ticket booking system for Adelaide Fringe 2025, supporting both admin and public portals, with backend integrations for MySQL, Redis, Swagger documentation, and more.

---

## 📁 Project Structure

```
```
FringeOnlineBookingSystem/
│
├── backend/                                # Backend APIs and services
│   ├── config/                             # Environment configs and DB connections
│   ├── controllers/                        # Route handlers (admin/public)
│   ├── entities/                           # TypeORM entity definitions
│   ├── routes.ts                           # API route definitions
│   ├── services/                           # Business logic and utilities
│   ├── status/                             # Health check HTML template
│   ├── data-source.ts                      # MySQL TypeORM datasource
│   ├── redis.ts                            # Redis client config
│   ├── swagger.ts                          # Swagger config for API docs
│   ├── app.ts                              # Main application entry point
│   └── package.json                        # Backend dependencies and scripts
│   ├── controllers/                        # Route handlers (admin/public)
│   ├── entities/                           # TypeORM entity definitions
│   ├── routes.ts                           # API route definitions
│   ├── services/                           # Business logic and utilities
│   ├── status/                             # Health check HTML template
│   ├── data-source.ts                      # MySQL TypeORM datasource
│   ├── redis.ts                            # Redis client config
│   ├── swagger.ts                          # Swagger config for API docs
│   ├── app.ts                              # Main application entry point
│   └── package.json                        # Backend dependencies and scripts
│
├── frontend-admin/                         # Admin portal frontend
│   ├── public/                             # Static assets (favicon, html)
│   ├── src/
│   ├── src/
│   │   ├── components/                     # Reusable UI components
│   │   ├── pages/                          # Admin views (dashboard, events, etc.)
│   │   ├── services/                       # API interactions
│   │   └── App.jsx                         # Main admin app
│   └── package.json                        # React build & dependencies
│   │   ├── pages/                          # Admin views (dashboard, events, etc.)
│   │   ├── services/                       # API interactions
│   │   └── App.jsx                         # Main admin app
│   └── package.json                        # React build & dependencies
│
├── frontend-public/                        # Public booking portal
│   ├── public/                             # Static assets (favicon, index.html)
│   ├── src/
│   │   ├── components/                     # UI components for users
│   │   ├── pages/                          # Booking flow (search, seats, confirm)
│   │   ├── services/                       # API communication layer
│   │   └── App.jsx                         # Main public app
│   └── package.json                        # React dependencies and config
│   ├── public/                             # Static assets (favicon, index.html)
│   ├── src/
│   │   ├── components/                     # UI components for users
│   │   ├── pages/                          # Booking flow (search, seats, confirm)
│   │   ├── services/                       # API communication layer
│   │   └── App.jsx                         # Main public app
│   └── package.json                        # React dependencies and config
│
├── database/                               # Database setup and migrations
│   ├── schema.sql                          # SQL schema (initial)
│   ├── seed_data.sql                       # Seed/test data
│   └── migrations/                         # Versioned migration scripts
├── database/                               # Database setup and migrations
│   ├── schema.sql                          # SQL schema (initial)
│   ├── seed_data.sql                       # Seed/test data
│   └── migrations/                         # Versioned migration scripts
│
├── docker/                                 # Docker and orchestration
│   ├── docker-compose.yml                  # Service orchestration (MySQL, Redis, etc.)
│   ├── Dockerfile.backend                  # Backend Docker build config
│   └── Dockerfile.frontend                 # Frontend Dockerfile
├── docker/                                 # Docker and orchestration
│   ├── docker-compose.yml                  # Service orchestration (MySQL, Redis, etc.)
│   ├── Dockerfile.backend                  # Backend Docker build config
│   └── Dockerfile.frontend                 # Frontend Dockerfile
│
├── docs/                                   # Project documentation
│   ├── API_Specification.md                # API endpoint reference
│   ├── DEV_GUIDE.md                        # Dev setup & contribution instructions
│   └── ENV_SETUP.md                        # Environment setup guide
├── docs/                                   # Project documentation
│   ├── API_Specification.md                # API endpoint reference
│   ├── DEV_GUIDE.md                        # Dev setup & contribution instructions
│   └── ENV_SETUP.md                        # Environment setup guide
│
├── .env.example                            # Sample env file
├── .env.example                            # Sample env file
├── .gitignore                              # Git ignored files
└── README.md                               # This file
```

---

## 📦 Final Submission Structure

```
FinalSubmission/
│
├── 1_Executive_Summary/                   # Project overview
│   └── Executive_Summary.pdf
└── README.md                               # This file
```

---

## 📦 Final Submission Structure

```
FinalSubmission/
│
├── 1_Executive_Summary/                   # Project overview
│   └── Executive_Summary.pdf
│
├── 2_Requirements/                        # Requirements analysis
│   ├── Business_Need.pdf
│   ├── User_Stories_and_Epics.xlsx
│   └── Acceptance_Criteria.pdf
├── 2_Requirements/                        # Requirements analysis
│   ├── Business_Need.pdf
│   ├── User_Stories_and_Epics.xlsx
│   └── Acceptance_Criteria.pdf
│
├── 3_Design/                              # System and UI design
│   ├── System_Architecture_Diagram.png
│   ├── ER_Diagram.pdf
│   ├── Activity_Diagram.pdf
│   ├── System_Sequence_Diagram.pdf
│   └── UI_Wireframes.pdf
├── 3_Design/                              # System and UI design
│   ├── System_Architecture_Diagram.png
│   ├── ER_Diagram.pdf
│   ├── Activity_Diagram.pdf
│   ├── System_Sequence_Diagram.pdf
│   └── UI_Wireframes.pdf
│
├── 4_Implementation/                      # Implementation details
│   ├── Technical_Stack_and_Justification.pdf
│   ├── Module_Description.pdf
│   └── API_Documentation.pdf
├── 4_Implementation/                      # Implementation details
│   ├── Technical_Stack_and_Justification.pdf
│   ├── Module_Description.pdf
│   └── API_Documentation.pdf
│
├── 5_DevOps_Practices/                    # DevOps & deployment
│   ├── CI_CD_Pipeline_Overview.pdf
│   ├── DevOps_Tools_Config/
│   │   ├── docker-compose.yml
│   │   ├── deployment.yaml
│   │   └── .github/workflows/main.yml
│   ├── Source_Control_Strategy.pdf
│   └── Deployment_Environments.pdf
├── 5_DevOps_Practices/                    # DevOps & deployment
│   ├── CI_CD_Pipeline_Overview.pdf
│   ├── DevOps_Tools_Config/
│   │   ├── docker-compose.yml
│   │   ├── deployment.yaml
│   │   └── .github/workflows/main.yml
│   ├── Source_Control_Strategy.pdf
│   └── Deployment_Environments.pdf
│
├── 6_Sprint_0/                            # Sprint 0 planning
│   ├── Team_Structure_and_Roles.pdf
│   ├── Sprint_0_Board_Screenshot.png
│   ├── Risks_and_Issues_Log.xlsx
│   ├── Sprint_Roadmap.pdf
│   └── Tools_and_Environments_Setup.pdf
├── 6_Sprint_0/                            # Sprint 0 planning
│   ├── Team_Structure_and_Roles.pdf
│   ├── Sprint_0_Board_Screenshot.png
│   ├── Risks_and_Issues_Log.xlsx
│   ├── Sprint_Roadmap.pdf
│   └── Tools_and_Environments_Setup.pdf
│
├── 7_Testing_QA/                          # QA and testing reports
│   ├── Test_Strategy.pdf
│   ├── Sprint1_Test_Plan.pdf
│   ├── Test_Results_Report.pdf
│   └── Bug_Tracking_Summary.pdf
├── 7_Testing_QA/                          # QA and testing reports
│   ├── Test_Strategy.pdf
│   ├── Sprint1_Test_Plan.pdf
│   ├── Test_Results_Report.pdf
│   └── Bug_Tracking_Summary.pdf
│
├── 8_Project_Management/                 # Project tracking
│   ├── Project_Timeline_Gantt.pdf
│   ├── Task_Assignment_and_Effort.xlsx
│   └── Progress_vs_Plan.pdf
├── 8_Project_Management/                 # Project tracking
│   ├── Project_Timeline_Gantt.pdf
│   ├── Task_Assignment_and_Effort.xlsx
│   └── Progress_vs_Plan.pdf
│
├── 9_Demo/                                # App prototype & demo
│   ├── Demo_Screenshots/
│   │   ├── Admin_UI_Home.png
│   │   ├── Booking_UI_Home.png
│   │   └── QR_Code_Example.png
│   ├── Demo_Video_Link.txt
│   └── Run_Instructions.md
├── 9_Demo/                                # App prototype & demo
│   ├── Demo_Screenshots/
│   │   ├── Admin_UI_Home.png
│   │   ├── Booking_UI_Home.png
│   │   └── QR_Code_Example.png
│   ├── Demo_Video_Link.txt
│   └── Run_Instructions.md
│
├── 10_Reflection/                         # Reflections and learning
│   ├── Agile_DevOps_Reflection.pdf
│   ├── Team_Collaboration_Review.pdf
│   └── Lessons_Learned.pdf
├── 10_Reflection/                         # Reflections and learning
│   ├── Agile_DevOps_Reflection.pdf
│   ├── Team_Collaboration_Review.pdf
│   └── Lessons_Learned.pdf
│
├── 11_Appendices/                         # Supporting documents
│   ├── References.pdf
│   ├── Jira_Export.xlsx
│   └── Meeting_Notes.pdf
│
├── Progress Presentation/                # Presentations
│   ├── Presentation1.pptx
│   └── Presentation2.pptx
├── 11_Appendices/                         # Supporting documents
│   ├── References.pdf
│   ├── Jira_Export.xlsx
│   └── Meeting_Notes.pdf
│
├── Progress Presentation/                # Presentations
│   ├── Presentation1.pptx
│   └── Presentation2.pptx
│
└── README.txt                             # Folder reference guide
```

---

Let me know if you’d like a version with badges, usage instructions, or `npm run` scripts explained!
