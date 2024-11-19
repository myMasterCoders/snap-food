
export default defineEventHandler(async (event) => {
    
    const { public: { baseUrl } } = useRuntimeConfig();
    const body = await readBody(event);
    const token = getCookie(event, 'token');
    const query = getQuery(event);

    try {
        const data = await $fetch(`${baseUrl}${query.url}`, {
            method: 'POST',
            body: body,
            headers: {
                'Accept': "application/json",
                'Authorization' : `Bearer ${token}`
            }
        })
        return data.data
    } catch (error) {
        return error;
    }

})