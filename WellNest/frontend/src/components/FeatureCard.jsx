import { Link } from "react-router-dom";

function FeatureCard({ title, description, icon, image, to, onClick }) {
  const content = (
    <>
      {/* Image (preferred if provided) */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-36 object-cover rounded-xl mb-4"
        />
      )}

      {/* Emoji Icon (fallback if no image) */}
      {!image && icon && (
        <div className="text-4xl mb-4">{icon}</div>
      )}

      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-500 text-sm">{description}</p>
    </>
  );

  // Button-style card
  if (onClick) {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-2xl shadow-md p-6
        hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
      >
        {content}
      </div>
    );
  }

  // Link-style card
  return (
    <Link
      to={to}
      className="bg-white rounded-2xl shadow-md p-6
      hover:shadow-xl hover:-translate-y-1 transition cursor-pointer block"
    >
      {content}
    </Link>
  );
}

export default FeatureCard;
