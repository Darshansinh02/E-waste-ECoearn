// ==================== Backend Configuration ====================
const API_URL = 'http://localhost:5000/api';

// Helper for API calls
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: { 
            'Content-Type': 'application/json',
            'admin-email': localStorage.getItem('ecolearn_currentUser') || ''
        }
    };
    if (data) options.body = JSON.stringify(data);
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Something went wrong');
        return result;
    } catch (err) {
        console.error(`API Error (${endpoint}):`, err.message);
        throw err;
    }
}

// ==================== Birthdate Functions ====================
function openDatePicker() {
    document.getElementById('birthdatePickerHidden').click();
}

function formatDateToDDMMYYYY(dateString) {
    // dateString format: YYYY-MM-DD (from date picker)
    const date = new Date(dateString + 'T00:00:00');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatDDMMYYYYToDate(ddmmyyyy) {
    // ddmmyyyy format: DD/MM/YYYY
    const parts = ddmmyyyy.split('/');
    if (parts.length !== 3) return null;
    
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    
    // Validate format
    if (!/^\d{2}$/.test(day) || !/^\d{2}$/.test(month) || !/^\d{4}$/.test(year)) {
        return null;
    }
    
    return new Date(year, month - 1, day);
}

function isValidDDMMYYYYDate(ddmmyyyy) {
    const date = formatDDMMYYYYToDate(ddmmyyyy);
    if (!date || isNaN(date.getTime())) return false;
    
    // Check if person is at least 13 years old
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        return age - 1 >= 13;
    }
    
    return age >= 13 && date <= today;
}

// Handle date picker selection
document.getElementById('birthdatePickerHidden').addEventListener('change', function() {
    const selectedDate = this.value;
    if (selectedDate) {
        const formattedDate = formatDateToDDMMYYYY(selectedDate);
        document.getElementById('birthdateInput').value = formattedDate;
        validateBirthdateField();
    }
});

// Handle manual input validation
document.getElementById('birthdateInput').addEventListener('blur', function() {
    validateBirthdateField();
});

document.getElementById('birthdateInput').addEventListener('input', function() {
    // Auto-format: DD/MM/YYYY
    let value = this.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (value.length >= 5) {
        value = value.substring(0, 5) + '/' + value.substring(5, 9);
    }
    this.value = value;
});

function validateBirthdateField() {
    const birthdateInput = document.getElementById('birthdateInput');
    const birthdateStatus = document.getElementById('birthdateStatus');
    const value = birthdateInput.value.trim();
    
    if (!value) {
        birthdateStatus.textContent = '';
        return;
    }
    
    if (isValidDDMMYYYYDate(value)) {
        birthdateStatus.textContent = '✓ Valid birthdate';
        birthdateStatus.classList.remove('error');
        birthdateStatus.classList.add('success');
    } else {
        birthdateStatus.textContent = '✗ Invalid date or age requirement (must be 13+)';
        birthdateStatus.classList.remove('success');
        birthdateStatus.classList.add('error');
    }
}

// ==================== Captcha Variables ====================
let loginCaptchaNum1, loginCaptchaNum2, loginCaptchaAnswer;
let signupCaptchaNum1, signupCaptchaNum2, signupCaptchaAnswer;

// ==================== Page Switching ====================
function switchPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show the target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update active menu links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Highlight active menu item
    if (pageId === 'dashboardPage') {
        document.querySelectorAll('a[onclick*="dashboardPage"]').forEach(link => {
            link.classList.add('active');
        });
    } else if (pageId === 'submitWastePage') {
        document.querySelectorAll('a[onclick*="submitWastePage"]').forEach(link => {
            link.classList.add('active');
        });
        loadWasteStats(localStorage.getItem('ecolearn_currentUser'));
    } else if (pageId === 'rewardShopPage') {
        document.querySelectorAll('a[onclick*="rewardShopPage"]').forEach(link => {
            link.classList.add('active');
        });
        loadRewardShop();
    }

    // Reset forms when switching pages
    if (pageId === 'loginPage') {
        document.getElementById('loginForm').reset();
        document.getElementById('loginError').textContent = '';
    } else if (pageId === 'signupPage') {
        document.getElementById('signupForm').reset();
        document.getElementById('signupError').textContent = '';
        document.getElementById('emailStatus').textContent = '';
        document.getElementById('passwordMatch').textContent = '';
    }
}

