
$(document).ready(function() {
  
    function renderTable() {
        const $tbody = $('#staffBody').empty();
        employees.forEach((tx, index) => {
            const activeIcon = tx.active ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>';
            const row = `
                <tr>
                <td><i class="fa-solid fa-caret-down"></i></td>
                <td>
                    <div class="btn-group btn-group-sm">
                    <button class="btn btn-primary" title="Xem"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-warning" title="Sửa"><i class="fas fa-pencil-alt text-white"></i></button>
                    <button class="btn btn-danger" title="Xóa"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
                <td>${index + 1}</td>
                <td>${tx.firstName}</td>
                <td>${tx.middleName}</td>
                <td>${tx.address}</td>
                <td class="text-center">${activeIcon}</td>
                </tr>`;
            $tbody.append(row);
        });
    }

    
    renderTable();

    
    $.validator.setDefaults({
        errorElement: 'span',
        errorClass: 'error-message show',
        highlight(elem) { $(elem).addClass('input-error'); },
        unhighlight(elem) { $(elem).removeClass('input-error'); },
        errorPlacement(error, element) {
        const errDiv = $('#' + element.attr('id') + 'Error');
        errDiv.text(error.text()).addClass('show');
        }
    });

    
    $('#addStaffForm').validate({
        rules: {
        staffName:    { required: true, maxlength: 15 },
        middleName:   { required: true, maxlength: 20 },
        address:      { required: true, maxlength: 50 }
        },
        messages: {
        staffName: {
            required: "Bắt buộc nhập Tên",
            maxlength: "Tên tối đa 15 ký tự"
        },
        middleName: {
            required: "Bắt buộc nhập Họ đệm",
            maxlength: "Họ đệm tối đa 20 ký tự"
        },
        address: {
            required: "Bắt buộc nhập Địa chỉ",
            maxlength: "Địa chỉ tối đa 50 ký tự"
        }
        },
        submitHandler(form) {
        
        const newEmp = {
            id:         Date.now(),
            firstName:  $('#staffName').val().trim(),
            middleName: $('#middleName').val().trim(),
            address:    $('#address').val().trim(),
            active:     false
        };
        employees.push(newEmp);
        renderTable();
        
        $('#addStaffModal').modal('hide');
        form.reset();
        $(form).validate().resetForm();
        }
    });

    
    $('#addStaffModal').on('show.bs.modal', function() {
        const form = $('#addStaffForm');
        form.validate().resetForm();
        form.find('.input-error').removeClass('input-error');
    });
});
