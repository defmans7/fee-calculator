# Stripe Fee Calculator

A React-based calculator for determining Stripe payment processing fees and amounts. This tool helps you calculate either what you'll receive after fees or what you should charge to receive a desired amount.

## Demo
[https://fees.c-dj3dw.com/](https://fees.c-dj3dw.com/)

## Features

- Calculate received amount after Stripe fees
- Calculate charge amount to receive a desired amount
- Customizable fee percentage and static fee amounts
- Real-time calculations with formatted currency display
- Clean, responsive UI built with Tailwind CSS

## Tech Stack

- **Runtime**: Bun
- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: JavaScript/JSX

## Getting Started

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

Optional: Use PM2 for process management in production:

```bash
pm2 start "bun start" --name stripe-fee-calculator
```

## How to Use

1. Select your calculation type:
   - "What will I receive?" - Enter the amount you're charging to see what you'll receive after fees
   - "What should I charge?" - Enter the amount you want to receive to see what you should charge

2. Adjust the fee settings if needed:
   - Percentage fee (default: 1.7%)
   - Static fee (default: $0.30 AUD)

3. Enter your amount and see the results in real-time

This project was created using `bun init` in bun v1.2.20. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
