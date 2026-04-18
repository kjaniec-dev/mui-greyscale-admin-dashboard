export type NoteFolder = 'Personal' | 'Work' | 'Ideas' | 'Archive';

export interface Note {
    id: string;
    title: string;
    content: string;
    folder: NoteFolder;
    tags: string[];
    isPinned: boolean;
    color?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface NoteFolderConfig {
    id: NoteFolder;
    name: string;
    icon: string;
    color: string;
}

export const noteFolders: NoteFolderConfig[] = [
    { id: 'Personal', name: 'Personal', icon: 'Person', color: '#3B82F6' },
    { id: 'Work', name: 'Work', icon: 'Work', color: '#8B5CF6' },
    { id: 'Ideas', name: 'Ideas', icon: 'Lightbulb', color: '#F59E0B' },
    { id: 'Archive', name: 'Archive', icon: 'Archive', color: '#6B7280' },
];

const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

export const mockNotes: Note[] = [
    // Pinned notes
    {
        id: 'note-1',
        title: 'Project Roadmap',
        content: `# Q1 2026 Goals

## High Priority
- Launch new dashboard features
- Complete user authentication overhaul
- Implement real-time notifications

## Medium Priority
- Refactor legacy codebase
- Update documentation
- Performance optimization

## Notes
Remember to sync with the team every Monday at 10 AM.`,
        folder: 'Work',
        tags: ['planning', 'roadmap', 'important'],
        isPinned: true,
        color: '#DBEAFE',
        createdAt: lastWeek,
        updatedAt: yesterday,
    },
    {
        id: 'note-2',
        title: 'Quick Ideas',
        content: `- Dark mode toggle animation
- Implement drag-and-drop file upload
- Add keyboard shortcuts for common actions
- Create a command palette (Cmd+K)
- Build custom chart components`,
        folder: 'Ideas',
        tags: ['brainstorm', 'features'],
        isPinned: true,
        createdAt: twoDaysAgo,
        updatedAt: now,
    },

    // Work notes
    {
        id: 'note-3',
        title: 'Meeting Notes - Design Review',
        content: `# Design Review Meeting - Feb 5, 2026

**Attendees:** Sarah, Mike, John, Lisa

## Key Points
- New color scheme approved
- Need to update typography system
- Mobile responsiveness is priority
- Consider accessibility improvements

## Action Items
- [ ] Update design system documentation
- [ ] Create mobile mockups
- [ ] Review WCAG compliance
- [ ] Schedule follow-up meeting

Next meeting: Feb 12, 2026`,
        folder: 'Work',
        tags: ['meeting', 'design', 'action-items'],
        isPinned: false,
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo,
    },
    {
        id: 'note-4',
        title: 'API Integration Notes',
        content: `# Third-Party API Integration

## Authentication
- Use OAuth 2.0 flow
- Store tokens securely in encrypted storage
- Implement token refresh mechanism

## Endpoints
- GET /api/users - Retrieve user list
- POST /api/users - Create new user
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Remove user

## Rate Limiting
- 1000 requests per hour
- Implement exponential backoff
- Cache responses when possible`,
        folder: 'Work',
        tags: ['api', 'documentation', 'technical'],
        isPinned: false,
        createdAt: lastWeek,
        updatedAt: lastWeek,
    },
    {
        id: 'note-5',
        title: 'Bug Fixes - Priority List',
        content: `## Critical
1. Login redirect loop on Safari
2. Data grid filtering broken

## High
1. Mobile menu not closing
2. Chart tooltips overlapping
3. Form validation errors not showing

## Medium
1. Dark mode flash on page load
2. Search debouncing inconsistent
3. Notification sound too loud`,
        folder: 'Work',
        tags: ['bugs', 'urgent', 'technical'],
        isPinned: false,
        color: '#FEE2E2',
        createdAt: yesterday,
        updatedAt: yesterday,
    },

    // Personal notes
    {
        id: 'note-6',
        title: 'Book Reading List',
        content: `# 2026 Reading List

## Currently Reading
- "Atomic Habits" by James Clear
- "The Pragmatic Programmer" by Hunt & Thomas

## To Read
- "Clean Code" by Robert Martin
- "Designing Data-Intensive Applications"
- "System Design Interview" by Alex Xu
- "Thinking, Fast and Slow"

## Completed
- ✓ "Deep Work" by Cal Newport
- ✓ "Sapiens" by Yuval Noah Harari`,
        folder: 'Personal',
        tags: ['books', 'reading', 'learning'],
        isPinned: false,
        createdAt: lastMonth,
        updatedAt: twoDaysAgo,
    },
    {
        id: 'note-7',
        title: 'Workout Plan',
        content: `# Weekly Workout Schedule

**Monday:** Chest & Triceps
- Bench Press: 4x8
- Incline Dumbbell Press: 3x10
- Tricep Dips: 3x12

**Wednesday:** Back & Biceps
- Pull-ups: 4x8
- Barbell Rows: 4x10
- Bicep Curls: 3x12

**Friday:** Legs & Shoulders
- Squats: 4x8
- Leg Press: 3x12
- Shoulder Press: 4x10

Rest on weekends or light cardio.`,
        folder: 'Personal',
        tags: ['fitness', 'health', 'routine'],
        isPinned: false,
        color: '#D1FAE5',
        createdAt: lastWeek,
        updatedAt: lastWeek,
    },
    {
        id: 'note-8',
        title: 'Travel Plans - Summer 2026',
        content: `# Summer Vacation Ideas

## Destinations
1. Japan (Tokyo, Kyoto, Osaka)
2. Iceland (Reykjavik, Golden Circle)
3. New Zealand (North & South Islands)

## Budget: $5,000
## Duration: 2-3 weeks
## Best time: June - August

Need to:
- Research flight prices
- Book accommodations early
- Check visa requirements
- Plan itinerary`,
        folder: 'Personal',
        tags: ['travel', 'planning', 'vacation'],
        isPinned: false,
        createdAt: lastMonth,
        updatedAt: lastMonth,
    },
    {
        id: 'note-9',
        title: 'Gift Ideas',
        content: `# Birthday Gift Ideas

**Mom (March 15)**
- Gardening tools set
- Cooking class voucher
- Spa day package

**Dad (June 22)**
- Bluetooth speaker
- Golf accessories
- Biography book

**Sister (Oct 8)**
- Art supplies
- Concert tickets
- Jewelry`,
        folder: 'Personal',
        tags: ['gifts', 'family', 'reminders'],
        isPinned: false,
        createdAt: lastMonth,
        updatedAt: lastMonth,
    },

    // Ideas
    {
        id: 'note-10',
        title: 'App Improvement Ideas',
        content: `# Dashboard Enhancement Ideas

## UI/UX
- Add customizable widgets
- Implement theme editor
- Create onboarding tutorial
- Add keyboard shortcuts overlay

## Features
- Export data to CSV/Excel
- Batch operations for tables
- Advanced filtering system
- Custom report builder

## Performance
- Lazy load heavy components
- Implement virtual scrolling
- Optimize bundle size
- Add service worker for offline mode`,
        folder: 'Ideas',
        tags: ['features', 'improvement', 'brainstorm'],
        isPinned: false,
        createdAt: twoDaysAgo,
        updatedAt: yesterday,
    },
    {
        id: 'note-11',
        title: 'Side Project Ideas',
        content: `1. Personal finance tracker with AI insights
2. Recipe organizer with meal planning
3. Habit tracker with gamification
4. Study timer with Pomodoro technique
5. Portfolio website generator
6. Markdown-based blog platform
7. Weather app with beautiful UI
8. Music player with lyrics sync`,
        folder: 'Ideas',
        tags: ['projects', 'coding', 'entrepreneurship'],
        isPinned: false,
        color: '#FEF3C7',
        createdAt: lastWeek,
        updatedAt: lastWeek,
    },
    {
        id: 'note-12',
        title: 'Learning Resources',
        content: `# Tech Learning Path

## Frontend
- React Server Components
- Next.js 15 features
- TypeScript advanced patterns
- CSS Grid & Flexbox mastery

## Backend
- Node.js performance optimization
- GraphQL best practices
- Database indexing strategies
- Microservices architecture

## DevOps
- Docker & Kubernetes
- CI/CD pipelines
- Cloud platforms (AWS, GCP)
- Monitoring & logging`,
        folder: 'Ideas',
        tags: ['learning', 'development', 'resources'],
        isPinned: false,
        createdAt: lastMonth,
        updatedAt: twoDaysAgo,
    },

    // Archive
    {
        id: 'note-13',
        title: 'Old Project Notes',
        content: `# Legacy Dashboard Project

This project was completed in December 2025.

Key achievements:
- Migrated to React 18
- Implemented new authentication
- Optimized performance (50% faster)
- Reduced bundle size by 30%

Lessons learned:
- Start with TypeScript from day one
- Write tests early
- Document as you go
- Keep dependencies updated`,
        folder: 'Archive',
        tags: ['completed', 'legacy', 'reference'],
        isPinned: false,
        createdAt: lastMonth,
        updatedAt: lastMonth,
    },
    {
        id: 'note-14',
        title: 'Conference Notes - ReactConf 2025',
        content: `# ReactConf 2025 - Key Takeaways

## Day 1
- React 19 announcement
- Server Components deep dive
- New concurrent features
- Performance optimization techniques

## Day 2
- State management patterns
- Testing best practices
- Accessibility workshop
- Open source panel discussion

Great networking opportunities!
Met developers from Google, Meta, and Vercel.`,
        folder: 'Archive',
        tags: ['conference', 'react', 'notes'],
        isPinned: false,
        createdAt: lastMonth,
        updatedAt: lastMonth,
    },
    {
        id: 'note-15',
        title: 'Recipe - Grandma\'s Cookies',
        content: `# Chocolate Chip Cookies Recipe

**Ingredients:**
- 2 1/4 cups flour
- 1 tsp baking soda
- 1 tsp salt
- 1 cup butter, softened
- 3/4 cup sugar
- 3/4 cup brown sugar
- 2 eggs
- 2 tsp vanilla extract
- 2 cups chocolate chips

**Instructions:**
1. Preheat oven to 375°F
2. Mix dry ingredients
3. Cream butter and sugars
4. Add eggs and vanilla
5. Combine wet and dry
6. Fold in chocolate chips
7. Bake 9-11 minutes

Makes 48 cookies`,
        folder: 'Archive',
        tags: ['recipe', 'baking', 'family'],
        isPinned: false,
        createdAt: lastMonth,
        updatedAt: lastMonth,
    },
];

// Helper functions
export const getNotesByFolder = (
    folder: NoteFolder | 'All' | 'Pinned',
    notes: Note[] = mockNotes,
): Note[] => {
    if (folder === 'All') return notes;
    if (folder === 'Pinned') return notes.filter((note) => note.isPinned);
    return notes.filter((note) => note.folder === folder);
};

export const getPinnedNotes = (notes: Note[] = mockNotes): Note[] => {
    return notes.filter((note) => note.isPinned);
};

export const getNoteStats = (notes: Note[] = mockNotes) => {
    const total = notes.length;
    const pinned = notes.filter((n) => n.isPinned).length;
    const byFolder = noteFolders.reduce((acc, folder) => {
        acc[folder.id] = notes.filter((n) => n.folder === folder.id).length;
        return acc;
    }, {} as Record<NoteFolder, number>);

    return {
        total,
        pinned,
        byFolder,
    };
};

export const getAllTags = (notes: Note[] = mockNotes): string[] => {
    const tagSet = new Set<string>();
    notes.forEach((note) => {
        note.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
};
