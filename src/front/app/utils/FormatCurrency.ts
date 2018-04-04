const numberFormatter = Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
});

export const formatCurrency = (amount: number): string => numberFormatter.format(amount)