// ==================== Captcha Functions ====================
function generateCaptcha() {
    loginCaptchaNum1 = Math.floor(Math.random() * 10);
    loginCaptchaNum2 = Math.floor(Math.random() * 10);
    loginCaptchaAnswer = loginCaptchaNum1 + loginCaptchaNum2;
    
    document.getElementById('captchaQuestion').textContent = `${loginCaptchaNum1} + ${loginCaptchaNum2} = ?`;
    document.getElementById('captchaAnswer').value = '';
    document.getElementById('captchaCheck').classList.remove('show');
}

function generateSignupCaptcha() {
    signupCaptchaNum1 = Math.floor(Math.random() * 10);
    signupCaptchaNum2 = Math.floor(Math.random() * 10);
    signupCaptchaAnswer = signupCaptchaNum1 + signupCaptchaNum2;
    
    document.getElementById('signupCaptchaQuestion').textContent = `${signupCaptchaNum1} + ${signupCaptchaNum2} = ?`;
    document.getElementById('signupCaptchaAnswer').value = '';
    document.getElementById('signupCaptchaCheck').classList.remove('show');
}

// ==================== Toggle Password Visibility ====================
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

// ==================== Validation Functions ====================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isPasswordValid(password) {
    return password.length >= 6;
}

function getAllUsers() {
    const users = localStorage.getItem('ecolearn_users');
    return users ? JSON.parse(users) : {};
}

function saveUsers(users) {
    localStorage.setItem('ecolearn_users', JSON.stringify(users));
}

function emailExists(email) {
    const users = getAllUsers();
    return users.hasOwnProperty(email);
}

// ==================== Login Form ====================
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const captchaInput = parseInt(document.getElementById('captchaAnswer').value);
    const errorDiv = document.getElementById('loginError');

    // Reset error message
    errorDiv.textContent = '';

    // Validate captcha
    if (captchaInput !== loginCaptchaAnswer) {
        errorDiv.textContent = 'Invalid security verification. Please try again.';
        generateCaptcha();
        return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
        errorDiv.textContent = 'Please enter a valid email address.';
        return;
    }

    try {
        const result = await apiCall('/auth/login', 'POST', { email, password });
        
        // Login successful
        localStorage.setItem('ecolearn_currentUser', email);
        localStorage.setItem('ecolearn_token', result.token);

        // Check if profile is complete
        if (!result.user.profileComplete) {
            document.getElementById('loginForm').reset();
            generateCaptcha();
            switchPage('profilePage');
        } else if (result.user.isAdmin) {
            loadAdminDashboard();
            switchPage('adminPage');
        } else {
            loadUserDashboard(email);
            switchPage('dashboardPage');
        }
    } catch (err) {
        errorDiv.textContent = err.message || 'Login failed. Please check your connection.';
    }
});

// ==================== Signup Form ====================
document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const captchaInput = parseInt(document.getElementById('signupCaptchaAnswer').value);
    const errorDiv = document.getElementById('signupError');

    // Reset error message
    errorDiv.textContent = '';

    // Validate email format
    if (!isValidEmail(email)) {
        errorDiv.textContent = 'Please enter a valid email address.';
        return;
    }

    // Validate password length
    if (!isPasswordValid(password)) {
        errorDiv.textContent = 'Password must be at least 6 characters long.';
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match. Please try again.';
        return;
    }

    // Validate captcha
    if (captchaInput !== signupCaptchaAnswer) {
        errorDiv.textContent = 'Invalid security verification. Please try again.';
        generateSignupCaptcha();
        return;
    }

    try {
        await apiCall('/auth/signup', 'POST', { email, password });
        
        // Show success message
        alert('Account created successfully! Please log in with your email and password.');
        
        // Clear the form and switch to login page
        document.getElementById('signupForm').reset();
        switchPage('loginPage');
    } catch (err) {
        errorDiv.textContent = err.message || 'Signup failed. Please try again.';
    }
});

