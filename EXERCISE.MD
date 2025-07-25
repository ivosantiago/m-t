## TODO

[x] init nextjs latest project
[x] configure tailwind-prettier plugin
[x] install shadcn/ui and components
[x] create contact information screen
[x] create payment information screen
[x] confirmation screen
[x] add services card
[x] add unit tests

## Considerations and decisions:

1. Do we want to make each screen a single page or do we want to have a multi-step form? It would be simpler to do a multi-step form but we need back buttons so the user can navigate between steps.
2. We could have steps indicators to guide the user.
3. On the Figma file I've noticed a content difference between desktop and mobile versions at the confirmation screen:
   - On the contact information mobile screen there is a "Book appointment" title but it is missing on the desktop screen. I've added on the desktop version too.
   - On the payment information there is a "continue" button and the navigation bar but to continue you should be clicking the "book appointment" button. Because of that I've removed the bar. There is also an indication for that given that the mobile version does not have the "continue" button.
   - The mobile version of the confirmation screen has a "Services" card that is missing on the desktop. I took the liberty of showing it everywhere.
4. I'm missing form validation examples, transitions, loading or error states. I used simple validations, no transitions, no loading and no error pages for the exercise.
5. I decided to go with shadcn/ui because we would gain the accessibility and it is a popular library with good documentation. On top of everything the code is within the project so we can do whatever change we feel necessary.
6. I've changed the Contact information input placeholders because they were not very descriptive.
7. I've added unit tests but integrations tests would be great for a multi-step form.
