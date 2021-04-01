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
import SimpleTable from '../../components/SimpleTable'

interface User {
  username: string
  user_id: string
}

const UserSearch = () => {
  const history = useHistory()
  // options stores the results of the user search query
  const [options, setOptions] = useState([])

  // value is the string currently in the search bar
  const [value, setValue] = useState()

  // loading indicates whether we are waiting for a response from the user search query
  const [loading, setLoading] = useState(false)

  // for handling changes to the controlled textinput component
  const handleChange = event => {
    setValue(event.target.value)
  }

  // for dispatching a user search query
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

  // triggers the user search query when pressing enter on the textfield
  const keyPress = e => {
    if (e.keyCode == 13) {
      handleSearch()
    }
  }

  return (
    <Container maxWidth="xs" style={{ marginTop: '150px' }}>
      {/* The search box text field */}
      <TextField
        id="outlined-basic"
        label="Search for a user..."
        variant="outlined"
        value={value}
        onKeyDown={keyPress}
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
      {/* The user table for displaying the results */}
      <SimpleTable
        columns={[
          { label: 'Username', key: 'username' },
          { label: 'Tag', key: 'tag' },
        ]}
        data={options}
        height={490}
        viewLink={row => `/users/${row['discord_user_id']}`}
      />
    </Container>
  )
}

export default UserSearch
