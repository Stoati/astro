import type { Meta, StoryObj } from "@storybook/react";

import LiveSchedule from "../live/Schedule/LiveSchedule";

const meta = {
  title: "Live/Schedule",
  component: LiveSchedule,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LiveSchedule>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    code: "schedule#schedule",
  },
};
