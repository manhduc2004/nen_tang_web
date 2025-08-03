// script.js
$(document).ready(function() {
    
    function formatDateTime(isoString) {
        const d = new Date(isoString);
        const options = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return d.toLocaleDateString('vi-VN', options).replace(',', '');
    }

    
    function renderTable() {
        const $tbody = $('#transactionBody').empty();
        transactions.forEach(tx => {
        const row = `
            <tr>
            <td><input class="form-check-input" type="checkbox"></td>
            <td>
                <div class="btn-group btn-group-sm">
                <button class="btn btn-primary" title="Xem"><i class="fas fa-eye"></i></button>
                <button class="btn btn-warning" title="Sửa"><i class="fas fa-pencil-alt text-white"></i></button>
                <button class="btn btn-danger" title="Xóa"><i class="fas fa-trash"></i></button>
                </div>
            </td>
            <td>${tx.id}</td>
            <td>${tx.customerName}</td>
            <td>${tx.staffName}</td>
            <td class="text-end">${tx.price.toLocaleString('vi-VN')}</td>
            <td class="text-end text-nowrap">${formatDateTime(tx.date)}</td>
            </tr>`;
        $tbody.append(row);
        });
    }
    renderTable();

    
    $.validator.setDefaults({
        errorElement: 'span',
        errorClass: 'error-message show',
        highlight: function(element) {
            $(element).addClass('input-error');
        },
        unhighlight: function(element) {
            $(element).removeClass('input-error');
        },
        errorPlacement: function(error, element) {
        // đẩy message vào div#error tương ứng
            const errDiv = $('#' + element.attr('id') + 'Error');
            errDiv.text(error.text()).addClass('show');
        }
    });

    
    $('#addTransactionForm').validate({
        rules: {
        customerName: {
            required: true,
            maxlength: 30
        },
        staffName: {
            required: true,
            maxlength: 30
        },
        price: {
            required: true,
            digits: true
        }
        },
        messages: {
        customerName: {
            required: "Bắt buộc nhập tên khách hàng",
            maxlength: "Tên khách hàng tối đa 30 ký tự"
        },
        staffName: {
            required: "Bắt buộc nhập tên nhân viên",
            maxlength: "Tên nhân viên tối đa 30 ký tự"
        },
        price: {
            required: "Bắt buộc nhập số tiền",
            digits: "Số tiền phải là số nguyên dương"
        }
        },
        submitHandler: function(form) {
        
        const cVal = $('#customerName').val().trim();
        const sVal = $('#staffName').val().trim();
        const pVal = parseInt($('#price').val().trim(), 10);

        const newTx = {
            id: Date.now(),
            customerName: cVal,
            staffName: sVal,
            price: pVal,
            date: new Date().toISOString()
        };
        transactions.push(newTx);
        renderTable();

        
        $('#addTransactionModal').modal('hide');
            form.reset();
        }
    });

    
    $('#addTransactionModal').on('show.bs.modal', function() {
        $('#addTransactionForm').validate().resetForm();
        $('#addTransactionForm .input-error').removeClass('input-error');
    });
});
