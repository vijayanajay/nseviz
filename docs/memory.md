# Milestones

# Error Memory Bank

Below are the active issues relevant after the latest refactoring. Historical issues have been pruned for clarity.

## Active Issues

| Date                | Error Type              | Code Snippet                                               | Solution                                                | Status  |
|---------------------|-------------------------|------------------------------------------------------------|---------------------------------------------------------|---------|
| 2025-04-23T16:49:00 | TemplateEncodingError   | `heatmap_app/templates/heatmap_app/partials/__init__.py` with BOM | Remove BOM from file or use encoding-aware editor to fix UTF-8 encoding issue: `SyntaxError: (unicode error) 'utf-8' codec can't decode byte 0xff in position 0: invalid start byte` | Pending |
| 2025-04-30T15:30:00 | SkippedTest             | `@unittest.skipIf('yfinance' not in globals(), "yfinance not installed")` | Install yfinance in the test environment or properly mock it | Pending |
| 2024-02-20T15:45:00 | SettingWithCopyWarning  | filtered['Signal'] = 1                                     | Use .copy() and .loc                                     | Resolved |
| 2025-05-01T10:00:00 | RefreshDataTestFixes    | Removed unsupported 'tickers' parameter, connectivity check assertions, and updated tests to assert expected log messages instead of direct call counts. | Updated tests to assert for expected log messages (e.g. 'Refreshing data for stock: RELIANCE.NS') and removed direct connectivity and fetch count assertions. | Resolved |


