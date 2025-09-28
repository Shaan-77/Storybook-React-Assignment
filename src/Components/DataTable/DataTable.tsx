import React, { useState, useCallback, useMemo } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { RiLoader2Fill } from "react-icons/ri";
import { BsDatabase } from "react-icons/bs";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  rowKey?: keyof T | ((record: T) => string | number);
}

export type SortDirection = "asc" | "desc" | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}
function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  selectable = false,
  multiSelect = true,
  onRowSelect,
  className = "",
  emptyMessage = "No data available",
  loadingMessage = "Loading...",
  rowKey = "id",
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );

  // Get row key function
  const getRowKey = useCallback(
    (record: T, index: number): string | number => {
      if (typeof rowKey === "function") {
        return rowKey(record);
      }
      return (record[rowKey] ?? index) as string | number;
    },
    [rowKey]
  );

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return data;
    }

    const column = columns.find((col) => col.key === sortState.column);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortState.direction === "asc" ? -1 : 1;
      if (bValue == null) return sortState.direction === "asc" ? 1 : -1;

      // Compare values
      let comparison = 0;
      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortState.direction === "asc" ? comparison : -comparison;
    });
  }, [data, columns, sortState]);

  // Handle column sorting
  const handleSort = (columnKey: string) => {
    const column = columns.find((col) => col.key === columnKey);
    if (!column?.sortable) return;

    setSortState((prevState) => {
      if (prevState.column === columnKey) {
        // Cycle through: asc -> desc -> null
        const nextDirection: SortDirection =
          prevState.direction === "asc"
            ? "desc"
            : prevState.direction === "desc"
            ? null
            : "asc";

        return {
          column: nextDirection ? columnKey : null,
          direction: nextDirection,
        };
      } else {
        return {
          column: columnKey,
          direction: "asc",
        };
      }
    });
  };

  // Handle row selection
  const handleRowSelect = (record: T, index: number) => {
    if (!selectable) return;

    const key = getRowKey(record, index);
    const newSelectedRows = new Set(selectedRows);

    if (multiSelect) {
      if (selectedRows.has(key)) {
        newSelectedRows.delete(key);
      } else {
        newSelectedRows.add(key);
      }
    } else {
      newSelectedRows.clear();
      if (!selectedRows.has(key)) {
        newSelectedRows.add(key);
      }
    }

    setSelectedRows(newSelectedRows);

    // Call onRowSelect with actual records
    if (onRowSelect) {
      const selectedRecords = sortedData.filter((record, idx) =>
        newSelectedRows.has(getRowKey(record, idx))
      );
      onRowSelect(selectedRecords);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (!selectable || !multiSelect) return;

    const allKeys = sortedData.map((record, index) => getRowKey(record, index));
    const allSelected = allKeys.every((key) => selectedRows.has(key));

    if (allSelected) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const newSelectedRows = new Set(allKeys);
      setSelectedRows(newSelectedRows);
      onRowSelect?.(sortedData);
    }
  };

  const isAllSelected =
    sortedData.length > 0 &&
    sortedData.every((record, index) =>
      selectedRows.has(getRowKey(record, index))
    );
  const isIndeterminate = selectedRows.size > 0 && !isAllSelected;

  // Render sort icon
  const renderSortIcon = (columnKey: string) => {
    if (sortState.column !== columnKey) {
      return <div className="w-4 h-4" />; // Placeholder for alignment
    }

    return sortState.direction === "asc" ? (
      <AiOutlineArrowUp className="w-4 h-4 text-blue-600" />
    ) : (
      <AiOutlineArrowDown className="w-4 h-4 text-blue-600" />
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RiLoader2Fill className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-500">{loadingMessage}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <BsDatabase className="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">{emptyMessage}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {selectable && (
                  <th className="w-12 px-4 py-3 text-left">
                    {multiSelect && (
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        ref={(input) => {
                          if (input) input.indeterminate = isIndeterminate;
                        }}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        aria-label="Select all rows"
                      />
                    )}
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      column.align === "center"
                        ? "text-center"
                        : column.align === "right"
                        ? "text-right"
                        : "text-left"
                    } ${
                      column.sortable
                        ? "cursor-pointer hover:bg-gray-100 select-none"
                        : ""
                    }`}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.key)}
                    role={column.sortable ? "button" : undefined}
                    tabIndex={column.sortable ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (
                        column.sortable &&
                        (e.key === "Enter" || e.key === " ")
                      ) {
                        e.preventDefault();
                        handleSort(column.key);
                      }
                    }}
                    aria-sort={
                      sortState.column === column.key
                        ? sortState.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : column.sortable
                        ? "none"
                        : undefined
                    }
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.title}</span>
                      {column.sortable && renderSortIcon(column.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((record, index) => {
                const key = getRowKey(record, index);
                const isSelected = selectedRows.has(key);

                return (
                  <tr
                    key={key}
                    className={`hover:bg-gray-50 transition-colors ${
                      isSelected ? "bg-blue-50" : ""
                    } ${selectable ? "cursor-pointer" : ""}`}
                    onClick={() => handleRowSelect(record, index)}
                  >
                    {selectable && (
                      <td className="w-12 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleRowSelect(record, index)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          aria-label={`Select row ${index + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-4 py-3 text-sm text-gray-900 ${
                          column.align === "center"
                            ? "text-center"
                            : column.align === "right"
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {column.render
                          ? column.render(
                              record[column.dataIndex],
                              record,
                              index
                            )
                          : String(record[column.dataIndex] ?? "")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
