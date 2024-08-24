import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton, styled } from "@mui/material";
import "./Tables.scss";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Tables({
  rows = [],
  columns = [],
  actions = [],
  onDoubleClick,
}) {
  const [page, setPage] = React.useState(0);
  const [selectedRow, setSelectedRow] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onRowClick = (e, row) => {
    if (e.detail === 2) {
      setSelectedRow(row);
      onDoubleClick && onDoubleClick(row);
    }
  };

  console.log("selectedRow", selectedRow);

  return (
    <Paper sx={{ width: "80%", overflow: "hidden" }}>
      <TableContainer className="table-main-container" sx={{ maxHeight: 350 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          className="table-container"
        >
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
              {actions.length > 0 && (
                <StyledTableCell align="right"></StyledTableCell>
              )}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.testId}
                    selected={row?.rowIdx === selectedRow?.rowIdx}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      // console.log('value',column.id,  value)
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={(e) => onRowClick(e, row)}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    {actions.length > 0 && (
                      <TableCell align="right" onClick={null}>
                        {actions.map((action, index) => (
                          <IconButton
                            key={index}
                            variant={action.variant || "contained"}
                            color={action.color || "primary"}
                            onClick={(e) => {
                              e.preventDefault();
                              action.onClick(row);
                            }}
                            style={{ marginLeft: "8px" }}
                          >
                            {action.label}
                          </IconButton>
                        ))}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        className="table-footer"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
