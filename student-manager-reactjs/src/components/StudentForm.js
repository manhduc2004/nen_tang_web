import React, { useState, useEffect } from 'react';

const initialForm = {
  id: '',
  name: '',
  email: '',
  gender: '',
  dob: '',
  age: ''
};

function StudentForm({ onSubmit, editingStudent, onCancel }) {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingStudent) {
        setForm(editingStudent);
        } else {
        setForm(initialForm);
        }
}, [editingStudent]);

const validate = () => {
    const newErrors = {};
    if (!form.id) newErrors.id = 'Mã SV bắt buộc';
    if (!form.name) newErrors.name = 'Họ tên bắt buộc';
    if (!form.email) newErrors.email = 'Email bắt buộc';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Email không hợp lệ';
    if (!form.gender) newErrors.gender = 'Giới tính bắt buộc';
    if (!form.dob) newErrors.dob = 'Ngày sinh bắt buộc';
    if (!form.age) newErrors.age = 'Tuổi bắt buộc';
    else if (form.age < 0) newErrors.age = 'Tuổi phải lớn hơn 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
};

const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
      setForm(initialForm);
      setErrors({});
    }
};

return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
            <label className="form-label">Mã SV</label>
            <input type="text" className={`form-control ${errors.id ? 'is-invalid' : ''}`} name="id" value={form.id} onChange={handleChange} disabled={!!editingStudent} />
            {errors.id && <div className="invalid-feedback">{errors.id}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Họ và Tên</label>
            <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" value={form.name} onChange={handleChange} />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={form.email} onChange={handleChange} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Giới tính</label>
            <select className={`form-select ${errors.gender ? 'is-invalid' : ''}`} name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </select>
            {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Ngày sinh</label>
            <input type="date" className={`form-control ${errors.dob ? 'is-invalid' : ''}`} name="dob" value={form.dob} onChange={handleChange} />
            {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Tuổi</label>
            <input type="number" className={`form-control ${errors.age ? 'is-invalid' : ''}`} name="age" value={form.age} onChange={handleChange} />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>
        <button type="submit" className="btn btn-primary w-100">{editingStudent ? 'Cập nhật' : 'Lưu'}</button>
        {editingStudent && <button type="button" className="btn btn-secondary w-100 mt-2" onClick={onCancel}>Huỷ</button>}
    </form>
  );
}

export default StudentForm;
