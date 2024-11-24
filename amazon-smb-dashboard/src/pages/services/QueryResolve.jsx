import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import "./QueryResolve.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const QueryResolve = () => {
  const pieOptions = {
    responsive: false,
    maintainAspectRatio: false,
  };

  const barOptions = {
    responsive: false,
    maintainAspectRatio: false,
  };

  const [queries, setQueries] = useState([
    {
      id: "Q00123",
      importer: "Global Fruits Inc.",
      category: "Shipping",
      priority: "High",
      status: "Open",
      lastUpdated: "2023-10-05 14:30",
    },
    {
      id: "Q00124",
      importer: "Tropical Imports LLC",
      category: "Pricing",
      priority: "Medium",
      status: "In Progress",
      lastUpdated: "2023-10-05 13:45",
    },
    {
      id: "Q00125",
      importer: "Fruit Express Co.",
      category: "Documentation",
      priority: "Low",
      status: "Resolved",
      lastUpdated: "2023-10-04 16:50",
    },
  ]);

  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
    category: "All",
  });

  const handleAddQuery = () => {
    const newQuery = {
      id: `Q0012${queries.length + 3}`,
      importer: "New Importer",
      category: "New Category",
      priority: "Low",
      status: "Open",
      lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    setQueries([...queries, newQuery]);
  };

  const applyFilters = (query) => {
    const { status, priority, category } = filters;
    return (
      (status === "All" || query.status === status) &&
      (priority === "All" || query.priority === priority) &&
      (category === "All" || query.category === category)
    );
  };

  const filteredQueries = queries.filter(applyFilters);

  const pieData = {
    labels: ["Open", "In Progress", "Resolved"],
    datasets: [
      {
        data: [
          queries.filter((q) => q.status === "Open").length,
          queries.filter((q) => q.status === "In Progress").length,
          queries.filter((q) => q.status === "Resolved").length,
        ],
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
      },
    ],
  };

  const barData = {
    labels: ["Open", "In Progress", "Resolved"],
    datasets: [
      {
        label: "Query Distribution",
        data: [
          queries.filter((q) => q.status === "Open").length,
          queries.filter((q) => q.status === "In Progress").length,
          queries.filter((q) => q.status === "Resolved").length,
        ],
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="query-management">
      <header className="query-header">
        <h1>Query Management</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search queries..."
            className="search-bar"
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="All">Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select
            value={filters.priority}
            onChange={(e) =>
              setFilters({ ...filters, priority: e.target.value })
            }
          >
            <option value="All">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="All">Category</option>
            <option value="Shipping">Shipping</option>
            <option value="Pricing">Pricing</option>
            <option value="Documentation">Documentation</option>
          </select>
          <button className="new-query-btn" onClick={handleAddQuery}>
            New Query
          </button>
        </div>
      </header>

      <div className="main-contentf">
        <table className="query-table">
          <thead>
            <tr>
              <th>Query ID</th>
              <th>Importer Name</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueries.map((query) => (
              <tr key={query.id}>
                <td>{query.id}</td>
                <td>{query.importer}</td>
                <td>{query.category}</td>
                <td className={`priority-${query.priority.toLowerCase()}`}>
                  {query.priority}
                </td>
                <td
                  className={`status-${query.status
                    .replace(" ", "")
                    .toLowerCase()}`}
                >
                  {query.status}
                </td>
                <td>{query.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="overview-graphs">
          <div className="overview-metrics">
            <h3>Overview Metrics</h3>
            <p>Total Queries: {queries.length}</p>
            <p>
              Open Queries: {queries.filter((q) => q.status === "Open").length}
            </p>
            <p>
              In Progress Queries:{" "}
              {queries.filter((q) => q.status === "In Progress").length}
            </p>
            <p>
              Resolved Queries:{" "}
              {queries.filter((q) => q.status === "Resolved").length}
            </p>
          </div>
          <div className="overview-metrics">
            <h3>Query Distribution</h3>
            <div className="query-graphs">
              <Pie data={pieData} options={pieOptions} />
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryResolve;
