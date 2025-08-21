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

const Index = ({
  columns,
  data,
  actions = [],
  statusOptions = [],
  updateStatus = "",
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
          data.map((row, rowIndex) => (
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
                  title={row[col.key]}
                >
                  {col.key === "status" ? (
                    <select
                      value={row.status}
                      onChange={(e) => updateStatus(row.srNo, e.target.value)}
                      style={{
                        padding: "8px 8px",
                        borderRadius: "12px",
                        border: "1px solid #ccc",
                        outline: "none",
                        color:
                          row.status === "Selected"
                            ? "var(--primary-color)"
                            : row.status === "Rejected"
                            ? "#B70000"
                            : "#000000",
                      }}
                    >
                      {statusOptions.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    row[col.key]
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
                          <MenuItem key={i} onClick={() => action.onClick(row)}>
                            {action.label}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                </TableCell>
              )}
            </TableRow>
          ))
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
