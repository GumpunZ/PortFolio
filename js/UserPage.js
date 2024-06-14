function showQRCode(code, name) {
    document.getElementById('qrImage').src = 'https://sukishiapi.com/create_qrcode.php?qr=' + code;
    document.getElementById('namePlaceholder').innerText = 'Name : ' + name;
    document.getElementById('Code').innerText = 'Code : ' + code;
}
