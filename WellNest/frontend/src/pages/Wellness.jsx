import FeatureCard from "../components/FeatureCard";
import wellnessImg from "../assets/wellness.png";
import mentalImg from "../assets/mental.png";
import physicalImg from "../assets/physical.png";
import nutritionImg from "../assets/diet.png";

const Wellness = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* HERO IMAGE */}
      <section className="relative h-[300px] sm:h-[380px] mb-12 flex items-center justify-center rounded-2xl overflow-hidden">
        <img
          src={wellnessImg}
          alt="Wellness lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/20"></div>  {/* 20% dark overlay */}


        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-400 drop-shadow-lg">
            Wellness
          </h1>
          <p className="mt-3 sm:mt-4 text-gray-100 drop-shadow-md max-w-3xl mx-auto">
            Explore AI-guided wellness insights across mind, body, and nutrition.
          </p>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Mental Wellness"
          description="Manage stress, overthinking, and emotional balance"
          image={mentalImg}
          to="/wellness/mental"
        />

        <FeatureCard
          title="Physical Wellness"
          description="Fitness, movement, and body health guidance"
          image={physicalImg}
          to="/wellness/physical"
        />

        <FeatureCard
          title="Nutrition & Diet"
          description="Healthy eating, nutrients, and diet planning"
          image={nutritionImg}
          to="/wellness/nutrition"
        />
      </div>
    </div>
  );
};

export default Wellness;
