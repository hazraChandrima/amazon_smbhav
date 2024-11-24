import React from "react";
import "./Notifications.css";

const Notifications = () => {
    const notifications = [
        { id: 1, message: "New shipment created", priority: "low" },
        { id: 2, message: "Urgent: Shipment delayed", priority: "high" },
        { id: 3, message: "Document approval required", priority: "medium" },
    ];

    const getPriorityClass = (priority) => {
        switch (priority) {
            case "low":
                return "priority-low";
            case "medium":
                return "priority-medium";
            case "high":
                return "priority-high";
            default:
                return "";
        }
    };

    return (
        <div className="notifications-container">
            <h2 className="notifications-title">Notifications</h2>
            <ul className="notifications-list">
                {notifications.map((notification) => (
                    <li
                        key={notification.id}
                        className={`notifications-item ${getPriorityClass(notification.priority)}`}
                    >
                        <div className="notification-content">
                            <p className="notification-message">
                                {notification.message}
                            </p>
                            <p className="notification-priority">
                                Priority: <span>{notification.priority}</span>
                            </p>
                        </div>
                        <div className="notification-actions">
                            <button
                                className="action-button mark-done"
                                title="Mark as done"
                            >
                                ✔
                            </button>
                            <button
                                className="action-button delete"
                                title="Delete"
                            >
                                🗑
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
