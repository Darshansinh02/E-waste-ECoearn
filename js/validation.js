// ==================== Additional Validation Functions ====================

// Validate username format
function validateUsername(username) {
    // Allow letters, numbers, and symbols
    const usernameRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,30}$/;
    return usernameRegex.test(username);
}

// Validate date is in past
function isValidBirthdate(dateString) {
    const birthDate = new Date(dateString);
    const today = new Date();
    
    if (birthDate > today) {
        return false;
    }
    
    // Check if person is at least 13 years old
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 13;
    }
    
    return age >= 13;
}

// Check password strength
function getPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
    
    return strength;
}

// Format address
function formatAddress(address) {
    return address.replace(/\s+/g, ' ').trim();
}

// Count words in text
function countWords(text) {
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

// Validate form inputs
function validateProfileForm() {
    const username = document.getElementById('username').value.trim();
    const birthdate = document.getElementById('birthdateInput').value.trim();
    const address = document.getElementById('address').value.trim();
    
    const errors = [];
    
    if (!username) {
        errors.push('Username is required and mandatory');
    } else if (username.length < 3) {
        errors.push('Username must be at least 3 characters');
    } else if (username.length > 30) {
        errors.push('Username must not exceed 30 characters');
    }
    
    if (!birthdate) {
        errors.push('Birthdate is required and mandatory');
    } else if (!isValidDDMMYYYYDate(birthdate)) {
        errors.push('You must be at least 13 years old to register');
    }
    
    if (!address) {
        errors.push('Address is required and mandatory');
    } else if (countWords(address) > 200) {
        errors.push('Address must not exceed 200 words');
    } else if (address.length < 10) {
        errors.push('Address must be at least 10 characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Log activity
function logActivity(action, details) {
    const timestamp = new Date().toISOString();
    const activity = {
        action: action,
        details: details,
        timestamp: timestamp
    };
    
    let activities = JSON.parse(localStorage.getItem('ecolearn_activities') || '[]');
    activities.push(activity);
    
    // Keep only last 100 activities
    if (activities.length > 100) {
        activities = activities.slice(-100);
    }
    
    localStorage.setItem('ecolearn_activities', JSON.stringify(activities));
}

// Export user data
function exportUserData(email) {
    const users = JSON.parse(localStorage.getItem('ecolearn_users') || '{}');
    
    if (!users[email]) {
        return null;
    }
    
    const userData = users[email];
    const { password, ...safeData } = userData;
    
    return {
        ...safeData,
        email: email,
        exportDate: new Date().toISOString()
    };
}

// Delete user account
function deleteAccount(email) {
    const users = JSON.parse(localStorage.getItem('ecolearn_users') || '{}');
    
    if (users[email]) {
        delete users[email];
        localStorage.setItem('ecolearn_users', JSON.stringify(users));
        localStorage.removeItem('ecolearn_currentUser');
        return true;
    }
    
    return false;
}

// Update user profile
function updateUserProfile(email, profileData) {
    const users = JSON.parse(localStorage.getItem('ecolearn_users') || '{}');
    
    if (!users[email]) {
        return false;
    }
    
    users[email] = {
        ...users[email],
        ...profileData,
        updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('ecolearn_users', JSON.stringify(users));
    logActivity('profile_updated', `User ${email} updated their profile`);
    
    return true;
}

// Get user profile
function getUserProfile(email) {
    const users = JSON.parse(localStorage.getItem('ecolearn_users') || '{}');
    
    if (!users[email]) {
        return null;
    }
    
    const userData = users[email];
    const { password, ...safeData } = userData;
    
    return {
        email: email,
        ...safeData
    };
}

// Check account status
function getAccountStatus(email) {
    const users = JSON.parse(localStorage.getItem('ecolearn_users') || '{}');
    
    if (!users[email]) {
        return 'not_found';
    }
    
    const user = users[email];
    
    if (!user.profileComplete) {
        return 'incomplete_profile';
    }
    
    return 'active';
}

// Generate user statistics
function getUserStats(email) {
    const users = JSON.parse(localStorage.getItem('ecolearn_users') || '{}');
    
    if (!users[email]) {
        return null;
    }
    
    const user = users[email];
    const createdDate = new Date(user.createdAt);
    const today = new Date();
    const daysActive = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));
    
    return {
        email: email,
        username: user.username,
        daysActive: daysActive,
        profileComplete: user.profileComplete,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin || user.createdAt
    };
}

// Console helper for debugging
window.ecoDebug = {
    getAllUsers: () => JSON.parse(localStorage.getItem('ecolearn_users') || '{}'),
    getCurrentUser: () => localStorage.getItem('ecolearn_currentUser'),
    clearAllData: () => {
        localStorage.removeItem('ecolearn_users');
        localStorage.removeItem('ecolearn_currentUser');
        localStorage.removeItem('ecolearn_activities');
        console.log('All ECOEarn data cleared');
    },
    getActivities: () => JSON.parse(localStorage.getItem('ecolearn_activities') || '[]'),
    getUserData: (email) => {
        const users = JSON.parse(localStorage.getItem('ecolearn_users') || '{}');
        return users[email] || 'User not found';
    }
};

console.log('ECOEarn Validation Module Loaded. Use ecoDebug for debugging.');
