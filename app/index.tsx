import {
  AppKitButton,
  useAppKitState,
  useWalletInfo,
} from "@reown/appkit-wagmi-react-native";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { parseEther } from "viem";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";

export default function App() {
  const [recipient, setRecipient] = useState<`0xstring` | null>();
  const [amount, setAmount] = useState("");

  const { walletInfo } = useWalletInfo();
  const { selectedNetworkId } = useAppKitState();
  const { disconnect } = useDisconnect();

  const { address, isConnected } = useAccount();
  const { data: balanceData, refetch: refetchBalance } = useBalance({
    address,
    chainId: selectedNetworkId,
  });

  const { data, isPending, isSuccess, isError, sendTransaction } =
    useSendTransaction();

  const onPress = () => {
    if (!recipient || !amount) return;

    sendTransaction({
      to: recipient,
      value: parseEther(amount),
      data: "0x",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setRecipient(null);
      setAmount("");
      refetchBalance();
    }
  }, [isSuccess]);

  return (
    <ScrollView
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
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#1a1a1a",
            paddingHorizontal: 15,
            borderRadius: 10,
            minHeight: 250,
            marginBottom: 20,
            justifyContent: "center",
            position: "relative",
          }}
        >
          {walletInfo ? (
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  borderWidth: 1,
                  borderColor: "green",
                  borderRadius: 100,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  width: 100,
                  textAlign: "center",
                  position: "absolute",
                  right: 0,
                  top: -10,
                }}
              >
                Active Wallet
              </Text>
              <Image source={{ uri: walletInfo.icon }} width={50} height={50} />
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              >
                {walletInfo.name}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                }}
              >
                {address}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                Balance: {balanceData?.formatted}
                {balanceData?.symbol}
              </Text>
              <TouchableOpacity
                onPress={() => disconnect()}
                style={{
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: "#ff4444",
                  padding: 8,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#ff4444" }}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text
              style={{ color: "#ff6666", fontSize: 16, textAlign: "center" }}
            >
              Wallet not connected
            </Text>
          )}
        </View>
      </View>
      {walletInfo && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
            Send Ether
          </Text>

          <TextInput
            placeholder="Recipient Address"
            value={recipient}
            onChangeText={setRecipient}
            style={{
              backgroundColor: "#1a1a1a",
              color: "white",
              padding: 12,
              borderRadius: 8,
              marginBottom: 10,
            }}
            placeholderTextColor="#666"
          />

          <TextInput
            placeholder="Amount in ETH"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            style={{
              backgroundColor: "#1a1a1a",
              color: "white",
              padding: 12,
              borderRadius: 8,
              marginBottom: 10,
            }}
            placeholderTextColor="#666"
          />

          <TouchableOpacity
            onPress={onPress}
            disabled={!recipient || !amount || isPending}
            style={{
              backgroundColor:
                !recipient || !amount || isPending ? "#666" : "#4444ff",
              padding: 12,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>
              {isPending ? "Sending..." : "Send"}
            </Text>
          </TouchableOpacity>

          {isSuccess && (
            <Text style={{ color: "green", marginTop: 10 }}>
              Transaction successful!
            </Text>
          )}

          {isError && (
            <Text style={{ color: "red", marginTop: 10 }}>
              Transaction failed. Please try again.
            </Text>
          )}
        </View>
      )}
      {!walletInfo && <AppKitButton />}

      {/* Also show previous transactions done by this account or else just show no transaction history */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
          Transaction History
        </Text>
        {address ? (
          <View
            style={{
              backgroundColor: "#1a1a1a",
              padding: 15,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#666", textAlign: "center" }}>
              No transaction history available
            </Text>
          </View>
        ) : (
          <Text style={{ color: "#666", textAlign: "center" }}>
            Connect wallet to view transaction history
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
