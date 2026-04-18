import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Tooltip,
    Snackbar,
    useTheme,
} from '@mui/material';
import {
    Add as AddIcon,
    ContentCopy as CopyIcon,
    Delete as DeleteIcon,
    Block as RevokeIcon,
    Key as KeyIcon,
} from '@mui/icons-material';
import {
    mockApiKeys,
    permissionLabels,
    permissionDescriptions,
    permissionColors,
    expiryOptions,
    maskApiKey,
    generateMockApiKey,
    type ApiKey,
    type ApiKeyPermission,
} from '../../data/mockApiKeys';
import { getStatusSolid } from '../../theme';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
});

export function ApiKeysPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [keys, setKeys] = useState<ApiKey[]>(mockApiKeys);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
    const [newKeyCreated, setNewKeyCreated] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Create key form state
    const [keyName, setKeyName] = useState('');
    const [keyPermissions, setKeyPermissions] = useState<ApiKeyPermission[]>(['read']);
    const [keyExpiry, setKeyExpiry] = useState<number | null>(90);

    const sortedKeys = useMemo(() => {
        return [...keys].sort((a, b) => {
            // Active first, then by creation date
            if (a.status === 'active' && b.status !== 'active') return -1;
            if (a.status !== 'active' && b.status === 'active') return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }, [keys]);

    const handleCreateKey = () => {
        const fullKey = generateMockApiKey();
        const newKey: ApiKey = {
            id: `key-${Date.now()}`,
            name: keyName,
            keyPrefix: fullKey.slice(0, 8),
            keySuffix: fullKey.slice(-4),
            permissions: keyPermissions,
            createdAt: new Date().toISOString(),
            expiresAt: keyExpiry
                ? new Date(Date.now() + keyExpiry * 24 * 60 * 60 * 1000).toISOString()
                : undefined,
            status: 'active',
            createdBy: 'Current User',
        };

        setKeys([newKey, ...keys]);
        setNewKeyCreated(fullKey);
    };

    const handleCloseCreateDialog = () => {
        setCreateDialogOpen(false);
        setKeyName('');
        setKeyPermissions(['read']);
        setKeyExpiry(90);
        setNewKeyCreated(null);
    };

    const handleRevokeKey = () => {
        if (selectedKey) {
            setKeys(keys.map(k =>
                k.id === selectedKey.id ? { ...k, status: 'revoked' as const } : k
            ));
            setRevokeDialogOpen(false);
            setSelectedKey(null);
            showSnackbar('API key revoked successfully');
        }
    };

    const handleDeleteKey = () => {
        if (selectedKey) {
            setKeys(keys.filter(k => k.id !== selectedKey.id));
            setDeleteDialogOpen(false);
            setSelectedKey(null);
            showSnackbar('API key deleted successfully');
        }
    };

    const handleCopyKey = async (key: ApiKey) => {
        const maskedKey = maskApiKey(key.keyPrefix, key.keySuffix);
        await navigator.clipboard.writeText(maskedKey);
        showSnackbar('Key ID copied to clipboard');
    };

    const handleCopyFullKey = async (fullKey: string) => {
        await navigator.clipboard.writeText(fullKey);
        showSnackbar('API key copied to clipboard');
    };

    const showSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const togglePermission = (permission: ApiKeyPermission) => {
        if (keyPermissions.includes(permission)) {
            setKeyPermissions(keyPermissions.filter(p => p !== permission));
        } else {
            setKeyPermissions([...keyPermissions, permission]);
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            API Keys
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Manage API keys for programmatic access to the dashboard.
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setCreateDialogOpen(true)}
                    >
                        Create New Key
                    </Button>
                </Stack>
            </Box>

            {/* Info Alert */}
            <Alert severity="info" sx={{ mb: 3 }}>
                API keys allow external applications to access your data. Keep your keys secure and never share them publicly.
            </Alert>

            {/* Keys List */}
            <Stack spacing={2}>
                {sortedKeys.map((key) => (
                    <Card
                        key={key.id}
                        sx={{
                            opacity: key.status !== 'active' ? 0.7 : 1,
                        }}
                    >
                        <CardContent>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between">
                                <Box sx={{ flex: 1 }}>
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                                        <KeyIcon color="action" />
                                        <Typography variant="h6" fontWeight={600}>
                                            {key.name}
                                        </Typography>
                                        <Chip
                                            label={key.status}
                                            size="small"
                                            sx={{
                                                textTransform: 'capitalize',
                                                bgcolor: getStatusSolid(key.status, isDarkMode).bg,
                                                color: getStatusSolid(key.status, isDarkMode).text,
                                            }}
                                        />
                                    </Stack>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontFamily: 'monospace',
                                            bgcolor: 'action.hover',
                                            px: 1.5,
                                            py: 0.75,
                                            borderRadius: 1,
                                            display: 'inline-block',
                                            mb: 2,
                                        }}
                                    >
                                        {maskApiKey(key.keyPrefix, key.keySuffix)}
                                    </Typography>

                                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                        {key.permissions.map((perm) => (
                                            <Chip
                                                key={perm}
                                                label={permissionLabels[perm]}
                                                size="small"
                                                color={permissionColors[perm]}
                                                variant="outlined"
                                            />
                                        ))}
                                    </Stack>

                                    <Stack direction="row" spacing={3} flexWrap="wrap">
                                        <Typography variant="caption" color="text.secondary">
                                            Created: {dateFormatter.format(new Date(key.createdAt))}
                                        </Typography>
                                        {key.lastUsedAt && (
                                            <Typography variant="caption" color="text.secondary">
                                                Last used: {dateFormatter.format(new Date(key.lastUsedAt))}
                                            </Typography>
                                        )}
                                        {key.expiresAt && (
                                            <Typography
                                                variant="caption"
                                                color={new Date(key.expiresAt) < new Date() ? 'error.main' : 'text.secondary'}
                                            >
                                                {new Date(key.expiresAt) < new Date() ? 'Expired' : 'Expires'}: {dateFormatter.format(new Date(key.expiresAt))}
                                            </Typography>
                                        )}
                                        {!key.expiresAt && (
                                            <Typography variant="caption" color="text.secondary">
                                                Never expires
                                            </Typography>
                                        )}
                                    </Stack>
                                </Box>

                                <Stack direction="row" spacing={1} alignItems="flex-start">
                                    <Tooltip title="Copy Key ID">
                                        <IconButton onClick={() => handleCopyKey(key)}>
                                            <CopyIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {key.status === 'active' && (
                                        <Tooltip title="Revoke Key">
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedKey(key);
                                                    setRevokeDialogOpen(true);
                                                }}
                                                color="warning"
                                            >
                                                <RevokeIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    <Tooltip title="Delete Key">
                                        <IconButton
                                            onClick={() => {
                                                setSelectedKey(key);
                                                setDeleteDialogOpen(true);
                                            }}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            {/* Create Key Dialog */}
            <Dialog
                open={createDialogOpen}
                onClose={!newKeyCreated ? handleCloseCreateDialog : undefined}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    {newKeyCreated ? 'API Key Created' : 'Create New API Key'}
                </DialogTitle>
                <DialogContent>
                    {newKeyCreated ? (
                        <Box>
                            <Alert severity="warning" sx={{ mb: 3 }}>
                                Make sure to copy your API key now. You won't be able to see it again!
                            </Alert>
                            <Typography variant="subtitle2" gutterBottom>
                                Your API Key:
                            </Typography>
                            <Box
                                sx={{
                                    bgcolor: 'grey.900',
                                    color: 'grey.100',
                                    p: 2,
                                    borderRadius: 1,
                                    fontFamily: 'monospace',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mb: 2,
                                }}
                            >
                                <Typography sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                                    {newKeyCreated}
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => handleCopyFullKey(newKeyCreated)}
                                    sx={{ color: 'grey.100', ml: 1 }}
                                >
                                    <CopyIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    ) : (
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <TextField
                                label="Key Name"
                                placeholder="e.g., Production API Key"
                                value={keyName}
                                onChange={(e) => setKeyName(e.target.value)}
                                fullWidth
                                required
                            />

                            <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                    Permissions
                                </Typography>
                                <FormGroup>
                                    {(Object.keys(permissionLabels) as ApiKeyPermission[]).map((perm) => (
                                        <FormControlLabel
                                            key={perm}
                                            control={
                                                <Checkbox
                                                    checked={keyPermissions.includes(perm)}
                                                    onChange={() => togglePermission(perm)}
                                                />
                                            }
                                            label={
                                                <Box>
                                                    <Typography variant="body2" fontWeight={500}>
                                                        {permissionLabels[perm]}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {permissionDescriptions[perm]}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    ))}
                                </FormGroup>
                            </Box>

                            <FormControl fullWidth>
                                <InputLabel>Expiration</InputLabel>
                                <Select
                                    value={keyExpiry ?? 'never'}
                                    label="Expiration"
                                    onChange={(e) => setKeyExpiry(e.target.value === 'never' ? null : Number(e.target.value))}
                                >
                                    {expiryOptions.map((opt) => (
                                        <MenuItem key={opt.label} value={opt.value ?? 'never'}>
                                            {opt.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    {newKeyCreated ? (
                        <Button onClick={handleCloseCreateDialog} variant="contained">
                            Done
                        </Button>
                    ) : (
                        <>
                            <Button onClick={handleCloseCreateDialog}>Cancel</Button>
                            <Button
                                variant="contained"
                                onClick={handleCreateKey}
                                disabled={!keyName.trim() || keyPermissions.length === 0}
                            >
                                Create Key
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>

            {/* Revoke Confirmation Dialog */}
            <Dialog open={revokeDialogOpen} onClose={() => setRevokeDialogOpen(false)}>
                <DialogTitle>Revoke API Key</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to revoke <strong>{selectedKey?.name}</strong>?
                        This action cannot be undone and any applications using this key will stop working.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRevokeDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleRevokeKey} color="warning" variant="contained">
                        Revoke Key
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete API Key</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to permanently delete <strong>{selectedKey?.name}</strong>?
                        This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteKey} color="error" variant="contained">
                        Delete Key
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Box>
    );
}
