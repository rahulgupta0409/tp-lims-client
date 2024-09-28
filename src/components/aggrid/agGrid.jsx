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
import Container from "../container/Container";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridExample = (props) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "majorTestName", filter: "agTextColumnFilter", minWidth: 170 },
    { field: "majorTestPrice" },
    { field: "majorTestRemarks" },
    {
      field: "minorLabTestList",
      // cellRendererFramework: ListCellRenderer,
    },
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
          console.log("data", dat);
          let arr = "";
          Object.keys(dat).forEach((key) => {
            if (key === "minorLabTestList") {
              const dd = dat["minorLabTestList"];
              dd.forEach((d) => {
                arr = d.testName && `${arr} ${d.testName},`;
              });
            }
          });
          return { ...dat, minorLabTestList: arr, rowIdx: idx };
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

  const onSelectionChanged = useCallback(
    (event) => {
      var rowCount = event.api.getSelectedNodes().length;
      window.alert("selection changed, " + rowCount + " rows selected");
    },
    [window]
  );

  const onRowSelected = useCallback(
    (event) => {
      console.log("event", event);
      window.alert(
        "row " +
          event.node.data.majorTestName +
          " selected = " +
          event.node.isSelected()
      );
    },
    [window]
  );

  return (
    <>
      <Navbars />
      <Container>
        <div className="grid-container">
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              justifyContent: "center",
              justifyItems: "center",
              height: 470,
              width: "100%",
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
              pagination={true}
              paginationPageSize={25}
              paginationPageSizeSelector={[25, 50, 100, 500, 1000]}
              autoGroupColumnDef={autoGroupColumnDef}
              scrollbarWidth={5}
              onRowDoubleClicked={() => console.log("row clicked")}
              onRowSelected={onRowSelected}
              onSelectionChanged={onSelectionChanged}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default GridExample;
