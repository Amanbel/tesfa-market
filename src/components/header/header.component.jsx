import React, { useState } from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import MENU from "../../assets/menu(1).png"

function Header({ currentUser, hidden }) {
  const [sideBar, setSideBar] = useState('hide')

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <img className="logo" src={Logo} />
      </Link>
      <div className="side-bar" style={sideBar == "show" ? {display: "flex"} : {display: "none"}}>
        <span onClick={()=>{setSideBar("hide")}}>&#x2715;</span>
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        {currentUser ? <CartIcon /> : null}
      </div>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        {currentUser ? <CartIcon /> : null}
      </div>
      <img className="menu" src={MENU} alt="menu" onClick={()=>{setSideBar("show")}}/>
      {currentUser && !hidden && <CartDropdown />}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