// ==================== Profile Form ====================
document.getElementById('profileForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const currentUser = localStorage.getItem('ecolearn_currentUser');
    if (!currentUser) {
        alert('Error: No user logged in.');
        return;
    }

    const username = document.getElementById('username').value.trim();
    const birthdateInput = document.getElementById('birthdateInput').value.trim();
    const address = document.getElementById('address').value.trim();
    const termsAccepted = document.getElementById('termsCheckbox').checked;
    const privacyAccepted = document.getElementById('privacyCheckbox').checked;
    const errorDiv = document.getElementById('profileError');

    // Reset error message
    errorDiv.textContent = '';

    // Validation ... (Mandatory fields)
    if (!username || !birthdateInput || !address || !termsAccepted || !privacyAccepted) {
        errorDiv.textContent = 'Please complete all mandatory fields and accept terms.';
        return;
    }

    const profileData = {
        email: currentUser,
        username,
        birthdate: birthdateInput,
        address
    };

    // Handle photo if uploaded
    const photoFile = document.getElementById('profilePhoto').files[0];
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = async function(event) {
            profileData.photoData = event.target.result;
            saveProfile(profileData);
        };
        reader.readAsDataURL(photoFile);
    } else {
        saveProfile(profileData);
    }

    async function saveProfile(data) {
        try {
            await apiCall('/auth/profile', 'POST', data);
            loadUserDashboard(currentUser);
            switchPage('dashboardPage');
        } catch (err) {
            errorDiv.textContent = err.message || 'Failed to save profile.';
        }
    }
});

// ==================== Photo Upload Handler ====================
document.getElementById('profilePhoto').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const photoStatus = document.getElementById('photoStatus');
    
    if (file) {
        // Validate format
        const validFormats = ['image/jpeg', 'image/png'];
        if (!validFormats.includes(file.type)) {
            photoStatus.textContent = '✗ Invalid format. Only JPG and PNG allowed.';
            photoStatus.classList.add('error');
            photoStatus.classList.remove('success');
            this.value = '';
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            photoStatus.textContent = '✗ File too large. Maximum size is 5MB.';
            photoStatus.classList.add('error');
            photoStatus.classList.remove('success');
            this.value = '';
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('photoPreview');
            preview.innerHTML = `<img src="${event.target.result}" alt="Profile photo">`;
            photoStatus.textContent = '✓ Photo uploaded successfully (JPG/PNG)';
            photoStatus.classList.remove('error');
            photoStatus.classList.add('success');
        };
        reader.readAsDataURL(file);
    }
});

// ==================== Address Word Counter ====================
document.getElementById('address').addEventListener('input', function() {
    const address = this.value.trim();
    const wordCount = address.split(/\s+/).filter(word => word.length > 0).length;
    document.getElementById('wordCount').textContent = Math.min(wordCount, 200);

    const hint = document.querySelector('span[id="wordCount"]').parentElement;
    if (wordCount > 200) {
        hint.classList.add('error');
        hint.textContent = `✗ Exceeded 200 words limit (${wordCount} words)`;
    } else if (wordCount > 0) {
        hint.classList.remove('error');
        hint.textContent = `${wordCount}/200 words`;
    } else {
        hint.classList.remove('error');
        hint.textContent = `0/200 words`;
    }
});

// ==================== Password Match Validator ====================
document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = this.value;
    const hint = document.getElementById('passwordMatch');

    if (confirmPassword === '') {
        hint.textContent = '';
    } else if (password === confirmPassword) {
        hint.textContent = '✓ Passwords match';
        hint.classList.remove('error');
        hint.classList.add('success');
    } else {
        hint.textContent = '✗ Passwords do not match';
        hint.classList.remove('success');
        hint.classList.add('error');
    }
});

// ==================== Email Existence Checker ====================
document.getElementById('signupEmail').addEventListener('blur', function() {
    const email = this.value.trim();
    const hint = document.getElementById('emailStatus');

    if (!email) {
        hint.textContent = '';
        return;
    }

    if (!isValidEmail(email)) {
        hint.textContent = '✗ Invalid email format';
        hint.classList.remove('success');
        hint.classList.add('error');
        return;
    }

    if (emailExists(email)) {
        hint.textContent = '✗ Email already registered. Please sign in.';
        hint.classList.remove('success');
        hint.classList.add('error');
    } else {
        hint.textContent = '✓ Email available';
        hint.classList.remove('error');
        hint.classList.add('success');
    }
});

// ==================== Real-time Captcha Validation ====================
document.getElementById('captchaAnswer').addEventListener('input', function() {
    const answer = parseInt(this.value);
    const check = document.getElementById('captchaCheck');

    if (!isNaN(answer) && answer === loginCaptchaAnswer) {
        check.classList.add('show');
    } else {
        check.classList.remove('show');
    }
});

document.getElementById('signupCaptchaAnswer').addEventListener('input', function() {
    const answer = parseInt(this.value);
    const check = document.getElementById('signupCaptchaCheck');

    if (!isNaN(answer) && answer === signupCaptchaAnswer) {
        check.classList.add('show');
    } else {
        check.classList.remove('show');
    }
});

