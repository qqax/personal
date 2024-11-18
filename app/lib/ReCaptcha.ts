type ReCaptchaResponse = {
    "success": true | false,
    "challenge_ts": string,
    "hostname": string,
    "error-codes": string[]
}

export default async function verifyReCaptcha(token: string): Promise<ReCaptchaResponse> {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
    try {
        const response = await fetch(url, {method: "POST"});
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Fetch error: ${error}`);
    }
}