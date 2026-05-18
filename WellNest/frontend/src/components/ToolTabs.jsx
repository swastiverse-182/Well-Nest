import { useState, useEffect, useRef } from "react";

function ToolTabs({ tabs, defaultTab }) {
  const tabKeys = Object.keys(tabs);
  const initialized = useRef(false);

  const [activeTab, setActiveTab] = useState(defaultTab || tabKeys[0]);

  useEffect(() => {
    if (!initialized.current && defaultTab && tabs[defaultTab]) {
      setActiveTab(defaultTab);
      initialized.current = true;
    }
  }, [defaultTab]);

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex flex-wrap gap-2 border-b border-gray-300 mb-6">
        {tabKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`
              px-3 py-2
              text-sm sm:text-base
              font-semibold
              rounded-t-lg
              border-b-2
              transition
              ${
                activeTab === key
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-green-600"
              }
            `}
          >
            {tabs[key].label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div
        className="
          mt-6
          bg-white
          rounded-xl
          p-4 sm:p-6
          shadow-sm
          max-h-[70vh]
          overflow-y-auto
        "
      >
        {tabs[activeTab].component}
      </div>
    </div>
  );
}

export default ToolTabs;
