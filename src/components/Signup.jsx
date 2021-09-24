import * as React from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import { Form, FormGroup} from 'react-bootstrap';
import { Grid, FormControl, Typography, Button, Divider,Select, Checkbox, InputLabel, MenuItem, Link, Modal} from "@mui/material";
import swal from 'sweetalert';
import { useAuth } from '../auth';
import './loginStyle.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
//   height: 600,
  bgcolor: 'background.paper',
  border: '1px solid #141414',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,

};

const useStyles = makeStyles((theme) => ({

    avatar: {
      margin: "0 8px"
    },

    input: {
        padding: "10px",
        lineHeight: "normal",
        textAlign: "center",
        "&&:placeholder": { color: "#f00", },
    },
    submit: {

    },
    signupNotice: {
        display: "flex",
        alignItems: "start",
        "& div": {
          padding: "5px 0px 0px 0px",
          fontSize: "13px",
          "& span": {
            color: "rgb(237, 90, 107)",
            fontWeight: 450,
          },
        },
      },
  }));



export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { signup } = useAuth()
  const history = useHistory();


  const [openSignup, setOpenSignup] = React.useState(false);
  const handleOpenSignup = () => setOpenSignup(true);
  const handleCloseSignup = () => setOpenSignup(false);

//   const handleOpenLogin = () => {
//     setOpenLogin(prev => !prev)
//   };

    const [city, setCity] = React.useState("");
    const inputLabel = React.useRef("");
    const [labelWidth, setLabelWidth] = React.useState(0);

    const handleChange = e => {
        setCity(e.target.value);
    };

    function handleSubmit(e1){
      e1.preventDefault();
      
      signup(emailRef, passwordRef)
            .then(function(){
              swal({
                title:"Signed Up Successfully !",
                icon:"success",
                buttons:false,
                timer:2000
              });
              
              console.log("Signup ")
              history.push("/home");
            })
          
            .catch(function(error) {
          var errorMessage = error.message;
            swal({
              title:"Error!",
              text:errorMessage,
              buttons:false,
              timer:2000,
              icon:"error"
            }); 
            });
          };

  return (
    <div>
      <Button onClick={handleOpenSignup}> Signup </Button>
      <Modal
        open={openSignup}
        onClose={handleCloseSignup}
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
      >

    <Box sx={style} >

        <Typography id="signup-modal-title" variant="h5" component="h3" textAlign="center" fontWeight="bold">
            Sign Up
        </Typography>

        <div id="signup-modal-description" className="paper">
        {/* <form  className={classes.form}> */}

        <Form name="Signup">
          <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
              <FormGroup>
                <input
                 //value={this.state.firstName} onBlur={handleFirstNameChange}
                className="form-control" name="firstname" placeholder="First Name  *"/>
              </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormGroup>
                <input
                // value={this.state.lastName} onChange={this.handleLastNameChange}
                className="form-control" name = "lastname"placeholder="Last Name  *"/>
              </FormGroup>
              </Grid>
              <Grid item xs={12}>
              <FormGroup>
                <input type="number"
                // value={this.state.email} onChange={this.handlePhoneChange}
                className="form-control" name="phone" placeholder="Phone  *"/>
              </FormGroup>
              </Grid>

              <Grid item xs={12}>
              <FormGroup>
                <input type="email"
                //  value={this.state.email} onChange={this.handleEmailChange}
                className="form-control" ref={emailRef} name="email" placeholder="Email  *" required/>
              </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6}>
              <FormGroup>
                <input
                // value={this.state.email} onChange={this.handleAddChange}
                className="form-control" name="address" placeholder="Address  *"/>
              </FormGroup>
              </Grid>
              
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                  <InputLabel id='city' ref={inputLabel} fullWidth required > City</InputLabel>
                  <Select labelId='city' id='select'
                  value={city}
                  onChange={handleChange}
                  labelWidth={labelWidth}
                  >
                      <MenuItem value="Pune">Pune</MenuItem>
                      <MenuItem value="Mumbai">Mumbai</MenuItem>
                      <MenuItem value="Nagpur">Nagpur</MenuItem>
                      <MenuItem value="Nagpur">Goa</MenuItem>
                      <MenuItem value="Kolhapur">Kolhapur</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormGroup>
                <input type="password"
                // value={this.state.pass} onChange={this.handlePasswordChange}
                className="form-control" ref = {passwordRef} name = "password" placeholder="Password * " required/>
              </FormGroup>
              </Grid>

              <Grid item xs={12}>
              <Button
                    input type="submit"
                    fullWidth
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"

                    // className={classes.submit}
                >
                    Create account
                </Button>
                
              </Grid>

              <Grid item xs={12} xm={10}>
                <Divider spacing={2}/>
                <Box sx={ { textAlign:"center", textDecoration: "none", margin: "0px"}}>
                <Link href="#" variant="body2" style={{ textDecoration: "none" }}>
                    Already have an account?   <span style={{color: "coral", fontSize: "1.1rem"}}> Login </span>
                </Link>
                </Box>
              </Grid>

            </Grid>

            </Form>


       </div>

        </Box>

        </Modal>

    </div>
  );
}
