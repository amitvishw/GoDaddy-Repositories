# GoDaddy-Repositories

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
npm test
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
