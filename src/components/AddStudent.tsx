import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { StudentResponse } from '../model/StudentResponse';
import CustomAlert from './CustomAlert';
import { StudentData } from '../model/StudentData';

const AddStudent = () => {
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [variant, setVariant] = useState('');
	const [message, setMessage] = useState('');
	const [show, setShow] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const reqestData: StudentData = {
			name: name,
			address: address,
		};

		axios.post('http://localhost:8000/api/v1/student/', reqestData)
			.then((response: AxiosResponse<StudentResponse>) => {
				const studentResponse = response.data;
				console.log(studentResponse);
				setVariant('success');
				setMessage(
					`Successfully added to database with id : ${studentResponse.id}`
				);
				setShow(true);
			})
			.catch((error: AxiosError) => {
				console.log(error);
				setVariant('danger');
				setMessage(`${error.message}`);
				setShow(true);
			});
	};
	return (
		<>
			<CustomAlert
				variant={variant}
				message={message}
				show={show}
			/>
			<Card className='mt-1'>
				<Card.Header className='text-center'>
					<h1>Add Student</h1>
				</Card.Header>
				<Card.Body>
					<Form onSubmit={(e) => handleSubmit(e)}>
						<Form.Group
							className='mb-3'
							controlId='formBasicName'>
							<Form.Label>Student Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter name'
								onChange={(e) =>
									setName(e.target.value)
								}
							/>
						</Form.Group>

						<Form.Group
							className='mb-3'
							controlId='formBasicAddress'>
							<Form.Label>Address</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter address'
								onChange={(e) =>
									setAddress(e.target.value)
								}
							/>
						</Form.Group>

						<Button
							variant='primary'
							type='submit'>
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</>
	);
};

export default AddStudent;
