import { useEffect, useState } from 'react';
import { StudentResponse } from '../model/StudentResponse';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Row } from 'react-bootstrap';
import CustomAlert from './CustomAlert';
import Student from './Student';

const StudentList = () => {
	const [students, setStudents] = useState<Array<StudentResponse>>([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [isError, setIsError] = useState(false);
	const getStudents = (): void => {
		axios.get('http://localhost:8000/api/v1/student/')
			.then((response: AxiosResponse<Array<StudentResponse>>) => {
				setStudents(response.data);
			})
			.catch((error: AxiosError) => {
				console.log(error.message);
				setIsError(true);
				setErrorMessage(
					'Unable to fetch Students from database...'
				);
			});
	};
	useEffect(() => {
		getStudents();
	}, []);

	return (
		<>
			<Row className='mt-3'>
				{isError ? (
					<CustomAlert
						variant={'danger'}
						message={errorMessage}
						show={true}
					/>
				) : (
					students.map((student, index) => (
						<Student
							key={student.id}
							index={index}
							student={student}
						/>
					))
				)}
			</Row>
		</>
	);
};

export default StudentList;
