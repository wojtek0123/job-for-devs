# Job for Devs

Fullstack application for developers who want to find a job or hire someone.

live server: https://job-for-devs.vercel.app/

User can:
- login
- add new offer
- apply for existing offer
- see applications for his offer
- see his applications on other people offers and his posted offers
- filter by title, seniority, city, technologies and category
- change name in profile name

## Built with:
- NextJS
- TypeScript
- GraphQL
- Apollo
- Prisma
- Tailwind
- Supabase
- eslint
- prettier
- next-auth

## Screenshot
![home page](https://user-images.githubusercontent.com/87533043/189962776-70ad9dee-a767-47d9-bd3a-a0264e52c950.png)
![offer details page](https://user-images.githubusercontent.com/87533043/189962807-fd833482-0996-41cd-ba56-4b9e481cd708.png)
![new offer page](https://user-images.githubusercontent.com/87533043/189962843-12a97a32-0dfe-49f1-9c61-106b69838608.png)
![profile page](https://user-images.githubusercontent.com/87533043/189962861-b9d3dbfe-f954-4eba-9c19-1fe7a46e5045.png)
![applications page](https://user-images.githubusercontent.com/87533043/189962881-b40fdf71-fafb-429f-98e7-6e0ebe906f11.png)


Installation on local machine 
```bash
git clone https://github.com/wojtek0123/job-for-devs.git
npm install
# create .env file like the example .env-example
npm prisma db push
npx prisma generate
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Things to do:
- add tests
- upload pdf file (resume) to database through graphql
- edit posted job offer
