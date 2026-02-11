export const LeadTestData = {
    validLead: {
        firstName: 'GovTech',
        lastName: 'Candidate',
        company: 'Singapore Public Service',
        leadSource: 'Web',
        status: 'Working - Contacted'
    },
    // You can add more scenarios here later
    invalidLead: {
        firstName: '',
        lastName: 'MissingFirst',
        company: 'Error Inc'
    }
};

/**
 * Helper to generate a unique lead name to avoid duplicates in Salesforce
 */
export const generateUniqueLead = () => {
    const timestamp = Date.now();
    return {
        ...LeadTestData.validLead,
        firstName: `QE_User_${timestamp}`,
        fullName: `QE_User_${timestamp} ${LeadTestData.validLead.lastName}`
    };
};