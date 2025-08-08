# Barn Software CSS Styles

This folder contains modern, responsive CSS files for all barn software HTML files. These styles provide a consistent, professional look across all farm management applications.

## Files Included

### Base Styles
- **`barn-software-styles.css`** - Main CSS file with all base styles, header navigation, and common components
- **`barn-header.js`** - JavaScript file for header functionality and navigation

### Page-Specific Styles
- **`dailymortality.css`** - Styles for daily mortality tracking page
- **`flocklog.css`** - Styles for flock log and comprehensive farm records
- **`vistorlog.css`** - Styles for visitor log management
- **`shippingform.css`** - Styles for shipping form and logistics
- **`mortalitycard.css`** - Styles for mortality records and analytics
- **`startnewcrop.css`** - Styles for new crop initialization

## How to Use

### 1. Link the CSS Files
Add the appropriate CSS file to your HTML `<head>` section:

```html
<!-- For Daily Mortality Page -->
<link rel="stylesheet" href="../barnsoftwares-css/barn-software-styles.css">
<link rel="stylesheet" href="../barnsoftwares-css/dailymortality.css">

<!-- For Flock Log Page -->
<link rel="stylesheet" href="../barnsoftwares-css/barn-software-styles.css">
<link rel="stylesheet" href="../barnsoftwares-css/flocklog.css">

<!-- For Visitor Log Page -->
<link rel="stylesheet" href="../barnsoftwares-css/barn-software-styles.css">
<link rel="stylesheet" href="../barnsoftwares-css/vistorlog.css">

<!-- For Shipping Form Page -->
<link rel="stylesheet" href="../barnsoftwares-css/barn-software-styles.css">
<link rel="stylesheet" href="../barnsoftwares-css/shippingform.css">

<!-- For Mortality Card Page -->
<link rel="stylesheet" href="../barnsoftwares-css/barn-software-styles.css">
<link rel="stylesheet" href="../barnsoftwares-css/mortalitycard.css">

<!-- For Start New Crop Page -->
<link rel="stylesheet" href="../barnsoftwares-css/barn-software-styles.css">
<link rel="stylesheet" href="../barnsoftwares-css/startnewcrop.css">
```

### 2. Include the Header JavaScript
Add the header JavaScript file to your HTML `<head>` section:

```html
<script src="../barnsoftwares-css/barn-header.js"></script>
```

### 3. Font Awesome Icons
The CSS automatically includes Font Awesome icons. If you need to add it manually:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

## Features

### Modern Design
- Clean, professional appearance
- Consistent color scheme and typography
- Smooth animations and transitions
- Responsive design for all devices

### Header Navigation
- Sticky header with logo
- Navigation menu with icons
- Mobile-responsive hamburger menu
- Back and home navigation buttons
- Save and print action buttons

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface
- Adaptive layouts

### Color Scheme
- Primary: #007bff (Blue)
- Success: #28a745 (Green)
- Warning: #ffc107 (Yellow)
- Danger: #dc3545 (Red)
- Secondary: #6c757d (Gray)

## CSS Classes

### Common Classes
- `.container` - Main content container
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.btn-success` - Success button style
- `.btn-danger` - Danger button style
- `.card` - Card container
- `.form-group` - Form field group

### Utility Classes
- `.text-center` - Center text alignment
- `.text-left` - Left text alignment
- `.text-right` - Right text alignment
- `.mb-0` to `.mb-5` - Margin bottom utilities
- `.mt-0` to `.mt-5` - Margin top utilities
- `.p-0` to `.p-5` - Padding utilities
- `.d-none` - Hide element
- `.d-block` - Show element
- `.d-flex` - Flexbox display

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Customization

### Colors
You can customize colors by modifying the CSS variables in `barn-software-styles.css`:

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --warning-color: #ffc107;
    --danger-color: #dc3545;
    /* ... other variables */
}
```

### Logo
Update the logo path in `barn-header.js`:

```javascript
<img src="C:/Users/roseb/Downloads/dad signaiture.jpg" alt="Rose Farm Management" class="main-logo-img">
```

## Notes

- All CSS files are designed to work together
- The base styles file must be included first
- Page-specific styles should be included after the base styles
- The header JavaScript automatically adds the navigation header
- All styles are mobile-responsive and print-friendly

## Support

For any issues or customization needs, refer to the CSS comments or modify the variables in the root section of the base styles file. 