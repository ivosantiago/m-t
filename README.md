# Booking Application

A mocked multi-step booking application built with Next.js.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Form Handling**: React Hook Form with Zod validation
- **Testing**: Jest with Testing Library and jsdom
- **Code Quality**: ESLint and Prettier with Tailwind plugin
- **Development**: Turbopack for fast development builds

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ivosantiago/m-t
cd m-t
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main booking page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── __tests__/         # Component unit tests
│   ├── ui/                # shadcn/ui base components
│   ├── clinic-card.tsx    # Clinic selection component
│   ├── confirmation.tsx   # Booking confirmation screen
│   ├── contact-information.tsx  # Contact form component
│   ├── payment-information.tsx  # Payment form component
│   └── services-card.tsx  # Services selection component
├── lib/                   # Utility functions
│   └── utils.ts          # Common utilities and cn helper
└── types/                 # TypeScript type definitions
    └── jest.d.ts         # Jest type extensions
```

## Testing

The project includes comprehensive unit tests for form components:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch
```

Tests are located in `src/components/__tests__/` and cover:

- Contact information form validation
- Payment information form validation
- Component rendering and user interactions

## Development Considerations

### Design Decisions

1. **Multi-step Form Architecture**: Chose a single-page application with step navigation to provide better user experience with back/forward navigation capabilities.

2. **Component Library**: Selected shadcn/ui for:
   - Built-in accessibility features
   - Customizable components within the project
   - Popular library with excellent documentation
   - Full control over styling and behavior

3. **Form Validation**: Implemented validation with react-hook-form and Zod for:
   - Type-safe form handling
   - Efficient re-rendering
   - Comprehensive validation rules

4. **Responsive Design**: Ensured consistency between desktop and mobile versions:
   - Added missing "Book appointment" title on desktop
   - Standardized navigation patterns
   - Included services card on all screen sizes

### Current Limitations

- Basic form validation (production would need more comprehensive rules)
- No loading states or error handling
- No animations or transitions
- Limited to unit tests (integration tests recommended for production)

### Future Enhancements

- Step indicators for better user guidance
- Loading states and error handling
- Form transitions and animations
- Integration tests for complete booking flow
- Backend integration for data persistence
- Payment processing integration
