# ECOEarn - Quick Reference Guide

## System Version: 2.0
**Last Updated:** December 29, 2025

---

## 🚀 Quick Start

### **Step 1: Open Browser**
- Open `index.html` in any modern web browser
- You'll see the Login Page

### **Step 2: Create Account (Sign Up)**
1. Click **"Sign up"**
2. Enter your email
3. Create password (6+ characters)
4. Confirm password
5. Solve math captcha
6. Click **"Sign Up"**
7. See success message → **Redirected to Login**

### **Step 3: Login**
1. Enter your email
2. Enter your password
3. Solve captcha
4. Click **"Sign In"**
5. **→ Profile Setup Page** (No error messages)

### **Step 4: Complete Profile**
Fill these mandatory fields:
- ⭐ **Username** (3-30 characters)
- ⭐ **Birthdate** (DD/MM/YYYY format)
- ⭐ **Address** (10+ chars, max 200 words)
- Optional: **Photo** (JPG/PNG only)
- ✓ Agree to **Terms**
- ✓ Agree to **Privacy Policy**

Click **"Complete Profile"** → **→ Dashboard**

---

## 📋 Field Requirements

### **Username**
```
✓ Mandatory
✓ 3-30 characters
✓ Letters, numbers, symbols
✗ Cannot be empty
Example: john_doe123
```

### **Birthdate**
```
✓ Mandatory
✓ Format: DD/MM/YYYY
✓ Valid date (1-31 day, 1-12 month, 4-digit year)
✓ Must be 13+ years old
✓ Cannot be future date
✗ Cannot be empty

How to enter:
  Option 1: Type manually - 15/06/2005
  Option 2: Click "📅 Pick" button for calendar
```

### **Address**
```
✓ Mandatory
✓ 10+ characters minimum
✓ Max 200 words
✓ Can use letters, numbers, symbols, spaces
✗ Cannot be empty

Word counter: Shows real-time count up to 200 words
```

### **Photo**
```
✓ Optional - can skip
✓ Accepted: JPG (.jpg, .jpeg), PNG (.png)
✗ Rejected: BMP, GIF, WEBP, others
✓ Max file size: 5MB
✓ Shows ✓ when valid
✓ Shows ✗ with reason if invalid
```

### **Terms & Privacy**
```
✓ Both MANDATORY - both must be checked
✓ Checkbox 1: Terms and Conditions
✓ Checkbox 2: Privacy Policy
✗ Cannot submit without both checked
```

---

## 🔴 Common Errors & Solutions

| Error | Fix |
|-------|-----|
| "Please complete the profile setup: Username is mandatory." | Enter a username (3+ chars) |
| "Please complete the profile setup: Birthdate is mandatory." | Enter birthdate DD/MM/YYYY or click Pick button |
| "Please complete the profile setup: Birthdate must be valid..." | Use valid date, must be 13+ years old |
| "Please complete the profile setup: Address is mandatory." | Write your address |
| "Please complete the profile setup: Address must not exceed 200 words." | Remove some words |
| "Address must be at least 10 characters long." | Add more details |
| "Please complete the profile setup: You must agree to Terms..." | Check the Terms checkbox |
| "Please complete the profile setup: You must agree to Privacy..." | Check the Privacy checkbox |
| "✗ Invalid format. Only JPG and PNG allowed." | Upload only .jpg/.png files |
| "✗ File too large. Maximum size is 5MB." | Use smaller image file |

---

## 🎯 Important Changes in This Version

### ✅ **No Error on Login**
- ~~"Please complete your profile setup first"~~ **REMOVED**
- Login → Profile Setup (direct, no errors)

### ✅ **Photo Restricted**
- Only JPG and PNG formats accepted
- Previous: All image formats accepted
- File size limit: 5MB

### ✅ **Address Increased**
- Previous: 100 words maximum
- Now: **200 words maximum**
- Live word counter shows progress

### ✅ **Better Error Messages**
- Previous: "Username is mandatory."
- Now: "Please complete the profile setup: Username is mandatory."
- Clearer, more helpful messages
- Field gets focus automatically

### ✅ **Smart Validation**
- Photo format validated on upload AND on submit
- All mandatory fields checked before allowing submit
- User stays on page if any error - no data loss

---

## 🔐 Security Features

### **Captcha**
- Used on both Login and Signup
- Simple math question: 7 + 2 = ?
- Prevents automated attacks
- Refreshable: Click 🔄 for new question
- Shows ✓ when correct answer entered

