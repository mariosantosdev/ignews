# IG News

This project was created on [Ignite Bootcamp](rocketseat.com.br/ignite).

This project is a news website that need plan subscription.

## Some Images

<img src="/public/demo/home.png" alt="Home Page" width="600"/>
<img src="/public/demo/preview-post.png" alt="Preview Post Page" width="600"/>

## Technologies

- [NextJS](https://nextjs.org/) - Framework to ReactJS
- [Stripe](https://stripe.com/br) - Payment gateway
- [FaunaDB](https://fauna.com/) - Serverless Database
- [Prismic CMS](https://prismic.io/) - Content Management System

## How Run It

### Running Project

1. Install dependencies using `npm i` or `yarn`
2. Create a file `.env.local` following `.env.example`
3. Fill `.env.local` following next sections
4. Inside file `.env` fill `NEXTAUTH_SECRET` with any hash
5. Run next with command `npm run dev`

### Stripe

1. Create an account in [Stripe](https://stripe.com/br)
2. Create a project
3. Get environment variables and fill `.env.local`
4. Run webhooks of stripe (if you're using locally, install [Stripe-cli](https://stripe.com/docs/stripe-cli))

### Github

1. Create an [OAuth App](https://github.com/settings/developers)
2. Get environment variables and fill `.env.local`

### FaunaDB

1. Create an account in [FaunaDB](https://fauna.com/)
2. Create a project
3. Get environment variables and fill `.env.local`

### Prismic CMS

1. Create an account in [Prismic CMS](https://prismic.io/)
2. Create a project
3. Get environment variables and fill `.env.local`
4. Create an custom type following the file `prismic-custom-type.json`
5. Create posts inside Prismic dashboard
