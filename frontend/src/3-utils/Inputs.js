import React from 'react'
import './Inputs.scss'

/*
  If wrapped around other inputs, converts them to evenly measured inputs on same line
  Without InputRow, each input is display block
  Max two Items
  Optional
*/
export function InputRow (props) {
  return <div className='input-row'>{props.children}</div>
}

/*
  Updates the parent state with the name as the key
  Handles Input and Label
*/
export function TextInput (props) {
  return (
    <div className='input'>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={e => {
          if (props.updateParent) props.updateParent(props.name, e.target.value)
          if (props.onChange) props.onChange(e)
        }}
        onKeyPress={({ key }) => {
          if (key === 'Enter' && props.onEnter) props.onEnter()
        }}
      />
    </div>
  )
}

export function RadioInput (props) {
  return (
    <div className='input'>
      <input
        required
        type='radio'
        name={props.name}
        onChange={e => props.updateParent(props.name, props.value)}
      />
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  )
}

export function SubmitInput (props) {
  return (
    <div className='input' {...props}>
      <input type='submit' value={props.children} />
    </div>
  )
}

export function CheckboxInput (props) {
  return (
    <p className='checkbox'>
      <div className='checkbox-container'>
        <input type='checkbox' onClick={props.onClick} />
        <span class='checkmark' />
      </div>
      <div className='label'>{props.children}</div>
    </p>
  )
}

export function TextArea(props) {
  return (
    <div className='input'>
      <textarea className={`input ${props.size || 'small'}`} {...props}>
        
      </textarea>
    </div>
  )
}
