# Rose Farm Management System

A comprehensive web-based farm management system for poultry operations, featuring real-time monitoring, data tracking, and automated reporting.

## 🏠 Overview

This system provides a complete solution for managing poultry farm operations including:
- Daily mortality tracking
- Visitor log management
- Flock health monitoring
- Mortality card management
- Shipping logistics
- New crop setup

## 📁 Project Structure

```
drivehome/
├── barnsoftwares/              # Main software applications
│   ├── dailymortality.html     # Daily mortality tracking
│   ├── vistorlog.html          # Visitor log management
│   ├── mortalitycard.html      # Mortality card system
│   ├── flocklog.html           # Flock health monitoring
│   ├── shippingform.html       # Shipping logistics
│   ├── startnewcrop.html       # New crop setup
│   └── rosefarm.JPG           # Farm logo
├── barnsoftwares-css/          # Styling and JavaScript
│   ├── barn-software-styles.css # Main stylesheet
│   ├── barn-header.js          # Header navigation
│   ├── dailymortality.css      # Daily mortality styles
│   ├── vistorlog.css           # Visitor log styles
│   ├── mortalitycard.css       # Mortality card styles
│   ├── flocklog.css            # Flock log styles
│   ├── shippingform.css        # Shipping form styles
│   └── startnewcrop.css        # New crop styles
├── flockview-app-cursor-notoffical.html  # Main dashboard
├── flockview-app-styles.css    # Dashboard styles
└── README.md                   # This file
```

## 🚀 Features

### Core Applications
- **Daily Mortality**: Real-time tracking of mortality rates with floor-specific monitoring
- **Visitor Log**: Biosecurity management with visitor registration and tracking
- **Mortality Card**: Detailed mortality analysis and reporting
- **Flock Log**: Comprehensive flock health and performance metrics
- **Shipping Form**: Logistics management for flock transportation
- **New Crop Setup**: Automated crop initialization and planning

### Technical Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with intuitive navigation
- **Real-time Updates**: Live data synchronization across all modules
- **Print/Export**: PDF generation and printing capabilities
- **Data Validation**: Input validation and error handling
- **Cross-browser Compatibility**: Works on all modern browsers

## 🎨 Design System

The system uses a consistent design language with:
- **Primary Colors**: Blue (#2563eb) for main actions
- **Success Colors**: Green (#10b981) for positive actions
- **Warning Colors**: Orange (#f59e0b) for alerts
- **Danger Colors**: Red (#ef4444) for critical actions
- **Modern Gradients**: Subtle gradients for depth and visual appeal
- **Responsive Layout**: Mobile-first design approach

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables for theming
- **Icons**: Font Awesome for consistent iconography
- **PDF Generation**: jsPDF for document creation
- **Database**: Firebase (configured for real-time data)
- **Responsive**: CSS Grid and Flexbox for layouts

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone [your-repository-url]
   cd drivehome
   ```

2. **Open the main dashboard**:
   - Open `flockview-app-cursor-notoffical.html` in your browser
   - This serves as the main entry point to all applications

3. **Access individual applications**:
   - Navigate to `barnsoftwares/` directory
   - Open any `.html` file to access specific functionality

## 📊 Usage

### Main Dashboard
- Open `flockview-app-cursor-notoffical.html` to access the main dashboard
- Navigate between different farm management modules
- View real-time statistics and alerts

### Individual Applications
Each application can be accessed directly or through the dashboard:

1. **Daily Mortality** (`dailymortality.html`)
   - Track daily mortality rates
   - Monitor floor-specific data
   - Generate mortality reports

2. **Visitor Log** (`vistorlog.html`)
   - Register new visitors
   - Track entry/exit times
   - Maintain biosecurity records

3. **Mortality Card** (`mortalitycard.html`)
   - Detailed mortality analysis
   - Trend visualization
   - Export mortality reports

4. **Flock Log** (`flocklog.html`)
   - Comprehensive flock data
   - Health monitoring
   - Performance metrics

5. **Shipping Form** (`shippingform.html`)
   - Process shipments
   - Manage transport logistics
   - Generate shipping documents

6. **New Crop Setup** (`startnewcrop.html`)
   - Initialize new crop cycles
   - Set up monitoring parameters
   - Plan crop schedules

## 🔒 Security Features

- Visitor access logging for biosecurity
- Data validation and sanitization
- Secure form handling
- Access control for sensitive operations

## 📈 Data Management

- Real-time data synchronization
- Automatic backup and recovery
- Data export capabilities
- Historical data tracking

## 🤝 Contributing

This is a private farm management system. For questions or support, contact the development team.

## 📄 License

Private software - All rights reserved.

## 🏗️ Development

### File Structure Guidelines
- Keep HTML files in `barnsoftwares/`
- Store all CSS in `barnsoftwares-css/`
- Use consistent naming conventions
- Maintain responsive design principles

### Styling Guidelines
- Use CSS variables for consistent theming
- Implement mobile-first responsive design
- Follow modern UI/UX principles
- Ensure accessibility compliance

---

**Rose Farm Management System** - Streamlining poultry operations through technology. 