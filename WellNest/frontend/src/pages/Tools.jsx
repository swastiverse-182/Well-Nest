import { useSearchParams } from "react-router-dom";
import ToolTabs from "../components/ToolTabs";

import BMICalculator from "../tools/BMICalculator";
import NutrientInfo from "../tools/NutrientInfo";
import YogaSearch from "../tools/YogaSearch";
import YouTubeSearch from "../tools/YouTubeSearch";

import toolsBg from "../assets/toolsBg.png";

function Tools() {
  const [searchParams] = useSearchParams();
  const activeTabParam = searchParams.get("tab");

  const tabs = {
    bmi: {
      label: "BMI Calculator",
      component: <BMICalculator />,
    },
    nutrition: {
      label: "Nutrition Info",
      component: <NutrientInfo />,
    },
    yoga: {
      label: "Yoga Search",
      component: <YogaSearch />,
    },
    youtube: {
      label: "Wellness Videos",
      component: <YouTubeSearch />,
    },
  };

  return (
    <div
      className="
        relative min-h-screen
        bg-no-repeat
        bg-contain sm:bg-cover
        bg-bottom sm:bg-center
        sm:bg-fixed
        py-10 sm:py-16
        px-4 sm:px-6
      "
      style={{ backgroundImage: `url(${toolsBg})` }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/10"></div>

      {/* Main container */}
      <div
        className="
          relative z-10
          max-w-6xl mx-auto
          bg-green-50/95 backdrop-blur-lg
          rounded-2xl sm:rounded-3xl
          p-5 sm:p-10
          shadow-xl border border-green-200
        "
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-green-700 text-center">
           Wellness Tools
        </h1>

        {/* Tabs container */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
          <ToolTabs
            tabs={tabs}
            defaultTab={tabs[activeTabParam] ? activeTabParam : "bmi"}
          />
        </div>
      </div>
    </div>
  );
}

export default Tools;