// ==================== View Profile Photo ====================
function viewProfile() {
    const preview = document.getElementById('photoPreview');
    if (preview.innerHTML.includes('<img')) {
        // Photo already uploaded - show larger view
        alert('Photo preview: Your profile photo has been selected and will be saved to your profile.');
    } else {
        alert('Please upload a photo first.');
    }
}

// ==================== Load User Dashboard ====================
async function loadUserDashboard(email) {
    try {
        const user = await apiCall(`/auth/user/${email}`);

        // Set user greeting for all pages
        const username = user.username || email.split('@')[0];
        document.getElementById('userGreeting').textContent = `Welcome, ${username}!`;
        document.getElementById('userGreeting2').textContent = `Welcome, ${username}!`;
        document.getElementById('userGreeting3').textContent = `Welcome, ${username}!`;
        document.getElementById('dashboardUsername').textContent = username;
        document.getElementById('dashboardEmail').textContent = email;

        // Load photo if available
        const photoLarge = document.getElementById('userPhotoLarge');
        if (user.photoData) {
            photoLarge.innerHTML = `<img src="${user.photoData}" alt="Profile photo">`;
        } else {
            photoLarge.innerHTML = '📷';
        }

        // Load waste submissions stats
        loadWasteStats(email);

        // Refresh notification state for logged-in user
        initializeNotificationsForUser(email);
    } catch (err) {
        console.error('Failed to load dashboard:', err.message);
    }
}

// ==================== Notifications (Owner/Server messages) ====================
function getCurrentUser() {
    return localStorage.getItem('ecolearn_currentUser');
}

function getUserNotifications(email) {
    const key = `ecolearn_notifications_${email}`;
    const saved = localStorage.getItem(key);
    if (!saved) return [];
    try {
        return JSON.parse(saved);
    } catch (e) {
        return [];
    }
}

function saveUserNotifications(email, notifications) {
    const key = `ecolearn_notifications_${email}`;
    localStorage.setItem(key, JSON.stringify(notifications));
}

function addNotification(text) {
    const email = getCurrentUser();
    if (!email) return;
    const notifications = getUserNotifications(email);
    const newItem = {
        id: Date.now(),
        message: text,
        createdAt: new Date().toISOString(),
        read: false
    };
    notifications.unshift(newItem);
    saveUserNotifications(email, notifications);
    renderNotifications(email);
}

function renderNotifications(email) {
    const notifications = getUserNotifications(email);

    const entries = [
        {list: 'notificationList', badge: 'notificationBadge', empty: 'noNotifications', panel: 'notificationPanel'},
        {list: 'notificationList2', badge: 'notificationBadge2', empty: 'noNotifications2', panel: 'notificationPanel2'},
        {list: 'notificationList3', badge: 'notificationBadge3', empty: 'noNotifications3', panel: 'notificationPanel3'}
    ];

    entries.forEach(entry => {
        const listEl = document.getElementById(entry.list);
        const badgeEl = document.getElementById(entry.badge);
        const emptyEl = document.getElementById(entry.empty);

        if (!listEl || !badgeEl || !emptyEl) return;

        listEl.innerHTML = '';

        if (notifications.length === 0) {
            emptyEl.style.display = 'block';
            badgeEl.style.display = 'none';
        } else {
            emptyEl.style.display = 'none';
            notifications.slice(0, 10).forEach(n => {
                const item = document.createElement('li');
                item.textContent = `${new Date(n.createdAt).toLocaleString()}: ${n.message}`;
                listEl.appendChild(item);
            });

            const unreadCount = notifications.filter(n => !n.read).length;
            badgeEl.textContent = unreadCount;
            badgeEl.style.display = unreadCount > 0 ? 'inline-block' : 'none';
        }
    });
}

function toggleNotificationPanel(panelId, badgeId, listId, emptyId) {
    const panel = document.getElementById(panelId);
    if (!panel) return;

    if (panel.style.display === 'block') {
        panel.style.display = 'none';
        return;
    }

    // Close other panels
    ['notificationPanel', 'notificationPanel2', 'notificationPanel3'].forEach(id => {
        const p = document.getElementById(id);
        if (p && id !== panelId) p.style.display = 'none';
    });

    panel.style.display = 'block';

    const email = getCurrentUser();
    if (email) {
        renderNotifications(email);
        const all = getUserNotifications(email);
        all.forEach(n => (n.read = true));
        saveUserNotifications(email, all);
        renderNotifications(email);
    }
}

function clearNotifications() {
    const email = getCurrentUser();
    if (!email) return;

    saveUserNotifications(email, []);
    renderNotifications(email);
}

