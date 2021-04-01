import React from 'react'

// @ts-ignore
const CustomTooltipContent = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="recharts-default-tooltip"
        style={{
          margin: '0px',
          padding: '10px',
          backgroundColor: 'white',
          whiteSpace: 'nowrap',
          borderRadius: 16,
          boxShadow:
            'rgba(0, 0, 0, 0.12) 0px 1px 2px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
        }}
      >
        <p
          className="recharts-tooltip-label"
          style={{ color: 'black', fontWeight: 500, margin: '0px' }}
        >
          {`Date: ${label}`}
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
            <span className="recharts-tooltip-item-name">Study Time</span>
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
              paddingBottom: '4px',
              color: 'rgb(136, 132, 216)',
            }}
          >
            <span className="recharts-tooltip-item-name">Rank</span>
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
