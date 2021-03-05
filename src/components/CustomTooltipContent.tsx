import React from 'react'

// @ts-ignore
const CustomTooltipContent = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    console.log(payload)
    return (
      <div
        className="recharts-default-tooltip"
        style={{
          margin: '0px',
          padding: '10px',
          backgroundColor: 'rgb(20, 20, 20)',
          border: '1px solid rgb(204, 204, 204)',
          whiteSpace: 'nowrap',
        }}
      >
        <p className="recharts-tooltip-label" style={{ margin: '0px' }}>
          {label}
        </p>
        <ul
          className="recharts-tooltip-item-list"
          style={{ padding: '0px', margin: '0px' }}
        >
          <li
            className="recharts-tooltip-item"
            style={{
              display: 'block',
              paddingTop: '4px',
              paddingBottom: '4px',
              color: 'rgb(136, 132, 216)',
            }}
          >
            <span className="recharts-tooltip-item-name">
              {payload[0].name}
            </span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">
              {payload[0].value}
            </span>
            <span className="recharts-tooltip-item-unit"> </span>
          </li>
          <li
            className="recharts-tooltip-item"
            style={{
              display: 'block',
              paddingTop: '4px',
              paddingBottom: '4px',
              color: 'rgb(130, 202, 157)',
            }}
          >
            <span className="recharts-tooltip-item-name">rank</span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">
              {payload[0].payload.rank}
            </span>
            <span className="recharts-tooltip-item-unit"> </span>
          </li>
        </ul>
      </div>
    )
  }

  return null
}

export default CustomTooltipContent
