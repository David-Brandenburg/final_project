import { useEffect, useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss';

function App() {
  return (
    <>
			<Navbar />
			<ToastContainer
				autoClose={3000}
				theme="dark"
				pauseOnHover={false}
				pauseOnFocusLoss={false}
				newestOnTop
			/>
			<main>
				<Routes>
					<Route path='/' element={<HomePage /> } />
					{/* more routes here */}
					<Route path='*' element={<ErrorPage /> } />
				</Routes>
			</main>
			<Footer />
    </>
  );
}

export default App;