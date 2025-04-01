// Authentication functionality
document.addEventListener('DOMContentLoaded', () => {
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const passwordInput = button.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                button.classList.remove('fa-eye');
                button.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                button.classList.remove('fa-eye-slash');
                button.classList.add('fa-eye');
            }
        });
    });

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const remember = document.getElementById('remember')?.checked;
            
            // Simple validation
            if (!email || !password) {
                showAuthMessage('Please enter both email and password', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitButton.disabled = true;
            
            // Simulate API request (in a real app, you would use fetch to call your backend)
            setTimeout(() => {
                // For demo purposes, we'll just simulate a successful login
                // In a real app, you would validate credentials with your backend
                
                // Store auth state (in production, use proper auth tokens)
                if (remember) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                } else {
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('userEmail', email);
                }
                
                // Show success message
                showAuthMessage('Login successful! Redirecting...', 'success');
                
                // Redirect to dashboard or home page
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
                
            }, 2000);
        });
    }
    
    // Register form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            const termsAgreed = document.getElementById('terms').checked;
            
            // Simple validation
            if (!fullname || !email || !password || !confirmPassword) {
                showAuthMessage('Please fill out all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showAuthMessage('Passwords do not match', 'error');
                return;
            }
            
            if (!termsAgreed) {
                showAuthMessage('You must agree to the Terms & Conditions', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
            submitButton.disabled = true;
            
            // Simulate API request
            setTimeout(() => {
                // In a real app, you would send the registration data to your backend
                
                // Show success message
                showAuthMessage('Account created successfully! Redirecting to login...', 'success');
                
                // Redirect to login page
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
                
            }, 2000);
        });
    }
    
    // Helper function to show auth messages
    function showAuthMessage(message, type) {
        // Create message element if it doesn't exist
        let messageElement = document.querySelector('.auth-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'auth-message';
            const form = document.querySelector('.auth-form');
            form.parentNode.insertBefore(messageElement, form);
        }
        
        // Set message content and style
        messageElement.textContent = message;
        messageElement.className = `auth-message ${type}`;
        
        // Auto-hide message after some time
        setTimeout(() => {
            messageElement.classList.add('fade-out');
            setTimeout(() => {
                messageElement.remove();
            }, 500);
        }, 3000);
    }
    
    // Check if user is already logged in
    function checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || sessionStorage.getItem('isLoggedIn') === 'true';
        
        // If on login/register page and already logged in, redirect to dashboard
        if (isLoggedIn && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html'))) {
            window.location.href = 'dashboard.html';
        }
        
        // Update UI based on auth status
        const loginLinks = document.querySelectorAll('a[href="login.html"]');
        const userMenus = document.querySelectorAll('.user-menu');
        
        if (isLoggedIn) {
            // Update navigation for logged-in users
            loginLinks.forEach(link => {
                link.innerHTML = '<i class="fas fa-user-circle"></i> My Account';
                link.href = 'dashboard.html';
            });
            
            // Show user menu if exists
            userMenus.forEach(menu => {
                if (menu) menu.style.display = 'block';
            });
        }
    }
    
    // Run auth status check on page load
    checkAuthStatus();
    
    // Logout functionality
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Clear auth data
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                sessionStorage.removeItem('isLoggedIn');
                sessionStorage.removeItem('userEmail');
                
                // Redirect to login page
                window.location.href = 'login.html';
            });
        }
    });
});
