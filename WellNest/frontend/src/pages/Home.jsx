import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import TodayInfo from "../tools/TodayInfo";
import heroImg from "../assets/meditation.png";
import bmiImg from "../assets/bmi.png";
import yogaImg from "../assets/yoga.png";
import foodImg from "../assets/nutrition.png";
import goalImg from "../assets/goals.png";
import calendarImg from "../assets/calendar.png";
import dashboardImg from "../assets/dashboard.png";



function Home() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top Info */}
      <TodayInfo />

      {/* HERO SECTION */}
      <section className="relative h-[420px] sm:h-[480px] flex items-center justify-center">
        {/* Background Image */}
        <img
          src={heroImg}
          alt="Wellness lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Welcome to <span className="text-green-400">WellNest</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-100">
            Your all-in-one wellness companion for health, balance, and mindful living.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={scrollToFeatures}
              className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Get Started
            </button>

            <Link
              to="/wellness"
              className="px-6 py-3 rounded-xl bg-white/90 text-gray-900 font-semibold hover:bg-white transition"
            >
              Explore Wellness
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="bg-gradient-to-b from-gray-50 to-white py-14 sm:py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
            What You Can Do with WellNest
          </h2>

          <p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">
            Simple tools designed to support your everyday wellness journey.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
  title="BMI Calculator"
  description="Check your body mass index and understand your health status."
  image={bmiImg}
  to="/tools?tab=bmi"
/>

<FeatureCard
  title="Yoga Finder"
  description="Search yoga poses by body part, balance, or flexibility."
  image={yogaImg}
  to="/tools?tab=yoga"
/>

<FeatureCard
  title="Nutrition Info"
  description="Get nutritional details to support healthy eating."
  image={foodImg}
  to="/tools?tab=nutrition"
/>

<FeatureCard
  title="Health Goals"
  description="Set, track, and achieve your personal wellness goals."
  image={goalImg}
  to="/goals"
/>

<FeatureCard
  title="Health Calendar"
  description="Plan and review your wellness activities daily."
  image={calendarImg}
  to="/calendar"
/>

<FeatureCard
  title="Dashboard"
  description="View your overall wellness progress in one place."
  image={dashboardImg}
  to="/dashboard"
/>


          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
