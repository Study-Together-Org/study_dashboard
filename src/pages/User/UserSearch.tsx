import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import { useHistory } from 'react-router'
import fetch from 'cross-fetch'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import UserTable from './UserTable'

interface User {
  username: string
  user_id: string
}

const UserSearch = () => {
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])

  const [value, setValue] = useState()

  const [loading, setLoading] = useState(open && options.length === 0)

  /* useEffect(() => {

   *   const delayDebounceFn = setTimeout(async () => {
   *     const response = await fetch(`/users?match=${inputValue}`)
   *     const users = await response.json()
   *     setOptions(users)
   *     setLoading(false)
   *   }, 1000)

   *   return () => clearTimeout(delayDebounceFn)
   * }, [inputValue])
   */
  // React.useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleSearch = () => {
    setLoading(true)
    axios
      .get(`/users`, {
        params: {
          match: value,
        },
      })
      .then(response => {
        setOptions(response.data)
        setLoading(false)
      })
  }
  return (
    <Container maxWidth="xs" style={{ marginTop: '150px' }}>
      <TextField
        id="outlined-basic"
        label="Search for a user..."
        variant="outlined"
        value={value}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: '50px' }}
        InputProps={{
          endAdornment: (
            // @ts-ignore
            <InputAdornment>
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <UserTable leaderboardData={options} height={500} />
    </Container>
  )
  /* return (
   *   <Autocomplete
   *     id="asynchronous-demo"
   *     value={value}
   *     onChange={(event, newValue: User | null) => {
   *       if (newValue) {
   *         history.push(`users/${newValue.user_id}`)
   *         setValue(newValue)
   *       }
   *     }}
   *     inputValue={inputValue}
   *     onInputChange={(event, newInputValue) => {
   *       setInputValue(newInputValue)
   *     }}
   *     style={{ width: 300 }}
   *     open={open}
   *     onOpen={() => {
   *       setOpen(true)
   *     }}
   *     onClose={() => {
   *       setOpen(false)
   *     }}
   *     getOptionSelected={(option: User, nvalue: User) =>
   *       option.user_id === nvalue.user_id
   *     }
   *     getOptionLabel={(option: User) => option.username}
   *     options={options}
   *     loading={loading}
   *     renderInput={params => (
   *       <TextField
   *         {...params}
   *         label="Username"
   *         variant="outlined"
   *         InputProps={{
   *           ...params.InputProps,
   *           endAdornment: (
   *             <>
   *               {loading ? (
   *                 <CircularProgress color="inherit" size={20} />
   *               ) : null}
   *               {params.InputProps.endAdornment}
   *             </>
   *           ),
   *         }}
   *       />
   *     )}
   *   />
   * ) */
}

export default UserSearch
