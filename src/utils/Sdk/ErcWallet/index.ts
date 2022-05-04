import detectEthereumProvider from "@metamask/detect-provider";
import ErrorHandler from "../Error";
import { Signer } from "@ethersproject/abstract-signer";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";

class ErcWalletUtils {

    private isConnected: boolean;
    private signer: Signer;
    private provider: Web3Provider;

    constructor() {
        this._init();

        this.getProvider = this.getProvider.bind(this);
        this.getSigner = this.getSigner.bind(this);
    }

    private _init = async () => {
        if (window.ethereum.isConnected()) {
            this.provider = this._getProvider();
            this.signer = await this._getSigner();
        }
    }
    

    public connect = async () => {
        const hasInjectedProvider = await detectEthereumProvider();
        if (!hasInjectedProvider) {
            throw(ErrorHandler(1000)); 
        }

        try {
            const addresses : string[] = await window.ethereum.request({ 
                method: 'eth_requestAccounts', 
                params: [{ eth_accounts: {} }] 
            });

            return addresses;
        } catch (error) {
            console.log(error)
        }
    }

    private _getProvider = () : Web3Provider => {
        if (this.provider) {
            return this.provider;
        }

        let provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        return provider;
    }

    public getProvider = async () => {
        return this.provider;
    }


    private _getSigner = async (): Promise<Signer> => {
        if (this.signer) {
            return this.signer;
        }
        else if (this.provider) {
            return await this.provider.getSigner();
        }
        else {
            return await this._getProvider().getSigner();
        }
    }

    public getSigner = async () => {
        return await this._getSigner();
    }

}

export default ErcWalletUtils;