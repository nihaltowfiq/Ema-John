import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { useAuthCtx } from '../../store';
import './Header.css';

const Header = () => {
	const [loggedInUser, setLoggedInUser] = useAuthCtx();
	return (
		<div className="header">
			<Link to="/">
				<img src={logo} alt="" />
			</Link>
			<ul>
				<li>
					<Link to="/shop">Shop</Link>
				</li>
				<li>
					<Link to="/review">Order Review</Link>
				</li>
				<li>
					<Link to="/inventory">Manage Inventory</Link>
				</li>
				<span style={{ color: 'goldenrod' }}>{loggedInUser.name}</span>
				{loggedInUser.email || sessionStorage.getItem('token') ? (
					<li>
						<Link to="" onClick={() => setLoggedInUser({})}>
							Sign Out
						</Link>
					</li>
				) : (
					<li>
						<Link to="/login">Sign In</Link>
					</li>
				)}
			</ul>
		</div>
	);
};

export default Header;
