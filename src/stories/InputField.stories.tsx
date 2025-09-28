import type { Meta, StoryObj } from "@storybook/react";
import InputField from "../Components/InputField/InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible data table component with sorting, selection, loading states, and custom cell rendering.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
    helperText: "This is helper text",
  },
};

export const Filled: Story = {
  args: {
    label: "Filled",
    variant: "filled",
    placeholder: "Filled variant",
  },
};

export const Ghost: Story = {
  args: {
    label: "Ghost",
    variant: "ghost",
    placeholder: "Ghost variant",
  },
};

export const PasswordToggle: Story = {
  args: {
    label: "Password",
    type: "password",
    showPasswordToggle: true,
    placeholder: "Enter password",
  },
};

export const Loading: Story = {
  args: {
    label: "Loading",
    loading: true,
    placeholder: "Loading…",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "name@example.com",
    invalid: true,
    errorMessage: "Please provide a valid email",
  },
};
