import React from 'react'; 

import MainContainer from '../MainContainer';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const MainPage = () => {
	return (
		<div>
			<Header />
			<Navbar />
			<MainContainer />
			<Footer />
		</div>
		)
}

export default MainPage;