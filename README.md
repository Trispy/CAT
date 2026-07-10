# CAT
- How to set up backend:
- First clone repo from main
- Run the following command in terminal in the root folder (i.e cat):
```
npm install
```
- Create a file called .env in the root repository of CAT with the following strings. Make sure to ask Arisha for the mongoDB connection string and JWT token string:
```
MONGODB_URI=askarisha
JWT_SECRET=askarisha
```
- Give Arisha your IP address to add in MongoDB (this will not work without this step!! very important). 
- Then in the root repository run this command
```
node server.js
```
You should be good to go! Make sure to keep the backend running in a separate port and terminal than the frontend's terminal

1. Information collection on knowledge (count when users get things wrong, change database vars to ints instead of bools)

3. Check that emails are actually emails

5. Fix chopping sensitivity

7. Should "start" button go to "Create an Account" instead of login page?
8. Reduce sensitivity in sink m2 cleaning, don't allow interaction of clean vegetables with sink. Pop-up success message ? Sparkles? Make veggies a bit bigger
9. Define "hot holding dish"
10. Glow-hands instead of grimy hands for handwashing
11. Save by scene/last text box instead of by page? -change backend database -send more posts -save to local storage as int or string ?? Better by int -how to clear local storage
12. Make text bigger
13. More yellow dots to guide in chopping scene
14. Fix fixed button need to scroll issue

16. Collect pre-test information throughout modules? Fun trivia game?
17. Make module circles more clickable (but not overlapping with finish button)- enlarge circle or just interactive
18. Check posting for end of module 2- bug for Tony where module 2 was complete but no modules were unlocked. Make sure modules unlock based on map info not from post. Maybe he just needed to refresh page?

19. Figure out why post-test didn't show up for Dr. An Tony (asked to refresh, still nothing)
20. Add rate limiter

"Helps you visualize instead of just reading lines"
