import React from 'react'
import { Toolbar } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { AppBar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const HeaderNav = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <img style={{ height: '30px' }} src="/logo.svg" />
      </Toolbar>
    </AppBar>
  )
}

export default HeaderNav
