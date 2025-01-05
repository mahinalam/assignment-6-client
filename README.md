# Gardening Tips & Advice Platform

## Project Overview

The Gardening Tips & Advice Platform is a comprehensive full-stack web application designed for gardening enthusiasts and professionals to share, discover, and engage with gardening knowledge. It will provide users with insightful tips, plant care advice, seasonal guides, and techniques to enhance their gardening experiences. Additionally, users can share their gardening knowledge, interact with others, and explore premium content through a seamless payment integration.

**Repository Links:**

- [Backend](https://github.com/mahinalam/green-haven-server.git)
- [Frontend](https://github.com/mahinalam/assignment-6-client.git)

**Live Links:**

- [Backend](https://green-haven-server1.vercel.app)
- [Frontend](https://green-haven-client.vercel.app)

---

## Technology Stack & Packages

## Dependencies

Below are the key dependencies used in this project:

### Core Libraries:

- `react`: ^18.3.1
- `next`: ^14.2.4
- `react-dom`: ^18.3.1

### Query Api

- `@tanstack/react-query`: ^5.56.2
- `axios`: ^1.7.7

### Form Handling and Validation:

- `react-hook-form`: ^7.53.0
- `zod`: ^3.23.8

### UI Libraries:

- `@nextui-org/theme`: ^2.2.11
- `@nextui-org/react`: ^2.4.8
- `@nextui-org/button`: ^2.0.38

### Styling:

- `tailwindcss`: ^3.4.3
- `tailwind-variants`: ^0.1.20

### Utilities:

- `quill`: ^2.0.2
- `jwt-decode`: ^4.0.0
- `sonner`: ^1.7.1

### Dev Dependencies:

- `@types/node`: ^20.5.7
- `typescript`: ^5.0.4
- `eslint`: ^8.57.0
- `tailwindcss`: ^3.4.3
- `autoprefixer`: ^10.4.19
- `typescript-eslint/parser`: ^8.11.0

---

## Features & Functionalities

### Admin Role:

- Manage users (suspend/delete accounts)
- manage website performance
- Monitor transactions and platform activities


### User Role:

- Create and edit gardening tips and guides
- can comment on posts with options to edit or delete their own comments.
- Can edit and delete posts
- can upvote or downvote posts to help others discover the best content.
- Sorting functionality to display posts with the highest upvotes at the top.

### Home Page

- Display all available posts from various users.
- Prioritize posts from premimum account.
- Scroll-to-top button for better navigation.
- upvote and downvote systems

###  Details Page

-  image, post, category, images, and detailed descriptions.
- Display the post creator name with a clickable link redirecting to their profile.
- display comments



### Profile Page

-view, edit their profile.
-view following, followers
- Display all payments

### Checkout

- Mka epayment for better acess better content.
- Integrate Aamarpay for payment processing.


### Authentication

- **Signup Page**: Option to register
- **Login Page**: Secure login using JWT.
- **Password Management**:
  - Change password after logging in.
  - Reset password functionality via email.


### Responsive Design

- Mobile and desktop-friendly interface for all users.

---

# Frontend Setup Instructions

## Prerequisites:

- Node.js installed
- Backend server running
- Environment variables configured (e.g., `.env` file)

---

## Installation:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Project Scripts

### Development:

```bash
npm run dev
```

Starts the development server on `http://localhost:5173`.

### Build:

```bash
npm run build
```

Creates a production-ready build of the application.

### Lint:

```bash
npm run lint
```

Runs ESLint to analyze and fix code quality issues.

---

## Additional Notes

- Ensure that the backend API is running and accessible before starting the frontend server.
- Refer to the backend README for more details on API setup and endpoints.

---


## Key Highlights

- JWT-based authentication for secure access.
- Paginated APIs for scalability.
- Responsive design for seamless mobile and desktop experiences.
- Advanced filtering and search functionalities.
- Integrated third-party services for payments and image uploads.

---


## Contribution

Contributions are welcome. Feel free to open issues or submit pull requests for any improvements or bug fixes.

---

## License

This project is licensed under the [MIT License](LICENSE).
