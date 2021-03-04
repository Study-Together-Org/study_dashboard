import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import fetch from 'cross-fetch'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

interface User {
  username: string
  user_id: string
}

const UserSearch = ({ history }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])

  const [value, setValue] = useState({ username: '', user_id: '' })
  const [inputValue, setInputValue] = useState('')

  const [loading, setLoading] = useState(open && options.length === 0)

  useEffect(() => {
    if (inputValue.length < 1) {
      return () => null
    }

    const delayDebounceFn = setTimeout(async () => {
      const response = await fetch(`/users?match=${inputValue}`)
      const users = await response.json()
      setOptions(users)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [inputValue])

  // React.useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      value={value}
      onChange={(event, newValue: User | null) => {
        if (newValue) {
          history.push(`users/${newValue.user_id}`)
          setValue(newValue)
        }
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionSelected={(option: User, nvalue: User) =>
        option.user_id === nvalue.user_id
      }
      getOptionLabel={(option: User) => option.username}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Username"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}

export default withRouter(UserSearch)
