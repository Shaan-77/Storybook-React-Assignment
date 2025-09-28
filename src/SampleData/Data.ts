import { Column } from "../Components/DataTable/DataTable";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  salary: number;
  [key: string]: unknown;
}

export const sampleUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Developer",
    status: "active",
    joinDate: "2023-01-15",
    salary: 75000,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Designer",
    status: "active",
    joinDate: "2023-02-20",
    salary: 68000,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Manager",
    status: "inactive",
    joinDate: "2022-11-10",
    salary: 85000,
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "Developer",
    status: "pending",
    joinDate: "2023-03-05",
    salary: 72000,
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "QA Engineer",
    status: "active",
    joinDate: "2023-01-30",
    salary: 65000,
  },
];

export const basicColumns: Column<User>[]= [
  {
    key: "name",
    title: "Name",
    dataIndex: "name" as keyof User,
    sortable: true,
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email" as keyof User,
    sortable: true,
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role" as keyof User,
    sortable: true,
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status" as keyof User,
    sortable: true,
  },
  {
    key: "salary",
    title: "Salary",
    dataIndex: "salary" as keyof User,
    sortable: true,
  },
];