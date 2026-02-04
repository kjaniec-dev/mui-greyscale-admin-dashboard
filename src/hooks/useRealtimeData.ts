import { useState, useEffect, useCallback, useRef } from 'react';
import {
    type RealtimeData,
    type RealtimeMetric,
    type RealtimeChartPoint,
    type RealtimeActivity,
    getInitialMetrics,
    getInitialChartData,
    getInitialActivities,
    generateMetricUpdate,
    generateNewChartPoint,
    generateActivity,
} from '../data/realtimeData';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

interface UseRealtimeDataOptions {
    updateInterval?: number; // milliseconds
    chartMaxPoints?: number;
    activitiesMaxItems?: number;
    autoConnect?: boolean;
}

interface UseRealtimeDataReturn {
    data: RealtimeData;
    status: ConnectionStatus;
    connect: () => void;
    disconnect: () => void;
}

export function useRealtimeData(options: UseRealtimeDataOptions = {}): UseRealtimeDataReturn {
    const {
        updateInterval = 3000,
        chartMaxPoints = 30,
        activitiesMaxItems = 10,
        autoConnect = true,
    } = options;

    const [status, setStatus] = useState<ConnectionStatus>('disconnected');
    const [metrics, setMetrics] = useState<RealtimeMetric[]>(() => getInitialMetrics());
    const [chartData, setChartData] = useState<RealtimeChartPoint[]>(() => getInitialChartData());
    const [activities, setActivities] = useState<RealtimeActivity[]>(() => getInitialActivities());
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    const intervalRef = useRef<number | null>(null);
    const activityIntervalRef = useRef<number | null>(null);
    const statusRef = useRef<ConnectionStatus>(status);
    const connectTimeoutRef = useRef<number | null>(null);

    // Keep statusRef in sync
    useEffect(() => {
        statusRef.current = status;
    }, [status]);

    const disconnect = useCallback(() => {
        if (connectTimeoutRef.current) {
            clearTimeout(connectTimeoutRef.current);
            connectTimeoutRef.current = null;
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (activityIntervalRef.current) {
            clearInterval(activityIntervalRef.current);
            activityIntervalRef.current = null;
        }
        setStatus('disconnected');
    }, []);

    const connect = useCallback(() => {
        // Use ref to check current status to avoid stale closure
        if (statusRef.current === 'connected' || statusRef.current === 'connecting') return;

        setStatus('connecting');

        // Simulate connection delay
        connectTimeoutRef.current = window.setTimeout(() => {
            setStatus('connected');

            // Start metrics and chart update interval
            intervalRef.current = window.setInterval(() => {
                setMetrics((prev) => generateMetricUpdate(prev));
                setChartData((prev) => {
                    const newPoint = generateNewChartPoint(prev[prev.length - 1]);
                    const updated = [...prev, newPoint];
                    // Keep only the last N points
                    return updated.slice(-chartMaxPoints);
                });
                setLastUpdated(new Date());
            }, updateInterval);

            // Start activity update interval (slightly faster for more liveness)
            activityIntervalRef.current = window.setInterval(() => {
                if (Math.random() > 0.3) { // 70% chance of new activity
                    setActivities((prev) => {
                        const newActivity = generateActivity();
                        const updated = [newActivity, ...prev];
                        return updated.slice(0, activitiesMaxItems);
                    });
                }
            }, updateInterval * 0.7);
        }, 800); // Simulate connection delay
    }, [updateInterval, chartMaxPoints, activitiesMaxItems]);

    // Auto-connect on mount if enabled
    useEffect(() => {
        if (autoConnect) {
            connect();
        }

        return () => {
            disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run on mount/unmount

    return {
        data: {
            metrics,
            chartData,
            activities,
            lastUpdated,
        },
        status,
        connect,
        disconnect,
    };
}