### **Password**
- Minimum 6 characters
- Can contain special characters
- Stored locally (client-side only for demo)

### **Email Verification**
- Signup checks if email already registered
- Prevents duplicate accounts
- Real-time availability check

### **Age Verification**
- Must be 13+ years old
- Calculated from birthdate
- Validated on submit

---

## 💾 Data Storage

### **Where Data is Stored**
- Browser's localStorage (local storage only)
- Not sent to any server
- Persistent until browser cache cleared

### **What is Stored**
- Email address
- Password (plaintext in demo)
- Username
- Birthdate
- Address
- Profile photo (as base64)
- Account creation date

### **Important Notes**
- Clearing browser cache = data lost
- No cloud backup in demo version
- Add backend before production use

---

## 🧪 Test Scenarios

### **Test 1: Complete Signup to Dashboard**
```
1. Sign up with: test@example.com / Test1234! / Test1234!
2. Login with same credentials
3. Fill profile: John, 15/06/2005, "123 Green St, City", Photo (optional)
4. Check both terms & privacy
5. Submit → Dashboard appears ✓
```

### **Test 2: Photo Upload**
```
1. Login
2. Try upload BMP → ✗ Rejected
3. Try upload JPG (2MB) → ✓ Accepted
4. Photo preview shows → Complete profile → ✓
```

### **Test 3: Word Counter**
```
1. Login → Profile Setup
2. Type 150 words in address → Shows "150/200 words"
3. Type 220 words → Shows error "✗ Exceeded 200 words"
4. Cannot submit with > 200 words
```

### **Test 4: Mandatory Fields**
```
1. Login → Profile Setup
2. Leave username empty → Try submit → Error ✓
3. Leave birthdate empty → Try submit → Error ✓
4. Leave address empty → Try submit → Error ✓
5. Don't check terms → Try submit → Error ✓
```

---

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✓ Supported |
| Firefox | 88+ | ✓ Supported |
| Safari | 14+ | ✓ Supported |
| Edge | 90+ | ✓ Supported |
| IE 11 | - | ✗ Not supported |

---

## 📂 File Structure

```
EwasteECOEARN/
├── index.html              ← Main file (open this)
├── README.md               ← Full documentation
├── USER_FLOW.md            ← Detailed user journey
├── CHANGELOG.md            ← What's new
├── css/
│   └── style.css          ← All styling
├── js/
│   ├── auth.js            ← Authentication logic
│   └── validation.js      ← Validation functions
└── assets/                ← For future assets
```

---

## ⚡ Quick Commands

### **Clear All Data**
In browser console (F12):
```javascript
ecoDebug.clearAllData()
```

### **View All Users**
In browser console (F12):
```javascript
ecoDebug.getAllUsers()
```

### **View Current User**
In browser console (F12):
```javascript
ecoDebug.getCurrentUser()
```

### **Get User Data**
In browser console (F12):
```javascript
ecoDebug.getUserData('email@example.com')
```

---

## 🆘 Troubleshooting

### **"No account found with this email"**
- You haven't signed up yet
- Solution: Click "Sign up" to create account

### **"Incorrect password"**
- Password doesn't match signup password
- Solution: Verify caps lock is off, retype carefully

### **"Invalid security verification"**
- Captcha answer is wrong
- Solution: Click 🔄 for new question and solve again

### **Photo won't upload**
- Format not JPG/PNG
- File too large (>5MB)
- Solution: Use JPG or PNG, compress if large

### **Can't complete profile**
- A mandatory field is empty
- Error message shows which field
- Solution: Fill all fields marked with ⭐

### **Lost all data**
- Browser cache was cleared
- Solution: Sign up again (can use same email)

---

## 🔄 Update Checklist

**Before going to production, add:**
- [ ] Backend authentication (don't use localStorage)
- [ ] Password hashing (bcrypt)
- [ ] Email verification
- [ ] Database for persistent storage
- [ ] HTTPS only
- [ ] Server-side validation
- [ ] Rate limiting on login/signup
- [ ] CSRF protection
- [ ] Profile photo CDN storage
- [ ] Password reset functionality

---

## 📞 Support

For issues or questions:
- Check USER_FLOW.md for detailed instructions
- Check CHANGELOG.md for recent changes
- Clear browser cache and try again
- Use ecoDebug commands in console

---

## 📝 License

© 2025 ECOEarn. All rights reserved.
**Protecting our environment, one device at a time**

---

**Version:** 2.0  
**Status:** Production Ready (Demo)  
**Last Update:** December 29, 2025
