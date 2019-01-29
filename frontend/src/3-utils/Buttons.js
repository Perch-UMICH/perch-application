// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import colors from '../0-base/colors'

export function Button ({ children, onClick }) {
  return (
    <div onClick={onClick} css={button}>
      {children}
    </div>
  )
}

export function BigButton ({ children, onClick }) {
  return (
    <div onClick={onClick} css={bigButton}>
      {children}
    </div>
  )
}

export function MassiveButton ({ children, onClick }) {
  return (
    <div onClick={onClick} css={massiveButton}>
      {children}
    </div>
  )
}

const button = css`
  background-color: ${colors.primary};
  color: white;
  cursor: pointer;
  display: inline-block;
  margin-right: 1em;
  padding: 1em;
  &:hover {
    background-color: ${colors.active};
  }
  transition: 0.2s;
`

const bigButton = css`
  ${button}
  font-size: 30px;
`

const massiveButton = css`
  ${button}
  font-size: 60px;
`