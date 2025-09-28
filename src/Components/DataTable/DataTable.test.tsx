import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "./DataTable";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";

const columns: {
  key: keyof (typeof data)[0];
  title: string;
  dataIndex: keyof (typeof data)[0];
  sortable?: boolean;
}[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const data = [
  { name: "B", email: "b@example.com" },
  { name: "A", email: "a@example.com" },
];

describe("DataTable", () => {
  test("renders rows", () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  test("sorts by column", () => {
    render(<DataTable data={data} columns={columns} />);
    const header = screen.getByText("Name");
    fireEvent.click(header); // asc
    const firstCell = screen.getAllByRole("cell")[0];
    expect(firstCell.textContent).toBe("A");
  });

  test("selects a row and calls onRowSelect", () => {
    const onRowSelect = vi.fn();
    render(
      <DataTable
        data={data}
        columns={columns}
        selectable
        onRowSelect={onRowSelect}
      />
    );
    const checkbox = screen.getByLabelText(/select row 1/i) as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(onRowSelect).toHaveBeenCalled();
  });

  test("select-all in multiSelect selects all", () => {
    const onRowSelect = vi.fn();
    render(
      <DataTable
        data={data}
        columns={columns}
        selectable
        multiSelect
        onRowSelect={onRowSelect}
      />
    );
    const selectAll = screen.getByLabelText(
      /select all rows/i
    ) as HTMLInputElement;
    fireEvent.click(selectAll);
    expect(onRowSelect).toHaveBeenCalledWith(expect.any(Array));
  });
});
