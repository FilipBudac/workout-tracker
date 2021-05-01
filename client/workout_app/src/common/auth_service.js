const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const EXPIRATION_DATE_KEY = "expiration_date";

export const saveAuthData = (data) => {
    saveAccessToken(data.access_token)
    saveRefreshToken(data.refresh_token)
    saveExpirationDate(data.expires_in)
};

export const destroyAuthData = () => {
    destroyAccessToken()
    destroyRefreshToken()
    destroyExpirationDate()
};

export const getAccessToken = () => {
    return window.localStorage.getItem(ACCESS_TOKEN_KEY)
};

const saveAccessToken = token => {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token)
};

const destroyAccessToken = () => {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
};

export const getRefreshToken = () => {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY)
};

const saveRefreshToken = token => {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, token)
};

export const destroyRefreshToken = () => {
    window.localStorage.removeItem(REFRESH_TOKEN_KEY)
};

export const getExpirationDate = () => {
    return window.localStorage.getItem(EXPIRATION_DATE_KEY)
};

const saveExpirationDate = expiration => {
    const now = new Date(Date.now())

    const utcTimestamp = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
        now.getUTCMilliseconds()
    ) + expiration;

    window.localStorage.setItem(EXPIRATION_DATE_KEY, utcTimestamp.toString());
};

export const hasTokenExpired = () => {
    const now = new Date(Date.now())

    const utcTimestamp = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
        now.getUTCMilliseconds()
    )

    const expirationDate = parseInt(getExpirationDate())

    return expirationDate >= utcTimestamp
}

const destroyExpirationDate = () => {
    window.localStorage.removeItem(EXPIRATION_DATE_KEY);
};


export default {
    saveAuthData,
    destroyAuthData,
    hasTokenExpired,
    getAccessToken,
    getRefreshToken,
    getExpirationDate,
};