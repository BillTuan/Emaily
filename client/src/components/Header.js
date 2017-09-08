import React, { Component } from "react";

class Header extends Component {
  state = {};
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="brand-logo">Emaily</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a>Login With Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
