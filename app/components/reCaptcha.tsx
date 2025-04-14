'use client';

import { useReCaptcha } from "next-recaptcha-v3";

const {
    /** reCAPTCHA_site_key */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reCaptchaKey,
    /** Global ReCaptcha object */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    grecaptcha,
    /** Is ReCaptcha script loaded */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loaded,
    /** Is ReCaptcha script failed to load */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
    /** Other hook props */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...otherProps
// eslint-disable-next-line react-hooks/rules-of-hooks
} = useReCaptcha();
