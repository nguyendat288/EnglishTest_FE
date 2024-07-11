import { LoadingButton } from '@mui/lab'
import { Box,  Grid, IconButton, Stack, TextField, Typography } from '@mui/material'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authApi from '../../services/authApi'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify'
const Register = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleClickShowRePassword = () => {
    setShowRePassword(!showRePassword)
  }
  const handleSubmit = () => {
        if(password=== rePassword){
            var data ={
                userName : userName,
                password : password,
                email : email,
               }
        }else{
            toast.error("Password and re-password not match")
        }
   authApi.register(data,navigate);
  }

  return (
    <>
      <Box sx={{ mt: '30px', textAlign: 'center' }}>
        <Typography sx={{ fontSize: '50px', fontWeight: '700' }}>Register</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          height: '100vh'
        }}>
        <Grid container sx={{ flex: '1 1 auto' }}>
          {/* Left Section */}
          <Grid
            xs={12}
            lg={6}
            sx={{
              backgroundColor: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
            item>
            <Box
              sx={{
                backgroundColor: 'background.paper',
                flex: '1 1 auto',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}>
              <Box
                sx={{
                  maxWidth: 550,
                  px: 3,
                  py: '100px',
                  width: '100%'
                }}>
                <div>

                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Username"
                      required
                      onChange={(e) => setUserName(e.target.value)}
                    />
                   
                    <TextField
                      fullWidth
                      label="Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                     <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={handleClickShowPassword}
                            size="large">
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        )
                      }}
                    />
                     <TextField
                      fullWidth
                      label="Re-Password"
                      type={showRePassword ? 'text' : 'password'}
                      required
                      onChange={(e) => setRePassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={handleClickShowRePassword}
                            size="large">
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        )
                      }}
                    />
                    <LoadingButton
                    fullWidth
                    size="small"
                    sx={{
                      mt: 2,
                      bgcolor: 'rgb(99, 102, 241)',
                      p: '11px 24px',
                      borderRadius: '12px'
                    }}
                    type="submit"
                    variant="contained"
                    onClick={(e) => handleSubmit()}
                  >
                    Submit
                  </LoadingButton>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" mt={1}>

                    <Typography
                      variant="body1"
                      component="span"
                      onClick={() => {
                        navigate('/login')
                      }}
                      style={{
                        marginTop: '10px',
                        cursor: 'pointer',
                        color: 'rgb(99, 102, 241)'
                      }}>
                      Back
                    </Typography>
                  </Stack>
                </div>
              </Box>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid
              xs={12}
              lg={6}
              sx={{
                alignItems: 'center',
                background: 'radial-gradient(circle, rgba(9,50,121,1) 19%, rgba(0,212,255,1) 100%)',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                '& img': {
                  maxWidth: '100%'
                }
              }}
              item></Grid>
          </Grid>
      </Box>

    </>
  )
}

export default Register
