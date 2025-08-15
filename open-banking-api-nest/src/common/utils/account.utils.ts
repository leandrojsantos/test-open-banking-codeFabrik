export const generateAccountNumber = (): string => {
    const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
    const checkDigit = Math.floor(Math.random() * 10).toString();
    return `${randomPart}-${checkDigit}`;
};