# SafeSpeak

SafeSpeak is a web application designed to allow users to submit anonymous reports of incidents, ensuring their safety and privacy. The application leverages modern web technologies to provide a seamless and secure user experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Anonymous Reporting**: Submit reports without revealing your identity
- **Image Upload and Analysis**: Upload and automatically analyze incident-related images
- **Location Input**: Specify exact incident location using interactive maps
- **Dynamic Form Wizard**: Easy-to-follow multi-step report submission process
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Secure Data Handling**: End-to-end encryption and privacy-focused design

## Technologies Used

- **Frontend**
  - Next.js 14 (React framework)
  - React 18
  - Tailwind CSS
  - Mapbox for location services
  
- **Backend**
  - Prisma ORM
  - PostgreSQL database
  - NextAuth for authentication
  
- **AI/ML**
  - Google Generative AI for image analysis

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- PostgreSQL database

### Installation

1. Clone the repository

```bash
git clone https://github.com/MohitGoyal09/SafeSpeak.git
cd SafeSpeak
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables
Create a `.env` file with:

```

NEXT_PUBLIC_MAPBOX_API_KEY=your-mapbox-key
DATABASE_URL=postgresql:your-database-url
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="<http://localhost:3000/api/auth>"
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-access-api-key

```

4. Initialize database

```bash
npx prisma generate
npx prisma db push
```

## Usage

1. Start development server

```bash
npm run dev
```

1. Access application at <http://localhost:3000>

## API Endpoints

### Reports

- `POST /api/reports` - Create new report
  - Requires: incident details, location, images (optional)
  - Returns: report ID and status

- `GET /api/reports` - Fetch reports (admin only)
  - Requires: Admin authentication
  - Returns: List of reports

### Image Analysis  

- `POST /api/analyze` - Analyze uploaded images
  - Requires: Image file(s)
  - Returns: Analysis results

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Security

- All data is encrypted at rest and in transit
- No personally identifiable information is stored
- Regular security audits and updates
- Compliance with data protection regulations
