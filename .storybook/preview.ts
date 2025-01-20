import type { Preview } from "@storybook/react";
import "../src/tailwind.css";
import "leaflet/dist/leaflet.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
