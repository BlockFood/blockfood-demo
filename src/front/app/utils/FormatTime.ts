const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
});

export const formatTime =  (timestamp: number | Date): string => timeFormatter.format(timestamp)
