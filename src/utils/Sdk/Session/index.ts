import { gql } from "@apollo/client";
import { Signer } from "@ethersproject/abstract-signer";
import searchEngineClient from "../../web3/searchEngine";
import ErcWalletUtils from "../ErcWallet";
import { AuthHeader, IUserSession, MessageSignature } from "./index.d";

class UserSession {

    JWT_TOKEN_NOT_FOUND_ERROR = 'jwt token not found';
    JWT_STORAGE_KEY = 'radian:auth:jwt';

    private _getNonce = async (address: string): Promise<IUserSession> => {
        const REQUEST_SESSION_MUTATION = gql`
            mutation GetUserSession ($address: String)  {
                requestSession (address: $address) {
                    nonce
                    address
                    expiredAt
                }
            }
        `;
        const callback = await searchEngineClient.mutate({
            mutation: REQUEST_SESSION_MUTATION,
            variables: { address: address }
        });

        if (callback) {
            return callback.data.requestSession
        }
    }

    private _generateMessage = (
        address: string,
        nonce: number
    ) => {
        return `******************************************************************************** \n
READ THIS MESSAGE CAREFULLY. \n
DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND WRITE ACCESS TO THIS APPLICATION. \n
DO NOT SIGN THIS MESSAGE IF THE FOLLOWING IS NOT TRUE OR YOU DO NOT CONSENT TO THE CURRENT APPLICATION HAVING ACCESS TO THE FOLLOWING APPLICATION. \n
******************************************************************************** \n
wallet address: ${address}
nonce: ${nonce}
\n
\n
******************************************************************************** \n
ONLY SIGN THIS MESSAGE IF YOU CONSENT TO THE CURRENT PAGE ACCESSING THE KEYS ASSOCIATED WITH THE ABOVE ADDRESS AND APPLICATION. AGAIN, DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND WRITE ACCESS TO THIS APPLICATION. \n
******************************************************************************** `
    }

    private _signMessage = async (
        signer: Signer,
        message: string,
    ) => {
        return await signer.signMessage(message);
    }

    private _createSignature = async (
        signer: Signer,
    ): Promise<MessageSignature> => {
        try {
            const address = await signer.getAddress();
            const { nonce } = await this._getNonce(address);
            const message = this._generateMessage(address, nonce);
            const signature = await this._signMessage(signer, message);

            return {signature, address, nonce}
        } catch (error) {
            console.log(error)
        }
    }

    public generateJwtToken = async (
        address: string,
        nonce: number,
        signature: string
    ) : Promise<string> => {
        const SIGN_IN_WITH_SIGNATURE_MUTATION = gql`
            mutation SignIn (
                $address: String,
                $nonce: Int,
                $signature: String
                )  {
                signInWithSignature (
                    address: $address,
                    nonce: $nonce,
                    signature: $signature
                    ) {
                    token
                }
            }
        `;
        const callback = await searchEngineClient.mutate({
            mutation: SIGN_IN_WITH_SIGNATURE_MUTATION,
            variables: { address, nonce, signature }
        });

        if (callback) {
            return callback.data.signInWithSignature.token;
        }
    }

    public create = async () => {
        try {
            const signer = await new ErcWalletUtils().getSigner();
            const {signature, address, nonce} = await this._createSignature(signer);
            const jwtToken = await this.generateJwtToken(address, nonce, signature);
            this.setHeader(jwtToken);

            return jwtToken;
        } catch (error) {
            console.log(error)
        }
    }

    private setHeader = (token: string): void => localStorage.setItem(this.JWT_STORAGE_KEY, token);

    public getHeader = () : AuthHeader => {
        const jwt = localStorage.getItem(this.JWT_STORAGE_KEY);
        if (!jwt) return null

        return { 'authentication': `jwt ${jwt}` }
    }

}

export default UserSession