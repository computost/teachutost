# Teachutost

A proof-of-concept for a school messaging application.

## About this repo

This repo was created using the [Turborepo shell starter](https://github.com/vercel/turborepo/tree/main/examples/with-shell-commands). Turborepo is a monorepo designed for Javascript applications, specifically those written in Next.js.

While this application does not use Next.js, Turborepo is sufficiently modular that this application can leverage its performance and organization benefits. Thanks to its [multi-language support](https://turbo.build/docs/guides/multi-language), we can even use it to cleanly integrate our React Native front end with our .NET back end.

## Development

### Prerequisites

- [VSCodium](https://vscodium.com/) (preferred) or [VSCode](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en) - Install using [nvm](https://github.com/nvm-sh/nvm) (or [nvm-windows](https://github.com/coreybutler/nvm-windows))
- [pnpm](https://pnpm.io/installation)
- [Turborepo](https://turbo.build/docs/getting-started/installation#installing-turbo)
- [.NET 8.0](https://dotnet.microsoft.com/) - Install using [dnvm](https://dnvm.net/)

### Initial setup

Run `pnpm install` to install application dependencies.

Then run `pnpm scripts#install-chromium` to install the Chromium web browser. This is required for debugging and only needs to be run once.

### Running the app

`pnpm dev`

### Testing from a mobile device

First install the Expo Go app on your mobile device. Then, while the app is running, you will see a QR code for the `native` task. Scan that with Expo Go and you should see the app running on your device.

### Debugging

To debug the web app, use the developer tools for your browser.

To debug on the mobile app, make sure you have installed Chromium using `pnpm scripts#install-chromium`. Then open the app on your mobile device. Go back to the terminal and press `j` to open the React Native DevTools.

This should open a chromium window. This can be used to investigate code running on your mobile device.
