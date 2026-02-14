# Healia Enrollment Processor

Process weekly enrollment CSV Files and track household changes

## Setup
```bash
npm install
npm run build
```

## Usage
```bash
npm run start examples/week1.csv
npm run start examples/week2.csv
```

## Testing
```bash
npm run test
```

## How it works
1. Loads Enrollment CSV File
2. Groups people into households
3. Determines the enrolled households
4. Tracks changes between runs
5. saves data to data/state.json