function initializeNotificationsForUser(email) {
    renderNotifications(email);

    // Simulate server/app-owner notifications for demo
    if (!localStorage.getItem(`ecolearn_notifications_init_${email}`)) {
        addNotification('Welcome to ECOEarn! New rewards are available in Reward Shop.');
        addNotification('Tips from owner: Recycle old cables safely.');
        localStorage.setItem(`ecolearn_notifications_init_${email}`, 'true');
    }

    // Poll server side every minute for updates (fake demo messages)
    if (window.notificationPoller) {
        clearInterval(window.notificationPoller);
    }
    window.notificationPoller = setInterval(() => {
        const randomMsgs = [
            'Server: Your last submission has been verified. Keep it up!',
            'Owner: We have new pick-up slots available tomorrow.',
            'Server: You earned bonus points for completing 3 submissions in a week!'
        ];
        const message = randomMsgs[Math.floor(Math.random() * randomMsgs.length)];
        addNotification(message);
    }, 60000);
}

// Close notification panels when clicking outside
window.addEventListener('click', function(e) {
    if (!e.target.closest('.notification-container')) {
        ['notificationPanel', 'notificationPanel2', 'notificationPanel3'].forEach(id => {
            const p = document.getElementById(id);
            if (p) p.style.display = 'none';
        });
    }
});

// ==================== Logout Function ====================
function logout() {
    if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('ecolearn_currentUser');
        document.getElementById('loginForm').reset();
        document.getElementById('signupForm').reset();
        document.getElementById('profileForm').reset();
        generateCaptcha();
        generateSignupCaptcha();
        switchPage('loginPage');
    }
}

// ==================== Show Terms & Privacy ====================
function showTerms() {
    alert('Terms and Conditions:\n\n' +
        '1. By using ECOEarn, you agree to participate in responsible e-waste management.\n' +
        '2. All personal information will be kept confidential.\n' +
        '3. You are responsible for the accuracy of the information provided.\n' +
        '4. ECOEarn reserves the right to modify terms at any time.\n\n' +
        'Thank you for using ECOEarn!');
}

function showPrivacy() {
    alert('Privacy Policy:\n\n' +
        '1. We collect and store personal information only for account management.\n' +
        '2. Your data will never be shared with third parties without consent.\n' +
        '3. We use industry-standard security measures to protect your data.\n' +
        '4. You have the right to request data deletion at any time.\n' +
        '5. For questions, contact us at support@ecoearn.com\n\n' +
        'Thank you for your trust!');
}

// ==================== Waste Submission ====================
document.getElementById('submitWasteForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();

    const currentUser = localStorage.getItem('ecolearn_currentUser');
    if (!currentUser) {
        document.getElementById('submitWasteError').textContent = 'Error: No user logged in.';
        return;
    }

    const wasteType = document.getElementById('wasteType').value;
    const wasteQuantity = parseFloat(document.getElementById('wasteQuantity').value);
    const wasteCondition = document.getElementById('wasteCondition').value;
    const wasteDescription = document.getElementById('wasteDescription').value.trim();
    const collectionMethod = document.querySelector('input[name="collectionMethod"]:checked').value;
    const collectionAddress = document.getElementById('collectionAddress').value.trim();
    const errorDiv = document.getElementById('submitWasteError');
    const successDiv = document.getElementById('submitWasteSuccess');

    errorDiv.textContent = '';
    successDiv.textContent = '';

    // Validation ... (Photo required, Type, Weight, etc.)
    if (!ewastePhotoData || !wasteType || !wasteQuantity) {
        errorDiv.textContent = 'Please complete all required fields and upload a photo.';
        return;
    }

    // Calculate points: 10 points per kg
    const pointsEarned = Math.floor(wasteQuantity * 10);

    const submissionData = {
        email: currentUser,
        wasteType,
        quantity: wasteQuantity,
        condition: wasteCondition,
        description: wasteDescription,
        collectionMethod,
        collectionAddress,
        ewastePhoto: ewastePhotoData,
        pointsEarned
    };

    try {
        await apiCall('/waste/submit', 'POST', submissionData);
        
        // Show success
        successDiv.textContent = `✓ E-waste submission successful! You earned ${pointsEarned} points.`;
        document.getElementById('submitWasteForm').reset();
        removeEwastePhoto();
        document.getElementById('addressGroup').style.display = 'none';

        // Update stats
        loadWasteStats(currentUser);

        // Clear success message after 3 seconds
        setTimeout(() => {
            successDiv.textContent = '';
        }, 3000);
    } catch (err) {
        errorDiv.textContent = err.message || 'Failed to submit waste.';
    }
});

