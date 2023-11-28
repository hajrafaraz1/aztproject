import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
//import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [dialogForm, setDialogForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    gender: "",
    dob: "",
    groups: "",
  });

  const addUser = async (formData) => {
    const response = await fetch("http://localhost:8000/students", {
      method: "POST",
      body: JSON.stringify({
        name: `${formData.fullName}`,
        gender: `${formData.gender}`,
        dob: `${formData.dob}`,
        groups: `${formData.groups}`,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log("response", response);
  };
  ///////////////////////////////////////////////////////
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClickOpen = () => {
    setDialogForm(true);
  };

  const handleClickClose = () => {
    setDialogForm(false);
  };
  //it is adding a data
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("formData", formData);
    await addUser(formData);
    setFormData("");
  };

  return (
    <div className="new_buttons">
      <Button variant="contained" onClick={handleClickOpen}>
        Add a User
      </Button>
      <Dialog open={dialogForm} onClose={handleClickClose}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              variant="outlined"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Gender"
              variant="outlined"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label=""
              variant="outlined"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Groups"
              variant="outlined"
              name="groups"
              value={formData.groups}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleClickClose}
            >
              SUBMIT
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
