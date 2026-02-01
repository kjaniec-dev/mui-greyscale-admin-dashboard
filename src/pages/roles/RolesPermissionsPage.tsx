import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    IconButton,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Tabs,
    Tab,
    useTheme,
    Tooltip,
    Avatar,
    alpha,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Security as SecurityIcon,
    AdminPanelSettings as AdminIcon,
    Person as UserIcon,
    Visibility as ViewerIcon,
    SupervisorAccount as ManagerIcon,
    Check as CheckIcon,
    Close as CloseIcon,
} from '@mui/icons-material';

interface Role {
    id: string;
    name: string;
    description: string;
    color: string;
    usersCount: number;
    permissions: string[];
    isSystem: boolean;
}

interface Permission {
    id: string;
    name: string;
    description: string;
    module: string;
}

const permissionModules = [
    'Users',
    'Products',
    'Orders',
    'Customers',
    'Invoices',
    'Reports',
    'Settings',
];

const permissionActions = ['view', 'create', 'edit', 'delete'];

const allPermissions: Permission[] = permissionModules.flatMap((module) =>
    permissionActions.map((action) => ({
        id: `${module.toLowerCase()}.${action}`,
        name: `${action.charAt(0).toUpperCase() + action.slice(1)} ${module}`,
        description: `Can ${action} ${module.toLowerCase()}`,
        module,
    }))
);

const initialRoles: Role[] = [
    {
        id: '1',
        name: 'Administrator',
        description: 'Full system access with all permissions',
        color: '#E53935',
        usersCount: 2,
        permissions: allPermissions.map((p) => p.id),
        isSystem: true,
    },
    {
        id: '2',
        name: 'Manager',
        description: 'Can manage users, orders, and view reports',
        color: '#1E88E5',
        usersCount: 5,
        permissions: [
            'users.view', 'users.create', 'users.edit',
            'products.view', 'products.create', 'products.edit',
            'orders.view', 'orders.create', 'orders.edit', 'orders.delete',
            'customers.view', 'customers.create', 'customers.edit',
            'invoices.view', 'invoices.create',
            'reports.view',
            'settings.view',
        ],
        isSystem: false,
    },
    {
        id: '3',
        name: 'Editor',
        description: 'Can create and edit content',
        color: '#43A047',
        usersCount: 8,
        permissions: [
            'products.view', 'products.create', 'products.edit',
            'orders.view',
            'customers.view',
            'invoices.view',
        ],
        isSystem: false,
    },
    {
        id: '4',
        name: 'Viewer',
        description: 'Read-only access to most resources',
        color: '#757575',
        usersCount: 12,
        permissions: [
            'users.view',
            'products.view',
            'orders.view',
            'customers.view',
            'invoices.view',
            'reports.view',
        ],
        isSystem: false,
    },
];

const roleIcons: Record<string, React.ReactNode> = {
    Administrator: <AdminIcon />,
    Manager: <ManagerIcon />,
    Editor: <UserIcon />,
    Viewer: <ViewerIcon />,
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
    return (
        <Box role="tabpanel" hidden={value !== index} sx={{ pt: 3 }}>
            {value === index && children}
        </Box>
    );
}

