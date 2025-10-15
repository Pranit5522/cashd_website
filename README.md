# KickCash Static Website

A modern, responsive website for KickCash - Turn Your Playtime into Paytime!

## Getting started

> **Prerequisites:**
> The following steps require [NodeJS](https://nodejs.org/en/) to be installed on your system, so please
> install it beforehand if you haven't already.

To get started with your project, you'll first need to install the dependencies with:

```
npm install
```

Then, you can run a development version of the project with:

```
npm run dev
```

After a few seconds, your project should be accessible at the address
[http://localhost:3000/](http://localhost:3000/)

If you are satisfied with the result, you can finally build the project for release with:

```
npm run build
```

## Project Structure

```
├── src/
│   ├── assets/          # Images, icons, and other static assets
│   │   ├── images/      # Image files
│   │   └── icons/       # SVG icons
│   └── index.js         # Main entry point
├── templates/           # Handlebars templates
│   ├── partials/        # Reusable template components
│   └── index.hbs        # Main template
├── scss/                # Sass stylesheets
│   ├── base/            # Base styles and variables
│   ├── components/      # Component-specific styles
│   └── utilities/       # Utility classes
├── js/                  # JavaScript files
├── data/                # JSON data files
└── public/              # Additional public assets (optional)
```

## Assets

All images and icons are now properly organized in the `src/assets` directory and will be included when you download the source code.

## Fonts

This project uses the Satoshi font family. To use the fonts:

1. Download the Satoshi font files (Regular, Medium, Bold, Black) in WOFF2 format
2. Place them in the `src/assets/fonts/` directory
3. The font files should be named:
   - `Satoshi-Regular.woff2`
   - `Satoshi-Medium.woff2`
   - `Satoshi-Bold.woff2`
   - `Satoshi-Black.woff2`

