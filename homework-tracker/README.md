# Homework Tracker

A simple homework tracking web application for Dindin and Bebi Elai. Built with Next.js, TypeScript, and Tailwind CSS, using Pastefy API for data storage.

## Features

- **Multi-user support**: Switch between Dindin and Bebi Elai's assignments
- **Assignment management**: Add, edit, and delete assignments
- **Progress tracking**: Toggle assignments as complete/incomplete
- **Rich content**: Support for images and links in assignments
- **Real-time sync**: Data stored via Pastefy API
- **Modern UI**: Clean, responsive design with Tailwind CSS

## Prerequisites

- Node.js 18+ and npm installed
- Pastefy API key (already configured)

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Render

### Option 1: Using render.yaml (Recommended)

1. Push this repository to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Render will automatically detect the `render.yaml` file
6. Click "Deploy Web Service"

### Option 2: Manual Configuration

1. Push this repository to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: homework-tracker
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18
6. Add Environment Variable:
   - Key: `NEXT_PUBLIC_PASTEFY_API_KEY`
   - Value: `SU51czLG80VpbMBUGevRgSUVx1lIEZGt5Oe6qjhVktIaXx94moESHANBJL26`
7. Click "Deploy Web Service"

## Important Notes

### Pastefy Setup

The application currently uses a single Pastefy paste ID for both users. For production use, you should:

1. Create separate Pastefy pastes for each user:
   - One for Dindin's assignments
   - One for Bebi Elai's assignments

2. Update the `PASTE_IDS` in `lib/pastefy.ts`:
```typescript
const PASTE_IDS = {
  'dindin': 'YOUR_DINDIN_PASTE_ID',
  'bebi-elai': 'YOUR_BEBI_PASTE_ID'
};
```

### Initial Data Structure

When you first use the app, it will create a data structure like this in Pastefy:
```json
{
  "name": "Dindin",
  "assignments": []
}
```

## Project Structure

```
homework-tracker/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── AssignmentForm.tsx   # Add/Edit assignment modal
│   ├── AssignmentList.tsx   # List of assignments
│   └── UserSelector.tsx     # User switcher
├── lib/
│   └── pastefy.ts           # Pastefy API service
├── types/
│   └── index.ts             # TypeScript types
├── public/                  # Static assets
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind config
├── next.config.mjs          # Next.js config
├── render.yaml              # Render deployment config
└── README.md                # This file
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Pastefy API** - Data storage

## License

MIT
