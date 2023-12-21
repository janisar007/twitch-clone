import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: [ //here we are saying to clerk what routes an be accssed by users without having an account in the app.
        "/", //i want users to see streams. whether they are logged in or not. but they can only start a stream if they are logged in.
        "/api/webhooks(.*)" //means /api/webhooks/_ANYTHING
    ]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};