// @flow
import React, { Component } from "react";
import type { BigNumber } from "bignumber.js";
import { connect } from "react-redux";
import type { Currency } from "@ledgerhq/live-common/lib/types";
import type { State } from "../reducers";
import Placeholder from "./Placeholder";

import {
  counterValueCurrencySelector,
  currencySettingsSelector,
  counterValueExchangeSelector,
  intermediaryCurrency,
} from "../reducers/settings";
import CounterValues from "../countervalues";

import CurrencyUnitValue from "./CurrencyUnitValue";

type OwnProps = {
  // wich market to query
  currency: Currency,

  // when? if not given: take latest
  date?: Date,

  value: BigNumber,

  // display grey placeholder if no value
  withPlaceholder?: boolean,
  placeholderProps?: mixed,
  // as we can't render View inside Text, provide ability to pass
  // wrapper component from outside
  Wrapper?: React$ComponentType<*>,
};

type Props = OwnProps & {
  // from reducers
  counterValueCurrency: Currency,
  value: ?number,
};

const mapStateToProps = (state: State, props: OwnProps) => {
  const { currency, value, date } = props;
  const counterValueCurrency = counterValueCurrencySelector(state);
  const fromExchange = currencySettingsSelector(state, { currency }).exchange;
  const toExchange = counterValueExchangeSelector(state);
  const counterValue = CounterValues.calculateWithIntermediarySelector(state, {
    from: currency,
    fromExchange,
    intermediary: intermediaryCurrency,
    toExchange,
    to: counterValueCurrency,
    value,
    date,
  });

  return {
    counterValueCurrency,
    value: counterValue,
  };
};

class CounterValue extends Component<Props> {
  render() {
    const {
      value,
      counterValueCurrency,
      date,
      withPlaceholder,
      placeholderProps,
      Wrapper,
      ...props
    } = this.props;

    const inner = (
      <CurrencyUnitValue
        {...props}
        unit={counterValueCurrency.units[0]}
        value={value}
      />
    );

    if (!value) {
      return withPlaceholder ? <Placeholder {...placeholderProps} /> : null;
    }

    if (Wrapper) {
      return <Wrapper>{inner}</Wrapper>;
    }

    return inner;
  }
}

export default connect(mapStateToProps)(CounterValue);
