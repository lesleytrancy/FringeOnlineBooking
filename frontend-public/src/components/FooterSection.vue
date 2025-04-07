<template>
  <footer class="footer">
    <!-- Newsletter -->
    <div class="newsletter">
      <input type="email" placeholder="Enter your mail" class="email-input" />
      <button class="subscribe-btn">Subscribe</button>
    </div>

    <!-- Nav Links -->
    <nav class="footer-nav">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Get in touch</a>
      <a href="#">FAQs</a>
    </nav>

    <hr class="footer-divider" />

    <!-- Bottom Section -->
    <div class="footer-bottom">
      <div class="languages">
        <span>English</span>
        <span>French</span>
        <span>Hindi</span>
      </div>
      <div class="social-icons">
        <i class="fab fa-linkedin"></i>
        <i class="fab fa-instagram"></i>
        <i class="fab fa-facebook"></i>
      </div>
      <div class="copyright">
        Non Copyrighted © 2023 Upload by EventHive
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection'
}
</script>

<style scoped>
.footer {
  background-color: #7b45f5;
  color: white;
  padding: 40px 20px;
  text-align: center;
  border-radius: 0 0 12px 12px;
}

.newsletter {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.email-input {
  padding: 12px;
  border-radius: 6px;
  border: none;
  width: 260px;
  max-width: 100%;
}

.subscribe-btn {
  background-color: #f25c94;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.subscribe-btn:hover {
  background-color: #e14a82;
}

.footer-nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 20px;
}

.footer-nav a {
  color: white;
  text-decoration: none;
  font-size: 14px;
}

.footer-divider {
  margin: 24px auto;
  width: 90%;
  border-color: rgba(255, 255, 255, 0.2);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 12px;
  padding: 0 20px;
}

.languages span {
  margin-right: 12px;
}

.social-icons i {
  margin: 0 8px;
  font-size: 18px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
