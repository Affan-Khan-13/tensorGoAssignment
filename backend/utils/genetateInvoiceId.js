function generateInvoiceId() {
    var digits = "0123456789";
    let InvoiceId = "";
    for (let i = 0; i < 10; i++) {
        InvoiceId += digits[Math.floor(Math.random() * 10)];
    }
    return InvoiceId;
}

export default generateInvoiceId;
