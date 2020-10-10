import React from 'react';

import Navbar from './Components/Navbar.jsx';
import Routes from './Components/Routes.jsx';
import DashBoard from './Components/DashBoard';

import './App.css';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes />
			{/* <DashBoard/> */}
		</div>
	);
}

export default App;
