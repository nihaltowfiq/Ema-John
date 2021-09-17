import { Redirect, Route } from 'react-router-dom';
import { useAuthCtx } from '../../store';

const PrivateRoute = ({ children, ...rest }) => {
	const [loggedInUser] = useAuthCtx();
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
