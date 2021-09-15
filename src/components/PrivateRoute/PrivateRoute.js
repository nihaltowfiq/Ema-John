import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
	const [loggedInUser] = useContext(UserContext);
	return (
		<div>
			<Route
				{...rest}
				render={({ location }) =>
					loggedInUser.email || sessionStorage.getItem('token') ? (
						children
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: location },
							}}
						/>
					)
				}
			/>
		</div>
	);
};

export default PrivateRoute;
