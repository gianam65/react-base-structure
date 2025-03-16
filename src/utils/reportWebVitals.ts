import { onLCP,  onCLS, onFCP } from 'web-vitals';

export const reportWebVitals = () => {
    const url = import.meta.env.VITE_BASE_URL + '/api/v1/public/web-vitals';

    onCLS((report) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(report),
        });
    });

    onFCP((report) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(report),
        });
    });

    onLCP((report) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(report),
        });
    });
};
