import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Route, Link, Switch } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header>
        <Navbar className="header">
          <NavbarBrand href="/">Lost And Found Lit</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/travisjslagle">Github</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </header>
    );
  }
}

export default Header;
