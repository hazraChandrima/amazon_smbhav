import React, { useState } from "react";
import "./Notifications.css";
import { IconContext } from "react-icons";
import { MdDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Shipment #12345 has been dispatched", priority: "low", done: false },
        { id: 2, message: "Urgent: Customs clearance document for Shipment #67890 approved", priority: "high", done: false },
        { id: 3, message: "Shipment #45678 has been delivered successfully", priority: "medium", done: false },
        { id: 4, message: "New shipment #78901 created and awaiting pickup", priority: "medium", done: false },
        { id: 5, message: "Shipment #23456 is out for delivery", priority: "high", done: false },
        { id: 6, message: "Customs clearance document for Shipment #56789 denied", priority: "high", done: false },
    ]);
    

    const handleMarkDone = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.id === id
                    ? { ...notification, done: true }
                    : notification
            )
        );
    };

    const handleDelete = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    const priorityClasses = {
        low: "priority-low",
        medium: "priority-medium",
        high: "priority-high",
    };

    return (
      <IconContext.Provider
        value={{
          color: "white",
          size: "1.5rem",
          className: "global-class-name",
        }}
      >
        <div className="notifications-container">
          <h2 className="notifications-title">Shipment Notifications</h2>
          <ul className="notifications-list">
            {notifications.map(({ id, message, priority, done }) => (
              <li
                key={id}
                className={`notifications-item ${priorityClasses[priority]} ${
                  done ? "notification-done" : ""
                }`}
              >
                <div className="notification-content">
                  <p className="notification-message">{message}</p>
                  <p className="notification-priority">
                    Priority: <span>{priority}</span>
                  </p>
                </div>
                <div className="notification-actions">
                  {!done && (
                    <button
                      className="action-button mark-done"
                      aria-label={`Mark notification "${message}" as done`}
                      title="Mark as done"
                      onClick={() => handleMarkDone(id)}
                    >
                      <MdDone/>
                    </button>
                  )}
                  <button
                    className="action-button delete"
                    aria-label={`Delete notification "${message}"`}
                    title="Delete"
                    onClick={() => handleDelete(id)}
                  >
                    <MdDelete/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </IconContext.Provider>
    );
};

export default Notifications;
