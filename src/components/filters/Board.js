import React, { useState, useEffect } from "react";
import "./style.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { orange } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddUser from "./AddUser";

const deleteStudentHandler = async (studentId) => {
  console.log("Deleted", studentId);
  const response = await fetch(`http://localhost:8000/students/${studentId}`, {
    method: "DELETE",
  });
  console.log("response", response);
};

const updateStudent = (studentId) => {
  // <Update studentId={studentId} />;
  console.log("Updated", studentId);
};

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "NAME", width: 130 },
  { field: "gender", headerName: "GENDER", width: 130 },
  {
    field: "dob",
    headerName: "PLACE AND DOB",
    type: "number",
    width: 90,
  },
  {
    field: "groups",
    headerName: "GROUPS",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "Actions",
    headerName: "Actions",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    renderCell: (data) => {
      // console.log("data", data.row.id);
      return (
        <>
          <button onClick={() => updateStudent(data.row.id)}>Edit</button>
          <button onClick={() => deleteStudentHandler(data.row.id)}>
            Delete
          </button>
        </>
      );
    },
  },
];

const Board = () => {
  const [dynamicStudents, setDynamicStudents] = useState([]);
  //here we take a variable dynamicStudents and passed an empty array
  //setDynamicStudents will get data Through API we made and that data in db.json will set data of dynamicStudents
  //using setDynamicStudents
  //getting data
  useEffect(() => {
    //It is just Fetching DATA
    const handleFetchStudent = async () => {
      const response = await fetch("http://localhost:8000/students");
      const convertedResponse = await response.json();
      setDynamicStudents(convertedResponse);
    };
    //calling a function of handleFetchStudent inside of UseEFFECT as it is used to render data for once
    handleFetchStudent();
  }, [setDynamicStudents, dynamicStudents]); //ArrayDependencies //if it is empty call it for once
  //If we pass AN array in array dependencies it will render for that times
  return (
    <>
      <div className="body">
        <div className="header1">
          SAF
          <div className="header2">Student Administration Framework</div>
        </div>

        <div className="NewFlex">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {/*  search button */}
              <Grid item xs={4}>
                <div
                  className="title"
                  style={{ fontSize: "20px", padding: "10px" }}
                >
                  SEARCH FOR NAME
                  <div
                    className="search"
                    style={{
                      lineHeight: "60px",
                    }}
                  >
                    <i>
                      <SearchIcon />
                    </i>

                    <TextField
                      label="search"
                      variant="outlined"
                      color="success"
                      size="small"
                    />
                  </div>
                  <div
                    className="header2"
                    style={{ fontSize: "15px", padding: "10px" }}
                  >
                    FILTERS FOR STUDY GROUPS
                  </div>
                  <div className="checkboxes">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{
                              color: orange[800],
                              "&.Mui-checked": {
                                color: orange[600],
                              },
                            }}
                          />
                        }
                        label="label"
                      />
                    </FormGroup>
                  </div>
                </div>
              </Grid>
              {/*       tables   portion     */}
              <Grid item xs={8}>
                <div className="Tables-part">
                  <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={dynamicStudents}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                      checkboxSelection
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => console.log("clicked")}>
            <AddUser></AddUser>
            ajsd
          </Button>
        </Stack>
      </div>
      {/* table wala part */}
    </>
  );
};

export default Board;
