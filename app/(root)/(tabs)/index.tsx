import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter || "",
      query: params.query || "",
      limit: 6,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter || "",
      query: params.query || "",
      limit: 6,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 32 }}
        columnWrapperStyle={{ gap: 20, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="#4CAF50"
              style={{ marginTop: 20 }}
            />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View style={{ paddingHorizontal: 20 }}>
            <View className="flex-row items-center justify-between mt-5">
              <View className="flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  style={{ width: 48, height: 48, borderRadius: 24 }}
                />
                <View className="ml-3">
                  <Text className="text-xs text-gray-600">Good Morning</Text>
                  <Text className="text-base font-semibold text-gray-800">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} style={{ width: 24, height: 24 }} />
            </View>
            <Search />
            <View className="my-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-xl font-bold text-gray-800">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-bold text-blue-500">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" color="#4CAF50" />
              ) : latestProperties && latestProperties.length > 0 ? (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 20, marginTop: 10 }}
                />
              ) : (
                <NoResults />
              )}
            </View>
            <View className="my-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-xl font-bold text-gray-800">
                  Our Recommendations
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-bold text-blue-500">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <Filters />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
