import React from 'react';

function StudentTable({ students, onEdit, onDelete }) {
    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        <th>STT</th>
                        <th>Mã SV</th>
                        <th>Họ Tên</th>
                        <th>Email</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Sửa</th>
                        <th>Xoá</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length === 0 ? (
                        <tr><td colSpan="8" className="text-center">Không có sinh viên nào</td></tr>
                        ) : (
                        students.map((sv, idx) => (
                        <tr key={sv.id}>
                            <td>{idx + 1}</td>
                            <td>{sv.id}</td>
                            <td>{sv.name}</td>
                            <td>{sv.email}</td>
                            <td>{sv.gender}</td>
                            <td>{sv.dob ? new Date(sv.dob).toLocaleDateString('vi-VN') : ''}</td>
                            <td>
                                <button className="btn btn-sm btn-outline-primary me-1" onClick={() => onEdit(sv)}>Sửa</button>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(sv.id)}>Xoá</button>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default StudentTable;
