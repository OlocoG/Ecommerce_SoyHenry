export function validate (request) {
    const authHeader = request.headers.authorization; // Basic: email:password
    if (!authHeader) {
        return false;
    }
    const auth = authHeader.split(' ')[1]; // email:password
    if (!auth) {
        return false;
    }
    const [email, password] = auth.split(':'); // email, password
    if (!email || !password) {
        return false;
    }
    return true;
}