/* 甘肃农业大学官网 - 主脚本 */
/* 工程标准化分离 - 2026-05-28 */

document.addEventListener("DOMContentLoaded", function() {
// Mobile Menu Toggle
        function toggleMenu() {
            const nav = document.getElementById('mainNav');
            nav.classList.toggle('active');
        }

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.news-card, .notice-item').forEach(el => {
            observer.observe(el);
        });

        // Search functionality
        document.querySelector('.search-btn').addEventListener('click', function() {
            const keyword = document.querySelector('.search-box input').value;
            if (keyword.trim()) {
                alert('搜索功能演示：搜索关键词 "' + keyword + '"');
            }
        });

        // Enter key for search
        document.querySelector('.search-box input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.querySelector('.search-btn').click();
            }
        });
});
