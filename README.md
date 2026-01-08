# ECOEarn - E-Waste Management System

A complete authentication and profile management system for the ECOEarn e-waste management platform.

## Features

### 1. **Login Page**
- Email and password input fields
- Security verification (mathematical captcha)
- "Remember me" checkbox
- "Forgot password?" link
- Link to sign up page
- Form validation and error messages

### 2. **Signup Page**
- Email input with real-time availability check
- Password input (minimum 6 characters)
- Password confirmation with live matching validation
- Security verification (mathematical captcha)
- Support for numbers, letters, and symbols in password
- Real-time password match indicator
- Email format validation
- Link to sign in page

### 3. **Profile Setup Page**
- Profile photo upload with preview
- Username field (mandatory, supports letters, numbers, symbols)
- Birthdate field (mandatory)
- Address field (maximum 100 words, mandatory)
- Word counter for address field
- Terms and Conditions checkbox
- Privacy Policy checkbox
- Submit button to complete profile
- View profile button
- Logout button

### 4. **Dashboard**
- User welcome message with username
- Profile photo display
- User statistics (Devices Recycled, Points Earned, Days Active)
- Edit profile button
- Logout button

## Installation & Setup

### Requirements
- Modern web browser (Chrome, Firefox, Edge, Safari)
- No additional dependencies required

### How to Use

1. **Open the Application**
   - Open `index.html` in your web browser
   - You'll be directed to the login page by default

2. **Create a New Account**
   - Click "Sign up" on the login page
   - Enter your email address (must be unique)
   - Create a password (minimum 6 characters)
   - Confirm your password
   - Solve the security verification
   - Click "Sign Up"

3. **Complete Your Profile**
   - Upload a profile photo (optional)
   - Enter a username (mandatory)
   - Select your birthdate (mandatory)
   - Enter your address (maximum 100 words, mandatory)
   - Accept Terms and Privacy Policy
   - Click "Complete Profile"

4. **Login to Your Account**
   - Enter your email address
   - Enter your password
   - Solve the security verification
   - Click "Sign In"
   - You'll be taken to your dashboard

## Password Requirements

- Minimum 6 characters
- Can include uppercase and lowercase letters
- Can include numbers
- Can include special symbols (!@#$%^&*()_+-=[]{}';:"\\|,.<>/?)

## Data Storage

All user data is stored locally using the browser's localStorage:
- User accounts (email, password, profile data)
- Profile information (username, birthdate, address, photo)
- Activity logs

**Note:** Data is stored in your browser and will persist until cleared.

## File Structure

```
EwasteECOEARN/
├── index.html           # Main HTML file
├── css/
│   └── style.css        # All styling
├── js/
│   ├── auth.js          # Authentication logic
│   └── validation.js    # Validation functions
└── assets/              # For future assets
```

## Features in Detail

### Security Verification
- Simple math captcha (addition of two numbers)
- Used on both login and signup
- Refreshable if incorrect

### Email Validation
- Real-time check for existing accounts during signup
- Format validation (must be valid email format)
- Feedback messages on email status

### Password Validation
- Minimum 6 characters
- Live match indicator for password confirmation
- Toggle password visibility

### Profile Photo
- Supports common image formats (JPG, PNG, GIF, etc.)
- Photo preview on upload
- Photo stored in browser's localStorage
- View profile photo option

### Address Field
- Live word counter (maximum 100 words)
- Prevents exceeding word limit
- Required field

### Terms & Privacy
- Checkboxes for both Terms and Privacy Policy
- Modal alerts when clicking links
- Both must be accepted to complete profile

## Testing Accounts

After signing up, you can test different scenarios:
- Try logging in with wrong password (shows error)
- Try signing up with existing email (shows error)
- Try incorrect security verification (shows error)
- Edit profile after login
- Upload and view profile photo

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Notes

- All data is stored locally in the browser
- Clearing browser data will erase all accounts
- This is a frontend implementation for demonstration
- For production, implement backend authentication
- Consider adding password hashing for security
- HTTPS should be used in production

## Future Enhancements

- Backend integration for data persistence
- Email verification
- Password reset functionality
- Two-factor authentication
- Photo compression
- User profiles visibility
- Search functionality

## Support

For issues or questions, please contact: support@ecoearn.com

---

**© 2025 ECOEarn. All rights reserved.**
**Protecting our environment, one device at a time**
