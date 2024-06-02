import * as React from 'react'; //we need this to supoort jsx syntax here
import { ConnectButton } from 'thirdweb/react';

interface NavbarProps {
    address: string;
}

const Navbar: React.FC<NavbarProps> = ({ address }) => {
    return (
        <div>
            {address && (
                <>
                    <h1>REM NFT Game</h1>
                    <div></div>
                    <div><ConnectButton /></div>
                </>
            )}
        </div>
    );
};

export default Navbar;