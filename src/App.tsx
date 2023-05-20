// import logo from './logo.svg';
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';

const App = () => {
	const cdnLink: JSX.Element = (
		<link
			rel='stylesheet'
			href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'
			integrity='sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65'
			crossOrigin='anonymous'
		/>
	);
	return (
		<>
			{cdnLink}
			<Navbar
				bg='dark'
				variant='dark'>
				<Container>
					<Navbar.Brand href='#home'>Navbar</Navbar.Brand>
					<Nav className='me-auto'>
						<Nav.Link href='#add-student'>
							Add Student
						</Nav.Link>
						<Nav.Link href='#student-list'>
							Student List
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			<Container id='addd-student'>
				<AddStudent />
			</Container>
			<Container id='student-list'>
				<StudentList />
			</Container>
		</>
	);
};

export default App;
