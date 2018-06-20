import React, { Component } from 'react';
import { Platform, View, Text } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

export default class App extends Component {
    constructor() {
        super()
        this.manager = new BleManager()
        this.state = {info: "", values: {}}
        this.prefixUUID = "0000ffe"
        this.suffixUUID = "-0000-1000-8000-00805f9b34fb"
        this.sensors = {
            0: "Temperature",
            1: "Accelerometer",
            2: "Humidity",
            3: "Magnetometer",
            4: "Barometer",
            5: "Gyroscope"
        }
    }


    serviceUUID(num) {
        return this.prefixUUID + num + "0" + this.suffixUUID
    }

    notifyUUID(num) {
        return this.prefixUUID + "1" + this.suffixUUID
    }

    writeUUID(num) {
        return this.prefixUUID + num + "2" + this.suffixUUID
    }

    info(message) {
        this.setState({info: message})
    }

    error(message) {
        this.setState({info: "ERROR: " + message})
    }

    updateValue(key, value) {
        this.setState({values: {...this.state.values, [key]: value}})
    }

    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.manager.onStateChange((state) => {
                if (state === 'PoweredOn') this.scanAndConnect()
            })
        } else {
            this.scanAndConnect()
        }
    }
    connectWithBlutooth()
    {
        if (Platform.OS === 'android') {
            this.manager.onStateChange((state) => {
                if (state === 'PoweredOn')
                {
                    this.scanAndConnect()
                }
                else
                {
                    this.info("blutooth disconnected...")
                }
            })
        }
    }

    scanAndConnect() {
        this.manager.startDeviceScan(null,
            null, (error, device) => {
                this.info("Scanning...")
                console.log(device);

                if (error) {
                    this.error(error.message)
                    return
                }

                if (device.name === 'SIPL_BLE' && device.serviceUUIDs !=null && device.serviceUUIDs.length>0) {
                    console.log(device);
                    let deviceserviceUUIDs = device.serviceUUIDs[0];
                    let deviceDetails = device;
                    this.info("Connecting to TI Sensor")
                    this.manager.stopDeviceScan()
                    device.connect()
                        .then((device) => {
                            console.log(device)
                            this.info("Discovering services and characteristics")
                            return device.discoverAllServicesAndCharacteristics()
                        })
                        .then((device) => {
                            this.info("device connected")
                            return this.setupNotifications(deviceDetails,deviceserviceUUIDs)
                        })
                        .then(() => {
                            this.info("Listening...")
                        }, (error) => {
                            this.error(error.message)
                        })
                }
            });
    }

    async setupNotifications(device,serviceUUId) {
        for (const id in this.sensors) {
            const service = this.serviceUUID(id)
            const characteristicW = this.writeUUID(id)
            const characteristicN = this.notifyUUID(id)

            const characteristic = await device.readCharacteristicForService(
                serviceUUId, characteristicN
            )

            device.monitorCharacteristicForService(serviceUUId, characteristicN, (error, characteristic) => {
                if (error) {
                    this.error(error.message)
                    return
                }
                console.log(characteristic);
                this.updateValue(characteristic.uuid, characteristic.value)
            })
        }
    }


    render() {
        return (
            <View>
                <Text>{this.state.info}</Text>
                {Object.keys(this.sensors).map((key) => {
                    return <Text key={key}>
                        {this.sensors[key] + ": " + (this.state.values[this.notifyUUID(key)] || "-")}
                    </Text>
                })}
            </View>
        )
    }
}

