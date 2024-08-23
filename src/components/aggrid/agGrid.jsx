import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./agGrid.scss";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import Navbars from "../navbar/Nav";
import SimpleBar from "simplebar-react";
import { GET_ALL_MAJOR_LAB_TESTS } from "../../apis/MajorTestAPI";
import ListCellRenderer from "../chips/listcellrenderer";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridExample = (props) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "majorTestName", filter: "agTextColumnFilter", minWidth: 170 },
    { field: "majorTestPrice" },
    { field: "majorTestRemarks" },
    // { field: "minorLabTestList", cellRendererFramework: <ListCellRenderer /> },
    { field: "createdBy" },
    { field: "updatedBy" },
    // { field: "gold" },
    // { field: "silver" },
    // { field: "bronze" },
    // { field: "total" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      // allow every column to be aggregated
      enableValue: true,
      // allow every column to be grouped
      enableRowGroup: true,
      // allow every column to be pivoted
      enablePivot: true,
      editable: true,
      filter: true,
    };
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 200,
    };
  }, []);

  const fetchMinnorLabTests = async () => {
    const data = await GET_ALL_MAJOR_LAB_TESTS();
    if (data) {
      setRowData(
        data.map((dat, idx) => {
          return { ...dat, rowIdx: idx };
        })
      );
    }
  };

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json").then(
      (resp) => resp.json()
    );
    //   .then((data) => setRowData(data));
    fetchMinnorLabTests();
  }, []);

  return (
    <>
      <Navbars />
      <div className="grid-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            justifyContent: "center",
            justifyItems: "center",
            height: 498,
            width: "90%",
          }}
          className="ag-theme-quartz"
        >
          <SimpleBar style={{ maxHeight: "100%" }}></SimpleBar>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            pagination={true}
            paginationPageSize={25}
            paginationPageSizeSelector={[25, 50, 100, 500, 1000]}
            autoGroupColumnDef={autoGroupColumnDef}
            sideBar={true}
          />
        </div>
      </div>
    </>
  );
};

export default GridExample;
