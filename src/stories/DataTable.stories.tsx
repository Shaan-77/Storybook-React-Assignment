import type { Meta, StoryObj } from "@storybook/react";

import DataTable, { DataTableProps } from "../Components/DataTable/DataTable";

import { basicColumns, sampleUsers, User } from "../SampleData/Data";

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable,
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
  argTypes: {
    selectable: {
      control: "boolean",
      description: "Enable row selection",
    },
    multiSelect: {
      control: "boolean",
      description: "Allow multiple row selection",
    },
    loading: {
      control: "boolean",
      description: "Show loading state",
    },
  },
  args: {
    onRowSelect: undefined,
  },
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
    selectable: true,
    multiSelect: true,
  },
};

export const SingleSelection: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
    selectable: true,
    multiSelect: false,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: basicColumns,
    loading: true,
    loadingMessage: "Fetching user data...",
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: basicColumns,
    emptyMessage: "No users found. Try adjusting your search criteria.",
  },
};

export const CustomRendering: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
    selectable: true,
  },
};

export const Sortable: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns.map((col) => ({
      ...col,
      sortable: true,
    })),
  },
  render: () => {
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Click on column headers to sort. Click again to reverse sort order,
          and once more to remove sorting.
        </div>
        <DataTable
          data={sampleUsers}
          columns={basicColumns.map((col) => ({
            ...col,
            sortable: true,
          }))}
        />
      </div>
    );
  },
};

export const ResponsiveTable: Story = {
  args: {
    data: sampleUsers.slice(0, 3),
    columns: basicColumns,
    selectable: true,
  },
  render: () => (
    <div className="w-full max-w-xs sm:max-w-none">
      <DataTable
        data={sampleUsers.slice(0, 3)}
        columns={basicColumns}
        selectable
      />
    </div>
  ),
};
