import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/Review/Review';
import Shipment from './components/Shipment/Shipment';
import Shop from './components/Shop/Shop';

function App() {
	return (
		<Fragment>
			<Header />
			<Switch>
				<Route path="/shop" component={Shop} />
				<Route path="/review" component={Review} />
				<PrivateRoute path="/inventory">
					<Inventory />
				</PrivateRoute>
				<PrivateRoute path="/shipment">
					<Shipment />
				</PrivateRoute>
				<Route path="/login" component={Login} />
				<Route exact path="/" component={Shop} />
				<Route path="/product/:productKey" component={ProductDetail} />
				<Route path="*" component={NotFound} />
			</Switch>
		</Fragment>
	);
}

export default App;
