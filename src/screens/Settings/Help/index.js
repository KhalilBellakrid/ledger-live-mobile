/* @flow */
import React, { PureComponent } from "react";
import type { NavigationScreenProp } from "react-navigation";
import { ScrollView, View, StyleSheet } from "react-native";
import i18next from "i18next";
import { translate } from "react-i18next";
import { TrackScreen } from "../../../analytics";
import LedgerSupportRow from "./LedgerSupportRow";
import ClearCacheRow from "./ClearCacheRow";
import HardResetRow from "./HardResetRow";
import ConfigureDeviceRow from "./ConfigureDeviceRow";
import RepairDeviceRow from "./RepairDeviceRow";

class HelpSettings extends PureComponent<{
  navigation: NavigationScreenProp<*>,
}> {
  static navigationOptions = {
    title: i18next.t("settings.help.header"),
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.root}>
        <TrackScreen category="Settings" name="Help" />
        <LedgerSupportRow />
        <ConfigureDeviceRow navigation={this.props.navigation} />
        <RepairDeviceRow navigation={this.props.navigation} />
        <View style={styles.container}>
          <ClearCacheRow />
          <HardResetRow />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: { paddingTop: 16, paddingBottom: 64 },
  container: {
    marginTop: 16,
  },
});

export default translate()(HelpSettings);
