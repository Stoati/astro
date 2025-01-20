import type { Meta, StoryObj } from "@storybook/react";

import LiveMap from "../live/Map/LiveMap";

const meta = {
  title: "Live/Map",
  component: LiveMap,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LiveMap>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    code: "location#location",
    containerClass: "containerClass",
    mapContainerClass: "mapContainerClass",
    addressClass: "addressClass",
  },
};
