import React from "react";

// Generic mock component for all react-icons
const MockIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return React.createElement("svg", props);
};

// Create a module that exports any icon name as MockIcon
const iconsModule = new Proxy(
  {},
  {
    get: (_target, prop) => {
      if (prop === "__esModule") {
        return true;
      }
      if (prop === "default") {
        return MockIcon;
      }
      return MockIcon;
    },
  },
);

module.exports = iconsModule;
