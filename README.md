WellNest 🌿
WellNest is a full-stack wellness web application designed to provide personalized, condition-based health guidance. It helps users make informed lifestyle choices by offering food recommendations, detailed nutritional breakdowns, yoga guidance tailored to body parts and fitness goals, and practical wellness tools like a BMI calculator. The platform also leverages AI-powered suggestions and integrated video searches to support mental, physical, and nutritional well-being, delivering actionable, beginner-friendly insights that promote healthier habits in a simple, intuitive, and holistic manner.
---
Table of Contents
Features
Screenshots
Detailed Project Structure
Tech Stack
Environment Variables
Installation
Deployment
Project Status
Author
Notes
---
Features
Smart Food Advice: Personalized recommendations for foods to eat or avoid based on health conditions or health benefits, combining rule-based logic with API-driven data.
Nutritional Insights: Provides a detailed breakdown of calories, macronutrients, and portion sizes to help users understand the impact of their diet.
BMI Calculator: Calculates body mass index and categorizes users as underweight, normal, overweight, or obese.
Yoga Recommendations: Suggests poses targeting specific body areas and fitness goals, integrated with YouTube tutorials for guided practice.
AI-Powered Wellness Guide: Offers actionable insights covering mental, physical, and nutritional wellness.
Wellness Video Search: Enables users to explore relevant fitness, yoga, and nutrition videos via the YouTube Data API.
---
Screenshots
🏠 Home Page
![Home Page](.WellNest/frontend/public/images/home.png)
👤 User Home
![User Home](.WellNest/frontend/public/images/user_home_page.png)
🔐 Login & Register
Login	Register
![Login](.WellNest/frontend/public/images/login.png)	![Register](public/images/register.png)
📊 Dashboard
![Dashboard](.WellNest/frontend/public/images/dashboard.png)
🧘 Wellness Page
![Wellness](.WellNest/frontend/public/images/wellness_page.png)
🥗 Nutrition Advice
![Nutrition Advice](.WellNest/frontend/public/images/nutrition_advice.png)
🏋️ Physical Wellness
![Physical Wellness](.WellNest/frontend/public/images/physical_wellness.png)
🧮 BMI Calculator
![BMI Calculator](.WellNest/frontend/public/images/bmi_calculator.png)
🎯 Goals
![Goals](.WellNest/frontend/public/images/goals.png)
📅 Calendar
![Calendar](.WellNest/frontend/public/images/calendar.png)
🧘 Yoga Search
![Yoga Search](.WellNest/frontend/public/images/yoga_search.png)
🎥 Wellness Videos
![Wellness Videos](.WellNest/frontend/public/images/wellness_videos.png)
---
Detailed Project Structure
```text
WellNest/
│
├── backend/                             # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js                        # MongoDB connection & configuration
│   ├── controllers/
│   │   └── healthFoodController.js      # Handles smart food logic & responses
│   ├── middleware/
│   │   ├── adminAuth.js                 # Protects admin-only routes
│   │   └── auth.js                      # JWT authentication & user verification
│   ├── models/
│   │   ├── HealthFood.js                # Stores food rules & nutrition logic
│   │   ├── User.js                      # User profile, auth & preferences schema
│   │   └── CalendarEvent.js             # Stores wellness & workout events
│   ├── routes/
│   │   ├── ai.js                        # AI-powered wellness suggestions
│   │   ├── auth.js                      # Login & registration endpoints
│   │   ├── foodAdvice.js                # Food recommendation APIs
│   │   ├── calendar.js                  # Calendar CRUD operations
│   │   ├── userGoals.js                 # Health & workout goals management
│   │   ├── adminHealthFood.js           # Admin food data management
│   │   └── adminUsers.js                # Admin user analytics & controls
│   ├── index.js                         # Express server entry point
│   ├── package.json                    # Backend dependencies & scripts
│   └── .env                             # Backend environment variables
│
├── frontend/                            # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/
│   │   │   ├── ai.js                    # Calls AI wellness backend
│   │   │   ├── auth.js                  # Login & register API helpers
│   │   │   ├── food.js                  # Smart food advice API calls
│   │   │   ├── calendar.js              # Calendar API integration
│   │   │   └── goals.js                 # Health & workout goals API
│   │   ├── auth/
│   │   │   ├── Login.jsx                # User login page
│   │   │   └── Register.jsx             # User registration page
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Main navigation bar
│   │   │   ├── FeatureCard.jsx          # Reusable feature UI cards
│   │   │   ├── ToolTabs.jsx             # Tabs for wellness tools
│   │   │   ├── CalendarEvent.jsx        # Individual calendar event UI
│   │   │   └── Footer.jsx               # Website footer
│   │   ├── context/
│   │   │   └── AuthContext.jsx          # Global authentication state
│   │   ├── pages/
│   │   │   ├── Home.jsx                 # Landing page
│   │   │   ├── Dashboard.jsx            # User overview & progress
│   │   │   ├── Tools.jsx                # Wellness tools hub
│   │   │   ├── Goals.jsx                # Health & workout goals page
│   │   │   ├── Calendar.jsx             # Wellness calendar page
│   │   │   └── Wellness.jsx             # Wellness content overview
│   │   ├── routes/
│   │   │   └── PrivateRoute.jsx         # Protects authenticated routes
│   │   ├── tools/
│   │   │   ├── BMICalculator.jsx        # BMI calculation tool
│   │   │   ├── SmartFoodAdvisor.jsx     # Condition-based food advisor
│   │   │   ├── NutrientInfo.jsx         # USDA nutrition breakdown
│   │   │   ├── YogaSearch.jsx           # Yoga poses by body part/goal
│   │   │   ├── YouTubeSearch.jsx        # Wellness video search
│   │   │   └── TodayInfo.jsx            # Daily wellness insights
│   │   ├── wellness/
│   │   │   ├── MentalWellness.jsx       # Mental health guidance
│   │   │   ├── PhysicalWellness.jsx     # Physical fitness content
│   │   │   └── NutritionWellness.jsx    # Nutrition education content
│   │   ├── assets/                      # Images, icons & illustrations
│   │   ├── App.jsx                      # Root React component
│   │   ├── main.jsx                     # React app bootstrap (Vite)
│   │   ├── index.css                    # Global styling & Tailwind base
│   │   └── .env                         # Frontend environment variables
│   ├── public/                          # Static public assets
│   ├── index.html                        # Main HTML template
│   ├── package.json                     # Frontend dependencies
│   ├── vite.config.js                   # Vite configuration
│   └── eslint.config.js                  # ESLint configuration
│
├── .gitignore                            # Ignored files & folders
├── README.md                             # Project documentation
└── vercel.json                           # Vercel deployment configuration
```
---
Tech Stack
Frontend	Backend / APIs
React + Vite	Node.js + Express v5
Tailwind CSS	MongoDB + Mongoose
Context API	JWT-based Authentication
2.5 Flash Lite (AI model)	AI APIs
---
Environment Variables
Backend (`server/.env`):
```
MONGO_URI=mongodb_connection_string
JWT_SECRET=jwt_secret
ADMIN_KEY=admin_api_key
```
Frontend (`.env`):
```
VITE_API_URL=/api
VITE_USDA_API_KEY=usda_key
VITE_YOUTUBE_API_KEY=youtube_key
```
---
Installation
```bash
# Clone repository
git clone https://github.com/swastiverse-182/wellnest.git
cd wellnest

# Backend
cd backend
npm install
npm start

# Frontend
cd ../frontend
npm install
npm run dev
```
---
Deployment
Backend: Render
Frontend: Vercel / Netlify
Database: MongoDB Atlas
---
Project Status
🚧 Actively under development and continuously improving.
---
Notes
WellNest is built for learning, experimentation, and practical wellness applications, focusing on actionable, user-friendly guidance rather than generic fitness tracking.