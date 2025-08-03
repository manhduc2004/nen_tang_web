$(function() {
    $.validator.addMethod("validPhone", function(value, element) {
        return this.optional(element) || /^0\d{9}$/.test(value);
    }, "Số điện thoại phải có 10 chữ số và bắt đầu bằng '0'");

    // 2. Configure validation
    $("#addEmployeeForm").validate({
        onkeyup: false,
        onclick: false,
        onfocusout: false,
        rules: {
            employeeName: {
                required: true,
                maxlength: 30
            },
            employeeEmail: {
                required: true,
                email: true
            },
            employeeAddress: {
                required: true
            },
            employeePhone: {
                required: true,
                validPhone: true
            }
        },
        messages: {
            employeeName: {
                required: "Bắt buộc nhập tên nhân viên",
                maxlength: "Tên tối đa 30 ký tự"
            },
            employeeEmail: {
                required: "Bắt buộc nhập email",
                email: "Email không đúng định dạng"
            },
            employeeAddress: {
                required: "Bắt buộc nhập địa chỉ"
            },
            employeePhone: {
                required: "Bắt buộc nhập số điện thoại"
            }
        }
    });

    // 3. Hàm render bảng nhân viên từ mảng
    function renderTable() {
        const $tbody = $("#employeeTableBody");
        $tbody.empty();
        employees.forEach((emp, idx) => {
        const row = `
            <tr>
            <td><input type="checkbox"></td>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.address}</td>
            <td>${emp.phone}</td>
            <td>
                <a href="#" class="text-warning me-2 edit-btn" data-index="${idx}">
                <i class="fas fa-pencil-alt"></i>
                </a>
                <a href="#" class="text-danger delete-btn" data-index="${idx}">
                <i class="fas fa-trash-alt"></i>
                </a>
            </td>
            </tr>`;
        $tbody.append(row);
        });
    }

    // 4. Khởi tạo khi load trang
    renderTable();

    // 5. Xử lý click Add
    $("#btnAdd").on("click", function() {
        if ($("#addEmployeeForm").valid()) {
        // Lấy dữ liệu form
        const newEmp = {
            name: $("#employeeName").val(),
            email: $("#employeeEmail").val(),
            address: $("#employeeAddress").val(),
            phone: $("#employeePhone").val()
        };
        // Thêm vào mảng và render lại bảng
        employees.push(newEmp);
        renderTable();
        // Đóng modal & reset form
        $("#addEmployeeModal").modal("hide");
        $("#addEmployeeForm")[0].reset();
        }
    });
});
