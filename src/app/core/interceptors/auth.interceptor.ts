import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // MSAL token injection goes here when Azure AD auth is wired up
    // MSAL = Microsoft Authentication Library. It's Microsoft's official library for connecting any app to Azure Active Directory (Azure AD)
    // "Hey Microsoft, this user wants to log in"
    // → Microsoft shows the M365 login screen
    // → User logs in with their work account
    // → Microsoft gives Angular a JWT token
    // → Angular attaches that token to every API request
    // → Your .NET API validates the token
    // → User is authenticated
    return next(req);
}