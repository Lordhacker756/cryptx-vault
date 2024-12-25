import {
  AccountButton,
  AppKitButton,
  ConnectButton,
  NetworkButton,
  useAppKit,
  useAppKitState,
  useWalletInfo,
} from "@reown/appkit-wagmi-react-native";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useSignMessage } from "wagmi";

interface WalletIntegrationInfo {
  description: string;
  icon: string;
  icons: string[];
  name: string;
  redirect: {
    native: string;
    universal: string;
  };
  url: string;
}

export default function App() {
  const { open } = useAppKit();
  const { walletInfo } = useWalletInfo();
  const { selectedNetworkId } = useAppKitState();
  const { data, isError, isPending, isSuccess, signMessage } = useSignMessage();

  // const { address, caipAddress, isConnected } = useAppKitAccount();

  // console.log("Wallet Info", address, caipAddress, isConnected);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: "black",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 24,
        }}
      >
        Cryptx Wallet
      </Text>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
          }}
        >
          Selected Network: {selectedNetworkId}
        </Text>
      </View>

      <View>
        <Text>Wallet Details</Text>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#1a1a1a",
            padding: 15,
            borderRadius: 10,
          }}
        >
          {walletInfo ? (
            <View>
              <Image source={{ uri: walletInfo.icon }} width={50} height={50} />
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginVertical: 20,
                }}
              >
                {walletInfo.name}
              </Text>
            </View>
          ) : (
            <Text style={{ color: "#ff6666", fontSize: 16 }}>
              Wallet not connected
            </Text>
          )}
        </View>
      </View>
      <AppKitButton />
      <AccountButton balance="show" />
      <ConnectButton label="Connect wallet" />
      <NetworkButton />
    </SafeAreaView>
  );
}
function useAppKitAccount(): {
  address: any;
  caipAddress: any;
  isConnected: any;
} {
  throw new Error("Function not implemented.");
}
