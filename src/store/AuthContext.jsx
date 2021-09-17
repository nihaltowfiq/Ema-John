import { createContext, useContext, useState } from 'react';

const AuthCtx = createContext();

export const useAuthCtx = () => useContext(AuthCtx);

const AuthCtxProvider = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState({});

	return <AuthCtx.Provider value={[loggedInUser, setLoggedInUser]}>{children}</AuthCtx.Provider>;
};

export default AuthCtxProvider;
