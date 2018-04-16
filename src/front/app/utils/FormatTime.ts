const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
});

export const formatTime =  (timestamp: Date): string => timeFormatter.format(timestamp)
