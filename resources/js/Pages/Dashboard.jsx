import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Container, Paper, TextField, Button, Typography, Box, Grid, Chip, 
    ThemeProvider, createTheme, CssBaseline 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import KeyIcon from '@mui/icons-material/Key';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#EAB308' },
        background: { paper: '#1F2937', default: '#111827' },
        text: { primary: '#F3F4F6', secondary: '#9CA3AF' },
    },
    typography: {
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        h5: { fontWeight: 700, letterSpacing: '.1rem', textTransform: 'uppercase' },
        h4: { fontWeight: 800, color: '#EAB308' }
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& input': {
                        boxShadow: 'none !important',
                        outline: 'none !important',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#4B5563' },
                        '&:hover fieldset': { borderColor: '#EAB308' },
                        '&.Mui-focused fieldset': { borderColor: '#EAB308', borderWidth: '2px' },
                    },
                },
            },
        },
    }
});

export default function Dashboard({ auth, stock, errors }) {
    const { data, setData, post, processing } = useForm({
        symbol: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('stock.fetch'));
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-mono text-xl font-bold text-yellow-500 leading-tight uppercase tracking-widest">Batcomputer Terminal</h2>}
            >
                <Head title="Batcomputer" />

                <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
                    <Paper 
                        elevation={24} 
                        sx={{ 
                            p: 5, 
                            background: 'linear-gradient(145deg, #1f2937 0%, #111827 100%)',
                            border: '1px solid #374151',
                            borderTop: '4px solid #EAB308',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        className="transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]"
                    >
                        {processing && (
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-yellow-500/10 to-transparent animate-scan pointer-events-none"></div>
                        )}

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <div className="flex items-center gap-3 mb-2">
                                <KeyIcon sx={{ color: '#EAB308', fontSize: 40 }} />
                                <div>
                                    <Typography variant="h5" color="primary" sx={{ textShadow: '0 0 10px rgba(234,179,8,0.5)' }}>
                                        Target Acquisition
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                                        SYSTEM READY // ENTER TICKER SYMBOL
                                    </Typography>
                                </div>
                            </div>

                            <TextField
                                label="STOCK SYMBOL"
                                variant="outlined"
                                fullWidth
                                placeholder="AAPL"
                                value={data.symbol}
                                onChange={(e) => setData('symbol', e.target.value)}
                                error={!!errors.symbol}
                                helperText={errors.symbol || "SECURE CONNECTION ESTABLISHED"}
                                disabled={processing}
                                autoFocus
                                InputProps={{
                                    sx: { fontSize: '1.2rem', fontFamily: 'monospace', letterSpacing: '2px' }
                                }}
                            />

                            <Button 
                                type="submit" 
                                variant="contained" 
                                size="large" 
                                startIcon={processing ? <span className="animate-spin">⟳</span> : <SearchIcon />}
                                disabled={processing}
                                sx={{ 
                                    mt: 2, 
                                    py: 1.5,
                                    bgcolor: '#EAB308',
                                    color: '#000',
                                    fontWeight: 'bold',
                                    letterSpacing: '1px',
                                    '&:hover': { bgcolor: '#CA8A04', transform: 'scale(1.02)' },
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                {processing ? 'INITIATING SCAN...' : 'ANALYZE MARKET DATA'}
                            </Button>
                        </Box>
                    </Paper>

                    {stock && (
                        <div className="animate-fade-in-up mt-8">
                            <Paper 
                                sx={{ 
                                    p: 0, 
                                    bgcolor: '#000', 
                                    border: '1px solid #4B5563',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div className="bg-yellow-500 text-black px-4 py-2 font-bold font-mono flex justify-between items-center">
                                    <span>REPORT: {stock.symbol}</span>
                                    <span className="animate-pulse">● LIVE</span>
                                </div>
                                
                                <Box sx={{ p: 4 }}>
                                    <Grid container spacing={4} alignItems="center">
                                        <Grid item xs={12} md={4} sx={{ textAlign: 'center', borderRight: { md: '1px solid #333' } }}>
                                            <Typography color="text.secondary" variant="caption" display="block" gutterBottom>
                                                CURRENT VALUATION
                                            </Typography>
                                            <Typography variant="h4" sx={{ textShadow: '0 0 20px rgba(234,179,8,0.4)' }}>
                                                ${stock.current}
                                            </Typography>
                                            <Chip 
                                                label={stock.current >= stock.open ? "▲ UPTREND" : "▼ DOWNTREND"} 
                                                color={stock.current >= stock.open ? "success" : "error"} 
                                                size="small" 
                                                sx={{ mt: 1, fontWeight: 'bold' }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={8}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Box sx={{ p: 2, bgcolor: '#111827', borderRadius: 1, borderLeft: '3px solid #EAB308' }}>
                                                        <Typography variant="caption" color="text.secondary">OPEN</Typography>
                                                        <Typography variant="h6">${stock.open}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Box sx={{ p: 2, bgcolor: '#111827', borderRadius: 1, borderLeft: '3px solid #EAB308' }}>
                                                        <Typography variant="caption" color="text.secondary">HIGH</Typography>
                                                        <Typography variant="h6">${stock.high}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Box sx={{ p: 2, bgcolor: '#111827', borderRadius: 1, borderLeft: '3px solid #EAB308' }}>
                                                        <Typography variant="caption" color="text.secondary">LOW</Typography>
                                                        <Typography variant="h6">${stock.low}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Box sx={{ p: 2, bgcolor: '#111827', borderRadius: 1, borderLeft: '3px solid #EAB308' }}>
                                                        <Typography variant="caption" color="text.secondary">SYMBOL</Typography>
                                                        <Typography variant="h6">{stock.symbol}</Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </div>
                    )}
                </Container>
                <style>{`
                    @keyframes scan {
                        0% { top: -100%; }
                        100% { top: 100%; }
                    }
                    .animate-scan {
                        animation: scan 2s linear infinite;
                    }
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in-up {
                        animation: fadeInUp 0.6s ease-out forwards;
                    }
                `}</style>
            </AuthenticatedLayout>
        </ThemeProvider>
    );
}