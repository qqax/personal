'use client'

import {useReCaptcha} from "next-recaptcha-v3";

const {
    /** reCAPTCHA_site_key */
    reCaptchaKey,
    /** Global ReCaptcha object */
    grecaptcha,
    /** Is ReCaptcha script loaded */
    loaded,
    /** Is ReCaptcha script failed to load */
    error,
    /** Other hook props */
    ...otherProps
} = useReCaptcha();