export function RolesPermissionsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [activeTab, setActiveTab] = useState(0);
    const [roles, setRoles] = useState<Role[]>(initialRoles);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [editForm, setEditForm] = useState({
        name: '',
        description: '',
        permissions: [] as string[],
    });

    const handleOpenCreateDialog = () => {
        setSelectedRole(null);
        setEditForm({ name: '', description: '', permissions: [] });
        setEditDialogOpen(true);
    };

    const handleOpenEditDialog = (role: Role) => {
        setSelectedRole(role);
        setEditForm({
            name: role.name,
            description: role.description,
            permissions: [...role.permissions],
        });
        setEditDialogOpen(true);
    };

    const handleOpenDeleteDialog = (role: Role) => {
        setSelectedRole(role);
        setDeleteDialogOpen(true);
    };

    const handleSaveRole = () => {
        if (selectedRole) {
            setRoles((prev) =>
                prev.map((r) =>
                    r.id === selectedRole.id
                        ? { ...r, ...editForm }
                        : r
                )
            );
        } else {
            const newRole: Role = {
                id: Date.now().toString(),
                name: editForm.name,
                description: editForm.description,
                color: '#757575',
                usersCount: 0,
                permissions: editForm.permissions,
                isSystem: false,
            };
            setRoles((prev) => [...prev, newRole]);
        }
        setEditDialogOpen(false);
    };

    const handleDeleteRole = () => {
        if (selectedRole) {
            setRoles((prev) => prev.filter((r) => r.id !== selectedRole.id));
        }
        setDeleteDialogOpen(false);
    };

    const handleTogglePermission = (permissionId: string) => {
        setEditForm((prev) => ({
            ...prev,
            permissions: prev.permissions.includes(permissionId)
                ? prev.permissions.filter((p) => p !== permissionId)
                : [...prev.permissions, permissionId],
        }));
    };

    const handleToggleModuleAll = (module: string) => {
        const modulePermissions = allPermissions
            .filter((p) => p.module === module)
            .map((p) => p.id);
        const allSelected = modulePermissions.every((p) =>
            editForm.permissions.includes(p)
        );

        setEditForm((prev) => ({
            ...prev,
            permissions: allSelected
                ? prev.permissions.filter((p) => !modulePermissions.includes(p))
                : [...new Set([...prev.permissions, ...modulePermissions])],
        }));
    };

    const sectionPaperSx = {
        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Roles & Permissions
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage user roles and access control
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreateDialog}
                    sx={{
                        bgcolor: '#171717',
                        '&:hover': { bgcolor: '#262626' },
                    }}
                >
                    Create Role
                </Button>
            </Box>

            <Paper sx={{ mb: 3, px: 2 }}>
                <Tabs
                    value={activeTab}
                    onChange={(_, v) => setActiveTab(v)}
                    sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                >
                    <Tab icon={<SecurityIcon />} iconPosition="start" label="Roles" />
                    <Tab icon={<AdminIcon />} iconPosition="start" label="Permission Matrix" />
                </Tabs>
            </Paper>

            {/* Roles Tab */}
            <TabPanel value={activeTab} index={0}>
                <TableContainer component={Paper} sx={sectionPaperSx}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Role</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="center">Users</TableCell>
                                <TableCell align="center">Permissions</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roles.map((role) => (
                                <TableRow key={role.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                sx={{
                                                    bgcolor: alpha(role.color, 0.15),
                                                    color: role.color,
                                                    width: 40,
                                                    height: 40,
                                                }}
                                            >
                                                {roleIcons[role.name] || <SecurityIcon />}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body2" fontWeight={600}>
                                                    {role.name}
                                                </Typography>
                                                {role.isSystem && (
                                                    <Chip
                                                        label="System"
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ mt: 0.5, height: 20, fontSize: 10 }}
                                                    />
                                                )}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="text.secondary">
                                            {role.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={role.usersCount}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={`${role.permissions.length}/${allPermissions.length}`}
                                            size="small"
                                            color={role.permissions.length === allPermissions.length ? 'success' : 'default'}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleOpenEditDialog(role)}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        {!role.isSystem && (
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleOpenDeleteDialog(role)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>

            {/* Permission Matrix Tab */}
            <TabPanel value={activeTab} index={1}>
                <TableContainer component={Paper} sx={sectionPaperSx}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, minWidth: 150 }}>Module</TableCell>
                                {roles.map((role) => (
                                    <TableCell key={role.id} align="center" sx={{ fontWeight: 600, minWidth: 100 }}>
                                        {role.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {permissionModules.map((module) => (
                                <>
                                    <TableRow key={module} sx={{ bgcolor: isDarkMode ? '#0A0A0A' : '#F5F5F5' }}>
                                        <TableCell colSpan={roles.length + 1}>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {module}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    {permissionActions.map((action) => {
                                        const permissionId = `${module.toLowerCase()}.${action}`;
                                        return (
                                            <TableRow key={permissionId} hover>
                                                <TableCell sx={{ pl: 4 }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {action.charAt(0).toUpperCase() + action.slice(1)}
                                                    </Typography>
                                                </TableCell>
                                                {roles.map((role) => (
                                                    <TableCell key={role.id} align="center">
                                                        {role.permissions.includes(permissionId) ? (
                                                            <CheckIcon sx={{ color: 'success.main', fontSize: 18 }} />
                                                        ) : (
                                                            <CloseIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        );
                                    })}
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>

            {/* Edit/Create Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {selectedRole ? 'Edit Role' : 'Create Role'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Role Name"
                            value={editForm.name}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                            fullWidth
                            disabled={selectedRole?.isSystem}
                        />
                        <TextField
                            label="Description"
                            value={editForm.description}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                            fullWidth
                            multiline
                            rows={2}
                        />

                        <Box>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                Permissions
                            </Typography>
                            {permissionModules.map((module) => {
                                const modulePermissions = allPermissions.filter((p) => p.module === module);
                                const selectedCount = modulePermissions.filter((p) =>
                                    editForm.permissions.includes(p.id)
                                ).length;
                                const allSelected = selectedCount === modulePermissions.length;
                                const someSelected = selectedCount > 0 && !allSelected;

                                return (
                                    <Paper
                                        key={module}
                                        sx={{
                                            p: 2,
                                            mb: 1,
                                            bgcolor: isDarkMode ? '#0A0A0A' : '#FAFAFA',
                                        }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={allSelected}
                                                    indeterminate={someSelected}
                                                    onChange={() => handleToggleModuleAll(module)}
                                                />
                                            }
                                            label={
                                                <Typography fontWeight={600}>
                                                    {module}
                                                </Typography>
                                            }
                                        />
                                        <FormGroup row sx={{ pl: 4 }}>
                                            {modulePermissions.map((permission) => (
                                                <FormControlLabel
                                                    key={permission.id}
                                                    control={
                                                        <Checkbox
                                                            checked={editForm.permissions.includes(permission.id)}
                                                            onChange={() => handleTogglePermission(permission.id)}
                                                            size="small"
                                                        />
                                                    }
                                                    label={
                                                        <Typography variant="body2">
                                                            {permission.name.split(' ')[0]}
                                                        </Typography>
                                                    }
                                                    sx={{ mr: 3, minWidth: 80 }}
                                                />
                                            ))}
                                        </FormGroup>
                                    </Paper>
                                );
                            })}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSaveRole}
                        disabled={!editForm.name.trim()}
                        sx={{
                            bgcolor: '#171717',
                            '&:hover': { bgcolor: '#262626' },
                        }}
                    >
                        {selectedRole ? 'Save Changes' : 'Create Role'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Role</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete the role "{selectedRole?.name}"?
                        {selectedRole?.usersCount ? (
                            <Typography color="error" sx={{ mt: 1 }}>
                                Warning: {selectedRole.usersCount} users are assigned to this role.
                            </Typography>
                        ) : null}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={handleDeleteRole}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
