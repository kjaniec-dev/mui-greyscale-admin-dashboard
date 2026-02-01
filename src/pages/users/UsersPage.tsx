import { useState, useMemo } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    InputAdornment,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import { UserTable } from '../../components/tables';
import { UserFormDialog, type UserFormData } from '../../components/forms';
import { UserDetailDrawer } from '../../components/drawers';
import { mockUsers, type User } from '../../data/mockUsers';

export function UsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [userToView, setUserToView] = useState<User | null>(null);

    // Filter users based on search query
    const filteredUsers = useMemo(() => {
        if (!searchQuery) return mockUsers;

        const query = searchQuery.toLowerCase();
        return mockUsers.filter(
            (user) =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.role.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const handleView = (user: User) => {
        setUserToView(user);
        setDetailDrawerOpen(true);
    };

    const handleEdit = (user: User) => {
        setUserToEdit(user);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (user: User) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (userToDelete) {
            console.log('Delete user:', userToDelete);
            // TODO: Implement actual delete logic
        }
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const handleAddUser = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateUser = async (data: UserFormData) => {
        console.log('Creating user:', data);
        // TODO: Implement actual create logic (API call, state update, etc.)
        // For now, just simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    const handleEditUser = async (data: UserFormData) => {
        console.log('Updating user:', userToEdit?.id, data);
        // TODO: Implement actual update logic (API call, state update, etc.)
        // For now, just simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Users
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your team members and their account permissions.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddUser}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Add User
                </Button>
            </Box>

            {/* Search Bar */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search users by name, email, or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ maxWidth: 500 }}
                />
            </Box>

            {/* Users Table */}
            <UserTable
                users={filteredUsers}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    Delete User
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete <strong>{userToDelete?.name}</strong>?
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Create User Dialog */}
            <UserFormDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSubmit={handleCreateUser}
                mode="create"
            />

            {/* Edit User Dialog */}
            <UserFormDialog
                open={editDialogOpen}
                onClose={() => {
                    setEditDialogOpen(false);
                    setUserToEdit(null);
                }}
                onSubmit={handleEditUser}
                defaultValues={userToEdit ? {
                    name: userToEdit.name,
                    email: userToEdit.email,
                    role: userToEdit.role,
                    status: userToEdit.status,
                } : undefined}
                mode="edit"
            />

            {/* User Detail Drawer */}
            <UserDetailDrawer
                open={detailDrawerOpen}
                onClose={() => {
                    setDetailDrawerOpen(false);
                    setUserToView(null);
                }}
                user={userToView}
            />
        </Box>
    );
}
