import { useState } from "react";
import DataTable from "./Components/DataTable/DataTable";
import { InputField } from "./Components/InputField/InputField";
import "./index.css";
import { FaUserSecret } from "react-icons/fa";
import { BiMoon, BiSun } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { basicColumns, sampleUsers } from "./SampleData/Data";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div
            className={`mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FaUserSecret className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Component Demo</h1>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Interactive showcase of InputField and DataTable components
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                } border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                {isDarkMode ? (
                  <BiSun className="w-5 h-5" />
                ) : (
                  <BiMoon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          {/* Input Field Demo Section */}
          <div
            className={`mb-12 p-6 rounded-xl border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } shadow-sm`}
          >
            <div className="flex items-center space-x-2 mb-6">
              <CiSettings
                className={`w-5 h-5 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h2
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                InputField Component Demo
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InputField
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  variant="outlined"
                  size="md"
                  showClear={true}
                  isDarkMode={true}
                />

                <InputField
                  label="Email Address"
                  placeholder="your.email@company.com"
                  type="email"
                  errorMessage="Enter Valid Email"
                  invalid={true}
                  variant="filled"
                  size="md"
                  helperText="We'll use this for important notifications"
                  isDarkMode={true}
                />
              </div>

              <div className="space-y-4">
                <InputField
                  label="Password"
                  placeholder="Create a secure password"
                  type="password"
                  variant="outlined"
                  size="md"
                  showPasswordToggle={true}
                  helperText="Must be at least 8 characters long"
                  isDarkMode={true}
                />

                <InputField
                  label="Address"
                  placeholder="Enter Your Address..."
                  variant="outlined"
                  size="md"
                  showClear={true}
                  loading={true}
                  isDarkMode={true}
                />
              </div>
            </div>
          </div>

          {/* DataTable Demo Section */}
          <div
            className={`p-6 rounded-xl border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } shadow-sm`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <FaUserSecret
                  className={`w-5 h-5 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <h2
                  className={`text-xl font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  DataTable Component Demo
                </h2>
              </div>
            </div>

            {/* Data Table */}
            <DataTable
              data={sampleUsers}
              columns={basicColumns}
              selectable={true}
              multiSelect={true}
              emptyMessage={"No Columns"}
            />

            {/* Selected Employees Summary */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
