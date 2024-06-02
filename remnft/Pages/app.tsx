import { AppProps } from 'next/app';
import React, { ReactNode } from 'react';
import { ThirdwebProvider, embeddedWallet, smartWallet, metamaskWallet, coinbaseWallet, walletConnect, rainbowWallet, trustWallet } from 'thirdweb/react';
import Navbar from "../components/navbar"; // Assuming Navbar is the correct component name

// Define the ThirdwebProvider component with updated prop types
type ThirdwebProviderProps = {
    clientId: string | undefined;
    activeChain: string;
    children: ReactNode; // Updated prop type to ReactNode
};

const CustomThirdwebProvider: React.FC<ThirdwebProviderProps> = ({ clientId, activeChain, children }) => {
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
    const smartWalletConfig = {
        factoryAddress: "0x85e23b94e7F5E9cC1fF78BCe78cfb15B81f0DF00",
        gasless: true,
    };
    return (
        <CustomThirdwebProvider
            clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID} // Corrected the environment variable name
            activeChain={activeChain}
            supportedWallets={[
                smartWallet(embeddedWallet(), smartWalletConfig),
                metamaskWallet(),
                coinbaseWallet(),
                walletConnect(),
                rainbowWallet(),
                trustWallet(),
            ]}
        >
            <Navbar />
            <Component {...pageProps} />
        </CustomThirdwebProvider>
    );
}

export default MyApp;