const numberFormatter = Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'ETH',
    minimumFractionDigits: 2,
});

export const formatCurrency = (amount: number): string => numberFormatter.format(amount)