// Handle collection method change
document.getElementById('homePickup')?.addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('addressGroup').style.display = 'block';
        document.getElementById('collectionAddress').required = true;
    }
});

document.getElementById('dropCenter')?.addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('addressGroup').style.display = 'none';
        document.getElementById('collectionAddress').required = false;
    }
});

// ==================== E-Waste Photo Handling ====================
// Store for e-waste photo
let ewastePhotoData = null;

// Handle e-waste photo upload
document.getElementById('ewastePhotoUpload')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const validFormats = ['image/jpeg', 'image/png'];
    if (!validFormats.includes(file.type)) {
        alert('Invalid photo format. Please use JPG or PNG only.');
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert('Photo size exceeds 5MB limit.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        ewastePhotoData = event.target.result;
        displayEwastePhotoPreview(event.target.result);
    };
    reader.readAsDataURL(file);
});

function displayEwastePhotoPreview(photoData) {
    const preview = document.getElementById('ewastePhotoPreview');
    const img = document.getElementById('ewastePhotoImg');
    img.src = photoData;
    preview.style.display = 'block';
}

function removeEwastePhoto() {
    ewastePhotoData = null;
    document.getElementById('ewastePhotoPreview').style.display = 'none';
    document.getElementById('ewastePhotoUpload').value = '';
}

function openEwasteCamera() {
    // Create video element for camera
    const cameraModal = document.createElement('div');
    cameraModal.id = 'cameraModal';
    cameraModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;

    const videoElement = document.createElement('video');
    videoElement.style.cssText = `
        width: 90%;
        max-width: 500px;
        border-radius: 12px;
        margin-bottom: 20px;
    `;
    videoElement.autoplay = true;

    const canvasElement = document.createElement('canvas');
    canvasElement.style.display = 'none';

    const controlsDiv = document.createElement('div');
    controlsDiv.style.cssText = `
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;
    `;

    const captureBtn = document.createElement('button');
    captureBtn.textContent = '📸 Capture Photo';
    captureBtn.style.cssText = `
        padding: 12px 30px;
        background: #2e7d32;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        font-weight: 600;
    `;

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '✕ Cancel';
    cancelBtn.style.cssText = `
        padding: 12px 30px;
        background: #d32f2f;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        font-weight: 600;
    `;

    controlsDiv.appendChild(captureBtn);
    controlsDiv.appendChild(cancelBtn);
    cameraModal.appendChild(videoElement);
    cameraModal.appendChild(canvasElement);
    cameraModal.appendChild(controlsDiv);
    document.body.appendChild(cameraModal);

    // Access user's camera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            videoElement.srcObject = stream;
            let currentStream = stream;

            captureBtn.onclick = () => {
                canvasElement.width = videoElement.videoWidth;
                canvasElement.height = videoElement.videoHeight;
                const ctx = canvasElement.getContext('2d');
                ctx.drawImage(videoElement, 0, 0);

                ewastePhotoData = canvasElement.toDataURL('image/png');
                displayEwastePhotoPreview(ewastePhotoData);

                // Stop camera
                currentStream.getTracks().forEach(track => track.stop());
                document.body.removeChild(cameraModal);
            };

            cancelBtn.onclick = () => {
                currentStream.getTracks().forEach(track => track.stop());
                document.body.removeChild(cameraModal);
            };
        })
        .catch(error => {
            alert('Camera access denied or unavailable. Please use photo upload instead.');
            console.error('Camera error:', error);
            document.body.removeChild(cameraModal);
        });
}

// ==================== Waste Statistics ====================
async function loadWasteStats(email) {
    try {
        const user = await apiCall(`/auth/user/${email}`);
        const submissions = await apiCall(`/waste/submissions/${email}`);

        let totalWeight = 0;
        submissions.forEach(sub => {
            totalWeight += sub.quantity;
        });

        // Update dashboard stats
        document.getElementById('totalSubmissions').textContent = submissions.length;
        document.getElementById('totalWeight').textContent = totalWeight.toFixed(2);
        document.getElementById('pointsEarned').textContent = user.totalPoints || 0;

        // Update reward shop points
        document.getElementById('pointsBalance').textContent = user.totalPoints || 0;
    } catch (err) {
        console.error('Failed to load stats:', err.message);
    }
}

