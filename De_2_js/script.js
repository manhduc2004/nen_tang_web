class TransactionManager {
    constructor() {
        this.transactions = [];
        this.bindElements();
        this.loadData();
    }

  bindElements() {
        // form modal phải có id="addTransactionForm"
        this.form         = document.getElementById('addTransactionForm');
        this.customerInput= document.getElementById('customerName');
        this.staffInput   = document.getElementById('staffName');
        this.priceInput   = document.getElementById('price');
        this.btnAdd       = document.getElementById('btnAdd');
        this.tbody        = document.getElementById('transactionBody');

        // Realtime validation
        [this.customerInput, this.staffInput, this.priceInput].forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
        });

        this.form.addEventListener('submit', e => {
        e.preventDefault();
        this.handleSubmit();
        });
    }

    loadData() {
        console.log('Loaded from data.js:', window.transactions);
        this.transactions = window.transactions || [];
        this.renderTable();
    }

    renderTable() {
        this.tbody.innerHTML = this.transactions.map(tx => `
        <tr>
            <td><input type="checkbox" class="form-check-input"></td>
            <td>
            <div class="btn-group btn-group-sm">
                <button class="btn btn-primary"><i class="fas fa-eye"></i></button>
                <button class="btn btn-warning"><i class="fas fa-pencil-alt text-white"></i></button>
                <button class="btn btn-danger"><i class="fas fa-trash"></i></button>
            </div>
            </td>
            <td>${tx.id}</td>
            <td>${tx.customerName}</td>
            <td>${tx.staffName}</td>
            <td class="text-end">${tx.price.toLocaleString('vi-VN')}</td>
            <td class="text-end text-nowrap">
            ${new Date(tx.date).toLocaleString('vi-VN', {
                day:'2-digit', month:'long', year:'numeric',
                hour:'2-digit', minute:'2-digit'
            })}
            </td>
        </tr>
        `).join('');
    }

    handleSubmit() {
        const okCus   = this.validateField(this.customerInput);
        const okStaff = this.validateField(this.staffInput);
        const okPrice = this.validateField(this.priceInput);
        if (!(okCus && okStaff && okPrice)) return;

        const newTx = {
        id: Date.now(),
        customerName: this.customerInput.value.trim(),
        staffName:    this.staffInput.value.trim(),
        price:        +this.priceInput.value.trim(),
        date:         new Date().toISOString()
        };
        this.transactions.unshift(newTx);
        this.renderTable();
        this.resetForm();

        // --- Đóng modal ở đây ---
        const modalEl = document.getElementById('addTransactionModal');
        // Bootstrap 5: lấy instance nếu đã tạo, nếu chưa thì tạo mới
        const bsModal = bootstrap.Modal.getInstance(modalEl) 
                    || new bootstrap.Modal(modalEl);
        bsModal.hide();
    }

    validateField(input) {
        const name = input.id, val = input.value.trim();
        let msg = '';
        this.clearFieldError(input);

        if (!val) msg = 'Không được để trống';
        else if ((name==='customerName'||name==='staffName') && val.length>30)
            msg = name==='customerName' ? 'Tên khách hàng không quá 30 ký tự' : 'Tên nhân viên không quá 30 ký tự';
        else if (name==='price') {
            const num = Number(val.replace(/,/g,''));
            if (isNaN(num) || num<=0) msg = 'Số tiền phải là số dương';
        }

        if (msg) {
            input.classList.add('input-error');
            const err = document.getElementById(name+'Error');
            err.textContent = msg;
            err.classList.add('show');
            return false;
        }
        return true;
    }

    clearFieldError(input) {
        input.classList.remove('input-error');
        document.getElementById(input.id+'Error').classList.remove('show');
    }

    resetForm() {
        [this.customerInput, this.staffInput, this.priceInput].forEach(i => {
        i.value = '';
        this.clearFieldError(i);
        });
    }
}

// Khởi tạo sau khi DOM sẵn sàng
window.addEventListener('DOMContentLoaded', () => {
  new TransactionManager();
});
