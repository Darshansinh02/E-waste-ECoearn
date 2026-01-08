# ECOEarn - Complete User Flow Guide

## User Registration & Login Journey

### **Step 1: Sign Up**
**Location:** Sign Up Page  
**Time to Complete:** 2-3 minutes

1. **Open the application** → Shows Login Page
2. **Click "Sign up"** → Goes to Sign Up Page
3. **Enter Email Address**
   - System checks if email is already registered in real-time
   - Shows ✓ if available or ✗ if already exists
   - Example: user@email.com

4. **Create Password**
   - Minimum 6 characters required
   - Can contain:
     - Lowercase letters (a-z)
     - Uppercase letters (A-Z)
     - Numbers (0-9)
     - Symbols (!@#$%^&*()_+-=[]{}';:"\\|,.<>/?)
   - Live validation shows password requirements
   - Example: MyPass123!

5. **Confirm Password**
   - Must match the password above exactly
   - Live indicator shows if passwords match (✓) or not (✗)
   - Error message appears if they don't match

6. **Security Verification**
   - Solve the math captcha (e.g., 7 + 2 = ?)
   - Type the correct answer in the box
   - Click refresh 🔄 to get a new question if needed
   - Checkmark ✓ appears automatically when correct

7. **Click "Sign Up" Button**
   - All validations run
   - Account is created and stored locally
   - **Success message appears**
   - **Automatically redirects to Login Page**

---

### **Step 2: Log In**
**Location:** Login Page  
**Time to Complete:** 1-2 minutes

1. **On Login Page** (after signup)
2. **Enter Registered Email**
   - Must be the EXACT email used during signup
   - Example: user@email.com

3. **Enter Password**
   - Must be the EXACT password you created
   - Click 👁 to show/hide password for verification

4. **Security Verification**
   - Solve the math captcha again
   - Different question each time
   - Click refresh 🔄 to get a new question

5. **Click "Sign In" Button**
   - System validates:
     - ✓ Email exists
     - ✓ Password is correct
     - ✓ Captcha answer is correct
   - **NO error about incomplete profile - goes directly to Profile Setup**
   - **Redirects to Profile Setup Page**

---

### **Step 3: Complete Profile Setup**
**Location:** Profile Setup Page  
**Time to Complete:** 5-10 minutes  
**Important:** All marked with ⭐ are MANDATORY

#### **3.1 Profile Photo** (Optional)
**Format:** JPG or PNG only  
**Requirements:**
- Optional to upload
- Only JPG and PNG formats accepted
- Maximum file size: 5MB
- Minimum resolution: recommended at least 200x200px

**How to Upload:**
1. Click "Upload Photo" button
2. Select an image file from your device
3. Only JPG (.jpg, .jpeg) or PNG (.png) files are allowed
4. File is validated automatically
5. Green checkmark ✓ appears with message: "Photo uploaded successfully (JPG/PNG)"
6. Photo preview shows immediately
7. Click "View Profile" to see how it looks

**If Invalid Format:**
- Red error appears: "✗ Invalid format. Only JPG and PNG allowed."
- File is rejected - try again with correct format

**If File Too Large:**
- Red error appears: "✗ File too large. Maximum size is 5MB."
- Compress the image and try again

---

#### **3.2 Username** ⭐ (MANDATORY)
**Requirements:**
- Must be filled - REQUIRED
- Can contain:
  - Letters (a-z, A-Z)
  - Numbers (0-9)
  - Symbols (!@#$%^&*()_+-=[]{}';:"\\|,.<>/?)
- Minimum 3 characters
- Maximum 30 characters
- Examples: john_doe, user123, Mike@92, Sarah-Smith

**Validation:**
- Field is required
- Must have at least 3 characters
- Error message if left empty: "Please complete the profile setup: Username is mandatory."

---

#### **3.3 Birthdate** ⭐ (MANDATORY)
**Format:** DD/MM/YYYY (Day/Month/Year)  
**Requirements:**
- Must be filled - REQUIRED
- Must be in format: DD/MM/YYYY
- Must contain valid numbers only
- Example: 15/06/1995 (15th June 1995)
- Minimum age: 13 years old
- Cannot be a future date

**Two Ways to Enter:**

**METHOD 1: Manual Typing (DD/MM/YYYY)**
- Click the text input field
- Type your birthdate: DD/MM/YYYY
- Example: 25/12/2006
- Auto-formats as you type:
  - After 2 numbers: "25/"
  - After 4 numbers: "25/12/"
  - After 8 numbers: "25/12/2006"
- Automatically validates when you leave the field
- Shows ✓ if valid or ✗ if invalid
- Error if you're not 13+ years old

**METHOD 2: Date Picker (Calendar)**
- Click the "📅 Pick" button next to the text field
- Calendar popup opens
- Navigate to your birth year, month, and day
- Click to select
- Automatically fills the text field in DD/MM/YYYY format
- Validates instantly

**Validation Messages:**
- ✓ Valid birthdate (if all requirements met)
- ✗ Invalid date or age requirement (must be 13+) (if wrong format or age)

**Error on Submit:**
"Please complete the profile setup: Birthdate is mandatory."  
OR  
"Please complete the profile setup: Birthdate must be valid (DD/MM/YYYY format) and you must be at least 13 years old."

---

#### **3.4 Address** ⭐ (MANDATORY)
**Requirements:**
- Must be filled - REQUIRED
- Maximum 200 words allowed
- Minimum 10 characters
- Text area with multiple lines (you can press Enter for multiple lines)

**How to Fill:**
1. Click in the address text area
2. Type your complete address
3. Example: "123 Green Street, Eco City, EC12 3XY, United Kingdom. Near the park, close to public transport."
4. Live word counter shows your progress: "35/200 words"
5. Cannot exceed 200 words

**Word Counter:**
- Shows real-time count: "0/200 words"
- Updates as you type
- Maximum limit is 200 words
- If you exceed 200 words, red error appears: "✗ Exceeded 200 words limit (205 words)"
- Cannot submit if over 200 words

**Error on Submit:**
"Please complete the profile setup: Address is mandatory."  
OR  
"Please complete the profile setup: Address must not exceed 200 words."  
OR  
"Address must be at least 10 characters long."

---

#### **3.5 Terms & Privacy Checkboxes** ⭐ (MANDATORY - BOTH)

**Important:** BOTH checkboxes MUST be checked before submitting

**Checkbox 1: Terms and Conditions**
- Label: "I agree to the Terms and Conditions"
- Click the checkbox to enable
- Click the "Terms and Conditions" link to read full terms
- A modal popup shows the complete terms text

**Checkbox 2: Privacy Policy**
- Label: "I agree to the Privacy Policy"
- Click the checkbox to enable
- Click the "Privacy Policy" link to read full policy
- A modal popup shows the complete privacy policy text

**Validation:**
- Both checkboxes MUST be checked
- Cannot submit without both checked
- Error if either is unchecked: 
  - "Please complete the profile setup: You must agree to the Terms and Conditions."
  - "Please complete the profile setup: You must agree to the Privacy Policy."

---

#### **3.6 Submit Button**
**Button Text:** "Complete Profile"  
**Action:**
1. Click the button when all mandatory fields are filled
2. System validates:
   - ✓ Username is not empty (3+ characters)
   - ✓ Birthdate is valid DD/MM/YYYY format
   - ✓ User is 13+ years old
   - ✓ Address is filled (10+ characters, max 200 words)
   - ✓ Both terms and privacy checkboxes are checked
   - ✓ Photo format is valid (if uploaded)
   - ✓ Photo file size is under 5MB (if uploaded)

3. **If ANY requirement fails:**
   - Red error message appears at bottom of form
   - Error explains what needs to be fixed
   - You stay on Profile Setup Page
   - Field that needs attention is highlighted
   - Cursor focuses on the problem field

4. **If ALL requirements are met:**
   - Profile is saved
   - Photo is processed (if uploaded)
   - **Redirects to Dashboard Page**
   - Welcome message shows with your username
   - Your profile information displays

---

## Error Messages & Solutions

### **Common Errors During Profile Setup**

| Error Message | Problem | Solution |
|---------------|---------|----------|
| "Please complete the profile setup: Username is mandatory." | Username field is empty | Enter a username with at least 3 characters |
| "Username must be at least 3 characters long." | Username too short | Add more characters to your username |
| "Please complete the profile setup: Birthdate is mandatory." | Birthdate field is empty | Enter your birthdate in DD/MM/YYYY format OR use the Pick button |
| "Please complete the profile setup: Birthdate must be valid (DD/MM/YYYY format) and you must be at least 13 years old." | Invalid date format or too young | Enter valid date like 15/06/2005 where you're at least 13 years old |
| "Please complete the profile setup: Address is mandatory." | Address field is empty | Write your complete address |
| "Address must be at least 10 characters long." | Address too short | Add more details to your address |
| "Please complete the profile setup: Address must not exceed 200 words." | Address has too many words | Remove some words - current limit is 200 words |
| "Please complete the profile setup: You must agree to the Terms and Conditions." | Terms checkbox not checked | Click the checkbox to accept Terms |
| "Please complete the profile setup: You must agree to the Privacy Policy." | Privacy checkbox not checked | Click the checkbox to accept Privacy Policy |
| "✗ Invalid format. Only JPG and PNG allowed." | Photo is wrong format | Upload only JPG or PNG format images |
| "✗ File too large. Maximum size is 5MB." | Photo file is too big | Use smaller image or compress it |

---

### **Photo Format Issues**

**Supported Formats:**
- ✓ JPG (.jpg, .jpeg)
- ✓ PNG (.png)

**NOT Supported:**
- ✗ BMP
- ✗ GIF
- ✗ WEBP
- ✗ SVG
- ✗ Any other format

**How to Convert:**
1. Windows: Use Paint to open image → Save As → Choose JPG or PNG
2. Mac: Use Preview to open image → Export → Choose JPG or PNG
3. Online: Use sites like convertio.co or online-convert.com

---

## Step 4: Dashboard Access
**After successful profile completion:**

✓ System saves all information  
✓ Photo is processed and stored  
✓ User session is created  
✓ **Dashboard Page displays with:**
- Welcome message: "Welcome, [Your Username]!"
- Your profile card with photo and details
- Statistics about your account
- Edit Profile button
- Log Out button

---

## Data Validation Summary

### **Username**
- ✓ Mandatory
- ✓ 3-30 characters
- ✓ Letters, numbers, symbols allowed
- ✗ Cannot be empty

### **Birthdate**
- ✓ Mandatory
- ✓ Format: DD/MM/YYYY
- ✓ Valid date (1-31 day, 1-12 month, 4-digit year)
- ✓ Must be 13+ years old
- ✓ Cannot be future date
- ✗ Cannot be empty

### **Address**
- ✓ Mandatory
- ✓ 10+ characters minimum
- ✓ Maximum 200 words
- ✓ Can contain letters, numbers, symbols, spaces
- ✗ Cannot be empty

### **Terms & Privacy**
- ✓ Mandatory (both)
- ✓ Both must be checked
- ✗ Cannot submit without both

### **Photo**
- ✓ Optional (can skip)
- ✓ JPG or PNG only
- ✓ Maximum 5MB
- ✗ Other formats rejected
- ✗ File too large rejected

---

## Complete Journey Summary

```
LOGIN PAGE
    ↓
User enters email & password
User solves captcha
Click "Sign In"
    ↓
    ├─ If no account: Error message, stays on login
    ├─ If wrong password: Error message, stays on login
    ├─ If captcha wrong: Error message, new captcha shown
    └─ If all correct: Proceeds to next step
    ↓
PROFILE SETUP PAGE
    ↓
User fills:
  1. Photo (optional, JPG/PNG only)
  2. Username (mandatory, 3+ chars)
  3. Birthdate (mandatory, DD/MM/YYYY format, 13+ years)
  4. Address (mandatory, 10+ chars, max 200 words)
  5. Agrees to Terms (mandatory checkbox)
  6. Agrees to Privacy (mandatory checkbox)
    ↓
Click "Complete Profile"
    ↓
    ├─ If any required field empty: Error message, stays on page
    ├─ If format invalid: Error message, stays on page
    ├─ If validation fails: Error message with details, stays on page
    └─ If all correct: Saves profile, processes photo
    ↓
DASHBOARD PAGE
    ↓
✓ Welcome message
✓ Profile information displayed
✓ Statistics shown
✓ Account fully set up
```

---

## Testing the System

### **Test Scenario 1: Complete Signup Flow**
1. Click "Sign up"
2. Enter: test@email.com, Password: Test1234!, Confirm: Test1234!
3. Solve captcha
4. Click "Sign Up"
5. Login with same credentials
6. Complete profile setup
7. See dashboard

### **Test Scenario 2: Photo Upload**
1. Login
2. On profile setup, click "Upload Photo"
3. Select a JPG or PNG image
4. See "✓ Photo uploaded successfully"
5. Photo preview displays
6. Complete other fields
7. Submit profile

### **Test Scenario 3: Birthdate Validation**
1. Login
2. Try typing: "32/13/2020" → Error (invalid date)
3. Try typing: "15/06/2015" → Error (too young, only 9-10 years old)
4. Try typing: "15/06/2005" → Success ✓ (13-14 years old, valid)
5. OR Click "📅 Pick" and use calendar

---

**Thank you for using ECOEarn!**  
**Protecting our environment, one device at a time**

© 2025 ECOEarn. All rights reserved.
