import { describe, expect, it, vi } from 'vitest';
import { action } from '~/routes/api.contact';

// Mock Resend to avoid actual emails
vi.mock('resend', () => {
    return {
        Resend: class {
            emails = {
                send: vi.fn().mockResolvedValue({ id: 'mock-id' })
            }
        }
    };
});

describe('Contact Action Logic', () => {

    // Helper to mock request
    const createRequest = (formData: Record<string, string>) => {
        const body = new URLSearchParams(formData);
        return new Request('http://localhost/api/contact', {
            method: 'POST',
            body: body
        });
    };

    // Helper to parse response
    const parseResponse = async (response: any) => {
        if (typeof response.json === 'function') {
            return response.json();
        }
        if (response.data) {
            return response.data;
        }
        return response;
    };

    it('should validate empty fields', async () => {
        const request = createRequest({ name: '', email: '', message: '' });
        const response = await action({ request, params: {}, context: {} });
        const json = await parseResponse(response);

        expect(json.error).toBe("Please check the form for errors.");
        expect(json.details.name).toBeDefined();
    });

    it('should validate invalid email', async () => {
        const request = createRequest({ name: 'Santi', email: 'not-an-email', message: 'Hello' });
        const response = await action({ request, params: {}, context: {} });
        const json = await parseResponse(response);

        expect(json.error).toBe("Please check the form for errors.");
        expect(json.details.email).toBeDefined();
    });

    it('should validate short message', async () => {
        const request = createRequest({ name: 'Santi', email: 'test@example.com', message: 'Hi' });
        const response = await action({ request, params: {}, context: {} });
        const json = await parseResponse(response);

        expect(json.error).toBe("Please check the form for errors.");
        expect(json.details.message).toBeDefined();
    });

    it('should accept valid submission', async () => {
        const request = createRequest({
            name: 'Recruiter',
            email: 'recruiter@google.com',
            message: 'We want to hire you immediately for a Staff Engineer role.'
        });
        const response = await action({ request, params: {}, context: {} });
        const json = await parseResponse(response);

        expect(json.success).toBe(true);
    });
});
