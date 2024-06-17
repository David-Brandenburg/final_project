import React, { useEffect, useState } from 'react';
import './admintable.scss';
import { toast } from 'react-toastify';

const AdminTable = ({ adminTab }) => {
	const [data, setData] = useState(null)

	const fetchData = async (e) => {
		try {
			const url = `http://localhost:3001/${adminTab}`
			const response = await fetch(url, {method: 'GET'})
			if (!response.ok) {
				const data = await response.json();
				toast.error(data.message)
				throw new Error(data.message)
			} else {
				const data = await response.json();
				setData(data)
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
		console.log(adminTab)
	}, [adminTab])

	useEffect(() => {
		console.log(data)
	}, [data])

	return (
		<div className='adminTable-wrapper'>
			<table className='adminTable'>
				<thead>
				<tr>
					{data && Object.keys(data[0])
						.filter((key) =>
							key !== 'hashpw' &&
							key !== 'profilePic' &&
							key !== 'thumbnail' &&
							key !== 'pageThumbnail' &&
							key !== 'platforms' &&
							key !== 'genres' &&
							key !== 'logo' &&
							key !== 'pics' &&
							key !== 'tags' &&
							key !== 'functions' &&
							key !== 'price' &&
							key !== 'discount' &&
							key !== 'bgPic' &&
							key !== 'rating' &&
							key !== 'description'
						)
						.map((key) => (
							<th key={key}>{key}</th>
						))}
						<th>Edit / Delete</th>
					</tr>
				</thead>
				<tbody>
					{data && data.map((item, index) => (
						<tr key={index}>
							{Object.entries(item)
								.filter(([key]) =>
									key !== 'hashpw' &&
									key !== 'profilePic' &&
									key !== 'thumbnail' &&
									key !== 'pageThumbnail' &&
									key !== 'platforms' &&
									key !== 'genres' &&
									key !== 'logo' &&
									key !== 'pics' &&
									key !== 'tags' &&
									key !== 'functions' &&
									key !== 'price' &&
									key !== 'discount' &&
									key !== 'bgPic' &&
									key !== 'rating' &&
									key !== 'description'
								)
								.map(([key, value]) => {
									let displayValue = value;
									if (key === '_id') {
										displayValue = value.slice(0, 5) + '...';
									} else if (typeof value === 'boolean') {
										displayValue = value ? <i className="bi bi-check-circle" style={{color: 'limegreen'}}></i> : <i className="bi bi-x-circle" style={{color: 'red'}}></i>;
									}
									return (
										<td
											key={key}
											style={{color: typeof value === 'boolean' ? (value ? 'limegreen' : 'red') : 'unset',
															textAlign: typeof value === 'boolean' || key === '_id' || key === 'rating' ? 'center' : 'start',
															width:
																key === 'title'
																	? '450px'
																	: key === '_id'
																	? '60px'
																	: key === 'publisher'
																	? '250px'
																	: key === 'isAdmin'
																	? '70px'
																	: key === 'vorname'
																	? '100px'
																	: key === 'nachname'
																	? '100px'
																	: key === 'dlc'
																	? '40px'
																	: '100px',
										}}>
											{displayValue}
										</td>
									);
								})}
							<td style={{textAlign: 'center', width: '100px'}}><i className="bi bi-pencil-square"></i> &nbsp; | &nbsp; <i className="bi bi-trash3"></i></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default AdminTable;