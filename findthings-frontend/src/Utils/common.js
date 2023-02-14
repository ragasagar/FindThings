/**      getUser function:
     *   To get the user information, stores it in the sessionStorage.
     *   Will return user information if user exists else will return null if user doesn't exist.
     */
export const getUser = () =>
{
    const userStr = sessionStorage.getItem("user");
    if(userStr) return JSON.parser(userStr)
    else return null;
}

/**
 *      getToken function:
     *   To get the user token.
     */
export const getToken = () =>
{
    return sessionStorage.getItem("token") || null
}

/**      setUserSession function:
     *   To set the user information and token.
     */
export const setUserSession = () =>
{
    sessionStorage.setItem("token", token)
    sessionStorage.setItem("user", JSON.stringify(user))
}

/**      removeUserSession function:
     *   Removing the user session if no longer required(e.g If user Logs out)
     */
export const removeUserSession = () =>
{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
}