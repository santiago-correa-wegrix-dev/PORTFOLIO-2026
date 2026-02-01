import { describe, expect, it, vi } from 'vitest';

import { loader } from '~/routes/api.chat';

// Mock Fuse since it's a heavy dependency and logic internal to loader
vi.mock('fuse.js', () => {
    return {
        default: class MockFuse {
            search(query: string) {
                if (query.includes('project')) return [{ score: 0.1, item: { type: 'project', title: 'Mock Project', content: 'Desc' } }];
                return [];
            }
        }
    };
});

// Mock Data
vi.mock('~/data/experience', () => ({ experiences: [] }));
vi.mock('~/data/projects', () => ({ realProjects: [] }));
vi.mock('~/data/knowledge-base', () => ({ KNOWLEDGE_BASE: [] }));

describe('Chat Loader Logic', () => {

    // Helper to mock request
    const createRequest = (url: string) => new Request(url);

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

    it('should return default message for empty query', async () => {
        const response = await loader({ request: createRequest('http://localhost/api/chat'), params: {}, context: {} });
        const json = await parseResponse(response);
        expect(json.text).toContain("I'm listening");
    });

    it('should detect Jibberish', async () => {
        const response = await loader({ request: createRequest('http://localhost/api/chat?q=asdfasdf'), params: {}, context: {} });
        const json = await parseResponse(response);
        expect(json.text).toContain("articulate");
    });

    it('should handle Hiring Intent', async () => {
        const response = await loader({ request: createRequest('http://localhost/api/chat?q=hire%20santiago'), params: {}, context: {} });
        const json = await parseResponse(response);
        expect(json.text).toContain("YES");
        expect(json.action).toBe("/#contact");
    });

    it('should handle Creator Question', async () => {
        const response = await loader({ request: createRequest('http://localhost/api/chat?q=who%20made%20you'), params: {}, context: {} });
        const json = await parseResponse(response);
        expect(json.text).toContain("built by **Santi**");
    });

    it('should handle Security Threats', async () => {
        const response = await loader({ request: createRequest('http://localhost/api/chat?q=<script>alert(1)</script>'), params: {}, context: {} });
        const json = await parseResponse(response);
        expect(json.text).toContain("Nice try");
    });
});
