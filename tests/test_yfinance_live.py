"""
Integration test: Downloads real data from Yahoo Finance using yfinance.
This test makes a real network call and should be run manually or with pytest -m live.

Usage:
    pytest -m live

Note: Excluded from default test runs to avoid CI flakiness.
"""
import pytest
import yfinance as yf
import pandas as pd

@pytest.mark.live
@pytest.mark.slow
@pytest.mark.integration
def test_yfinance_download_real_data():
    """
    Download real data for a known symbol (e.g., HDFCBANK.NS) and check response.
    """
    symbol = "HDFCBANK.NS"
    df = yf.download(symbol, period="5d", interval="1d")
    # Basic checks
    assert isinstance(df, pd.DataFrame)
    assert not df.empty, "Downloaded DataFrame is empty. Possible API/network issue."
    for col in ["Open", "High", "Low", "Close", "Volume"]:
        assert col in df.columns, f"Missing expected column: {col}"
    # Check for at least one row with non-null data
    assert df.dropna().shape[0] > 0, "No valid data rows returned."
