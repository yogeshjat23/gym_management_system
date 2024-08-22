
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentList.css'; 

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students/all');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (rollNo) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${rollNo}`);
     
      setStudents(students.filter(student => student.rollNo !== rollNo));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="student-list-container">
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Hostel</th>
            <th>Year</th>
            <th>Slot</th>
            <th>Count</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNo}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>{student.hostel}</td>
              <td>{student.year}</td>
              <td>{student.slot}</td>
              <td>{student.count}</td>
              <td>
                <button onClick={() => handleDelete(student.rollNo)}>Delete</button> 
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="7">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
