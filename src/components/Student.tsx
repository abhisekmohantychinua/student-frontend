import React, { useState } from 'react';
import { StudentResponse } from '../model/StudentResponse';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FaUserEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import CustomAlert from './CustomAlert';
import { RxCross2 } from 'react-icons/rx/';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { StudentData } from '../model/StudentData';

interface Props {
	index: number;
	student: StudentResponse;
}

const Student = ({ index, student }: Props) => {
	const [name, setName] = useState<string>(student.name);
	const [address, setAddress] = useState<string>(student.address);
	const [variant, setVariant] = useState('');
	const [message, setMessage] = useState('');
	const [show, setShow] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const handleDelete = (id: number): void => {
		axios.delete(`http://localhost:8000/api/v1/student/${id}`)
			.then((response: AxiosResponse<StudentResponse>) => {
				setVariant('success');
				setMessage(`Student deleted successfully from database...`);
				setShow(true);
			})
			.catch((error: AxiosError) => {
				console.log(error);
				setVariant('danger');
				setMessage('Some problem occured...');
				setShow(true);
			});
	};
	const handleEdit = (): void => {
		setEditMode(!editMode);
	};

	const handleSubmit = (e: React.FormEvent, id: number): void => {
		e.preventDefault();
		const requestData: StudentData = {
			name: name,
			address: address,
		};
		axios.put(`http://localhost:8000/api/v1/student/${id}`, requestData)
			.then((response: AxiosResponse<StudentResponse>) => {
				const studentResponse = response.data;
				console.log(studentResponse);
				setShow(true);
				setMessage('Updated successfully');
				setVariant('success');
				setEditMode(false);
			})
			.catch((error: AxiosError) => {
				setShow(true);
				setMessage(error.message);
				setVariant('danger');
				setEditMode(false);
			});
	};

	return (
		<>
			<Col md={{ span: 10, offset: 1 }}>
				<Card
					key={index}
					className='mt-2'>
					<CustomAlert
						variant={variant}
						message={message}
						show={show}
					/>
					<Card.Body>
						{editMode ? (
							<Form
								onSubmit={(e) =>
									handleSubmit(e, student.id)
								}>
								<Form.Group className='mt-1'>
									<Form.Label>Student Id</Form.Label>
									<Form.Control
										type='text'
										value={student.id.toString()}
										disabled></Form.Control>
								</Form.Group>
								<Form.Group className='mt-1'>
									<Form.Label>
										Student Name
									</Form.Label>
									<Form.Control
										type='text'
										onChange={(e) =>
											setName(e.target.value)
										}></Form.Control>
								</Form.Group>
								<Form.Group className='mt-1'>
									<Form.Label>
										Student address
									</Form.Label>
									<Form.Control
										type='text'
										onChange={(e) =>
											setAddress(
												e.target.value
											)
										}></Form.Control>
									<Row className='mt-2'>
										<Col className='text-center'>
											<Button
												variant='danger'
												onClick={() =>
													handleEdit()
												}>
												<RxCross2 />
											</Button>
										</Col>
										<Col className='text-center'>
											<Button
												variant='danger'
												onClick={() =>
													handleDelete(
														student.id
													)
												}>
												<MdDeleteForever />
											</Button>
										</Col>
										{editMode && (
											<Col className='text-center'>
												<Button
													variant='success'
													type='submit'>
													<TiTick />
												</Button>
											</Col>
										)}
									</Row>
								</Form.Group>
							</Form>
						) : (
							<Form>
								<Form.Group className='mt-1'>
									<Form.Label>Student Id</Form.Label>
									<Form.Control
										type='text'
										value={student.id.toString()}
										disabled></Form.Control>
								</Form.Group>
								<Form.Group className='mt-1'>
									<Form.Label>
										Student Name
									</Form.Label>
									<Form.Control
										type='text'
										value={student.name}
										onChange={(e) =>
											setName(e.target.value)
										}
										disabled></Form.Control>
								</Form.Group>
								<Form.Group className='mt-1'>
									<Form.Label>
										Student Address
									</Form.Label>
									<Form.Control
										type='text'
										value={student.address}
										onChange={(e) =>
											setAddress(
												e.target.value
											)
										}
										disabled></Form.Control>
									<Row className='mt-2'>
										<Col className='text-center'>
											<Button
												variant='primary'
												onClick={() =>
													handleEdit()
												}>
												<FaUserEdit />
											</Button>
										</Col>
										<Col className='text-center'>
											<Button
												variant='danger'
												onClick={() =>
													handleDelete(
														student.id
													)
												}>
												<MdDeleteForever />
											</Button>
										</Col>
									</Row>
								</Form.Group>
							</Form>
						)}
					</Card.Body>
				</Card>
			</Col>
		</>
	);
};

export default Student;
