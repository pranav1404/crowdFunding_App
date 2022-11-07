import React from 'react'
import Header from './Header'
import { Container } from 'semantic-ui-react'
import Head from 'next/head'

const Layout = (props) => {
  return (
    <Container>
    <Header/>
        {props.children}
    <h1>Footer</h1>
    </Container>
  )
}

export default Layout;