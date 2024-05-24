# LinkedIn Job Highlighter

This Firefox extension highlights companies listed in a predefined set and identifies job postings that mention a relocation package on LinkedIn job listings.

## Features

- Highlights job postings from specific companies listed in the [Public Register Regular Labour and Highly Skilled Migrants](https://ind.nl/en/public-register-recognised-sponsors/public-register-regular-labour-and-highly-skilled-migrants).
- Identifies and highlights job postings offering a relocation package.
- Monitors dynamically loaded content on LinkedIn.

## Installation

1. Clone or download this repository.
2. Open Firefox and navigate to `about:debugging`.
3. Click on "This Firefox" and then "Load Temporary Add-on".
4. Select the `manifest.json` file from the cloned/downloaded directory.

## Usage

1. Navigate to LinkedIn job listings.
2. The extension will automatically highlight companies from the public register and indicate if a relocation package is available.

## Files

- `manifest.json`: Contains the extension's configuration.
- `content_script.js`: Script that runs in the context of LinkedIn job listings to perform highlighting and relocation package detection.

## Development

### Prerequisites

- Node.js
- npm

### Setup

1. Install dependencies:
   ```bash
   npm install
2. Run the extension for development
   ```bash
   web-ext run
4. Building
   ```bash
   web-ext build

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request.

## License
Feel free to adjust the content as per your specific requirements and any additional details you want to include.
