import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import '../assets/loader.css' // Todo - Convnert to styled-components

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const TimeoutWrapper = styled.div`
  color: red;
`

const ErrorWrapper = styled.div`
  color: red;
`

const Loading = props => {
  if (props.error) {
    return <ErrorWrapper>Error!</ErrorWrapper>
  } else if (props.timedOut) {
    return <TimeoutWrapper>Timed out. Please try again.</TimeoutWrapper>
  } else if (props.pastDelay) {
    return (
      <LoadingWrapper>
        <div className="loader" alt="Loading..." />
      </LoadingWrapper>
    )
  } else {
    return null
  }
}

Loading.propTypes = {
  error: propTypes.bool,
  timedOut: propTypes.bool,
  pastDelay: propTypes.bool
}

export default Loading
