// script.js
const slide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');

let counter = 0;

// Fungsi untuk menggerakkan slide
function moveSlide() {
    // Mendapatkan lebar gambar terbaru (responsif)
    const size = images[0].clientWidth;

    // Jika sudah sampai gambar terakhir (copy gambar pertama untuk loop)
    if (counter >= images.length - 1) {
        counter = 0;
        slide.style.transition = "none"; 
        slide.style.transform = `translateX(0px)`;
    }
    
    // Jeda kecil agar transisi 'none' sempat diproses browser
    setTimeout(() => {
        counter++;
        slide.style.transition = "transform 0.5s ease-in-out";
        slide.style.transform = `translateX(${-size * counter}px)`;
    }, 20);
}

// Jalankan fungsi setiap 3 detik
setInterval(moveSlide, 3000);

const hoverBox = document.querySelector('.hover-box');

hoverBox.addEventListener('mouseenter', () => {
    // Tambahkan class active untuk memicu slide hijau
    hoverBox.classList.add('active');

    // Hapus class active setelah 10 detik (10000 ms)
    setTimeout(() => {
        hoverBox.classList.remove('active');
    }, 10000);
});

// Fungsi Animasi Slide In saat Scroll
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const observerOptions = {
    threshold: 0.15 // Animasi mulai saat 15% elemen terlihat di layar
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Tambahkan class active untuk memicu transisi CSS
            entry.target.classList.add('active');
            // Berhenti memantau elemen setelah animasi dijalankan sekali
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Daftarkan semua elemen ke dalam pemantau (observer)
revealElements.forEach(el => {
    revealObserver.observe(el);
});

(function() {
    const observerOptions = {
        root: null, // Berdasarkan viewport
        threshold: 0.3 // Animasi jalan saat 30% elemen terlihat
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Cari semua box di dalam section ini
                const boxes = entry.target.querySelectorAll('.curtain-anim');
                boxes.forEach((box, i) => {
                    setTimeout(() => {
                        box.classList.add('active');
                    }, i * 300); // Delay antar kotak
                });
                // Matikan observer setelah animasi jalan sekali
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Targetkan pembungkus utama
    const target = document.querySelector('.upd-pc-only');
    if (target) {
        observer.observe(target);
    }
})();