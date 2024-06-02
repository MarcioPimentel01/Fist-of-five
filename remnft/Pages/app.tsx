import { AppProps } from 'next/app';
import React, { ReactNode } from 'react';

// Define the ThirdwebProvider component with updated prop types
type ThirdwebProviderProps = {
    clientId: string | undefined;
    activeChain: string;
    children: ReactNode; // Updated prop type to ReactNode
};

const ThirdwebProvider: React.FC<ThirdwebProviderProps> = ({ clientId, activeChain, children }) => {
    return (
        <div>
            {children}
        </div>
    );
};

// Declaring the chain our app will run on
const activeChain = "ethereum";

// Setting up our Thirdweb API key to be stored in the environment variable file
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThirdwebProvider
            clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID} // Corrected the environment variable name
            activeChain={activeChain}
        >
            <Component {...pageProps} />
        </ThirdwebProvider>
    );
}

export default MyApp;