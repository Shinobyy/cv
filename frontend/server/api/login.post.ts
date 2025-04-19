export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    console.log('Received login request:', body);
    
    if (!body.email || !body.password) {
        throw createError({
            statusCode: 400,
            message: 'Email and password are required'
        });
    }

    if (body.email === 'test@test.fr' && body.password === 'test') {
        await setUserSession(event, {
            user: {
                id: 1,
                role: 'admin',
                name: 'Test User',
            }
        });
        return {}
    }

    throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
    })
});