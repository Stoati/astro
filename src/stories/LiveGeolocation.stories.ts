import type { Meta, StoryObj } from "@storybook/react";

import LiveGeolocation from "../live/Geolocation/LiveGeolocation";

const meta = {
  title: "Live/Geolocation",
  component: LiveGeolocation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LiveGeolocation>;

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
