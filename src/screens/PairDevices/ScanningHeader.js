// @flow

import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Trans } from "react-i18next";
import LText from "../../components/LText";
import BluetoothScanning from "../../components/BluetoothScanning";
import { deviceNames } from "../../wording";
import colors from "../../colors";

type Props = {};

class ScanningHeader extends PureComponent<Props> {
  render() {
    return (
      <View style={styles.root}>
        <BluetoothScanning isAnimated />
        <View style={styles.TitleContainer}>
          <LText secondary semiBold style={styles.TitleText}>
            <Trans
              i18nKey="PairDevices.ScanningHeader.title"
              values={deviceNames.nanoX}
            />
          </LText>
        </View>
        <View style={styles.SubtitleContainer}>
          <LText style={styles.SubtitleText}>
            <Trans
              i18nKey="PairDevices.ScanningHeader.desc"
              values={deviceNames.nanoX}
            />
          </LText>
        </View>
      </View>
    );
  }
}

export default ScanningHeader;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 32,
    alignItems: "center",
  },
  TitleContainer: {
    marginTop: 32,
  },
  TitleText: {
    color: colors.darkBlue,
    fontSize: 18,
  },
  SubtitleContainer: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
  SubtitleText: {
    textAlign: "center",
    fontSize: 14,
    color: colors.smoke,
  },
});
