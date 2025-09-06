# StyleSync - AI-Powered Fashion Assistant

StyleSync is a comprehensive fashion management app that helps users organize their wardrobe, plan outfits, and get AI-powered style suggestions.

## Features

- 🔐 **Authentication**: Secure user authentication with Supabase
- 👕 **Wardrobe Management**: Add, organize, and categorize clothing items
- 📸 **Image Upload**: Upload photos of your clothing items
- ⭐ **Favorites**: Mark favorite items and outfits
- 🎯 **Outfit Planning**: Plan outfits for events and occasions
- 🤖 **AI Suggestions**: Get AI-powered outfit recommendations
- 📅 **Event Management**: Schedule events and plan outfits accordingly
- 🌤️ **Weather Integration**: Consider weather conditions for outfit planning
- 📱 **Responsive Design**: Beautiful UI that works on all devices

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **UI Components**: Radix UI, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Netlify/Vercel
- **State Management**: React Query
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stylesync
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
   - Create storage buckets for `avatars` and `items`
   - Enable Row Level Security (RLS) policies

4. Environment variables:
   - Copy `env.example` to `.env.local`
   - Add your Supabase URL and anon key:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
npm run dev
```

## Database Schema

The app uses the following main tables:

- **users**: User profiles and authentication
- **categories**: Clothing categories (shirts, pants, etc.)
- **items**: Individual clothing items
- **outfits**: Complete outfit combinations
- **events**: Calendar events with outfit planning
- **boards**: Visual outfit planning boards
- **board_items**: Items positioned on boards

## Deployment

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Vercel

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy

## API Structure

The app uses a service-based API structure:

- `userApi`: User profile management
- `categoriesApi`: Category operations
- `itemsApi`: Item CRUD operations
- `outfitsApi`: Outfit management and generation
- `eventsApi`: Event planning
- `boardsApi`: Visual board management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@stylesync.app or create an issue in the repository.