// ==================== Reward Shop ====================
const rewards = [
    {
        id: 1,
        name: 'Solar LED Lamp',
        category: 'home',
        description: 'Eco-friendly solar-powered lamp for outdoor lighting. Efficient and sustainable.',
        points: 3000,
        image: 'assets/rewards/solar_lamp.png'
    },
    {
        id: 2,
        name: 'High-Capacity Powerbank',
        category: 'peripherals',
        description: '20,000mAh portable charger with dual USB ports and fast charging capability.',
        points: 3500,
        image: 'assets/rewards/powerbank.png'
    },
    {
        id: 3,
        name: 'Smart Watch Pro',
        category: 'mobile',
        description: 'Advanced fitness tracker with heart rate monitor, GPS, and sleep tracking features.',
        points: 4500,
        icon: '⌚'
    },
    {
        id: 4,
        name: 'Kitchen Mixer Grinder',
        category: 'home',
        description: 'Powerful 750W mixer grinder with three stainless steel jars for all your kitchen needs.',
        points: 6000,
        image: 'assets/rewards/mixer.png'
    },
    {
        id: 5,
        name: 'Professional Microwave',
        category: 'home',
        description: 'Modern 20L microwave oven with multiple cooking modes and defrost function.',
        points: 9000,
        image: 'assets/rewards/microwave.png'
    },
    {
        id: 6,
        name: 'Instant Water Heater',
        category: 'home',
        description: 'BEE 5-star rated instant water heater with advanced safety features.',
        points: 11000,
        image: 'assets/rewards/water_heater.png'
    },
    {
        id: 7,
        name: 'Premium Smartphone',
        category: 'mobile',
        description: 'Latest high-end smartphone with a stunning display and advanced camera system.',
        points: 15000,
        image: 'assets/rewards/smartphone.png'
    },
    {
        id: 8,
        name: 'Premium Earphones',
        category: 'audio',
        description: 'High-quality wired earphones with deep bass and crystal clear audio quality.',
        points: 3000,
        icon: '🎧'
    },
    {
        id: 9,
        name: 'Wireless Headphones',
        category: 'audio',
        description: 'Premium noise-canceling wireless headphones for an immersive audio experience.',
        points: 4500,
        icon: '🎧'
    },
    {
        id: 10,
        name: 'Bluetooth Speaker',
        category: 'audio',
        description: 'Portable waterproof Bluetooth speaker with 360-degree sound and long battery life.',
        points: 5500,
        icon: '🔊'
    },
    {
        id: 11,
        name: 'Gaming Keyboard',
        category: 'peripherals',
        description: 'RGB mechanical gaming keyboard with fast response and tactile feedback.',
        points: 4200,
        icon: '⌨️'
    },
    {
        id: 12,
        name: 'Wireless Mouse',
        category: 'peripherals',
        description: 'Ergonomic wireless mouse with high-precision tracking and quiet clicks.',
        points: 3200,
        icon: '🖱️'
    }
];

let currentCategoryFilter = 'all';

function filterRewards(category) {
    currentCategoryFilter = category;
    
    // Update active button state
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) || 
            (category === 'all' && btn.textContent === 'All') ||
            (category === 'mobile' && btn.textContent.includes('Mobile')) ||
            (category === 'audio' && btn.textContent.includes('Speakers')) ||
            (category === 'peripherals' && btn.textContent.includes('Peripherals')) ||
            (category === 'home' && btn.textContent.includes('Home'))) {
            btn.classList.add('active');
        }
    });

    loadRewardShop();
}

function loadRewardShop() {
    const currentUser = localStorage.getItem('ecolearn_currentUser');
    if (!currentUser) return;

    const users = getAllUsers();
    const userPoints = users[currentUser].totalPoints || 0;
    const rewardsGrid = document.getElementById('rewardsGrid');

    rewardsGrid.innerHTML = '';

    // Filter rewards based on category
    const filteredRewards = currentCategoryFilter === 'all' 
        ? rewards 
        : rewards.filter(r => r.category === currentCategoryFilter);

    if (filteredRewards.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 40px;';
        emptyState.innerHTML = `<h3>No rewards found in this category</h3>`;
        rewardsGrid.appendChild(emptyState);
        return;
    }

    filteredRewards.forEach(reward => {
        const canRedeem = userPoints >= reward.points;
        const rewardCard = document.createElement('div');
        rewardCard.className = 'reward-card';
        
        let rewardMedia = reward.image 
            ? `<img src="${reward.image}" alt="${reward.name}">` 
            : reward.icon || '🎁';

        rewardCard.innerHTML = `
            <div class="reward-image">${rewardMedia}</div>
            <div class="reward-content">
                <h4 class="reward-name">${reward.name}</h4>
                <p class="reward-description">${reward.description}</p>
                <div class="reward-points">
                    <span class="reward-points-value">${reward.points}</span> Points
                </div>
                <div class="reward-action">
                    <button class="btn btn-primary" ${!canRedeem ? 'disabled' : ''} 
                            onclick="redeemReward(${reward.id}, '${reward.name}', ${reward.points})">
                        ${canRedeem ? 'Redeem Now' : 'Not Enough Points'}
                    </button>
                </div>
            </div>
        `;
        rewardsGrid.appendChild(rewardCard);
    });
}

