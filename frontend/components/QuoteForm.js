import React, { useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { createQuote, getNextId } from '../state/quotesSlice'

const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

const initialState = {
  authorName: '',
  quoteText: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload
      return { ...state, [name]: value }
    }
    case RESET_FORM:
      return { authorName: '', quoteText: '' }
    default:
      return state
  }
}

export default function TodoForm() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const dispatchRedux = useDispatch()

  const onChange = ({ target: { name, value } }) => {
    dispatch({ type: CHANGE_INPUT, payload: { name, value } })
  }
  const resetForm = () => {
    dispatch({ type: RESET_FORM })
  }
  const onNewQuote = evt => {
    evt.preventDefault()
    dispatchRedux(createQuote(state))
    resetForm()
  }

  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
      <h3>New Quote Form</h3>
      <label><span>Author:</span>
        <input
          type='text'
          name='authorName'
          placeholder='type author name'
          onChange={onChange}
          value={state.authorName}
        />
      </label>
      <label><span>Quote text:</span>
        <textarea
          type='text'
          name='quoteText'
          placeholder='type quote'
          onChange={onChange}
          value={state.quoteText}
        />
      </label>
      <label><span>Create quote:</span>
        <button
          role='submit'
          disabled={!state.authorName.trim() || !state.quoteText.trim()}
        >DO IT!</button>
      </label>
    </form>
  )
}
