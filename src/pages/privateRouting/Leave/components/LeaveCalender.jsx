import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLeaveData } from "../../../../context/LeaveContext";

const LeaveCalendar = () => {
  const { leaveList } = useLeaveData();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const leaveDates =
    leaveList
      ?.filter((leave) => leave.status === "Approved")
      .map((leave) => new Date(leave.appliedDate * 1000).toDateString()) || [];

  return (
    <div className="leave-calender-container">
      <div className="calender-text">Leave Calender</div>
      <div className="calender-component">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date }) => {
            const dateStr = date.toDateString();

            if (leaveDates.includes(dateStr)) {
              return "leave-date";
            }
            return "";
          }}
        />
      </div>

      <div className="applied-leave-container">
        <p className="main-text">Approved Leaves</p>
        {leaveDates.includes(selectedDate.toDateString()) ? (
          leaveList
            .filter(
              (leave) =>
                new Date(leave.appliedDate * 1000).toDateString() ===
                  selectedDate.toDateString() && leave.status === "Approved"
            )
            .map((leave, idx) => (
              <div className="content-container" key={idx}>
                <div className="applied-content">
                  <p>{leave.name}</p>
                  <p className="department-text"> {leave.department}</p>
                </div>
                <p>
                  {new Date(leave.appliedDate * 1000).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    }
                  )}
                </p>
              </div>
            ))
        ) : (
          <p>No approved leaves on this day</p>
        )}
      </div>
    </div>
  );
};

export default LeaveCalendar;
