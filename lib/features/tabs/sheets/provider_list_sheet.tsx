import React, { useState } from "react";
import { ProviderListSheetProps } from "../../../utils/types";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomTextField from "../../../components/CustomTextField";
import { ProviderModel } from "../../../models/provider_model";
import { useRecoilValue } from "recoil";
import { providerState } from "../../../state_management/atoms/provider_state";


const ProviderListSheet: React.FC<ProviderListSheetProps> = ({visible, onClose}) => {
    const [searchText, setSearchText] = useState('');

    const providerList: ProviderModel[] = useRecoilValue(providerState);

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType={"slide"}
            onRequestClose={() => {
                onClose();
            }}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <CustomTextField
                      containerStyle={styles.searchInput}
                      placeholder="Search"
                      leading={
                        <Ionicons name={'search'} />
                      }
                      trailing={
                        searchText.length > 0 && (
                          <TouchableOpacity
                            onPress={() => {
                              setSearchText('');
                            }}>
                            <Ionicons name={'search'} />
                          </TouchableOpacity>
                        )
                      }
                      onValueChange={setSearchText}
                      value={searchText}
                    />
                    <View style={styles.listView}>
                        <FlatList
                          data={providerList}
                          renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                onClose(item);
                            }} style={styles.itemContainer}>
                              <Text style={{ fontSize: 16, color: '#434446' }}>{`${item.firstName} ${item.lastName}`}</Text>
                            </TouchableOpacity>
                          )}
                          keyExtractor={item => item.email}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    container: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: '90%',
        padding: 16,
    },
    searchInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#D0D5DD',
        padding: 10,
        fontSize: 16,
    },
    listView: {
        flex: 1,
        width: '100%',
        padding: 16,
        backgroundColor: '#F7F7F8',
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
});

export default ProviderListSheet;
