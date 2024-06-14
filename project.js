document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.show-more-btn').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();  // ป้องกันลิงก์ไม่ให้โหลดใหม่
            console.log('Button clicked');  // เพิ่มเพื่อดูว่าฟังก์ชันทำงานหรือไม่

            var moreText = this.previousElementSibling;
            console.log('More text:', moreText);  // เพิ่มเพื่อดูว่าถูกเลือก element ถูกต้องหรือไม่

            if (moreText.style.display === 'none' || moreText.style.display === '') {
                moreText.style.display = 'inline';
                this.textContent = 'Show Less';
            } else {
                moreText.style.display = 'none';
                this.textContent = 'Show More';
            }
        });
    });
});
