var bankInfo = {
    cardNumber: '______',
    cardOwner: '______',
    phoneNumber: '______',
    bankName: '______'
};

function showBankInfo() {
    return '💳 ' + bankInfo.bankName + ' | ' + bankInfo.cardNumber;
}

function checkout() {
    if (cart.length === 0) { alert('😔 ______'); return; }
    
    var sum = cart.reduce(function(s, c) { return s + (c.price * c.qty); }, 0);
    var orderDetails = '';
    cart.forEach(function(c, i) {
        orderDetails += (i + 1) + '. ' + c.name + ' (×' + c.qty + ') = ' + (c.price * c.qty).toLocaleString('fa-IR') + ' ______\n';
    });
    
    var receipt = 
        '🧾 *______*\n' +
        '═'.repeat(35) + '\n\n' +
        '📋 *______:*\n' + orderDetails + '\n' +
        '═'.repeat(35) + '\n' +
        '💰 *______: ' + sum.toLocaleString('fa-IR') + ' ______*\n\n' +
        '💳 *______:*\n' +
        '   ______: ' + bankInfo.cardNumber + '\n' +
        '   ______: ' + bankInfo.bankName + '\n' +
        '   ______: ' + bankInfo.cardOwner + '\n\n' +
        '📞 ______ ' + bankInfo.phoneNumber + ' ______';
    
    alert(receipt);
    
    if (confirm('📱 ______')) {
        var msg = '🛒 *______*%0A%0A' + orderDetails.replace(/\n/g, '%0A') + '%0A💰 *______: ' + sum.toLocaleString('fa-IR') + ' ______*';
        var phone = bankInfo.phoneNumber.replace(/^0/, '98');
        window.open('https://wa.me/' + phone + '?text=' + msg, '_blank');
    }
    
    cart = []; saveCart(); updateCartUI(); closeCart();
}