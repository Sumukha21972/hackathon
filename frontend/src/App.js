import React, { useState } from 'react'
import Login from './components/Login'
import SchemaCreator from './components/SchemaCreator'
import IssueCredential from './components/IssueCredential'
import RevocationPanel from './components/RevocationPanel'
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App(){
  const [token, setToken] = useState(null)

  if(!token) return <Login onLogin={setToken} />

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand href="#">Issuer Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#" onClick={()=>alert('Profile coming soon')}>Profile</Nav.Link>
              <Nav.Link href="#" onClick={()=>{ setToken(null); }}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row className="gy-4">
          <Col lg={5}>
            <div className="p-3 bg-white rounded shadow-sm">
              <h5 className="mb-3">Create Schema</h5>
              <SchemaCreator />
            </div>
          </Col>

          <Col lg={7}>
            <div className="p-3 bg-white rounded shadow-sm mb-3">
              <h5 className="mb-3">Issue Credential</h5>
              <IssueCredential />
            </div>

            <div className="p-3 bg-white rounded shadow-sm">
              <h5 className="mb-3">Revocation Panel</h5>
              <RevocationPanel />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
