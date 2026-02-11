// src/utils/testData.ts

export function randomString(prefix: string = 'Auto'): string {
    return `${prefix}_${Math.random().toString(36).substring(2, 8)}`;
}

export function leadData() {
    return {
        firstName: randomString('Priyanka'),
        lastName: randomString('Chopra'),
        company: randomString('TestCompany'),
        leadSource: 'Web',
    };
}