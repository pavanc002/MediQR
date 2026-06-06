# MediQr 🏥💊

**Scan it before you swallow it** 🔍

MediQr is a comprehensive medicine verification and management system designed to enhance pharmaceutical safety and transparency. The platform empowers administrators to manage medicine databases with detailed product information, while users can scan QR codes on medicine packaging to instantly access complete details of individual tablet including expiry dates, batch numbers, and manufacturer information.

## 🌟 Features

- **QR Code Generation**: Automatically generate high-resolution QR codes (2400x2400px PDF) for each medicine entry
- **Medicine Database Management**: Admin interface to create, update, and delete medicine entries
- **Public Medicine Portal**: Users can scan QR codes to access detailed medicine information
- **Authentication System**: Secure admin authentication using `better-auth`
- **Real-time Updates**: Instant updates to medicine information across the platform
- **Responsive Design**: Mobile-friendly interface built with Shadcn/UI components
- **PDF Export**: Generate professional PDF documents with QR codes
- **Type-Safe**: Full TypeScript support throughout the application

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | Modern React framework with App Router |
| **React 19** | UI library for building interactive components |
| **TypeScript** | Type-safe JavaScript development |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Shadcn/UI** | High-quality React components |
| **Drizzle ORM** | Type-safe database queries |
| **Turso** | SQLite cloud database |
| **Better Auth** | Authentication library |
| **QRCode** | QR code generation |
| **PDF-Kit & PDF-Lib** | PDF generation and manipulation |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun** as your package manager
- A **Turso Database** account (free tier available)
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mediqr.git
cd mediqr
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory and add the following:

```bash
# Database Configuration (Turso)
TURSO_CONNECTION_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication (if using better-auth)
AUTH_SECRET=your-secret-key-here

# Optional: Stripe Integration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 4. Setup Database

Generate and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```
mediqr/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── api/                 # API routes
│   │   │   └── medicines/       # Medicine CRUD endpoints
│   │   └── medicines/           # Medicine pages
│   ├── components/               # React components
│   │   └── ui/                  # Shadcn UI components
│   ├── db/                      # Database configuration
│   │   └── schema.ts            # Drizzle schema definitions
│   ├── lib/                     # Utility functions
│   ├── hooks/                   # Custom React hooks
│   └── styles/                  # Global styles
├── drizzle/                      # Database migrations
├── public/                       # Static assets
├── middleware.ts                 # Next.js middleware for auth
├── drizzle.config.ts            # Drizzle configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies
```

## 🔌 API Endpoints

### Get All Medicines
```
GET /api/medicines
```
Public endpoint to retrieve all medicines.

**Response:**
```json
[
  {
    "id": "1",
    "name": "Aspirin",
    "strength": "500mg",
    "manufacturer": "HealthCorp",
    "expiryDate": "2025-12-31",
    "batchNumber": "BATCH123",
    "description": "Pain reliever"
  }
]
```

### Get Single Medicine
```
GET /api/medicines/:id
```
Public endpoint to retrieve a specific medicine by ID.

### Create Medicine (Admin Only)
```
POST /api/medicines
Headers: x-admin: 1
```

**Request Body:**
```json
{
  "name": "Aspirin",
  "strength": "500mg",
  "manufacturer": "HealthCorp",
  "expiryDate": "2025-12-31",
  "batchNumber": "BATCH123",
  "description": "Pain reliever"
}
```

### Update Medicine (Admin Only)
```
PUT /api/medicines/:id
Headers: x-admin: 1
```

### Delete Medicine (Admin Only)
```
DELETE /api/medicines/:id
Headers: x-admin: 1
```

**Note:** Admin endpoints are protected by middleware that checks for the `x-admin` header. This should be set by your admin UI during authentication.

## 🗄️ Database Schema

The application uses Turso (SQLite) with Drizzle ORM. Key tables include:

- **medicines**: Stores medicine information
  - `id`: Primary key
  - `name`: Medicine name
  - `strength`: Dosage strength
  - `manufacturer`: Manufacturer name
  - `expiryDate`: Expiration date
  - `batchNumber`: Batch identifier
  - `description`: Detailed description
  - `qrCodeUrl`: Path to generated QR code PDF

## 🔐 Authentication

The project uses `better-auth` for authentication. Admin access is controlled via middleware that validates the `x-admin` header. For production deployment, implement proper OAuth2/JWT authentication.

## 📦 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy with a single click

```bash
# For manual deployment
npm run build
npm run start
```

## 🔄 Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate Drizzle migrations
npm run db:migrate       # Run pending migrations
```

## 🎨 UI Components

The project uses [Shadcn/UI](https://ui.shadcn.com) with the New York style. Pre-configured components include:

- Buttons, Cards, Dialogs
- Forms with React Hook Form
- Data Tables
- Modals and Alerts
- Navigation components
- And many more...

Add new components using:
```bash
npx shadcn-ui@latest add [component-name]
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Use ESLint for code linting
- Write meaningful commit messages
- Ensure responsive design

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TURSO_CONNECTION_URL` | Turso database connection URL | ✅ |
| `TURSO_AUTH_TOKEN` | Turso authentication token | ✅ |
| `NEXT_PUBLIC_APP_URL` | Application base URL | ✅ |
| `AUTH_SECRET` | Secret key for authentication | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | ❌ |
| `STRIPE_SECRET_KEY` | Stripe secret key | ❌ |

## 🐛 Troubleshooting

### Database Connection Issues
- Verify your Turso credentials in `.env.local`
- Check if your IP is whitelisted in Turso dashboard
- Ensure migrations have been run: `npm run db:migrate`

### QR Code Generation Errors
- Verify QRCode library is installed: `npm install qrcode`
- Check file permissions for PDF output directory
- Ensure medicine data is complete before generating QR

### Build Failures
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Shadcn/UI](https://ui.shadcn.com) - UI components
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Drizzle ORM](https://orm.drizzle.team) - Database ORM
- [Turso](https://turso.tech) - Database hosting

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/yourusername/mediqr/issues)
3. Create a new issue with detailed information
4. Contact the author directly

## 🔮 Future Enhancements

- [ ] User account system with medicine history
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Prescription verification
- [ ] Integration with pharmacy systems
- [ ] Real-time inventory management
- [ ] Medicine interaction checker

---

**Made with ❤️ for pharmaceutical safety**

Give this project a ⭐️ if it helps you!
