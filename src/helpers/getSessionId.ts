import { cookies } from "next/headers"

export const getSessionId = async () => {
    const cookieStore = await cookies();

    let sessionId = cookieStore.get('sessionId')?.value;

    if (!sessionId) {
        const time = new Date().getTime().toString(36);
        const randomNumber = Math.random().toString(36).substring(2, 10);

        sessionId = `${time}_${randomNumber}`;

        cookieStore.set("sessionId", sessionId, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
        })
    }
    return sessionId

}