function redeemReward(rewardId, rewardName, points) {
    const currentUser = localStorage.getItem('ecolearn_currentUser');
    if (!currentUser) return;

    const users = getAllUsers();
    const userPoints = users[currentUser].totalPoints || 0;

    if (userPoints < points) {
        alert('You do not have enough points to redeem this reward.');
        return;
    }

    if (confirm(`Redeem ${rewardName} for ${points} points?`)) {
        users[currentUser].totalPoints = userPoints - points;
        saveUsers(users);
        loadWasteStats(currentUser);
        loadRewardShop();
        alert(`✓ Reward redeemed! "${rewardName}" has been added to your account.`);
    }
}

// ==================== Description Counter ====================
document.getElementById('wasteDescription')?.addEventListener('input', function() {
    const count = this.value.length;
    document.getElementById('descriptionCount').textContent = count;
});

// ==================== Admin Dashboard Content ====================
async function loadAdminDashboard() {
    try {
        const stats = await apiCall('/admin/stats');
        document.getElementById('adminTotalUsers').textContent = stats.totalUsers;
        document.getElementById('adminPendingSubs').textContent = stats.pendingSubmissions;
        document.getElementById('adminTotalWeight').textContent = stats.totalWeight;

        const submissions = await apiCall('/admin/submissions');
        const tableBody = document.getElementById('adminSubmissionsTable');
        tableBody.innerHTML = '';

        if (submissions.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No submissions found</td></tr>';
            return;
        }

        submissions.forEach(sub => {
            const row = document.createElement('tr');
            
            // Format status badge
            let statusBadge = `<span class="badge pending">Pending</span>`;
            if (sub.status === 'verified') statusBadge = `<span class="badge verified">Verified</span>`;
            if (sub.status === 'rejected') statusBadge = `<span class="badge rejected">Rejected</span>`;

            // Action buttons
            let actionHtml = '';
            if (sub.status === 'pending') {
                actionHtml = `
                    <button class="btn-sm btn-success" onclick="processAdminSubmission('${sub._id}', 'approve')">Approve ✓</button>
                    <button class="btn-sm btn-danger" onclick="processAdminSubmission('${sub._id}', 'reject')">Reject ✕</button>
                `;
            } else {
                actionHtml = `<span style="color: #666; font-size: 12px;">Processed</span>`;
            }

            const date = new Date(sub.submittedAt).toLocaleDateString();
            const email = sub.user ? sub.user.email : 'Unknown User';

            row.innerHTML = `
                <td>${date}</td>
                <td>${email}</td>
                <td>${sub.wasteType}</td>
                <td>${sub.quantity}</td>
                <td>${statusBadge}</td>
                <td>${sub.pointsEarned}</td>
                <td>${actionHtml}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (err) {
        console.error('Failed to load admin dashboard:', err.message);
        alert('Failed to load admin data: ' + err.message);
    }
}

window.processAdminSubmission = async function(submissionId, action) {
    if (!confirm(`Are you sure you want to ${action} this submission?`)) return;
    try {
        const result = await apiCall('/admin/verify', 'POST', { submissionId, action });
        alert(result.message);
        loadAdminDashboard(); // Reload data
    } catch (err) {
        alert('Action failed: ' + err.message);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize captchas
    generateCaptcha();
    generateSignupCaptcha();

    // Check if user is already logged in
    const currentUser = localStorage.getItem('ecolearn_currentUser');
    if (currentUser) {
        const users = getAllUsers();
        if (users[currentUser]) {
            if (users[currentUser].profileComplete) {
                // User has completed profile - show dashboard
                loadUserDashboard(currentUser);
                loadRewardShop();
                switchPage('dashboardPage');
            } else {
                // User logged in but hasn't completed profile - show profile setup
                switchPage('profilePage');
            }
        } else {
            // User not found - clear session and show login
            localStorage.removeItem('ecolearn_currentUser');
            switchPage('loginPage');
        }
    } else {
        // No user logged in - show login page by default
        switchPage('loginPage');
    }
});
