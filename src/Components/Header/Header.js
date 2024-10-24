import { Authcontext } from "../../store/FirebaseContext";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
function Header() {
  const { user } = useContext(Authcontext);
  const navigate =useNavigate()
  
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        
        navigate("/login")
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <span>Welcome {user?.displayName}</span>
          ) : (
            <span>
              <Link to="/login">Login</Link>
            </span>
          )}
          <hr />
          {user && <button onClick={handleLogout}>Logout</button>}
        </div>
       <Link to="/create">
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
