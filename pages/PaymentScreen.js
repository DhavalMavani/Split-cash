// 1. Import Statements
import React, { useState, useRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GroupIcon from '../components/GroupIcon';
import COLOR from '../constants/Colors';
import { calcHeight, getFontSizeByWindowWidth, calcWidth } from '../helper/res';
import Button from '../components/Button';
import PAGES from '../constants/pages';
import apiHelper from '../helper/apiHelper';
import Loader from '../components/Loader';
import UserAvatar from '../components/UserAvatar';
import Toast from 'react-native-root-toast';
import sliceText from "../helper/sliceText";

// GroupScreen Component
function GroupScreen({
    route: {
        params: { payment },
    },
    navigation,
}) {
    const [amount, setAmount] = useState(payment.amount + '');
    const [description, setDescription] = useState('');
    const descriptionRef = useRef();
    const [isLoading, seIsLoading] = useState(false);

    async function submitPayment() {
        seIsLoading(true);
        try {
            const { data } = await apiHelper.post('/payment', {
                payer: payment.from._id || payment.from.id,
                receiver: payment.to._id || payment.to.id,
                group: payment.group,
                amount,
                description,
            });
            Toast.show('Payment Added', {
                duration: Toast.durations.LONG,
            });
            seIsLoading(false);
            navigation.navigate(PAGES.BALANCE);
        } catch (e) {
            seIsLoading(false);
            alert(e);
        }
    }
    if (isLoading) return <Loader />;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerItem}>
                    <UserAvatar user={payment.from} />
                    <Text
                        style={{
                            color: COLOR.TEXT,
                            fontWeight: 'bold',
                            marginTop:calcHeight(2)
                        }}
                    >
                        {sliceText(payment.from.name,10)}
                    </Text>
                </View>
                <View style={{...styles.headerItem,justifyContent:"flex-end",marginTop:calcHeight(1.7)}}>
                    <Text
                        style={{
                            color: '#D9D9D9',
                        }}
                    >
                        Paying To
                    </Text>
                    <AntDesign style={{
                        marginTop:calcHeight(3)
                    }}name="arrowright" size={24} color="white" />
                </View>
                <View style={styles.headerItem}>
                    <UserAvatar user={payment.to} />
                    <Text
                        style={{
                            color: COLOR.TEXT,
                            fontWeight: 'bold',
                            marginTop:calcHeight(2)
                        }}
                    >
                        {sliceText(payment.to.name,10)}
                    </Text>
                </View>
            </View>
            <View style={styles.rowCentered}>
                <Text style={styles.amount}>₹</Text>
                <TextInput
                    style={styles.amount}
                    onChangeText={(text) => setAmount(text)}
                    value={amount}
                    keyboardType="numeric"
                    placeholderTextColor={COLOR.TEXT}
                    placeholder="0"
                    autoFocus
                />
            </View>
            <View style={styles.rowCentered}>
                <Pressable
                    style={styles.descriptionContainer}
                    onPress={() => descriptionRef.current.focus()}
                >
                    <TextInput
                        style={styles.description}
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                        placeholder="Description"
                        placeholderTextColor="#ccc"
                        ref={descriptionRef}
                        textAlign="center"
                    />
                </Pressable>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end', // Adjust this based on your layout needs
                        alignItems: 'center',
                        marginBottom: calcHeight(15),
                    }}
                >
                    <Button
                        onPress={submitPayment}
                        title="Record as  Cash Payment"
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: calcHeight(5),
    },
    headerItem: {
        alignItems: 'center',
    },
    rowCentered: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    amount: {
        alignItems: 'center',
        alignContent: 'center',
        color: COLOR.TEXT,
        fontWeight:"bold",
        fontSize: getFontSizeByWindowWidth(50),
    },
    description: {
        flex: 1,
        color: 'white',
    },
    descriptionContainer: {
        flexDirection: 'row',
        padding: calcWidth(3),
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: calcWidth(30),
        marginTop:calcHeight(1)
    },
});

// Export Statement
export default GroupScreen;
