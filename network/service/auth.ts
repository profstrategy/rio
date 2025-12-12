export async function syncTwitterAccount() {
    try {
        const body = await fetch('/api/user/sync-twitter', {
            method: 'POST',
        });
        if (!body.ok) {
            throw new Error('Failed to sync Twitter account');
        }
        return await body.json();
    } catch (error) {

    }
}