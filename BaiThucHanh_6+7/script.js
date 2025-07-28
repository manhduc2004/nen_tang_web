const form     = document.getElementById('studentForm');
const tbody    = document.getElementById('studentTable');
const thongBao = document.getElementById('ThongBao');

function capNhatSTT() {
    const rows = tbody.querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
      rows[i].cells[0].innerText = i + 1;
    }
}

document.getElementById("btnThem").addEventListener("click", function(event) {
    event.preventDefault();
    alert("Nút Lưu đã được nhấn!");

    // Lấy dữ liệu trong form NGAY LÚC BẤM
    const maSV   = document.getElementById('svId').value.trim();
    const hoTen  = document.getElementById('svName').value.trim();
    const email  = document.getElementById('svEmail').value.trim();
    const tuoi   = document.getElementById('svAge').value.trim();

    if (!maSV || !hoTen || !email || !tuoi) {
        thongBao.innerHTML = '<div class="alert alert-warning">Vui lòng nhập đầy đủ thông tin.</div>';
        return;
    }

    if (!maSV || !hoTen || !email || !tuoi) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (selectedRow) {
      selectedRow.cells[1].innerText = maSV;
      selectedRow.cells[2].innerText = hoTen;
      selectedRow.cells[3].innerText = email;
      selectedRow.cells[4].innerText = tuoi;
      thongBao.innerText = 'Cập nhật sinh viên thành công!';
      setTimeout(() => { thongBao.innerText = ''; }, 3000);
      form.reset();
      selectedRow = null;
      this.innerText = 'Lưu';
      capNhatSTT();
      return;
    }
    
    const regexEmail = /^\S+@\S+\.\S+$/;
    if (!regexEmail.test(email)) {
      alert('Email không hợp lệ!');
      return;
    }

    // Thêm dòng mới vào bảng
    const newRow = tbody.insertRow();
    newRow.insertCell(0).innerText = "";
    newRow.insertCell(1).innerText = maSV;
    newRow.insertCell(2).innerText = hoTen;
    newRow.insertCell(3).innerText = email;
    newRow.insertCell(4).innerText = tuoi;
    newRow.insertCell(5).innerHTML = `<button class=" btn btn-sm btn-outline-primary me-1 edit-btn" onclick="suaDong(this)">sửa</button>`;
    newRow.insertCell(6).innerHTML = `<button class=" btn btn-sm btn-outline-danger delete-btn" onclick="xoaDong(this)">xoá</button>`;

    capNhatSTT();

    thongBao.innerText = 'Thêm sinh viên thành công!';
    setTimeout(() => {
        thongBao.innerText = '';
    }, 3000);

    form.reset();
});


function xoaDong(btn) {
  if (confirm('Bạn có chắc chắn muốn xoá dòng này?')) {
    const tr = btn.closest('tr');
    tr.remove();
    capNhatSTT();

    thongBao.innerText = 'Xoá sinh viên thành công!';
    setTimeout(() => {
      thongBao.innerText = '';
    }, 3000);
  }
}

function suaDong(btn) {
  selectedRow = btn.closest('tr');
  document.getElementById('svId').value    = selectedRow.cells[1].innerText;
  document.getElementById('svName').value  = selectedRow.cells[2].innerText;
  document.getElementById('svEmail').value = selectedRow.cells[3].innerText;
  document.getElementById('svAge').value   = selectedRow.cells[4].innerText;
  document.getElementById('btnThem').innerText = "Cập nhật";
  document.getElementById('card-title').innerText = 'Cập nhật Sinh Viên';
}
