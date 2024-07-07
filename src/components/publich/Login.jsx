import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import authApi from "../../services/authApi"
import { Box, Grid, IconButton, Stack, TextField, Typography } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from "@mui/lab"

const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const isLoading = useSelector((state) => state.auth.login?.isFetching)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword)
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      let data = {
        username: userName,
        password: password
      }
     await authApi.loginUser(data, dispatch, navigate);
    }
  
   
  
    const handleRegister = (e) => {
      navigate("/register")
    }
  
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            height: '100vh'
          }}>
          <Grid container sx={{ flex: '1 1 auto' }}>
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
                    <Stack spacing={1} sx={{ mb: 3 }}>
                      <Typography sx={{ fontSize: '35px', fontWeight: '700' }}>Login</Typography>
                    </Stack>
                    <form noValidate onSubmit={handleSubmit}>
                      <Stack spacing={3}>
                        <TextField
                          fullWidth
                          label="Username"
                          name="username"
                          type="username"
                          onChange={(e) => setUserName(e.target.value)}
                        />
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type={showPassword ? 'text' : 'password'}
                          id="password"
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
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" mt={1}>
  
                        <Typography
                          variant="body1"
                          component="span"
                          onClick={() => {
                            navigate('/reset-password')
                          }}
                          style={{
                            marginTop: '10px',
                            cursor: 'pointer',
                            color: 'rgb(99, 102, 241)'
                          }}>
                          Forgot password?
                        </Typography>
                      </Stack>
                      <LoadingButton
                        fullWidth
                        loading={isLoading}
                        size="large"
                        sx={{
                          mt: 2,
                          bgcolor: 'rgb(99, 102, 241)',
                          p: '11px 24px',
                          borderRadius: '12px'
                        }}
                        type="submit"
                        variant="contained">
                        Submit
                      </LoadingButton>
  
                      <LoadingButton
                        fullWidth
                        size="large"
                        sx={{
                          mt: 2,
                          bgcolor: 'rgb(99, 102, 241)',
                          p: '11px 24px',
                          borderRadius: '12px'
                        }}
                        onClick={(e) => handleRegister()}
                        variant="contained">
                        Register
                      </LoadingButton>
                    </form>
                  </div>
                </Box>
              </Box>
            </Grid>
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
  
  export default Login;