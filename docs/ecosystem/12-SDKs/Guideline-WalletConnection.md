---
---

# Guideline for Wallet Connection
This document is based on WalletConnect version 2.14.0 as of August 29, 2024

## Purpose and Background
### Purpose
This document aims to unify and improve the wallet connection experience for games on Oasys. Oasys hosts many attractive contents, including blockchain games from major game publishers, and is expected to attract many novice users who are not yet familiar with blockchain technology. By minimizing the complexity and inconvenience of wallet connections, we believe that even beginner users can play blockchain games easily and with confidence.

[reference model](https://oaw-webwallet.vercel.app/) is available as a demo site for specific implementations mentioned later. Please refer to it for concrete examples of user experience

### Background

Note: You may skip this section if you're only interested in implementation details.

The Oasys Passport team has supported WalletConnect integration for more than 10 dapps. While the WalletConnect specifications change frequently, verifying optimal implementations can be time-consuming and often becomes a low priority. However, stable and smooth wallet connections are crucial for UX, leading us to publish implementation examples to unify and improve the overall UX of Oasys Dapps.

## Requirements

- Ensure proper functionality on the following browsers when using wallet login:
    - Chrome
    - Safari
    - Brave
- Use the latest version of WalletConnect
- If implementing support for the following wallets, ensure they function correctly:
    - Metamask (both Chrome Extension and Mobile App)
        - For Mobile App, confirm proper functionality within the Metamask in-app browser
    - Oasys Passport
    - Face Wallet

## Implementation Items

### Regarding WalletConnect Implementation

### Displaying Specific Wallets in the First View of WalletConnect Modal

Problem to solve:

- Users need to search for the wallet they want to connect

Recommended implementation:

- Set the wallets you want users to use in featuredWalletIds for priority display
- For titles expecting many beginner users, including Oasys Passport here is recommended as it's developed and operated with blockchain game beginners in mind and offers user support.

code

```jsx
  featuredWalletIds: [
    '37aacf1e6bf6793c892e42c3f7623a61d9ffcb4337010804cc3193c4d596cf5c', // Oasys Passport
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', // Coinbase
    'b6d18ff342920bb492f810bb070a064d6031ec2c3d6fffecb6ca233c8a591e00', // Facewallet
  ],
```
https://github.com/doublejumptokyo/oasys-sample-webapp/blob/71e43c7be38608d9c463e2b973dace08d40956d8/src/config/wallets/index.ts

Sample image

![guideline](https://github.com/user-attachments/assets/860d5da2-f6b8-44f3-8d51-0c600cd11042)


This can be checked at https://oasys-sample-webapp.vercel.app/.

### Using Namespace Correctly

Problem to solve:

- Errors occur when passing RPC methods to wallets

Recommended implementation:

- Leave requiredNamespace blank and include all methods and chains to be used in optionalNamespace
    - reference:https://medium.com/walletconnect/caip-25-implementation-guidance-migrating-to-empty-undefined-required-namespaces-6aa5626a86d9
- Or define the chains to be used in wagmiConfig as shown in the implementation example

Example implementation

```tsx
export const config = defaultWagmiConfig({
  projectId: walletConnectProjectId,
  metadata,
  chains: customChains,
  enableCoinbase: false, // Enabling by default is buggy, so adding it as featured wallet works better
  auth: {
    email: true, // default to true
    socials: ['google', 'x', 'github', 'discord', 'apple'],
    showWallets: true, // default to true
    walletFeatures: true, // default to true
  },
});
```
https://github.com/doublejumptokyo/oasys-sample-webapp/blob/71e43c7be38608d9c463e2b973dace08d40956d8/src/config/wagmi.ts#L22


### Disconnecting Wallet

Problem to solve:

- Users cannot disconnect the wallet at their discretion

Recommended implementation:

- Implement the Disconnect method

Example implementation

```tsx
<button
  className="border-solid border-2 border-red-500 p-1 rounded-md bg-red-400 font-bold m-5"
  onClick={() => disconnect()}
>
  Disconnect from {connector?.name}
</button>
```
https://github.com/doublejumptokyo/oasys-sample-webapp/blob/23c5f11428b3ff19955be52e809510a4360b10f1/src/components/Connect.tsx#L29C1-L35C1

Behaviour can be checked at https://oasys-sample-webapp.vercel.app/.

### Regarding Wallet Connection

### Separating Wallet Connection and Signature Processes

Problem to solve:

- Signature requests may not reach the Wallet app during login when the dapp is opened on a mobile device
    - more common for iPhone

Recommended implementation:

- Separate the wallet connection request from the signature request
- For login signatures, using [EIP4361](https://eips.ethereum.org/EIPS/eip-4361) is recommended

Example implementation

- Session request
    
    ```tsx
    const { open } = useWeb3Modal();
    
    <button
      className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
      onClick={() => open()}
    >
      Web3Modal
    </button>
    ```
    https://github.com/doublejumptokyo/oasys-sample-webapp/blob/23c5f11428b3ff19955be52e809510a4360b10f1/src/components/Connect.tsx#L42
    
- Signature request
    
    ```tsx
    export function PersonalSign() {
      const { data: walletClient } = useWalletClient();
      const { address } = useAccount();
      const [message, setMessage] = useState('Test Message');
      const [error, setError] = useState('');
      const [signResult, setSignResult] = useState('');
    
      const requestPersonalSign = async () => {
        if (!walletClient) {
          return;
        }
        setError('');
    
        // Prepare plain text to sign
        const hexString = Buffer.from(message, 'utf-8').toString('hex');
    
        const customRequest = {
          method: 'personal_sign',
          params: [`0x${hexString}`, address], // data to sign, address
        } as any;
    
        try {
          const result = (await walletClient.request(customRequest)) as string;
          setSignResult(result);
        } catch (e: any) {
          setError(e.message);
          console.log(e.message);
        }
      };
    ```
    https://github.com/doublejumptokyo/oasys-sample-webapp/blob/23c5f11428b3ff19955be52e809510a4360b10f1/src/components/PersonalSign.tsx
    

Behaviour can be checked at https://oasys-sample-webapp.vercel.app/. You can replicate the flow by connecting your wallet using Web3Modal then choose personal_sign.

### Managing Browser Extension

Problem to solve:

- When multiple browser extension wallets are installed, they may interfere with each other, preventing the intended wallet from being called

Recommended implementation:

- Use a Wallet Modal that supports EIP-6963
- The demo site uses Web3Modal

### Guiding Users When Using Wallet

Problem to solve:

- Users may not know what to do when action is required on the Wallet side

Recommended implementation:

- Whenever users need to use the Wallet, either automatically transition to the Wallet or invoke Wallet selection to guide them

Example implementation

- personal_sign
    
    ```tsx
    export function PersonalSign() {
      const { data: walletClient } = useWalletClient();
      const { address } = useAccount();
      const [message, setMessage] = useState('Test Message');
      const [error, setError] = useState('');
      const [signResult, setSignResult] = useState('');
    
      const requestPersonalSign = async () => {
        if (!walletClient) {
          return;
        }
        setError('');
    
        // Prepare plain text to sign
        const hexString = Buffer.from(message, 'utf-8').toString('hex');
    
        const customRequest = {
          method: 'personal_sign',
          params: [`0x${hexString}`, address], // data to sign, address
        } as any;
    
        try {
          const result = (await walletClient.request(customRequest)) as string;
          setSignResult(result);
        } catch (e: any) {
          setError(e.message);
          console.log(e.message);
        }
      };
    ```
    https://github.com/doublejumptokyo/oasys-sample-webapp/blob/23c5f11428b3ff19955be52e809510a4360b10f1/src/components/PersonalSign.tsx
    
- eth_sendTransaction
    
    ```tsx
    export function SendTransaction() {
      const { data, error, sendTransaction } = useSendTransaction();
      const {
        data: receipt,
        isLoading: isPending,
        isSuccess,
      } = useWaitForTransactionReceipt({ hash: data });
    
      return (
        <MethodContainer title="Send Transaction" error={error?.message}>
          <div>
            <form
              className="flex flex-col justify-center items-center gap-5 mt-5"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const address = formData.get('address') as `0x${string}`;
                const value = formData.get('value') as `${number}`;
                sendTransaction({
                  to: address,
                  value: parseEther(value),
                });
              }}
    ```
    https://github.com/doublejumptokyo/oasys-sample-webapp/blob/23c5f11428b3ff19955be52e809510a4360b10f1/src/components/SendTransaction.tsx#L9
    

Behaviour can be checked at https://oasys-sample-webapp.vercel.app/.

Please open the website on mobile browser.

## Other recommendations

### Redirecting from Wallet

Problem to solve:

- Users need to manually return after approving requests on the wallet, degrading user experience

Recommended implementation:

- Set a URL in the redirect item of the Dapps metadata
- For mobile apps, set up deep links

### Recommended Libraries and Frameworks

For new WalletConnect implementations, we recommend using the following libraries and frameworks:

- wagmi
- web3modal

Specific behavior can be checked at [https://oasys-sample-webapp.vercel.app/](https://oasys-sample-webapp.vercel.app/)

For questions or inquiries about this document, please contact the Oasys Passport team at

[info@oasys-wallet.com](mailto:info@oasys-wallet.com)

.The copyright and related rights to this document belong to Oasys Pte. Ltd. It is managed and operated by the Oasys Passport product team
