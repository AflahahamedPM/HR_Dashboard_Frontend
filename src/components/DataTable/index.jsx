import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from "@fluentui/react-components";
import { MoreVertical20Filled } from "@fluentui/react-icons";
import { formatDate } from "../../utils/formatDate";

const Index = ({
  columns,
  data,
  actions = [],
  statusOptions = [],
  updateStatus = "",
  isCandidatePage,
}) => {
  return (
    <Table aria-label="Dynamic Fluent UI Table" className="custom-table">
      <TableHeader
        style={{
          backgroundColor: "var(--primary-color)",
        }}
      >
        <TableRow>
          {columns.map((col, index) => (
            <TableHeaderCell
              style={{
                width: col.width,
                minWidth: col.width,
                color: "#fff",
                minHeight: col.height,
                height: col.height,
                padding: "2px",
              }}
              key={index}
            >
              {col?.label}
            </TableHeaderCell>
          ))}

          {actions.length > 0 && (
            <TableHeaderCell style={{ width: "100px", color: "#fff" }}>
              Actions
            </TableHeaderCell>
          )}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => {
            const rowWithSrNo = { ...row, srNo: rowIndex + 1 };

            return (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={colIndex}
                    style={{
                      maxWidth: col.width,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      borderBottom: "1px dotted #ccc",
                      padding: "8px",
                    }}
                    title={rowWithSrNo[col.key]}
                  >
                    {col.key === "status" || col.key === "attendanceStatus" ? (
                      <select
                        value={
                          isCandidatePage
                            ? rowWithSrNo?.status
                            : rowWithSrNo?.attendanceStatus
                        }
                        onChange={(e) =>
                          updateStatus(rowWithSrNo?._id, e.target.value)
                        }
                        style={{
                          padding: "8px 8px",
                          borderRadius: "12px",
                          border: "1px solid #ccc",
                          cursor: "pointer",
                          outline: "none",
                          color: isCandidatePage
                            ? rowWithSrNo.status === "Selected"
                              ? "var(--primary-color)"
                              : rowWithSrNo.status === "Rejected"
                              ? "#B70000"
                              : "#000000"
                            : rowWithSrNo?.attendanceStatus === "Present"
                            ? "#008413"
                            : rowWithSrNo?.attendanceStatus === "Absent"
                            ? "#B70000"
                            : "#000000",
                        }}
                      >
                        {statusOptions.map((option, idx) => (
                          <option
                            style={{ color: "black" }}
                            key={idx}
                            value={option}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : col.key === "dateOfJoin" && rowWithSrNo[col.key] ? (
                      formatDate(rowWithSrNo[col.key])
                    ) : (
                      rowWithSrNo[col.key]
                    )}
                  </TableCell>
                ))}

                {actions.length > 0 && (
                  <TableCell
                    style={{
                      borderBottom: "1px dotted #ccc",
                      textAlign: "left",
                    }}
                  >
                    <Menu>
                      <MenuTrigger>
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            outline: "none",
                          }}
                        >
                          <MoreVertical20Filled />
                        </button>
                      </MenuTrigger>
                      <MenuPopover>
                        <MenuList
                          style={{
                            padding: "4px",
                            border: "1px solid black",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                          }}
                        >
                          {actions.map((action, i) => (
                            <MenuItem
                              key={i}
                              onClick={() => action.onClick(rowWithSrNo)}
                            >
                              {action.label}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </MenuPopover>
                    </Menu>
                  </TableCell>
                )}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} style={{ textAlign: "center" }}>
              No Data Found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Index;
