import "@walletconnect/react-native-compat";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, arbitrum, sepolia } from "@wagmi/core/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createAppKit,
  defaultWagmiConfig,
  AppKit,
} from "@reown/appkit-wagmi-react-native";
import { Stack } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { StatusBar } from "expo-status-bar";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.reown.com
const projectId = "7a028e760f8227b4723f6e277e9c615b";

// 2. Create config
const metadata = {
  name: "Garden",
  description:
    "An example of how you can integrate Garden with AppKit in your own react native app",
  url: "https://garden.finance",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [mainnet, polygon, arbitrum] as const;

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: sepolia, // Optional
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  clipboardClient: {
    setString: async (value: string) => {
      await Clipboard.setStringAsync(value);
    },
  },
  debug: true,
});

export default function RootLayout() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKit />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "black",
            },
          }}
        />
        <StatusBar style="auto" />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
