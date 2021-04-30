import React, { useState, useEffect } from 'react'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useHistory } from 'react-router'

interface IDataTableProps {
  /**
   * List of columns in DataTable in order
   * name is the heading to display, and key is the matching
   * value to find in each data object
   * e.g.
      [
        { label: 'ID', key: 'id' },
        { label: 'First Name', key: 'firstName' },
        { label: 'Last Name', key: 'lastName' },
        { label: 'Email', key: 'email' },
        { label: 'Role', key: 'role' },
      ]
   */
  columns: {
    label: string
    key: string
    numeric?: boolean
    disablePadding?: boolean
  }[]

  /**
   * Each row to be displayed, must contain every key from columns
   * e.g.
      [
        { firstName: 'Logan', lastName: 'Ralston', email: 'logan@sweaterplanet.com', role: 'Admin', id: '10001' },
        { firstName: 'Dwight', lastName: 'Schrute', email: 'dwight@sweaterplanet.com', role: 'Admin', id: '10002' },
        { firstName: 'Fake', lastName: 'Person', email: 'test@gmaile.com', role: 'User', id: '10003' }
      ]
   */
  data: object[]

  /**
   * Normally cell values are rendered as text, but can provide
   * functions that render each column customly
   * e.g. { firstName: (value) => <span>value.toUpperCase()</span> } would capitalize
   * every firstName
   */
  customRenders?(row: object, key: string): string

  /**
   * Function that calculates view link from each row in data
   * Leave undefined to display no rows
   * e.g. row => `/accounts/${row.id}`
   */
  viewLink?(row: object): string

  /**
   * The height for the table container
   */
  height: number
}

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow style={{ height: '50px' }}>
        {props.columns.map(column => (
          <TableCell
            key={column.label}
            align={column.numeric ? 'right' : 'left'}
            padding={column.disablePadding ? 'none' : 'default'}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
  },
  table: {},
}))

const SimpleTable = (props: IDataTableProps) => {
  const history = useHistory()
  const classes = useStyles()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  if (loading) return <p>Loading...{loading}</p>
  if (error) return <p>Error :( {error.toString()}</p>

  return (
    <Paper className={classes.paper}>
      <TableContainer style={{ height: props.height, overflow: 'hidden' }}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <EnhancedTableHead columns={props.columns} />
          <TableBody>
            {props.data &&
              props.data.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    onClick={() => {
                      props.viewLink && history.push(props.viewLink(row))
                    }}
                    style={{
                      height: (props.height - 50) / props.data.length,
                      cursor: props.viewLink ? 'pointer' : 'default',
                    }}
                  >
                    {props.columns.map((column, index) => (
                      <TableCell
                        key={index}
                        align={column.numeric ? 'right' : 'left'}
                        padding={column.disablePadding ? 'none' : 'default'}
                        style={{
                          border:
                            index == props.data.length - 1 ? 'none' : 'default',
                        }}
                      >
                        {props.customRenders
                          ? props.customRenders(row, column.key)
                          : row[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default SimpleTable
