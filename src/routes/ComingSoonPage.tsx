interface ComingSoonPageProps {
    title: string;
}

export function ComingSoonPage({ title }: ComingSoonPageProps) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
                textAlign: 'center',
            }}
        >
            <h2 style={{ marginBottom: '8px', fontWeight: 600 }}>{title}</h2>
            <p style={{ color: '#737373' }}>This page is coming soon.</p>
        </div>
    );
}
