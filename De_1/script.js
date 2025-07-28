
const btnAdd     = document.getElementById('btnAdd');
const modalEl    = document.getElementById('addEmployeeModal');
const thongBaoEl = document.getElementById('ThongBao');
const form       = modalEl.querySelector('form');
const tbody      = document.querySelector('table tbody');

  
function showAlert(message, type = 'danger') {
    thongBaoEl.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
  }

function resetForm() {
    form.reset();
    thongBaoEl.innerHTML = '';
}

  
btnAdd.addEventListener('click', function() {
    const nameVal    = document.getElementById('employeeName').value.trim();
    const emailVal   = document.getElementById('employeeEmail').value.trim();
    const addrVal    = document.getElementById('employeeAddress').value.trim();
    const phoneVal   = document.getElementById('employeePhone').value.trim();

    if (!nameVal || !emailVal || !addrVal || !phoneVal) {
      showAlert('Vui lòng điền đầy đủ tất cả các trường.');
      return;
    }
    
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phoneVal)) {
      showAlert('Số điện thoại phải đúng 10 chữ số, bắt đầu bằng "0".');
      return;
    }

    const regexEmail = /^\S+@\S+\.\S+$/;
    if (!regexEmail.test(emailVal)) {
      showAlert('Email không hợp lệ!');
      return;
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><input type="checkbox"></td>
      <td>${nameVal}</td>
      <td>${emailVal}</td>
      <td>${addrVal}</td>
      <td>${phoneVal}</td>
      <td>
        <a href="#" class="text-warning me-2"><i class="fas fa-pencil-alt"></i></a>
        <a href="#" class="text-danger"><i class="fas fa-trash-alt"></i></a>
      </td>
    `;
    tbody.appendChild(newRow);

    showAlert('Thêm nhân viên thành công!', 'success');

    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();
      resetForm();
    }, 1000);
});


modalEl.addEventListener('hidden.bs.modal', resetForm);
