export type FileType = 'folder' | 'document' | 'image' | 'video' | 'audio' | 'archive' | 'code';

export interface FileItem {
    id: string;
    name: string;
    type: FileType;
    size?: number; // bytes (undefined for folders)
    modified: Date;
    parentId: string | null;
}

export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export function getFileIcon(type: FileType): string {
    const icons: Record<FileType, string> = {
        folder: '📁',
        document: '📄',
        image: '🖼️',
        video: '🎬',
        audio: '🎵',
        archive: '📦',
        code: '💻',
    };
    return icons[type];
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(): Date {
    const now = new Date();
    const daysAgo = getRandomInt(1, 90);
    return new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
}

// File structure
export const mockFiles: FileItem[] = [
    // Root folders
    { id: 'documents', name: 'Documents', type: 'folder', modified: randomDate(), parentId: null },
    { id: 'images', name: 'Images', type: 'folder', modified: randomDate(), parentId: null },
    { id: 'projects', name: 'Projects', type: 'folder', modified: randomDate(), parentId: null },
    { id: 'downloads', name: 'Downloads', type: 'folder', modified: randomDate(), parentId: null },

    // Documents folder
    { id: 'doc-1', name: 'Quarterly Report.pdf', type: 'document', size: 2456000, modified: randomDate(), parentId: 'documents' },
    { id: 'doc-2', name: 'Meeting Notes.docx', type: 'document', size: 45000, modified: randomDate(), parentId: 'documents' },
    { id: 'doc-3', name: 'Budget 2024.xlsx', type: 'document', size: 156000, modified: randomDate(), parentId: 'documents' },
    { id: 'doc-4', name: 'Presentation.pptx', type: 'document', size: 8900000, modified: randomDate(), parentId: 'documents' },
    { id: 'work-folder', name: 'Work', type: 'folder', modified: randomDate(), parentId: 'documents' },

    // Work subfolder
    { id: 'work-1', name: 'Contract.pdf', type: 'document', size: 890000, modified: randomDate(), parentId: 'work-folder' },
    { id: 'work-2', name: 'Invoice Template.xlsx', type: 'document', size: 34000, modified: randomDate(), parentId: 'work-folder' },

    // Images folder
    { id: 'img-1', name: 'vacation-photo.jpg', type: 'image', size: 3200000, modified: randomDate(), parentId: 'images' },
    { id: 'img-2', name: 'profile-picture.png', type: 'image', size: 456000, modified: randomDate(), parentId: 'images' },
    { id: 'img-3', name: 'screenshot.png', type: 'image', size: 1890000, modified: randomDate(), parentId: 'images' },
    { id: 'img-4', name: 'banner-design.psd', type: 'image', size: 45000000, modified: randomDate(), parentId: 'images' },
    { id: 'photos-folder', name: 'Photos 2023', type: 'folder', modified: randomDate(), parentId: 'images' },

    // Photos subfolder
    { id: 'photo-1', name: 'IMG_001.jpg', type: 'image', size: 4500000, modified: randomDate(), parentId: 'photos-folder' },
    { id: 'photo-2', name: 'IMG_002.jpg', type: 'image', size: 4200000, modified: randomDate(), parentId: 'photos-folder' },
    { id: 'photo-3', name: 'IMG_003.jpg', type: 'image', size: 3800000, modified: randomDate(), parentId: 'photos-folder' },

    // Projects folder
    { id: 'proj-1', name: 'dashboard-ui', type: 'folder', modified: randomDate(), parentId: 'projects' },
    { id: 'proj-2', name: 'mobile-app', type: 'folder', modified: randomDate(), parentId: 'projects' },
    { id: 'proj-3', name: 'README.md', type: 'code', size: 12000, modified: randomDate(), parentId: 'projects' },

    // Dashboard-ui subfolder
    { id: 'dash-1', name: 'App.tsx', type: 'code', size: 5600, modified: randomDate(), parentId: 'proj-1' },
    { id: 'dash-2', name: 'index.css', type: 'code', size: 23000, modified: randomDate(), parentId: 'proj-1' },
    { id: 'dash-3', name: 'package.json', type: 'code', size: 1200, modified: randomDate(), parentId: 'proj-1' },

    // Downloads folder
    { id: 'dl-1', name: 'installer.exe', type: 'archive', size: 156000000, modified: randomDate(), parentId: 'downloads' },
    { id: 'dl-2', name: 'tutorial-video.mp4', type: 'video', size: 450000000, modified: randomDate(), parentId: 'downloads' },
    { id: 'dl-3', name: 'podcast.mp3', type: 'audio', size: 67000000, modified: randomDate(), parentId: 'downloads' },
    { id: 'dl-4', name: 'project-backup.zip', type: 'archive', size: 234000000, modified: randomDate(), parentId: 'downloads' },
];

export function getFilesInFolder(parentId: string | null): FileItem[] {
    return mockFiles.filter((f) => f.parentId === parentId);
}

export function getFolders(): FileItem[] {
    return mockFiles.filter((f) => f.type === 'folder');
}

export function getFolder(id: string | null): FileItem | undefined {
    if (id === null) return undefined;
    return mockFiles.find((f) => f.id === id);
}

export function getBreadcrumbs(folderId: string | null): FileItem[] {
    const crumbs: FileItem[] = [];
    let current = folderId;

    while (current) {
        const folder = getFolder(current);
        if (folder) {
            crumbs.unshift(folder);
            current = folder.parentId;
        } else {
            break;
        }
    }

    return crumbs;
}
