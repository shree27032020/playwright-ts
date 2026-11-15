import { test, expect } from '@playwright/test';

const API = 'https://jsonplaceholder.typicode.com';

test.describe('Posts API', () => {
  test('GET a single post', async ({ request }) => {
    const response = await request.get(`${API}/posts/1`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body).toHaveProperty('title');
  });

  test('GET all posts returns 100 items', async ({ request }) => {
    const response = await request.get(`${API}/posts`);

    await expect(response).toBeOK();
    const body = await response.json();
    expect(body).toHaveLength(100);
  });

  test('POST creates a post', async ({ request }) => {
    const response = await request.post(`${API}/posts`, {
      data: { title: 'My first post', body: 'Hello API', userId: 1 },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe('My first post');
    expect(body.id).toBeDefined();
  });

  test('GET a missing post returns 404', async ({ request }) => {
    const response = await request.get(`${API}/posts/99999`);

    expect(response.status()).toBe(404);
  });

   test('PUT updates a post', async ({ request }) => {
        const response = await request.put(`${API}/posts/1`, {
            data: { title: 'Updated post', body: 'Updated content', userId: 1 },
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.title).toBe('Updated post');
    });
  
    test('DELETE removes a post', async ({ request }) => {
        const response = await request.delete(`${API}/posts/1`);
        expect(response.status()).toBe(200);
    });
  
    test('GET posts filtered by userId', async ({ request }) => {
        const response = await request.get(`${API}/posts?userId=1`);

        await expect(response).toBeOK();
        const body = await response.json();
        expect(body.length).toBeGreaterThan(0);
        for (const post of body) {
            expect(post.userId).toBe(1);
        }
    });
});