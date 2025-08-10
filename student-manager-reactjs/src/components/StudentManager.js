import React, { useState } from 'react';
import studentsData from '../data';
import StudentForm from './StudentForm';
import StudentTable from './StudentTable';

function StudentManager() {
    const [students, setStudents] = useState(studentsData);
    const [editingStudent, setEditingStudent] = useState(null);

    const handleAddOrUpdate = (student) => {
        if (editingStudent) {
            setStudents(students.map(sv => sv.id === student.id ? student : sv));
            setEditingStudent(null);
        } else {
            if (students.find(sv => sv.id === student.id)) {
                alert('Mã SV đã tồn tại!');
                return;
            }
            if (students.length >= 5) {
                alert('Chỉ tối đa 5 sinh viên!');
                return;
            }
            setStudents([...students, student]);
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
    };

    const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xoá sinh viên này?')) {
            setStudents(students.filter(sv => sv.id !== id));
            if (editingStudent && editingStudent.id === id) setEditingStudent(null);
        }
    };

    const handleCancel = () => {
        setEditingStudent(null);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12 col-md-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">{editingStudent ? 'Sửa Sinh Viên' : 'Thêm Sinh Viên'}</h5>
                            <StudentForm onSubmit={handleAddOrUpdate} editingStudent={editingStudent} onCancel={handleCancel} />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Danh Sách Sinh Viên</h5>
                            <StudentTable students={students} onEdit={handleEdit} onDelete={handleDelete} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default StudentManager;
