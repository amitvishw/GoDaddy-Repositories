# GoDaddy-Repositories

## Live Demo

https://godaddy-repositories.onrender.com

<img width="1920" height="1080" alt="Screen Shot 2025-07-12 at 14 29 01" src="https://github.com/user-attachments/assets/7a0549e0-248a-476c-b8ce-13d910ffc365" />
<img width="1920" height="1080" alt="Screen Shot 2025-07-12 at 14 29 51" src="https://github.com/user-attachments/assets/dd840f2a-8bfd-4c8d-bfe4-34f9045ad9a8" />

## Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Run Tests
```bash
npm run test
```

## Project Structure
```
.
├── index.html
├── package.json
├── README.md
└── src/
    ├── components/
    │   ├── CloneUrlCard.tsx
    │   ├── ErrorMessage.tsx
    │   ├── LanguageChart.tsx
    │   ├── RepositoryCard.tsx
    │   ├── RepositoryShimmer.tsx
    │   ├── ShimmerCard.tsx
    │   ├── ShimmerElement.tsx
    │   ├── UserCard.tsx
    │   └── UsersCard.test.tsx
    ├── pages/
    │   ├── NotFound.tsx
    │   ├── RepositoryDetails.tsx
    │   └── RepositoryList.tsx
    ├── services/
    │   └── github.ts
    ├── test/
    │   ├── setup.ts
    │   └── utils.tsx
    ├── types/
    │   └── github.ts
    └── utils/
        └── utils.ts
```

## What's Not Done
1. **Pagination**: Not yet implemented for repository lists
2. **Error Handling**: Needs improvement for better user experience
